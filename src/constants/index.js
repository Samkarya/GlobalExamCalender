/**
 * Design tokens and constant mappings for the Global Exam Calendar.
 * All color codes, labels, and static maps live here to avoid magic strings
 * and duplication across components.
 */

/* ─── Category Colors ─── */
export const CATEGORY_COLORS = {
  competitive: '#f5506e',
  entrance: '#4f8ef7',
  language: '#2dcc8f',
  professional: '#f7934c',
  academic: '#a78bfa',
};

/* ─── Event Type Colors ─── */
export const EVENT_TYPE_COLORS = {
  registration_start: '#2dcc8f',
  registration_end: '#f5c542',
  admit_card: '#4f8ef7',
  exam_date: '#f5506e',
  result: '#a78bfa',
  counselling: '#f7934c',
  other: '#6b7491',
};

/* ─── Event Type Labels ─── */
export const EVENT_TYPE_LABELS = {
  registration_start: 'Registration Opens',
  registration_end: 'Registration Closes',
  admit_card: 'Admit Card',
  exam_date: 'Exam Day',
  result: 'Result',
  counselling: 'Counselling',
  other: 'Other',
};

/* ─── Month Names ─── */
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/* ─── Day of Week Labels ─── */
export const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* ─── View Modes ─── */
export const VIEW_MODES = {
  CALENDAR: 'calendar',
  LIST: 'list',
  TIMELINE: 'timeline',
};

/* ─── Filter Group Keys ─── */
export const FILTER_GROUPS = {
  COUNTRIES: 'countries',
  CATEGORIES: 'categories',
  EVENT_TYPES: 'eventTypes',
  FREQUENCIES: 'frequencies',
};
