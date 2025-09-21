import React from 'react';

export default function ContactList({ contacts, onDelete }) {
  if (!contacts || contacts.length === 0) return <div className="list">No contacts yet.</div>;
  return (
    <div className="list">
      {contacts.map((c) => (
        <div className="contact" key={c.id}>
          <div className="meta">
            <strong>{c.name}</strong>
            <small>{c.email || c.phone || '—'}</small>
          </div>
          <div className="actions">
            <button onClick={() => onDelete(c.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}