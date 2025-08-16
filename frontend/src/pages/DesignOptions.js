import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaPalette, FaEye, FaCode, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const designOptions = [
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Modern frosted glass effect with transparency and blur',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    features: ['Frosted glass cards', 'Backdrop blur effects', 'Subtle shadows', 'Modern gradients']
  },
  {
    id: 'neubrutalism',
    name: 'Neubrutalism',
    description: 'Bold, chunky design with high contrast and strong shadows',
    color: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    features: ['Bold chunky elements', 'High contrast colors', 'Strong shadows', 'Retro vibes']
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    description: 'Clean dark theme with subtle accents and modern typography',
    color: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    features: ['Dark color palette', 'Subtle animations', 'Clean typography', 'Minimal elements']
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Futuristic neon-inspired design with glowing effects',
    color: 'linear-gradient(135deg, #0f3460 0%, #e94560 100%)',
    features: ['Neon color schemes', 'Glowing effects', 'Futuristic fonts', 'Grid patterns']
  }
];

function DesignOptions() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const { theme, setTheme } = useTheme();

  const applyMinimalDark = () => {
    setTheme('minimal-dark');
    navigate('/');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem', color: '#fff' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: 700, 
            margin: 0,
            textShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            Modern Design Options
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.9,
            marginTop: '1rem'
          }}>
            Choose a modern design direction for CYBRWorld ChangeLog
          </p>
        </header>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {designOptions.map((option) => (
            <div
              key={option.id}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hoveredCard === option.id ? 'translateY(-10px)' : 'translateY(0)',
                boxShadow: hoveredCard === option.id ? 
                  '0 20px 40px rgba(0,0,0,0.3)' : 
                  '0 8px 32px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => navigate(`/design-preview/${option.id}`)}
            >
              <div style={{
                width: '100%',
                height: '120px',
                background: option.color,
                borderRadius: '12px',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <FaPalette style={{ fontSize: '2.5rem', color: '#fff', opacity: 0.8 }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.1)',
                  opacity: hoveredCard === option.id ? 0 : 1,
                  transition: 'opacity 0.3s ease'
                }} />
              </div>
              
              <h3 style={{ 
                color: '#fff', 
                fontSize: '1.5rem', 
                fontWeight: 600,
                margin: '0 0 0.5rem 0'
              }}>
                {option.name}
              </h3>
              
              <p style={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                fontSize: '1rem',
                lineHeight: '1.5',
                margin: '0 0 1.5rem 0'
              }}>
                {option.description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                {option.features.map((feature, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ 
                      width: '6px', 
                      height: '6px', 
                      background: '#fff', 
                      borderRadius: '50%',
                      marginRight: '0.5rem',
                      opacity: 0.7
                    }} />
                    {feature}
                  </div>
                ))}
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 'auto'
              }}>
                <span style={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '0.9rem'
                }}>
                  Preview Design
                </span>
                <FaArrowRight style={{ 
                  color: '#fff',
                  transition: 'transform 0.3s ease',
                  transform: hoveredCard === option.id ? 'translateX(5px)' : 'translateX(0)'
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '1rem' }}>
            🌟 Apply Minimal Dark Theme Now!
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', marginBottom: '1.5rem' }}>
            Ready to transform your entire application? Click below to apply the Minimal Dark theme across all pages.
          </p>
          <button
            onClick={applyMinimalDark}
            style={{
              background: theme === 'minimal-dark' ? '#27ae60' : 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              margin: '0 auto',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
            }}
          >
            {theme === 'minimal-dark' ? <FaCheck /> : <FaPalette />}
            {theme === 'minimal-dark' ? 'Theme Applied!' : 'Apply Minimal Dark Theme'}
          </button>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '1rem' }}>
            🦞 Lobster Mode Preserved!
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem' }}>
            All design options will maintain the beloved Lobster Mode functionality with adapted styling.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DesignOptions;
