/**
 * Generate an ICS file content from a list of events and trigger download.
 * @param {Array} events - Filtered event list
 */
export function exportToICS(events) {
    if (!events.length) {
        alert('No events to export.');
        return;
    }

    let icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//GlobalExamCalendar//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
    ].join('\r\n');

    events.forEach((ev) => {
        const dt = ev.date.replace(/-/g, '');
        const summary = `${ev.exam.short_name} - ${ev.label}`;
        const description = `Official URL: ${ev.exam.official_url}\\nView more details on Global Exam Calendar.`;

        icsContent += '\r\n' + [
            'BEGIN:VEVENT',
            `DTSTART;VALUE=DATE:${dt}`,
            `SUMMARY:${escapeICS(summary)}`,
            `DESCRIPTION:${escapeICS(description)}`,
            `UID:${ev.exam.id}-${dt}@globalexamcalendar`,
            'END:VEVENT',
        ].join('\r\n');
    });

    icsContent += '\r\nEND:VCALENDAR';

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `Exam_Calendar_${new Date().toISOString().split('T')[0]}.ics`;
    anchor.click();
    URL.revokeObjectURL(url);
}

/**
 * Escape special characters for ICS format.
 * @param {string} str
 * @returns {string}
 */
function escapeICS(str) {
    return str
        .replace(/\\/g, '\\\\')
        .replace(/;/g, '\\;')
        .replace(/,/g, '\\,');
}
