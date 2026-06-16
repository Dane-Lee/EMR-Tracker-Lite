import { useState } from 'react';
import { COACHING_TYPES, getCategoryForType, getTypesByCategory } from '../data/coachingTypes';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${m}/${d}/${y}`;
}

function downloadFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportCSV(records) {
  const headers = ['Date', 'Employee', 'Coaching Type', 'Category', 'Topics', 'Description', 'What Prompted'];
  const rows = records.map(r => {
    const type = COACHING_TYPES.find(t => t.id === r.coachingType);
    const cat = getCategoryForType(r.coachingType);
    return [
      formatDate(r.date),
      r.employeeName,
      type?.label || r.coachingType,
      cat?.label || '',
      (r.checkboxes || []).join('; '),
      (r.description || '').replace(/"/g, '""'),
      r.whatPrompted || '',
    ].map(v => `"${v}"`).join(',');
  });
  downloadFile([headers.join(','), ...rows].join('\n'), `ati-encounters-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');
}

function exportJSON(records) {
  const data = records.map(r => {
    const type = COACHING_TYPES.find(t => t.id === r.coachingType);
    const cat = getCategoryForType(r.coachingType);
    return {
      date: r.date,
      employee: r.employeeName,
      coachingType: type?.label || r.coachingType,
      category: cat?.label || '',
      topics: r.checkboxes || [],
      description: r.description || '',
      whatPrompted: r.whatPrompted || '',
    };
  });
  downloadFile(JSON.stringify(data, null, 2), `ati-encounters-${new Date().toISOString().split('T')[0]}.json`, 'application/json');
}

function RecordCard({ record, onEdit, onDelete, onCopy }) {
  const type = COACHING_TYPES.find(t => t.id === record.coachingType);
  const cat = getCategoryForType(record.coachingType);

  const summaryText = [
    `Date: ${formatDate(record.date)}`,
    `Employee: ${record.employeeName}`,
    `Type: ${type?.label || record.coachingType}`,
    record.checkboxes?.length ? `Topics: ${record.checkboxes.join(', ')}` : '',
    record.description ? `Notes: ${record.description}` : '',
    record.whatPrompted ? `Prompted by: ${record.whatPrompted}` : '',
  ].filter(Boolean).join('\n');

  const badgeClass = cat ? `cat-badge-${cat.id}` : '';

  return (
    <div className="record-card">
      <div className="record-card-header">
        <div>
          <span className="record-employee">{record.employeeName}</span>
          <span className="record-date">{formatDate(record.date)}</span>
        </div>
        <span className={`record-type-badge ${badgeClass}`}>{type?.label || record.coachingType}</span>
      </div>
      {record.checkboxes?.length > 0 && (
        <div className="record-tags">
          {record.checkboxes.map(c => <span key={c} className="tag">{c}</span>)}
        </div>
      )}
      {record.description && <p className="record-description">{record.description}</p>}
      {record.whatPrompted && <p className="record-prompted">Prompted by: {record.whatPrompted}</p>}
      <div className="record-actions">
        <button onClick={() => onCopy(summaryText)} className="btn-ghost btn-sm">Copy</button>
        <button onClick={() => onEdit(record)} className="btn-ghost btn-sm">Edit</button>
        <button onClick={() => onDelete(record.id)} className="btn-ghost btn-sm danger">Delete</button>
      </div>
    </div>
  );
}

export default function RecordsList({ records, employees, onEdit, onDelete }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const categories = getTypesByCategory();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const filtered = records
    .filter(r => {
      const matchSearch = search === '' ||
        r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
        r.description?.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === '' || r.coachingType === filterType;
      return matchSearch && matchType;
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="records-list">
      <div className="records-toolbar">
        <input
          className="search-input"
          placeholder="Search by employee or notes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">All types</option>
          {categories.map(cat => (
            <optgroup key={cat.id} label={cat.label}>
              {cat.types.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
            </optgroup>
          ))}
        </select>
        {records.length > 0 && (
          <div className="export-bar">
            <button className="btn-ghost btn-sm" onClick={() => exportCSV(filtered)}>Export CSV</button>
            <button className="btn-ghost btn-sm" onClick={() => exportJSON(filtered)}>Export JSON</button>
          </div>
        )}
      </div>

      {filtered.length === 0 && (
        <p className="empty">No records found.</p>
      )}

      {filtered.map(r => (
        <RecordCard
          key={r.id}
          record={r}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={handleCopy}
        />
      ))}
    </div>
  );
}
