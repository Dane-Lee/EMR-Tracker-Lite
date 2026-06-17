import { useState, useRef } from 'react';
import { COACHING_TYPES, WHAT_PROMPTED_OPTIONS, getTypesByCategory } from '../data/coachingTypes';
import EmployeeAutocomplete from './EmployeeAutocomplete';
import TemplatePicker from './TemplatePicker';

const today = () => new Date().toISOString().split('T')[0];

const BLANK_FORM = {
  date: today(),
  coachingType: '',
  checkboxes: [],
  description: '',
  whatPrompted: '',
};

export default function CoachingForm({ employees, onSave, editRecord, onCancel }) {
  const [employeeId, setEmployeeId] = useState(editRecord?.employeeId || '');
  const [form, setForm] = useState(editRecord ? {
    date: editRecord.date,
    coachingType: editRecord.coachingType,
    checkboxes: editRecord.checkboxes || [],
    description: editRecord.description || '',
    whatPrompted: editRecord.whatPrompted || '',
  } : BLANK_FORM);
  const [showTemplates, setShowTemplates] = useState(false);
  const descRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleTypeChange = (val) => {
    setForm(f => ({ ...f, coachingType: val, checkboxes: [], whatPrompted: '' }));
    setShowTemplates(false);
  };

  const toggleCheckbox = (label) => {
    setForm(f => ({
      ...f,
      checkboxes: f.checkboxes.includes(label)
        ? f.checkboxes.filter(c => c !== label)
        : [...f.checkboxes, label],
    }));
  };

  const handleTemplateSelect = (text) => {
    const current = form.description.trim();
    const newDesc = current ? `${current}\n\n${text}` : text;
    set('description', newDesc);
    setShowTemplates(false);

    setTimeout(() => {
      if (descRef.current) {
        descRef.current.focus();
        const blankMatch = newDesc.match(/_{3,}/);
        if (blankMatch) {
          const start = newDesc.indexOf(blankMatch[0]);
          descRef.current.setSelectionRange(start, start + blankMatch[0].length);
        } else {
          descRef.current.setSelectionRange(newDesc.length, newDesc.length);
        }
      }
    }, 50);
  };

  const selectedType = COACHING_TYPES.find(t => t.id === form.coachingType);
  const employee = employees.find(e => e.id === employeeId);
  const categories = getTypesByCategory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeId || !form.coachingType) return;
    if (selectedType?.hasWhatPrompted && !form.whatPrompted) return;

    onSave({
      id: editRecord?.id || Date.now().toString(),
      employeeId,
      employeeName: employee ? `${employee.lastName}, ${employee.firstName}` : '',
      ...form,
      createdAt: editRecord?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <form className="coaching-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{editRecord ? 'Edit Coaching Encounter' : 'New Coaching Encounter'}</h2>
      </div>

      <section className="form-section">
        <h3>Encounter Details</h3>
        <div className="form-row">
          <div className="field">
            <label>Employee *</label>
            <EmployeeAutocomplete
              employees={employees}
              value={employeeId}
              onChange={setEmployeeId}
            />
          </div>
          <div className="field field-sm">
            <label>Date *</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
          </div>
        </div>
        {employee && (
          <div className="employee-details-bar">
            {employee.department && <span>{employee.department}</span>}
            {employee.employeeType && <span>{employee.employeeType}</span>}
            {employee.shift && <span>{employee.shift} shift</span>}
          </div>
        )}
      </section>

      <section className="form-section">
        <h3>Coaching Details</h3>

        <div className="field">
          <label>Coaching Type *</label>
          <select value={form.coachingType} onChange={e => handleTypeChange(e.target.value)} required>
            <option value="">Select type...</option>
            {categories.map(cat => (
              <optgroup key={cat.id} label={cat.label}>
                {cat.types.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {selectedType && selectedType.checkboxes.length > 0 && (
          <div className="checkbox-group">
            {selectedType.checkboxes.map(label => (
              <label key={label} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={form.checkboxes.includes(label)}
                  onChange={() => toggleCheckbox(label)}
                />
                {label}
              </label>
            ))}
          </div>
        )}

        <div className="field">
          <div className="description-header">
            <label>Description of Coaching</label>
            {form.coachingType && (
              <button
                type="button"
                className="btn-template-toggle"
                onClick={() => setShowTemplates(!showTemplates)}
              >
                {showTemplates ? 'Hide Templates' : 'Use Template'}
              </button>
            )}
          </div>
          {showTemplates && (
            <TemplatePicker
              coachingTypeId={form.coachingType}
              onSelect={handleTemplateSelect}
              onClose={() => setShowTemplates(false)}
            />
          )}
          <textarea
            ref={descRef}
            value={form.description}
            onChange={e => set('description', e.target.value)}
            rows={4}
            placeholder="Type a description or use a template above..."
          />
        </div>

        {selectedType?.hasWhatPrompted && (
          <div className="field">
            <label>What Prompted Coaching *</label>
            <select value={form.whatPrompted} onChange={e => set('whatPrompted', e.target.value)} required>
              <option value="">Select...</option>
              {WHAT_PROMPTED_OPTIONS.map(o => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        )}
      </section>

      <div className="form-actions">
        <button type="submit" className="btn-primary">Save Encounter</button>
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
