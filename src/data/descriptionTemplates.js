export const DESCRIPTION_TEMPLATES = [
  // ── NHO Encounters ──
  {
    id: 'nho-jobcoach',
    category: 'NHO Encounters',
    label: 'NHO Job-Specific Coaching',
    coachingTypes: ['jobspecific', 'groupclass'],
    text: "EIS led PHD group training for NHO class. EIS's reviewed job-specific tasks and proper execution of the physical demands of assigned tasks.",
  },
  {
    id: 'nho-mobility',
    category: 'NHO Encounters',
    label: 'NHO Job-Specific Mobility/Stretching',
    coachingTypes: ['jspms', 'groupclass'],
    text: "EIS led PHD group training for NHO class. EE's were instructed on job-specific mobility and stretching related to common task positions/movements and the benefits of utilizing stretching before, during, and after their shift.",
  },
  {
    id: 'nho-safety',
    category: 'NHO Encounters',
    label: 'NHO Safety Coaching',
    coachingTypes: ['safety', 'groupclass'],
    text: "EIS led PHD group training for NHO class. EE's reviewed safety considerations and proper movement strategies to prevent injury and/or incident while performing task requirements.",
  },
  {
    id: 'nho-preshift',
    category: 'NHO Encounters',
    label: 'NHO Group Class (Pre-Shift Stretches)',
    coachingTypes: ['groupclass'],
    text: 'EIS led NHO group in their first pre-shift stretching session.',
  },

  // ── NHO HMA's ──
  {
    id: 'nho-hma-exercise',
    category: 'NHO HMA',
    label: 'NHO HMA Exercise Recommendations',
    coachingTypes: ['jobspecific', 'jspms'],
    text: 'EIS will provide corrective exercise plan after review exercise options for the EE.',
  },
  {
    id: 'nho-hma-jobcoach',
    category: 'NHO HMA',
    label: 'NHO HMA Job Coaching',
    coachingTypes: ['jobspecific'],
    text: "EIS performed HMA with EE while leading the PHD group training for NHO class. EIS's reviewed job-specific tasks and proper execution of the physical demands of assigned tasks. Corrective exercise plan giving to EE to perform until next assessment date.",
  },
  {
    id: 'nho-hma-mobility',
    category: 'NHO HMA',
    label: 'NHO HMA Job-Specific Mobility/Stretching',
    coachingTypes: ['jspms'],
    text: 'EIS performed HMA with EE while leading the PHD group training for NHO class. EE was instructed on job-specific mobility and stretching related to common task positions/movements and the benefits of utilizing stretching before, during, and after their shift.',
  },
  {
    id: 'nho-hma-postural',
    category: 'NHO HMA',
    label: 'NHO HMA Postural Coaching',
    coachingTypes: ['jobspecific'],
    text: 'EIS performed HMA while leading the PHD group training for NHO class. EE was instructed on proper posture and positioning related to common tasks workplace environments.',
  },

  // ── New Hire Check-Ins ──
  {
    id: 'newhire-checkin',
    category: 'New Hire Check-Ins',
    label: 'New Hire Check-In (Job-Specific)',
    coachingTypes: ['jobspecific', 'relationship'],
    text: 'EIS checked in with New Hire EE during their shift to see how they were doing with the new work and asked if they needed help with anything. EIS reminded EE of their NHO training regarding safety, proper posture and body mechanics, and job-specific mobility throughout the shift. EIS also encouraged EE that if they needed anything in the future to reach out or ask their supervisor or team line to get in touch with me.',
  },

  // ── Targeted Check-Ins ──
  {
    id: 'target-checkin-supervisor',
    category: 'Targeted Check-Ins',
    label: 'Check-In with Supervisor',
    coachingTypes: ['wellness'],
    text: "EIS spoke with Supervisor while performing Daily Check-In's to see if there were any EE's that the Supervisor knew of who needed assistance from the EIS.",
  },
  {
    id: 'target-checkin-teamlead',
    category: 'Targeted Check-Ins',
    label: 'Check-In with Team Lead',
    coachingTypes: ['wellness'],
    text: "EIS spoke with Team Lead while performing Daily Check-In's to see if there were any EE's that the Team Lead knew of who needed assistance from the EIS.",
  },
  {
    id: 'target-checkin-newhire',
    category: 'Targeted Check-Ins',
    label: 'Check-In with New Hire',
    coachingTypes: ['wellness'],
    text: "EIS spoke with New Hire while performing Daily Check-In's to see how EE was acclimating to the job. EIS asked if EE was performing the tasks safely and being mindful of their body positions while working. EIS also asked EE if they were having any trouble with the pre-shift stretches, continuing to perform their job-specific mobility, and if they were feeling sore or tight from the new work.",
  },

  // ── Targeted Job Coaching ──
  {
    id: 'target-jobcoach-eeinstruct-1',
    category: 'Job Coaching',
    label: 'EE Instructed EIS (equipment)',
    coachingTypes: ['jobspecific'],
    text: 'EE instructed EIS on material handling when using the __________.',
    blanks: ['__________'],
  },
  {
    id: 'target-jobcoach-eeinstruct-2',
    category: 'Job Coaching',
    label: 'EE Instructed EIS (loading/unloading)',
    coachingTypes: ['jobspecific'],
    text: 'EE instructed EIS on material handling for loading and unloading the trailers at the docking bay. EE explained the various sizes of shipment that arrive and the amount of work/time it takes the material handlers to unload the trailers. EE also explained the environmental conditions that the material handlers experience on high heat index days when loading and unloading the trailers.',
  },
  {
    id: 'target-jobcoach-eeinstruct-3',
    category: 'Job Coaching',
    label: 'EE Instructed EIS (maintenance)',
    coachingTypes: ['jobspecific'],
    text: 'EE demonstrated proper maintenance for the _________ between operation.',
    blanks: ['_________'],
  },
  {
    id: 'target-jobcoach-eeinstruct-4',
    category: 'Job Coaching',
    label: 'EE Educated EIS (general)',
    coachingTypes: ['jobspecific'],
    text: 'EE educated the EIS on ________________.',
    blanks: ['________________'],
  },

  // ── Targeted Job Mobility ──
  {
    id: 'target-mobility-shoulders',
    category: 'Job Mobility',
    label: 'Mobility/Stretching (shoulders)',
    coachingTypes: ['jspms'],
    text: 'EIS and EE discussed mobility and stretches for the shoulders to maintain shoulder health during work related tasks.',
  },

  // ── Targeted H&W ──
  {
    id: 'target-hw-nutrition',
    category: 'Health & Wellness',
    label: 'H&W — Nutrition & Exercise',
    coachingTypes: ['wellness'],
    text: 'EIS spoke with EE regarding health and fitness. The EE had questions related to nutrition and improving their dietary selection. The EE was also interested in exercise recommendations to improve stability and strength.',
  },
  {
    id: 'target-hw-homeworkout',
    category: 'Health & Wellness',
    label: 'H&W — Home Workouts',
    coachingTypes: ['wellness'],
    text: 'EE had questions for the EIS regarding home workouts and best practices for fitness.',
  },
  {
    id: 'target-hw-hydration',
    category: 'Health & Wellness',
    label: 'H&W — Hydration Check',
    coachingTypes: ['wellness'],
    text: 'EIS checked on EE to make sure they were hydrating and had enough water and electrolytes with them.',
  },

  // ── General — Relationship Building ──
  {
    id: 'relate-general',
    category: 'Relationship Building',
    label: 'General Check-In',
    coachingTypes: ['relationship'],
    text: 'EIS spoke with EE during shift. EIS asked how EE was feeling today and how the workday was going.',
  },
  {
    id: 'relate-checkin-help',
    category: 'Relationship Building',
    label: 'Check-In — Offer Help',
    coachingTypes: ['relationship'],
    text: 'EIS checked in with EE during their shift to see how their day was going and asked if there was anything they needed help with.',
  },
  {
    id: 'relate-checkin-feeling',
    category: 'Relationship Building',
    label: 'Check-In — How Feeling',
    coachingTypes: ['relationship'],
    text: 'EIS checked in with EE during their shift to see how they were feeling and asked if they needed my help with anything.',
  },
  {
    id: 'relate-introduction',
    category: 'Relationship Building',
    label: 'Introduction to EE',
    coachingTypes: ['relationship'],
    text: 'EIS introduced themselves to EE as the new ATI representative. EIS let them know that if they needed any help or had questions now or in the future that they are welcome to ask.',
  },

  // ── General Medical ──
  {
    id: 'genmed-pafollowup-supervisor',
    category: 'General Medical',
    label: 'PA Follow-Up — Supervisor Notification',
    coachingTypes: ['medicaled'],
    text: "EIS informed Supervisor on the status of an EE's injury following that EE's physical assessment follow-up by the EIS.",
  },
  {
    id: 'genmed-pafollowup-ehs',
    category: 'General Medical',
    label: 'PA Follow-Up — EHS Manager Notification',
    coachingTypes: ['medicaled'],
    text: "EIS informed EHS Manager on the status of an EE's injury following that EE's physical assessment follow-up by the EIS.",
  },
];

export const FOCUS_NEXT_ENCOUNTER = [
  "Continue to monitor employee's condition in case of any reoccurring pain or exacerbation due to work.",
  "Continue to monitor employee's condition.",
  "Continue to monitor employee's condition for any change in symptoms and if EIS's recommendations are helping.",
];

export const PROTECTIVE_BODY_PARTS = [
  'Knees', 'Feet', 'Hips', 'Low Back', 'Upper Back', 'Neck',
  'Face / Head', 'Shoulder', 'Elbow', 'Wrist', 'Hand',
];

export const PROTECTIVE_RECOMMENDATIONS = [
  'Encourage attention to body mechanics to minimize stress on the __________.',
  'Encourage periodic position changes as workflow allows to reduce __________ strain.',
  'Promote use of supportive footwear and anti-fatigue measures during standing tasks.',
  'Allow brief movement or stretch opportunities during natural pauses in the work process.',
  'Consider strategies to vary tasks when feasible to support joint comfort.',
];

export function getTemplatesForType(coachingTypeId) {
  if (!coachingTypeId) return [];
  return DESCRIPTION_TEMPLATES.filter(t => t.coachingTypes.includes(coachingTypeId));
}
