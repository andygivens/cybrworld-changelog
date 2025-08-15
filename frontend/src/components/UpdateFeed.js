
import React, { useEffect, useState } from 'react';

// Assign a color to a tag value (consistent for each tag)
function getTagColor(tag) {
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
import axios from 'axios';
import updatePlaceholder from '../assets/update-placeholder.svg';
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
        <div key={update.id} className="update-card" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,51,160,0.08)' }}>
          {/* Image container on the left */}
          <div style={{ width: '80px', height: '80px', background: '#f5f7fa', borderRadius: '8px', border: '1px solid #e3e8ee', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
            {update.media && update.media.length > 0 && update.media[0].url ? (
              <img src={update.media[0].url} alt="Update" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <img src={updatePlaceholder} alt="Update Placeholder" style={{ width: '60px', height: '60px', opacity: 0.8 }} />
            )}
          </div>
          {/* Card content on the right */}
          <div style={{ flex: 1 }}>
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
            {/* Show tags always, folded or expanded */}
            {update.tags && update.tags.length > 0 && (
              <div style={{ margin: '0.5rem 0 0 0', fontSize: '0.92rem', color: '#444', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {update.tags.map((tag, idx) => (
                  <span key={idx} style={{ background: getTagColor(tag), color: '#333', borderRadius: '12px', padding: '2px 8px', fontSize: '0.92rem' }}>{tag}</span>
                ))}
              </div>
            )}
            {/* Only show description and links when expanded */}
            {expandedId === update.id && (
              <div className="update-details" style={{ marginTop: '0.5rem', fontSize: '0.92rem', color: '#444', maxHeight: '400px', overflowY: 'auto', transition: 'max-height 0.3s' }}>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.05rem', color: '#333', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{update.description}</p>
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
        </div>
      ))}
    </div>
  );
}

export default UpdateFeed;
