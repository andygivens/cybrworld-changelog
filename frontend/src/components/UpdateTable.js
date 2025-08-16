import React from 'react';
import UpdateRow from './UpdateRow';

function UpdateTable({ updates, manageMode, selectedUpdates, onSelectUpdate, onSelectAll, onEdit, onDelete }) {
  return (
    <div className="author-table-container">
  <table className="author-table" style={{ width: '100%', background: '#f8fafd', borderCollapse: 'collapse', borderRadius: '10px', overflow: 'hidden', boxShadow: 'none' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e3e8ee', background: '#f8fafd' }}>
            {manageMode && <th style={{ textAlign: 'center', background: '#f8fafd' }}><input type="checkbox" checked={selectedUpdates.length === updates.length} onChange={onSelectAll} style={{ accentColor: '#0077C8' }} /></th>}
            <th style={{ background: '#f8fafd', fontWeight: 500 }}>Title</th>
            <th style={{ background: '#f8fafd', fontWeight: 500 }}>Description</th>
            <th style={{ background: '#f8fafd', fontWeight: 500 }}>Date</th>
            <th style={{ background: '#f8fafd', fontWeight: 500 }}>Tags</th>
            <th style={{ background: '#f8fafd', fontWeight: 500 }}>Links</th>
            <th style={{ textAlign: 'center', background: '#f8fafd', fontWeight: 500 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {updates.length === 0 && (
            <tr><td colSpan={manageMode ? 7 : 6} style={{ textAlign: 'center', padding: '1rem', background: '#f8fafd' }}>No updates found.</td></tr>
          )}
          {updates.map(update => (
            <UpdateRow
              key={update.id}
              update={update}
              manageMode={manageMode}
              selected={selectedUpdates.includes(update.id)}
              onSelect={() => onSelectUpdate(update.id)}
              onEdit={() => onEdit(update)}
              onDelete={() => onDelete(update.id)}
              rowStyle={{ borderBottom: '1px solid #e3e8ee', background: '#f8fafd' }}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdateTable;
