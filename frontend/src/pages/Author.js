import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPlus, FaTrash, FaPen } from 'react-icons/fa';
import Alert from '../components/Alert';
import UpdateModal from '../components/UpdateModal';
import UpdateRow from '../components/UpdateRow';
import { useTheme } from '../contexts/ThemeContext';

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
	const [alert, setAlert] = useState({ message: null, result: 'success' });
	const [validationWarning, setValidationWarning] = useState(null);
	const [error, setError] = useState(null);
	const [manageMode, setManageMode] = useState(false);
	const [selectedUpdates, setSelectedUpdates] = useState([]);
	const { theme } = useTheme();

	const isDarkTheme = theme === 'minimal-dark';

	useEffect(() => {
		fetchUpdates();
		fetchTags();
	}, []);

	// Show alert for success messages
	const showSuccess = (msg) => {
		setAlert({ message: msg, result: 'success' });
		setTimeout(() => setAlert({ message: null, result: 'success' }), 6000);
	};

	const showFail = (msg) => {
		setAlert({ message: msg, result: 'fail' });
		setTimeout(() => setAlert({ message: null, result: 'fail' }), 6000);
	};

	const showWarning = (msg) => {
		setAlert({ message: msg, result: 'warning' });
		setTimeout(() => setAlert({ message: null, result: 'warning' }), 6000);
	};

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
				showFail('Failed to fetch updates');
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
			setValidationWarning(null);
			if (!form.title || !form.description) {
				showWarning('Title and Description are required.');
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
				showSuccess('Update edited successfully');
					} else {
						await axios.post('/updates', updateData);
						showSuccess('Update created successfully');
					}
	setForm({ title: '', description: '', tags: [], links: '', media: null });
	setImagePreview(null);
	setTagInput('');
	setTagSuggestions([]);
	setEditId(null);
	setShowModal(false);
	fetchUpdates();
			} catch (err) {
				showFail('Failed to save update');
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
			try {
				await axios.delete(`/updates/${id}`);
				showSuccess('Update deleted');
				fetchUpdates();
			} catch (err) {
				showFail('Failed to delete update');
			}
	};

	const handleSelectUpdate = (id) => {
		setSelectedUpdates(selected =>
			selected.includes(id)
				? selected.filter(sid => sid !== id)
				: [...selected, id]
		);
	};

	const handleSelectAll = () => {
		if (selectedUpdates.length === updates.length) {
			setSelectedUpdates([]);
		} else {
			setSelectedUpdates(updates.map(u => u.id));
		}
	};

	const handleBulkDelete = () => {
		// Implement bulk delete logic here
	};

	const handleBulkHide = () => {
		// Implement bulk hide logic here
	};

	return (
		<div style={{ 
			background: isDarkTheme ? 'var(--bg-primary)' : 'transparent',
			minHeight: '100vh',
			color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
		}}>
			<Alert message={alert.message} result={alert.result} />
			{validationWarning && <div style={{ color: '#d32f2f', marginBottom: '0.2rem', fontWeight: 500, padding: '2px 6px' }}>{validationWarning}</div>}
			<div style={{ height: '2.5rem' }} />
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.3rem', gap: '0.5rem', position: 'relative', justifyContent: 'flex-start' }}>
				<button
					style={{ 
						background: 'none', 
						color: isDarkTheme ? 'var(--accent-color)' : '#0077C8', 
						border: 'none', 
						fontSize: '0.93rem', 
						fontWeight: 500, 
						cursor: 'pointer', 
						marginRight: '0.3rem', 
						padding: '2px 7px', 
						position: 'relative' 
					}}
					onClick={() => { setEditId(null); setForm({ title: '', description: '', tags: [], links: '', media: null }); setTagInput(''); setTagSuggestions([]); setShowModal(true); }}
					aria-label="Create New Update"
				>
					New Entry
				</button>
				<span style={{ color: isDarkTheme ? 'var(--accent-color)' : '#0077C8', fontWeight: 500, margin: '0 0.4rem' }}>|</span>
				<button
					style={{ 
						background: 'none', 
						color: isDarkTheme ? 'var(--accent-color)' : '#0077C8', 
						border: 'none', 
						fontSize: '0.93rem', 
						fontWeight: 500, 
						cursor: 'pointer', 
						padding: '2px 7px', 
						position: 'relative' 
					}}
					onClick={() => setManageMode(m => !m)}
					aria-label="Manage Entries"
				>
					Manage
				</button>
				{manageMode && updates.length > 0 && (
					<>
						<span style={{ color: '#d32f2f', fontWeight: 600, margin: '0 0.4rem' }}>|</span>
						<button onClick={handleBulkDelete} style={{ background: 'none', color: '#d32f2f', border: 'none', fontWeight: 500, fontSize: '0.93rem', cursor: 'pointer', padding: '2px 7px', position: 'relative' }}>Delete</button>
						<span style={{ color: '#d32f2f', fontWeight: 600, margin: '0 0.4rem' }}>|</span>
						<button onClick={handleBulkHide} style={{ background: 'none', color: '#d32f2f', border: 'none', fontWeight: 500, fontSize: '0.93rem', cursor: 'pointer', padding: '2px 7px', position: 'relative' }}>Hide</button>
					</>
				)}
			</div>
			{error && <div style={{ color: 'red' }}>{error}</div>}
			{loading ? <div>Loading updates...</div> : (
                <div className="author-table-container">
                    {/* Bulk actions now in top menu bar */}
                    <table className="author-table" style={{ 
						width: '100%', 
						background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd', 
						borderCollapse: 'collapse', 
						borderRadius: '10px', 
						overflow: 'hidden', 
						boxShadow: 'none',
						border: isDarkTheme ? '1px solid var(--border-color)' : 'none'
					}}>
						<thead>
                            <tr style={{ 
								borderBottom: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee', 
								background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd' 
							}}>
                                {manageMode && <th style={{ 
									textAlign: 'center', 
									background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd',
									color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
								}}><input type="checkbox" checked={selectedUpdates.length === updates.length} onChange={handleSelectAll} style={{ accentColor: isDarkTheme ? 'var(--accent-color)' : '#0077C8' }} /></th>}
                                <th style={{ 
									background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd', 
									fontWeight: 500,
									color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
								}}>Title</th>
                                <th style={{ 
									background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd', 
									fontWeight: 500,
									color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
								}}>Description</th>
                                <th style={{ 
									background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd', 
									fontWeight: 500,
									color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
								}}>Date</th>
                                <th style={{ 
									background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd', 
									fontWeight: 500,
									color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
								}}>Tags</th>
                                <th style={{ 
									background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd', 
									fontWeight: 500,
									color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
								}}>Links</th>
                                <th style={{ 
									textAlign: 'center', 
									background: isDarkTheme ? 'var(--bg-secondary)' : '#f8fafd', 
									fontWeight: 500,
									color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
								}}>Actions</th>
                            </tr>
                        </thead>
							<tbody>
								{updates.map(update => (
									<UpdateRow
										key={update.id}
										update={update}
										manageMode={manageMode}
										selected={selectedUpdates.includes(update.id)}
										onSelect={() => handleSelectUpdate(update.id)}
										onEdit={() => handleEdit(update)}
										onDelete={() => handleDelete(update.id)}
									/>
								))}
							</tbody>
						</table>
                </div>
            )}
            <UpdateModal
                show={showModal}
                editId={editId}
                form={form}
                imagePreview={imagePreview}
                tagInput={tagInput}
                tagSuggestions={tagSuggestions}
                tagInputRef={tagInputRef}
                handleChange={handleChange}
                handleTagKeyDown={handleTagKeyDown}
                handleTagSuggestionClick={handleTagSuggestionClick}
                handleTagRemove={handleTagRemove}
                handleSubmit={handleSubmit}
                setShowModal={setShowModal}
                setEditId={setEditId}
                setForm={setForm}
                setTagInput={setTagInput}
                setTagSuggestions={setTagSuggestions}
            />
        </div>    
    );
}

export default Author;
