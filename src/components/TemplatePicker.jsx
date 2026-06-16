import { useState } from 'react';
import { getTemplatesForType, FOCUS_NEXT_ENCOUNTER, PROTECTIVE_RECOMMENDATIONS } from '../data/descriptionTemplates';

export default function TemplatePicker({ coachingTypeId, onSelect, onClose }) {
  const [tab, setTab] = useState('templates');
  const templates = getTemplatesForType(coachingTypeId);

  const grouped = {};
  for (const t of templates) {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  }

  return (
    <div className="template-picker">
      <div className="tp-header">
        <div className="tp-tabs">
          <button className={tab === 'templates' ? 'active' : ''} onClick={() => setTab('templates')}>
            Templates
          </button>
          <button className={tab === 'focus' ? 'active' : ''} onClick={() => setTab('focus')}>
            Focus / Next Encounter
          </button>
          <button className={tab === 'protective' ? 'active' : ''} onClick={() => setTab('protective')}>
            Protective Recs
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="tp-body">
        {tab === 'templates' && (
          <>
            {templates.length === 0 && (
              <p className="empty">No templates for this coaching type.</p>
            )}
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="tp-group">
                <h4 className="tp-group-label">{cat}</h4>
                {items.map(t => (
                  <button
                    key={t.id}
                    className="tp-item"
                    onClick={() => onSelect(t.text)}
                  >
                    <span className="tp-item-label">{t.label}</span>
                    <span className="tp-item-preview">{t.text.slice(0, 100)}{t.text.length > 100 ? '...' : ''}</span>
                    {t.blanks && <span className="tp-item-blanks">Has fill-in blanks</span>}
                  </button>
                ))}
              </div>
            ))}
          </>
        )}

        {tab === 'focus' && (
          <div className="tp-group">
            <h4 className="tp-group-label">Focus for Next Encounter</h4>
            {FOCUS_NEXT_ENCOUNTER.map((text, i) => (
              <button key={i} className="tp-item" onClick={() => onSelect(text)}>
                <span className="tp-item-preview">{text}</span>
              </button>
            ))}
          </div>
        )}

        {tab === 'protective' && (
          <div className="tp-group">
            <h4 className="tp-group-label">Protective Recommendations</h4>
            {PROTECTIVE_RECOMMENDATIONS.map((text, i) => (
              <button key={i} className="tp-item" onClick={() => onSelect(text)}>
                <span className="tp-item-preview">{text}</span>
                {text.includes('__') && <span className="tp-item-blanks">Has fill-in blanks</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
