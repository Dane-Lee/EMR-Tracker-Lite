import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';

const BLANK = { firstName: '', lastName: '', location: 'Navarre', department: '', employeeType: '', shift: '' };

export default function EmployeeManager({ employees, onSave, onClose }) {
  const [form, setForm] = useState(BLANK);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [uploadPreview, setUploadPreview] = useState(null);
  const fileRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleEdit = (emp) => {
    setEditId(emp.id);
    setForm({ firstName: emp.firstName, lastName: emp.lastName, location: emp.location, department: emp.department, employeeType: emp.employeeType, shift: emp.shift });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) return;
    if (editId) {
      onSave(employees.map(e => e.id === editId ? { ...e, ...form } : e));
    } else {
      onSave([...employees, { ...form, id: Date.now().toString() }]);
    }
    setForm(BLANK);
    setEditId(null);
  };

  const handleDelete = (id) => {
    if (confirm('Delete this employee?')) onSave(employees.filter(e => e.id !== id));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target.result, { type: 'array' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      if (rows.length === 0) return;

      const headers = Object.keys(rows[0]);
      const colMap = guessColumns(headers);

      const parsed = rows
        .map(row => ({
          id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
          firstName: normalize(row, colMap.firstName),
          lastName: normalize(row, colMap.lastName),
          location: normalize(row, colMap.location) || 'Navarre',
          department: normalize(row, colMap.department),
          employeeType: normalize(row, colMap.employeeType),
          shift: normalize(row, colMap.shift),
        }))
        .filter(r => r.firstName && r.lastName);

      setUploadPreview({ rows: parsed, fileName: file.name });
    };
    reader.readAsArrayBuffer(file);
    e.target.value = '';
  };

  const confirmUpload = () => {
    if (!uploadPreview) return;
    const existingNames = new Set(employees.map(e => `${e.firstName.toLowerCase()}|${e.lastName.toLowerCase()}`));
    const newOnes = uploadPreview.rows.filter(r =>
      !existingNames.has(`${r.firstName.toLowerCase()}|${r.lastName.toLowerCase()}`)
    );
    onSave([...employees, ...newOnes]);
    setUploadPreview(null);
  };

  const filtered = employees.filter(e =>
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Manage Employees</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="upload-section">
          <h3>Import from Spreadsheet</h3>
          <div className="upload-area" onClick={() => fileRef.current?.click()}>
            <strong>Click to upload CSV or Excel file</strong>
            <p>Columns will be auto-detected (First Name, Last Name, Location, Department, etc.)</p>
            <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
          </div>
          {uploadPreview && (
            <div className="upload-preview">
              <p><span className="upload-count">{uploadPreview.rows.length}</span> employees found in <strong>{uploadPreview.fileName}</strong></p>
              <p style={{ marginTop: 4 }}>
                Preview: {uploadPreview.rows.slice(0, 3).map(r => `${r.lastName}, ${r.firstName}`).join(' · ')}
                {uploadPreview.rows.length > 3 && ` ... and ${uploadPreview.rows.length - 3} more`}
              </p>
              <div className="upload-actions">
                <button className="btn-primary btn-sm" onClick={confirmUpload}>Import All</button>
                <button className="btn-ghost btn-sm" onClick={() => setUploadPreview(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <h3>{editId ? 'Edit Employee' : 'Add Employee'}</h3>
          <div className="form-row">
            <div className="field">
              <label>First Name *</label>
              <input value={form.firstName} onChange={e => set('firstName', e.target.value)} required />
            </div>
            <div className="field">
              <label>Last Name *</label>
              <input value={form.lastName} onChange={e => set('lastName', e.target.value)} required />
            </div>
            <div className="field">
              <label>Location</label>
              <input value={form.location} onChange={e => set('location', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Department</label>
              <input value={form.department} onChange={e => set('department', e.target.value)} />
            </div>
            <div className="field">
              <label>Employee Type</label>
              <select value={form.employeeType} onChange={e => set('employeeType', e.target.value)}>
                <option value="">-</option>
                {['Full Time', 'Salary'].map(o => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label>Shift</label>
              <select value={form.shift} onChange={e => set('shift', e.target.value)}>
                <option value="">-</option>
                <option>1st</option>
                <option>2nd</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">{editId ? 'Update' : 'Add Employee'}</button>
            {editId && <button type="button" className="btn-ghost" onClick={() => { setEditId(null); setForm(BLANK); }}>Cancel</button>}
          </div>
        </form>

        <div className="employee-list-section">
          <input
            className="search-input"
            placeholder="Search employees..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="employee-table">
            {filtered.length === 0 && <p className="empty">No employees yet.</p>}
            {filtered.map(emp => (
              <div key={emp.id} className="employee-row">
                <span className="emp-name">{emp.lastName}, {emp.firstName}</span>
                <span className="emp-meta">{emp.location}{emp.department ? ` · ${emp.department}` : ''}{emp.shift ? ` · ${emp.shift} shift` : ''}</span>
                <div className="emp-actions">
                  <button onClick={() => handleEdit(emp)}>Edit</button>
                  <button onClick={() => handleDelete(emp.id)} className="danger">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function normalize(row, key) {
  if (!key) return '';
  const val = row[key];
  return val != null ? String(val).trim() : '';
}

function guessColumns(headers) {
  const lower = headers.map(h => ({ original: h, lower: h.toLowerCase().replace(/[^a-z]/g, '') }));

  const find = (...patterns) => {
    for (const p of patterns) {
      const match = lower.find(h => h.lower.includes(p));
      if (match) return match.original;
    }
    return null;
  };

  return {
    firstName: find('firstname', 'first'),
    lastName: find('lastname', 'last', 'surname'),
    location: find('location', 'site', 'facility', 'city'),
    department: find('department', 'dept'),
    employeeType: find('employeetype', 'emptype', 'type', 'status', 'category'),
    shift: find('shift'),
  };
}
