import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa';

// Assign a color to a tag value (consistent for each tag)
function getTagColor(tag) {
	// Simple hash function for string
	let hash = 0;
	for (let i = 0; i < tag.length; i++) {
		hash = tag.charCodeAt(i) + ((hash << 5) - hash);
	}
	const pastelColors = [
		'#FFD6E0', // pink
		'#D6F5FF', // blue
		'#FFF5D6', // yellow
		'#D6FFD6', // green
		'#F5D6FF', // purple
		'#FFEFD6', // orange
		'#D6FFF5', // teal
		'#F5FFD6', // lime
		'#FFD6F5', // magenta
		'#D6D6FF', // lavender
	];
	const idx = Math.abs(hash) % pastelColors.length;
	return pastelColors[idx];
}

function Author() {
	const [updates, setUpdates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [form, setForm] = useState({ title: '', description: '', tags: [], links: '', media: null });
	const [imagePreview, setImagePreview] = useState(null);
	const [tagInput, setTagInput] = useState('');
	const [allTags, setAllTags] = useState([]);
	const [tagSuggestions, setTagSuggestions] = useState([]);
	const tagInputRef = useRef(null);
	const [editId, setEditId] = useState(null);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [validationWarning, setValidationWarning] = useState(null);

	useEffect(() => {
		fetchUpdates();
		fetchTags();
	}, []);

	const fetchTags = async () => {
		try {
			const res = await axios.get('/tags');
			setAllTags(res.data);
		} catch (err) {
			// ignore error for now
		}
	};

	const fetchUpdates = async () => {
		setLoading(true);
		try {
			const res = await axios.get('/updates');
			setUpdates(res.data);
		} catch (err) {
			setError('Failed to fetch updates');
		}
		setLoading(false);
	};

	const handleChange = e => {
		const { name, value, files } = e.target;
		if (name === 'tags') {
			setTagInput(value);
			if (value) {
				const inputLower = value.toLowerCase();
				setTagSuggestions(allTags.filter(tag => tag.toLowerCase().includes(inputLower) && !form.tags.includes(tag)));
			} else {
				setTagSuggestions([]);
			}
		} else if (name === 'media') {
			const file = files && files[0];
			setForm(f => ({ ...f, media: file }));
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setImagePreview(reader.result);
				};
				reader.readAsDataURL(file);
			} else {
				setImagePreview(null);
			}
		} else {
			setForm(f => ({ ...f, [name]: value }));
		}
	};

	const handleTagKeyDown = e => {
		if (['Enter', ',', 'Tab', ' '].includes(e.key)) {
			e.preventDefault();
			let newTag = tagInput.trim();
			// Remove spaces from tag
			newTag = newTag.replace(/\s+/g, '');
			if (newTag && !form.tags.includes(newTag)) {
				setForm(f => ({ ...f, tags: [...f.tags, newTag] }));
			}
			setTagInput('');
			setTagSuggestions([]);
		} else if (e.key === 'Backspace' && !tagInput && form.tags.length > 0) {
			setForm(f => ({ ...f, tags: f.tags.slice(0, -1) }));
		}
	};

	const handleTagSuggestionClick = tag => {
		if (!form.tags.includes(tag)) {
			setForm(f => ({ ...f, tags: [...f.tags, tag] }));
		}
		setTagInput('');
		setTagSuggestions([]);
		tagInputRef.current?.focus();
	};

	const handleTagRemove = idx => {
		setForm(f => ({ ...f, tags: f.tags.filter((_, i) => i !== idx) }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError(null);
		setSuccess(null);
		setValidationWarning(null);
		if (!form.title || !form.description) {
			setValidationWarning('Title and Description are required.');
			return;
		}
		try {
			let mediaUrls = [];
			if (form.media) {
				const mediaData = new FormData();
				mediaData.append('file', form.media);
				const mediaRes = await axios.post('/media', mediaData, { headers: { 'Content-Type': 'multipart/form-data' } });
				mediaUrls = [mediaRes.data.url];
			}
			const updateData = {
				title: form.title,
				description: form.description,
				tags: form.tags, // Already an array
				links: form.links.split(',').map(l => l.trim()),
				media: mediaUrls.map(url => ({ url, type: 'image' })),
				date: new Date().toISOString(),
				authorId: '00000000-0000-0000-0000-000000000001' // Demo author ID
			};
			if (editId) {
				await axios.put(`/updates/${editId}`, updateData);
				setSuccess('Update edited successfully');
			} else {
				await axios.post('/updates', updateData);
				setSuccess('Update created successfully');
			}
	setForm({ title: '', description: '', tags: [], links: '', media: null });
	setImagePreview(null);
	setTagInput('');
	setTagSuggestions([]);
	setEditId(null);
	setShowModal(false);
	fetchUpdates();
		} catch (err) {
			setError('Failed to save update');
		}
	};

	const handleEdit = update => {
		setEditId(update.id);
		setForm({
			title: update.title,
			description: update.description,
			tags: Array.isArray(update.tags) ? update.tags : (update.tags ? update.tags.split(',').map(t => t.trim()) : []),
			links: Array.isArray(update.links) ? update.links.join(', ') : (update.links ? update.links : ''),
			media: null
		});
		setImagePreview(null);
		setTagInput('');
		setTagSuggestions([]);
		setShowModal(true);
	};

	const handleDelete = async id => {
		setError(null);
		setSuccess(null);
		try {
			await axios.delete(`/updates/${id}`);
			setSuccess('Update deleted');
			fetchUpdates();
		} catch (err) {
			setError('Failed to delete update');
		}
	};

	return (
		<div>
			{validationWarning && <div style={{ color: '#d32f2f', marginBottom: '0.2rem', fontWeight: 500, padding: '2px 6px' }}>{validationWarning}</div>}
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
				<h2 style={{ margin: 0 }}>Author</h2>
			</div>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
				<button
					style={{ background: 'none', color: '#0077C8', border: 'none', fontSize: '1.5rem', cursor: 'pointer', marginRight: '1rem', padding: 0, position: 'relative' }}
					onClick={() => { setEditId(null); setForm({ title: '', description: '', tags: [], links: '', media: null }); setTagInput(''); setTagSuggestions([]); setShowModal(true); }}
					aria-label="Create New Update"
					onMouseEnter={e => {
						const tooltip = document.createElement('div');
						tooltip.textContent = 'New entry';
						tooltip.style.position = 'absolute';
						tooltip.style.top = '120%';
						tooltip.style.left = '50%';
						tooltip.style.transform = 'translateX(-50%)';
						tooltip.style.background = '#333';
						tooltip.style.color = '#fff';
						tooltip.style.padding = '2px 8px';
						tooltip.style.borderRadius = '4px';
						tooltip.style.fontSize = '0.85rem';
						tooltip.style.whiteSpace = 'nowrap';
						tooltip.style.zIndex = '1001';
						tooltip.className = 'plus-tooltip';
						e.currentTarget.appendChild(tooltip);
					}}
					onMouseLeave={e => {
						const tooltip = e.currentTarget.querySelector('.plus-tooltip');
						if (tooltip) e.currentTarget.removeChild(tooltip);
					}}
				>
					<FaPlus />
				</button>
			</div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{success && <div style={{ color: 'green' }}>{success}</div>}
			{loading ? <div>Loading updates...</div> : (
				<table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,51,160,0.08)' }}>
					<thead>
						<tr style={{ background: '#f5f7fa' }}>
							<th style={{ padding: '8px', textAlign: 'left' }}>Title</th>
							<th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
							<th style={{ padding: '8px', textAlign: 'left' }}>Date</th>
							<th style={{ padding: '8px', textAlign: 'left' }}>Tags</th>
							<th style={{ padding: '8px', textAlign: 'left' }}>Links</th>
							<th style={{ padding: '8px', textAlign: 'center' }}>Actions</th>
						</tr>
					</thead>
					<tbody>
						{updates.length === 0 && (
							<tr><td colSpan={6} style={{ textAlign: 'center', padding: '1rem' }}>No updates found.</td></tr>
						)}
						{updates.map(update => (
							<tr key={update.id} style={{ borderBottom: '1px solid #e3e8ee' }}>
								<td style={{ padding: '8px', fontWeight: 500 }}>{update.title}</td>
								<td style={{ padding: '8px' }}>{update.description && update.description.length > 120 ? update.description.slice(0, 120) + '…' : update.description}</td>
								<td style={{ padding: '8px', color: '#888' }}>{new Date(update.date).toLocaleDateString()}</td>
								<td style={{ padding: '8px' }}>
									{Array.isArray(update.tags) && update.tags.length > 0 ? (
										<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
											{update.tags.map(tag => (
												<span key={tag} style={{ background: getTagColor(tag), color: '#333', borderRadius: '12px', padding: '2px 8px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
													{tag}
												</span>
											))}
										</div>
									) : null}
								</td>
								<td style={{ padding: '8px' }}>{update.links && update.links.map((link, i) => (
									<a key={i} href={link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '0.5rem' }}>{link}</a>
								))}</td>
								<td style={{ padding: '8px', textAlign: 'center' }}>
									<button
										style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '0.5rem', color: '#0077C8', fontSize: '1.1rem', position: 'relative' }}
										onClick={() => handleEdit(update)}
										aria-label="Edit Update"
										onMouseEnter={e => {
											const tooltip = document.createElement('div');
											tooltip.textContent = 'Edit';
											tooltip.style.position = 'absolute';
											tooltip.style.top = '120%';
											tooltip.style.left = '50%';
											tooltip.style.transform = 'translateX(-50%)';
											tooltip.style.background = '#333';
											tooltip.style.color = '#fff';
											tooltip.style.padding = '2px 8px';
											tooltip.style.borderRadius = '4px';
											tooltip.style.fontSize = '0.85rem';
											tooltip.style.whiteSpace = 'nowrap';
											tooltip.style.zIndex = '1001';
											tooltip.className = 'icon-tooltip';
											e.currentTarget.appendChild(tooltip);
										}}
										onMouseLeave={e => {
											const tooltip = e.currentTarget.querySelector('.icon-tooltip');
											if (tooltip) e.currentTarget.removeChild(tooltip);
										}}
									>
										<FaPen />
									</button>
									<button
										style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d32f2f', fontSize: '1.1rem', position: 'relative' }}
										onClick={() => handleDelete(update.id)}
										aria-label="Delete Update"
										onMouseEnter={e => {
											const tooltip = document.createElement('div');
											tooltip.textContent = 'Delete';
											tooltip.style.position = 'absolute';
											tooltip.style.top = '120%';
											tooltip.style.left = '50%';
											tooltip.style.transform = 'translateX(-50%)';
											tooltip.style.background = '#333';
											tooltip.style.color = '#fff';
											tooltip.style.padding = '2px 8px';
											tooltip.style.borderRadius = '4px';
											tooltip.style.fontSize = '0.85rem';
											tooltip.style.whiteSpace = 'nowrap';
											tooltip.style.zIndex = '1001';
											tooltip.className = 'icon-tooltip';
											e.currentTarget.appendChild(tooltip);
										}}
										onMouseLeave={e => {
											const tooltip = e.currentTarget.querySelector('.icon-tooltip');
											if (tooltip) e.currentTarget.removeChild(tooltip);
										}}
									>
										<FaTrash />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{/* Modal for create/edit update */}
			{showModal && (
				<div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
					<div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '320px', boxShadow: '0 4px 16px rgba(0,51,160,0.10)' }}>
						<h3 style={{ marginTop: 0 }}>{editId ? 'Edit Update' : 'Create Update'}</h3>
						<form onSubmit={handleSubmit}>
							<input name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={{ marginBottom: '0.75rem', fontSize: '1rem' }} />
							<textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ marginBottom: '0.75rem', fontSize: '1rem' }} />
							<div style={{ marginBottom: '0.75rem', position: 'relative' }}>
								<div style={{ background: '#f5f7fa', border: '1px solid #e3e8ee', borderRadius: '8px', padding: '10px', marginBottom: '0', minHeight: '44px' }}>
									<div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
										{form.tags.map((tag, idx) => (
											<span key={tag} style={{ background: getTagColor(tag), color: '#333', borderRadius: '12px', padding: '0px 8px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
												{tag}
												<button type="button" style={{ background: 'none', border: 'none', color: '#d32f2f', fontSize: '1rem', cursor: 'pointer', padding: 0 }} onClick={() => handleTagRemove(idx)} aria-label={`Remove tag ${tag}`}>&times;</button>
											</span>
										))}
										<input
											ref={tagInputRef}
											name="tags"
											placeholder="Add tag..."
											value={tagInput}
											onChange={handleChange}
											onKeyDown={handleTagKeyDown}
											style={{ border: 'none', outline: 'none', minWidth: '80px', fontSize: '0.95rem', background: 'transparent' }}
											autoComplete="off"
										/>
									</div>
									{tagSuggestions.length > 0 && (
										<div style={{ background: '#fff', border: '1px solid #e3e8ee', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,51,160,0.08)', position: 'absolute', zIndex: 1002, marginTop: '2px', padding: '4px 0', minWidth: '120px' }}>
											{tagSuggestions.map(tag => (
												<div key={tag} style={{ padding: '4px 12px', cursor: 'pointer', color: '#0077C8' }} onMouseDown={() => handleTagSuggestionClick(tag)}>{tag}</div>
											))}
										</div>
									)}
								</div>
							</div>
							<input name="links" placeholder="Links (comma separated)" value={form.links} onChange={handleChange} style={{ marginBottom: '0.75rem' }} />
								<input name="media" type="file" accept="image/*" onChange={handleChange} style={{ marginBottom: '0.75rem' }} />
								{imagePreview && (
									<div style={{ marginBottom: '0.75rem' }}>
										<img src={imagePreview} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e3e8ee' }} />
									</div>
								)}
							<div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
								<button type="submit" style={{ background: '#0077C8', color: '#fff', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', fontWeight: 600 }}>
									{editId ? 'Save Changes' : 'Create Update'}
								</button>
								<button type="button" style={{ background: '#e3e8ee', color: '#333', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem' }} onClick={() => { setShowModal(false); setEditId(null); setForm({ title: '', description: '', tags: [], links: '', media: null }); setTagInput(''); setTagSuggestions([]); }}>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Author;
