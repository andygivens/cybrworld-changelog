import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <h2>Recent Updates</h2>
      {updates.length === 0 && <div>No updates found.</div>}
      {updates.map(update => (
        <div key={update.id} className="update-card">
          <h3>{update.title}</h3>
          <p>{update.description}</p>
          <small>{new Date(update.date).toLocaleDateString()}</small>
          <button onClick={() => setExpandedId(expandedId === update.id ? null : update.id)}>
            {expandedId === update.id ? 'Hide Details' : 'Expand for Details'}
          </button>
          {expandedId === update.id && (
            <div className="update-details">
              <strong>Tags:</strong> {update.tags && update.tags.join(', ')}<br />
              <strong>Links:</strong> {update.links && update.links.map((link, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
              ))}<br />
              {update.media && update.media.length > 0 && (
                <div>
                  <strong>Screenshots:</strong>
                  <div className="media-thumbnails">
                    {update.media.map((m, i) => (
                      <img key={i} src={m.url} alt={m.type} style={{ maxWidth: '120px', margin: '4px' }} />
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
