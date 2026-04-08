import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import { flattenExamsToEvents, filterExams, filterEvents } from '../utils/examUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';

/* ─── Context ─── */
const ExamContext = createContext(null);

/* ─── Initial State ─── */
const initialState = {
    exams: [],
    loading: true,
    error: null,
    filters: {
        countries: new Set(),
        categories: new Set(),
        eventTypes: new Set(),
        frequencies: new Set(),
    },
    searchQuery: '',
    dateFrom: '',
    dateTo: '',
};

/* ─── Reducer ─── */
function examReducer(state, action) {
    switch (action.type) {
        case 'SET_EXAMS':
            return { ...state, exams: action.payload, loading: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'TOGGLE_FILTER': {
            const { group, value } = action.payload;
            const next = new Set(state.filters[group]);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return { ...state, filters: { ...state.filters, [group]: next } };
        }
        case 'CLEAR_FILTERS':
            return {
                ...state,
                filters: {
                    countries: new Set(),
                    categories: new Set(),
                    eventTypes: new Set(),
                    frequencies: new Set(),
                },
                searchQuery: '',
                dateFrom: '',
                dateTo: '',
            };
        case 'SET_SEARCH':
            return { ...state, searchQuery: action.payload };
        case 'SET_DATE_FROM':
            return { ...state, dateFrom: action.payload };
        case 'SET_DATE_TO':
            return { ...state, dateTo: action.payload };
        default:
            return state;
    }
}

/* ─── Provider ─── */
export function ExamProvider({ children, showPlannerOnly = false }) {
    const [state, dispatch] = useReducer(examReducer, initialState);
    const [plannerIds, setPlannerIds] = useLocalStorage('gec-planner', []);

    // Fetch exams dynamically at build time / run time using import.meta.glob
    useEffect(() => {
        const loadExams = async () => {
            try {
                // Vite's way to import multiple files. The resulting objects will be the parsed JSON
                const modules = import.meta.glob('../data/exams/**/*.json');
                const examsArray = [];
                const now = new Date();
                const currentYear = now.getFullYear();
                const minYear = currentYear - 1;
                const maxYear = currentYear + 1;

                for (const path in modules) {
                    const module = await modules[path]();
                    const exam = module.default || module;

                    // Filter dates within the 3-year sliding window
                    // (Past Year, Current, Future Year)
                    if (exam.dates) {
                        exam.dates = exam.dates.filter(d => {
                            const year = new Date(d.date).getFullYear();
                            return year >= minYear && year <= maxYear;
                        });
                    }

                    // Only add exams that have at least one date in the window
                    if (exam.dates && exam.dates.length > 0) {
                        examsArray.push(exam);
                    }
                }

                dispatch({ type: 'SET_EXAMS', payload: examsArray });
            } catch (err) {
                console.error("Error loading exams:", err);
                dispatch({ type: 'SET_ERROR', payload: err.message || 'Failed to load exam data' });
            }
        };

        loadExams();
    }, []);

    // Derived data — apply planner filter first, then standard filters
    const baseExams = useMemo(
        () => showPlannerOnly ? state.exams.filter((e) => plannerIds.includes(e.id)) : state.exams,
        [state.exams, showPlannerOnly, plannerIds]
    );

    const filteredExams = useMemo(
        () => filterExams(baseExams, state.filters, state.searchQuery),
        [baseExams, state.filters, state.searchQuery]
    );

    const allEvents = useMemo(
        () => flattenExamsToEvents(filteredExams),
        [filteredExams]
    );

    const filteredEvents = useMemo(
        () => filterEvents(allEvents, state.filters, state.dateFrom, state.dateTo),
        [allEvents, state.filters, state.dateFrom, state.dateTo]
    );

    // Aggregate stats
    const stats = useMemo(() => {
        const countries = new Set(filteredExams.map((e) => e.country));
        return {
            totalCountries: countries.size,
            totalExams: filteredExams.length,
            totalEvents: flattenExamsToEvents(filteredExams).length,
        };
    }, [filteredExams]);

    // Filter options (unique values for sidebar)
    const filterOptions = useMemo(() => {
        const countries = [...new Set(state.exams.map((e) => e.country))].sort();
        const categories = [...new Set(state.exams.map((e) => e.category))].sort();
        const eventTypes = [...new Set(state.exams.flatMap((e) => e.dates.map((d) => d.type)))].sort();
        const frequencies = [...new Set(state.exams.map((e) => e.frequency))].sort();
        return { countries, categories, eventTypes, frequencies };
    }, [state.exams]);

    // Filter counts
    const filterCounts = useMemo(() => ({
        country: (c) => filteredExams.filter((e) => e.country === c).length,
        category: (c) => filteredExams.filter((e) => e.category === c).length,
        eventType: (t) => filteredExams.flatMap((e) => e.dates).filter((d) => d.type === t).length,
        frequency: (f) => filteredExams.filter((e) => e.frequency === f).length,
    }), [filteredExams]);

    // Planner actions
    const togglePlanner = useCallback(
        (examId) => {
            setPlannerIds((prev) =>
                prev.includes(examId) ? prev.filter((id) => id !== examId) : [...prev, examId]
            );
        },
        [setPlannerIds]
    );

    const isInPlanner = useCallback(
        (examId) => plannerIds.includes(examId),
        [plannerIds]
    );

    // Active filter count
    const activeFilterCount = useMemo(() => {
        return (
            state.filters.countries.size +
            state.filters.categories.size +
            state.filters.eventTypes.size +
            state.filters.frequencies.size
        );
    }, [state.filters]);

    const value = useMemo(
        () => ({
            ...state,
            filteredExams,
            filteredEvents,
            stats,
            filterOptions,
            filterCounts,
            activeFilterCount,
            plannerIds,
            togglePlanner,
            isInPlanner,
            dispatch,
        }),
        [state, filteredExams, filteredEvents, stats, filterOptions, filterCounts, activeFilterCount, plannerIds, togglePlanner, isInPlanner]
    );

    return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
}

/* ─── Hook ─── */
export function useExams() {
    const ctx = useContext(ExamContext);
    if (!ctx) throw new Error('useExams must be used within ExamProvider');
    return ctx;
}
