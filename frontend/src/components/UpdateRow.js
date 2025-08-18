import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { getTagColor } from '../utils';

function UpdateRow({ update, manageMode, selected, onSelect, onEdit, onDelete, rowStyle }) {
  return (
    <tr style={rowStyle}>
      {manageMode && (
        <td style={{ textAlign: 'center' }}>
          <input
            type="checkbox"
            checked={selected}
            onChange={onSelect}
            style={{ accentColor: '#0077C8' }}
          />
        </td>
      )}
      <td style={{ fontWeight: 500 }}>{update.title}</td>
      <td>{update.description && update.description.length > 120 ? update.description.slice(0, 120) + '…' : update.description}</td>
      <td style={{ color: '#888' }}>{new Date(update.date).toLocaleDateString()}</td>
      <td>
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
      <td>{update.links && update.links.map((link, i) => (
        link.text
      )).join(', ')}</td>
      <td style={{ textAlign: 'center' }}>
        <button className="icon-btn" style={{ color: '#888' }} onClick={onEdit} aria-label="Edit Update">
          <FaPen />
        </button>
        <button className="icon-btn" style={{ color: '#888' }} onClick={onDelete} aria-label="Delete Update">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}

export default UpdateRow;
