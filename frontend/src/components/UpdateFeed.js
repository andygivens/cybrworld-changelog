
import React, { useEffect, useState } from 'react';
import { getTagColor } from '../utils';
import axios from 'axios';
import updatePlaceholder from '../assets/update-placeholder.svg';
import { FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

function UpdateFeed() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const { theme } = useTheme();

  const isMinimalDark = theme === 'minimal-dark';

  useEffect(() => {
    // Fetch updates from backend API
    axios.get('/updates')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setUpdates(res.data);
        } else {
          // Inject dummy data if no updates returned
          setUpdates([
            {
              id: '1',
              title: 'Demo Update 1',
              description: 'This is a demo update description.',
              date: new Date().toISOString(),
              tags: ['demo', 'test'],
              links: ['https://example.com'],
              media: []
            },
            {
              id: '2',
              title: 'Demo Update 2',
              description: 'Another demo update for testing.',
              date: new Date().toISOString(),
              tags: ['sample'],
              links: [],
              media: []
            }
          ]);
        }
        setLoading(false);
      })
      .catch(() => {
        // On error, inject dummy data
        setUpdates([
          {
            id: '1',
            title: 'Demo Update 1',
            description: 'This is a demo update description.',
            date: new Date().toISOString(),
            tags: ['demo', 'test'],
            links: ['https://example.com'],
            media: []
          },
          {
            id: '2',
            title: 'Demo Update 2',
            description: 'Another demo update for testing.',
            date: new Date().toISOString(),
            tags: ['sample'],
            links: [],
            media: []
          }
        ]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading updates...</div>;

  return (
    <div>
      <h2 style={{ 
        marginBottom: '1rem',
        color: isMinimalDark ? '#ecf0f1' : 'inherit'
      }}>
        Recent Updates
      </h2>
      {updates.length === 0 && (
        <div style={{ 
          color: isMinimalDark ? '#bdc3c7' : 'inherit'
        }}>
          No updates found.
        </div>
      )}
      {updates.map(update => (
        <div 
          key={update.id} 
          className={isMinimalDark ? "update-card" : "update-card"} 
          style={{ 
            padding: '1rem', 
            marginBottom: '1rem', 
            display: 'flex', 
            flexDirection: 'row', 
            gap: '1rem', 
            alignItems: 'flex-start', 
            background: isMinimalDark ? 'rgba(52, 73, 94, 0.8)' : '#fff', 
            borderRadius: isMinimalDark ? '12px' : '8px', 
            boxShadow: isMinimalDark ? 
              '0 4px 20px rgba(0, 0, 0, 0.3)' : 
              '0 2px 8px rgba(0,51,160,0.08)',
            border: isMinimalDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
            backdropFilter: isMinimalDark ? 'blur(10px)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
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
                <h3 style={{ 
                  margin: 0, 
                  fontSize: '1.1rem',
                  color: isMinimalDark ? '#ecf0f1' : 'inherit'
                }}>
                  {update.title}
                </h3>
                <small style={{ 
                  color: isMinimalDark ? '#bdc3c7' : '#888'
                }}>
                  {new Date(update.date).toLocaleDateString()}
                </small>
              </div>
              <span
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  transform: expandedId === update.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  fontSize: '1.2rem',
                  marginLeft: '0.5rem',
                  color: isMinimalDark ? '#bdc3c7' : 'inherit'
                }}
                onClick={() => setExpandedId(expandedId === update.id ? null : update.id)}
                aria-label={expandedId === update.id ? 'Hide Details' : 'Show Details'}
              >
                <FaChevronDown />
              </span>
            </div>
            {/* Show tags always, folded or expanded */}
            {update.tags && update.tags.length > 0 && (
              <div style={{ 
                margin: '0.5rem 0 0 0', 
                fontSize: '0.92rem', 
                color: isMinimalDark ? '#bdc3c7' : '#444', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '6px' 
              }}>
                {update.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className={isMinimalDark ? 'tag' : ''}
                    style={{ 
                      background: isMinimalDark ? 
                        'rgba(52, 115, 219, 0.2)' : 
                        getTagColor(tag), 
                      color: isMinimalDark ? '#3498db' : '#333', 
                      border: isMinimalDark ? '1px solid rgba(52, 115, 219, 0.3)' : 'none',
                      borderRadius: '12px', 
                      padding: '2px 8px', 
                      fontSize: '0.92rem' 
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {/* Only show description and links when expanded */}
            {expandedId === update.id && (
              <div className="update-details" style={{ 
                marginTop: '0.5rem', 
                fontSize: '0.92rem', 
                color: isMinimalDark ? '#bdc3c7' : '#444', 
                maxHeight: '400px', 
                overflowY: 'auto', 
                transition: 'max-height 0.3s' 
              }}>
                <hr style={{ 
                  border: 'none', 
                  borderTop: isMinimalDark ? 
                    '1px solid rgba(255, 255, 255, 0.1)' : 
                    '1px solid #e3e8ee', 
                  margin: '0.7rem 0 0.7rem 0' 
                }} />
                <p style={{ 
                  margin: '0.5rem 0 0 0', 
                  fontSize: '1.05rem', 
                  color: isMinimalDark ? '#ecf0f1' : '#333', 
                  lineHeight: '1.6', 
                  whiteSpace: 'pre-line' 
                }}>
                  {update.description}
                </p>
                <hr style={{ 
                  border: 'none', 
                  borderTop: isMinimalDark ? 
                    '1px solid rgba(255, 255, 255, 0.1)' : 
                    '1px solid #e3e8ee', 
                  margin: '0.7rem 0 0.7rem 0' 
                }} />
                {update.links && update.links.length > 0 && (
                  <div style={{ color: isMinimalDark ? '#bdc3c7' : 'inherit' }}>
                    <strong>Links:</strong> {update.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ 
                          marginRight: '0.5rem',
                          color: isMinimalDark ? '#3498db' : 'inherit'
                        }}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                )}
                {update.media && update.media.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <strong style={{ color: isMinimalDark ? '#bdc3c7' : 'inherit' }}>
                      Screenshots:
                    </strong>
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
