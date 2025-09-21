import React from 'react';

export default function Pagination({ page, limit, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center', gap: 8 }}>
      <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>Prev</button>
      <div style={{ alignSelf: 'center' }}>Page {page} / {totalPages} ({total} items)</div>
      <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Next</button>
    </div>
  );
}