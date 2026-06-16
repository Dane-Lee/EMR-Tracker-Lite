import { useState, useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import CoachingForm from './components/CoachingForm';
import RecordsList from './components/RecordsList';
import EmployeeManager from './components/EmployeeManager';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useLocalStorage('ati-employees', []);
  const [records, setRecords] = useLocalStorage('ati-records', []);
  const [view, setView] = useState('records');
  const [editRecord, setEditRecord] = useState(null);
  const [showEmployeeManager, setShowEmployeeManager] = useState(false);
  const [theme, setTheme] = useLocalStorage('ati-theme', 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const handleSaveRecord = (record) => {
    if (editRecord) {
      setRecords(records.map(r => r.id === record.id ? record : r));
    } else {
      setRecords([record, ...records]);
    }
    setEditRecord(null);
    setView('records');
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setView('edit');
  };

  const handleDelete = (id) => {
    if (confirm('Delete this encounter record?')) {
      setRecords(records.filter(r => r.id !== id));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-brand">
          <img src="/ati-logo.png" alt="ATI Worksite Solutions" />
        </div>
        <nav className="header-nav">
          <button
            className={view === 'records' && !editRecord ? 'nav-active' : ''}
            onClick={() => { setView('records'); setEditRecord(null); }}
          >
            Records
          </button>
          <button
            className={view === 'new' ? 'nav-active' : ''}
            onClick={() => { setView('new'); setEditRecord(null); }}
          >
            + New Encounter
          </button>
          <button onClick={() => setShowEmployeeManager(true)}>
            Employees ({employees.length})
          </button>
          <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </nav>
      </header>

      <main className="app-main">
        {(view === 'new' || view === 'edit') && (
          <CoachingForm
            employees={employees}
            onSave={handleSaveRecord}
            editRecord={view === 'edit' ? editRecord : null}
            onCancel={() => { setView('records'); setEditRecord(null); }}
          />
        )}

        {view === 'records' && (
          <div>
            <div className="page-header">
              <h1>Coaching Encounters</h1>
              <span className="record-count">{records.length} record{records.length !== 1 ? 's' : ''}</span>
            </div>
            {employees.length === 0 && (
              <div className="onboarding-hint">
                Start by adding employees — click <strong>Employees (0)</strong> in the top bar.
              </div>
            )}
            <RecordsList
              records={records}
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>

      {showEmployeeManager && (
        <EmployeeManager
          employees={employees}
          onSave={setEmployees}
          onClose={() => setShowEmployeeManager(false)}
        />
      )}
    </div>
  );
}
