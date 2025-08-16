import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaCode, FaHeart, FaComment, FaShare } from 'react-icons/fa';
import { ReactComponent as LobsterIcon } from '../assets/lobster.svg';

const designPreviews = {
  glassmorphism: {
    name: 'Glassmorphism',
    colors: {
      primary: 'rgba(255, 255, 255, 0.25)',
      secondary: 'rgba(255, 255, 255, 0.1)',
      accent: '#667eea',
      text: '#fff'
    },
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    cardStyle: {
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    }
  },
  neubrutalism: {
    name: 'Neubrutalism',
    colors: {
      primary: '#ff6b6b',
      secondary: '#feca57',
      accent: '#1dd1a1',
      text: '#2c2c54'
    },
    background: 'linear-gradient(135deg, #ff9ff3 0%, #f368e0 100%)',
    cardStyle: {
      background: '#fff',
      border: '4px solid #2c2c54',
      borderRadius: '0',
      boxShadow: '8px 8px 0px #2c2c54',
      transform: 'rotate(-1deg)'
    }
  },
  'minimal-dark': {
    name: 'Minimal Dark',
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent: '#3498db',
      text: '#ecf0f1'
    },
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    cardStyle: {
      background: 'rgba(52, 73, 94, 0.8)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
    }
  },
  cyberpunk: {
    name: 'Cyberpunk',
    colors: {
      primary: '#0f3460',
      secondary: '#e94560',
      accent: '#0f3460',
      text: '#00ff41'
    },
    background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
    cardStyle: {
      background: 'rgba(15, 52, 96, 0.9)',
      border: '2px solid #e94560',
      borderRadius: '8px',
      boxShadow: '0 0 20px rgba(233, 69, 96, 0.5), inset 0 0 20px rgba(0, 255, 65, 0.1)'
    }
  }
};

function DesignPreview() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const [lobsterMode, setLobsterMode] = useState(false);
  
  const design = designPreviews[designId];
  
  if (!design) {
    return <div>Design not found</div>;
  }

  const sampleUpdates = [
    {
      id: 1,
      title: 'New Authentication System',
      description: 'Implemented OAuth 2.0 with CyberArk integration for enhanced security.',
      date: '2025-01-15',
      tags: ['Security', 'Auth', 'Backend'],
      author: 'Jane Doe'
    },
    {
      id: 2,
      title: 'Modern UI Redesign',
      description: 'Complete overhaul of the user interface with modern design principles.',
      date: '2025-01-14',
      tags: ['UI/UX', 'Frontend', 'Design'],
      author: 'John Smith'
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: lobsterMode ? 
        `${design.background}, url('./assets/lobster.svg')` : 
        design.background,
      backgroundSize: lobsterMode ? '32px 32px, cover' : 'cover',
      padding: '0',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        ...design.cardStyle,
        margin: '1rem',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate('/design-options')}
            style={{
              background: 'none',
              border: 'none',
              color: design.colors.text,
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <FaArrowLeft /> Back
          </button>
          <h1 style={{ 
            color: design.colors.text, 
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 700
          }}>
            {design.name} Preview
          </h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: design.colors.text, opacity: 0.8 }}>
            CYBRWorld ChangeLog
          </span>
          <button
            onClick={() => setLobsterMode(!lobsterMode)}
            style={{
              background: 'none',
              border: `2px solid ${design.colors.accent}`,
              borderRadius: '50%',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <LobsterIcon style={{ 
              width: 24, 
              height: 24, 
              color: lobsterMode ? design.colors.accent : design.colors.text 
            }} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div style={{
        ...design.cardStyle,
        margin: '1rem',
        padding: '0.5rem 1rem',
        display: 'flex',
        gap: '0.5rem'
      }}>
        {['Updates', 'Author', 'Reports', 'Admin'].map((item, index) => (
          <button
            key={item}
            style={{
              background: index === 0 ? design.colors.accent : 'transparent',
              color: design.colors.text,
              border: `1px solid ${design.colors.accent}`,
              borderRadius: designId === 'neubrutalism' ? '0' : '8px',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              fontWeight: 500,
              boxShadow: designId === 'neubrutalism' && index === 0 ? 
                `3px 3px 0px ${design.colors.primary}` : 'none'
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ padding: '1rem' }}>
        <h2 style={{ 
          color: design.colors.text, 
          marginBottom: '2rem',
          fontSize: '2rem',
          fontWeight: 600
        }}>
          Recent Updates
        </h2>

        {sampleUpdates.map((update) => (
          <div
            key={update.id}
            style={{
              ...design.cardStyle,
              padding: '2rem',
              marginBottom: '2rem',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <h3 style={{ 
                  color: design.colors.text, 
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  margin: '0 0 0.5rem 0'
                }}>
                  {update.title}
                </h3>
                <p style={{ 
                  color: design.colors.text, 
                  opacity: 0.8,
                  fontSize: '0.9rem',
                  margin: 0
                }}>
                  {update.date} • by {update.author}
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{
                  background: 'none',
                  border: `1px solid ${design.colors.accent}`,
                  color: design.colors.accent,
                  borderRadius: designId === 'neubrutalism' ? '0' : '20px',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}>
                  <FaHeart />
                </button>
                <button style={{
                  background: 'none',
                  border: `1px solid ${design.colors.accent}`,
                  color: design.colors.accent,
                  borderRadius: designId === 'neubrutalism' ? '0' : '20px',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}>
                  <FaComment />
                </button>
                <button style={{
                  background: 'none',
                  border: `1px solid ${design.colors.accent}`,
                  color: design.colors.accent,
                  borderRadius: designId === 'neubrutalism' ? '0' : '20px',
                  padding: '0.3rem 0.6rem',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}>
                  <FaShare />
                </button>
              </div>
            </div>

            <p style={{ 
              color: design.colors.text, 
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              {update.description}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {update.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    background: designId === 'cyberpunk' ? 
                      'rgba(233, 69, 96, 0.2)' : 
                      design.colors.accent,
                    color: designId === 'cyberpunk' ? 
                      design.colors.secondary : 
                      '#fff',
                    padding: '0.3rem 0.8rem',
                    borderRadius: designId === 'neubrutalism' ? '0' : '12px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    border: designId === 'cyberpunk' ? 
                      `1px solid ${design.colors.secondary}` : 'none',
                    boxShadow: designId === 'cyberpunk' ? 
                      `0 0 10px rgba(233, 69, 96, 0.3)` : 'none'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer with lobster mode indicator */}
      {lobsterMode && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          ...design.cardStyle,
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <LobsterIcon style={{ width: 20, height: 20, color: design.colors.accent }} />
          <span style={{ color: design.colors.text, fontSize: '0.9rem' }}>
            Lobster Mode Active! 🦞
          </span>
        </div>
      )}
    </div>
  );
}

export default DesignPreview;
