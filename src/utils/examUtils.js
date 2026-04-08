/**
 * Flatten exams → individual events, each containing a reference to its parent exam.
 * @param {Array} exams
 * @returns {Array} flat list of event objects
 */
export function flattenExamsToEvents(exams) {
    const events = [];
    exams.forEach((exam) => {
        exam.dates.forEach((dateEntry) => {
            events.push({ ...dateEntry, exam });
        });
    });
    return events;
}

/**
 * Apply filter state to the exams array.
 * Returns only exam objects that pass all active filters.
 * @param {Array} exams
 * @param {Object} filters - { countries, categories, frequencies }
 * @param {string} searchQuery
 * @returns {Array}
 */
export function filterExams(exams, filters, searchQuery) {
    const q = searchQuery.toLowerCase().trim();

    return exams.filter((exam) => {
        if (filters.countries.size && !filters.countries.has(exam.country)) return false;
        if (filters.categories.size && !filters.categories.has(exam.category)) return false;
        if (filters.frequencies.size && !filters.frequencies.has(exam.frequency)) return false;

        if (q) {
            const matchesName = exam.name.toLowerCase().includes(q);
            const matchesShort = exam.short_name.toLowerCase().includes(q);
            const matchesTags = exam.tags.some((t) => t.toLowerCase().includes(q));
            if (!matchesName && !matchesShort && !matchesTags) return false;
        }

        return true;
    });
}

/**
 * Apply event-level filters (event type, date range) to a flat event list.
 * @param {Array} events
 * @param {Object} filters - { eventTypes }
 * @param {string} dateFrom - YYYY-MM-DD or empty
 * @param {string} dateTo - YYYY-MM-DD or empty
 * @returns {Array} sorted filtered events
 */
export function filterEvents(events, filters, dateFrom, dateTo) {
    let result = events;

    if (filters.eventTypes.size) {
        result = result.filter((ev) => filters.eventTypes.has(ev.type));
    }

    if (dateFrom) {
        result = result.filter((ev) => ev.date >= dateFrom);
    }

    if (dateTo) {
        result = result.filter((ev) => ev.date <= dateTo);
    }

    result.sort((a, b) => a.date.localeCompare(b.date));
    return result;
}
