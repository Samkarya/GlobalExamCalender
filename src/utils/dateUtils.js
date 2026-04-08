/**
 * Date utility functions for the Global Exam Calendar.
 * Pure functions — no side effects, easy to test.
 */

/**
 * Parse a YYYY-MM-DD string into a Date object (local timezone).
 * @param {string} dateStr
 * @returns {Date}
 */
export function parseDate(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d);
}

/**
 * Format a YYYY-MM-DD string to a human-readable date (e.g. "8 Apr 2026").
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
    const d = parseDate(dateStr);
    return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

/**
 * Check if two Date objects represent the same calendar day.
 * @param {Date} a
 * @param {Date} b
 * @returns {boolean}
 */
export function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );
}

/**
 * Get the number of days in a given month.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Get the day of the week for the first day of a month (0=Sun, 6=Sat).
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

/**
 * Get number of days in the previous month.
 * @param {number} year
 * @param {number} month - 0-indexed
 * @returns {number}
 */
export function getDaysInPrevMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
