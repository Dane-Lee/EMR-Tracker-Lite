import { useState, useRef, useEffect } from 'react';

export default function EmployeeAutocomplete({ employees, value, onChange }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const ref = useRef(null);

  const selected = employees.find(e => e.id === value);

  useEffect(() => {
    if (selected) setQuery(`${selected.lastName}, ${selected.firstName}`);
  }, [value]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const sorted = [...employees].sort((a, b) => a.lastName.localeCompare(b.lastName));

  const filtered = sorted.filter(e => {
    const q = query.toLowerCase();
    return `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
           `${e.lastName}, ${e.firstName}`.toLowerCase().includes(q);
  });

  const handleSelect = (emp) => {
    onChange(emp.id);
    setQuery(`${emp.lastName}, ${emp.firstName}`);
    setOpen(false);
    setActiveIdx(-1);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setOpen(true);
    setActiveIdx(-1);
    if (e.target.value === '') onChange('');
  };

  const handleKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown') { setOpen(true); e.preventDefault(); }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(filtered[activeIdx]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div className="autocomplete" ref={ref}>
      <input
        value={query}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Type employee name..."
        autoComplete="off"
      />
      {open && (
        <div className="autocomplete-dropdown">
          {filtered.length === 0 && (
            <div className="autocomplete-empty">No employees match</div>
          )}
          {filtered.map((emp, i) => (
            <div
              key={emp.id}
              className={`autocomplete-item${i === activeIdx ? ' active' : ''}`}
              onMouseDown={() => handleSelect(emp)}
              onMouseEnter={() => setActiveIdx(i)}
            >
              {emp.lastName}, {emp.firstName}
              {emp.location && <span className="ac-meta">{emp.location}</span>}
              {emp.department && <span className="ac-meta">{emp.department}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
