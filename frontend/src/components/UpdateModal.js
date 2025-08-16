import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function UpdateModal({
  show,
  editId,
  form,
  imagePreview,
  tagInput,
  tagSuggestions,
  tagInputRef,
  handleChange,
  handleTagKeyDown,
  handleTagSuggestionClick,
  handleTagRemove,
  handleSubmit,
  setShowModal,
  setEditId,
  setForm,
  setTagInput,
  setTagSuggestions
}) {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'minimal-dark';

  if (!show) return null;
  
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ 
        background: isDarkTheme ? 'var(--bg-secondary)' : '#fff', 
        padding: '2rem', 
        borderRadius: '8px', 
        minWidth: '320px', 
        boxShadow: isDarkTheme ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,51,160,0.10)',
        border: isDarkTheme ? '1px solid var(--border-color)' : 'none'
      }}>
        <h3 style={{ 
          marginTop: 0, 
          color: isDarkTheme ? 'var(--text-primary)' : 'inherit' 
        }}>{editId ? 'Edit Update' : 'Create Update'}</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required style={{ 
            marginBottom: '0.75rem', 
            fontSize: '1rem',
            background: isDarkTheme ? 'var(--bg-primary)' : '#fff',
            color: isDarkTheme ? 'var(--text-primary)' : 'inherit',
            border: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee',
            borderRadius: '4px',
            padding: '8px 12px',
            width: '100%',
            boxSizing: 'border-box'
          }} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={{ 
            marginBottom: '0.75rem', 
            fontSize: '1rem',
            background: isDarkTheme ? 'var(--bg-primary)' : '#fff',
            color: isDarkTheme ? 'var(--text-primary)' : 'inherit',
            border: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee',
            borderRadius: '4px',
            padding: '8px 12px',
            width: '100%',
            boxSizing: 'border-box',
            minHeight: '80px',
            resize: 'vertical'
          }} />
          <div style={{ marginBottom: '0.75rem', position: 'relative' }}>
            <div style={{ 
              background: isDarkTheme ? 'var(--bg-primary)' : '#f5f7fa', 
              border: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee', 
              borderRadius: '8px', 
              padding: '10px', 
              marginBottom: '0', 
              minHeight: '44px' 
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                {form.tags.map((tag, idx) => (
                  <span key={tag} style={{ 
                    background: isDarkTheme ? 'var(--bg-tertiary)' : '#e3e8ee', 
                    color: isDarkTheme ? 'var(--text-primary)' : '#333', 
                    borderRadius: '12px', 
                    padding: '0px 8px', 
                    fontSize: '0.92rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px' 
                  }}>
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
                  style={{ 
                    border: 'none', 
                    outline: 'none', 
                    minWidth: '80px', 
                    fontSize: '0.95rem', 
                    background: 'transparent',
                    color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
                  }}
                  autoComplete="off"
                />
              </div>
              {tagSuggestions.length > 0 && (
                <div style={{ 
                  background: isDarkTheme ? 'var(--bg-secondary)' : '#fff', 
                  border: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee', 
                  borderRadius: '8px', 
                  boxShadow: isDarkTheme ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,51,160,0.08)', 
                  position: 'absolute', 
                  zIndex: 1002, 
                  marginTop: '2px', 
                  padding: '4px 0', 
                  minWidth: '120px' 
                }}>
                  {tagSuggestions.map(tag => (
                    <div key={tag} style={{ 
                      padding: '4px 12px', 
                      cursor: 'pointer', 
                      color: isDarkTheme ? 'var(--accent-color)' : '#0077C8'
                    }} onMouseDown={() => handleTagSuggestionClick(tag)}>{tag}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <input name="links" placeholder="Links (comma separated)" value={form.links} onChange={handleChange} style={{ 
            marginBottom: '0.75rem',
            background: isDarkTheme ? 'var(--bg-primary)' : '#fff',
            color: isDarkTheme ? 'var(--text-primary)' : 'inherit',
            border: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee',
            borderRadius: '4px',
            padding: '8px 12px',
            width: '100%',
            boxSizing: 'border-box'
          }} />
          <input name="media" type="file" accept="image/*" onChange={handleChange} style={{ 
            marginBottom: '0.75rem',
            color: isDarkTheme ? 'var(--text-primary)' : 'inherit'
          }} />
          {imagePreview && (
            <div style={{ marginBottom: '0.75rem' }}>
              <img src={imagePreview} alt="Preview" style={{ 
                width: '80px', 
                height: '80px', 
                objectFit: 'cover', 
                borderRadius: '8px', 
                border: isDarkTheme ? '1px solid var(--border-color)' : '1px solid #e3e8ee' 
              }} />
            </div>
          )}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="submit" style={{ 
              background: isDarkTheme ? 'var(--accent-color)' : '#0077C8', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              padding: '0.5rem 1rem', 
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              {editId ? 'Save Changes' : 'Create Update'}
            </button>
            <button type="button" style={{ 
              background: isDarkTheme ? 'var(--bg-tertiary)' : '#e3e8ee', 
              color: isDarkTheme ? 'var(--text-primary)' : '#333', 
              border: 'none', 
              borderRadius: '4px', 
              padding: '0.5rem 1rem',
              cursor: 'pointer'
            }} onClick={() => { setShowModal(false); setEditId(null); setForm({ title: '', description: '', tags: [], links: '', media: null }); setTagInput(''); setTagSuggestions([]); }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateModal;
