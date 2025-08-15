import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', tags: '', links: '', media: null });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUpdates();
  }, []);

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
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
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
        tags: form.tags.split(',').map(t => t.trim()),
        links: form.links.split(',').map(l => l.trim()),
        media: mediaUrls.map(url => ({ url, type: 'image' }))
      };
      if (editId) {
        await axios.put(`/updates/${editId}`, updateData);
        setSuccess('Update edited successfully');
      } else {
        await axios.post('/updates', updateData);
        setSuccess('Update created successfully');
      }
      setForm({ title: '', description: '', tags: '', links: '', media: null });
      setEditId(null);
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
      tags: update.tags.join(', '),
      links: update.links.join(', '),
      media: null
    });
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
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
        <input name="links" placeholder="Links (comma separated)" value={form.links} onChange={handleChange} />
        <input name="media" type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">{editId ? 'Edit Update' : 'Create Update'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setForm({ title: '', description: '', tags: '', links: '', media: null }); }}>Cancel Edit</button>}
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <hr />
      {loading ? <div>Loading updates...</div> : (
        <div>
          <h3>Existing Updates</h3>
          {updates.length === 0 && <div>No updates found.</div>}
          {updates.map(update => (
            <div key={update.id} style={{ border: '1px solid #ccc', margin: '8px', padding: '8px' }}>
              <strong>{update.title}</strong>
              <p>{update.description}</p>
              <small>{new Date(update.date).toLocaleDateString()}</small><br />
              <button onClick={() => handleEdit(update)}>Edit</button>
              <button onClick={() => handleDelete(update.id)}>Delete</button>
              {update.media && update.media.length > 0 && (
                <div>
                  <strong>Media:</strong>
                  {update.media.map((m, i) => (
                    <img key={i} src={m.url} alt={m.type} style={{ maxWidth: '80px', margin: '2px' }} />
                  ))}
                </div>
              )}
              <div><strong>Tags:</strong> {update.tags && update.tags.join(', ')}</div>
              <div><strong>Links:</strong> {update.links && update.links.map((link, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              ))}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
