export const COACHING_CATEGORIES = [
  { id: 'high', label: 'High Impact', cssClass: 'cat-high' },
  { id: 'targeted', label: 'Targeted', cssClass: 'cat-targeted' },
  { id: 'general', label: 'General', cssClass: 'cat-general' },
];

export const COACHING_TYPES = [
  // ── Targeted ──
  {
    id: 'jobspecific',
    label: 'Job-Specific Coaching',
    category: 'targeted',
    checkboxes: [
      'Body Mechanics', 'Material handling', 'Other job coaching',
      'Postural/Position Coaching', 'Proper lifting', 'Proper loading/unloading',
      'Proper push/pull', 'Rest break', 'Rest (task design)', 'Tool/equipment handling',
    ],
    hasWhatPrompted: true,
  },
  {
    id: 'jspms',
    label: 'Job-Specific Preventative Mobility/Stretching',
    category: 'targeted',
    checkboxes: [],
    hasWhatPrompted: true,
  },
  {
    id: 'safety',
    label: 'Safety Coaching',
    category: 'targeted',
    checkboxes: [
      '3-point contact', 'Awareness/alertness', 'Other', 'PPE Use',
      'Safety Hazard', 'Slip/trip/fall Prevention', 'Unsafe Behavior',
    ],
    hasWhatPrompted: true,
  },
  {
    id: 'wellness',
    label: 'Health/Wellness Coaching',
    category: 'targeted',
    checkboxes: ['Hydration', 'Nutrition', 'Other', 'Personal exercise/fitness', 'Sleep', 'Stress'],
    hasWhatPrompted: true,
  },
  // ── General ──
  {
    id: 'nearmiss',
    label: 'Near Miss Education',
    category: 'general',
    checkboxes: [],
    hasWhatPrompted: true,
  },
  {
    id: 'relationship',
    label: 'Relationship Development Encounter',
    category: 'general',
    checkboxes: ['Current Employee', 'New Hire'],
    hasWhatPrompted: true,
  },
  {
    id: 'groupclass',
    label: 'Group Class',
    category: 'general',
    checkboxes: [
      'New Hire Orientation', 'Other', 'Safety Meeting', 'Pre-shift Meeting',
      'Group Preventative Mobility', 'Annual Testing',
      'Department Weekly/Monthly Safety Meetings', 'First Aid Team Meeting',
      'Management Meetings', 'Safety Fair',
    ],
    hasWhatPrompted: true,
  },
  {
    id: 'friendfamily',
    label: 'Friend/Family Consultation',
    category: 'general',
    checkboxes: [],
    hasWhatPrompted: true,
  },
  {
    id: 'medicaled',
    label: 'General Medical Education',
    category: 'general',
    checkboxes: [
      'Blood Pressure/Pulse Check', 'Cold modality instruction',
      'Extreme heat/cold education', 'OTC medications', 'Other',
      'Psychosocial', 'Self-care', 'Thermal modality instruction', 'Wound care instruction',
    ],
    hasWhatPrompted: true,
  },
];

export const WHAT_PROMPTED_OPTIONS = [
  'Employee Inquiry',
  'Demonstrated risk factor at job site',
  'Employer prompted contact',
  'Specialist Initiated',
];

export function getTypesByCategory() {
  return COACHING_CATEGORIES.map(cat => ({
    ...cat,
    types: COACHING_TYPES.filter(t => t.category === cat.id),
  })).filter(cat => cat.types.length > 0);
}

export function getCategoryForType(typeId) {
  const type = COACHING_TYPES.find(t => t.id === typeId);
  if (!type) return null;
  return COACHING_CATEGORIES.find(c => c.id === type.category);
}
