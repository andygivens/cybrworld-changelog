
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronDown } from 'react-icons/fa';

function UpdateFeed() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    // Fetch updates from backend API
    axios.get('/updates')
      .then(res => {
        setUpdates(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading updates...</div>;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Recent Updates</h2>
      {updates.length === 0 && <div>No updates found.</div>}
      {updates.map(update => (
        <div key={update.id} className="update-card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{update.title}</h3>
              <small style={{ color: '#888' }}>{new Date(update.date).toLocaleDateString()}</small>
            </div>
            <span
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s',
                transform: expandedId === update.id ? 'rotate(180deg)' : 'rotate(0deg)',
                fontSize: '1.2rem',
                marginLeft: '0.5rem',
              }}
              onClick={() => setExpandedId(expandedId === update.id ? null : update.id)}
              aria-label={expandedId === update.id ? 'Hide Details' : 'Show Details'}
            >
              <FaChevronDown />
            </span>
          </div>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem', color: '#333' }}>{update.description}</p>
          {expandedId === update.id && (
            <div className="update-details" style={{ marginTop: '0.5rem', fontSize: '0.92rem', color: '#444' }}>
              {update.tags && update.tags.length > 0 && (
                <div><strong>Tags:</strong> {update.tags.join(', ')}</div>
              )}
              {update.links && update.links.length > 0 && (
                <div><strong>Links:</strong> {update.links.map((link, i) => (
                  <a key={i} href={link} target="_blank" rel="noopener noreferrer" style={{ marginRight: '0.5rem' }}>{link}</a>
                ))}</div>
              )}
              {update.media && update.media.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
                  <strong>Screenshots:</strong>
                  <div className="media-thumbnails" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {update.media.map((m, i) => (
                      <img key={i} src={m.url} alt={m.type} style={{ maxWidth: '80px', margin: '2px', borderRadius: '4px' }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UpdateFeed;
