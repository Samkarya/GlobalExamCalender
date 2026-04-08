import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { VIEW_MODES } from '../constants';

/* ─── Context ─── */
const UIContext = createContext(null);

/* ─── Provider ─── */
export function UIProvider({ children }) {
    const [currentView, setCurrentView] = useState(VIEW_MODES.CALENDAR);
    const [currentDate, setCurrentDate] = useState(() => new Date(2026, 3, 1)); // April 2026
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [modalExam, setModalExam] = useState(null);
    const [modalFocusEvent, setModalFocusEvent] = useState(null);
    const [showPlanner, setShowPlanner] = useState(false);

    const openModal = useCallback((exam, focusEvent = null) => {
        setModalExam(exam);
        setModalFocusEvent(focusEvent);
    }, []);

    const closeModal = useCallback(() => {
        setModalExam(null);
        setModalFocusEvent(null);
    }, []);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const prevPeriod = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() - 1);
            return d;
        });
    }, []);

    const nextPeriod = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() + 1);
            return d;
        });
    }, []);

    const goToday = useCallback(() => {
        const now = new Date();
        now.setDate(1);
        setCurrentDate(now);
    }, []);

    const value = useMemo(
        () => ({
            currentView,
            setCurrentView,
            currentDate,
            setCurrentDate,
            sidebarOpen,
            setSidebarOpen,
            toggleSidebar,
            modalExam,
            modalFocusEvent,
            openModal,
            closeModal,
            showPlanner,
            setShowPlanner,
            prevPeriod,
            nextPeriod,
            goToday,
        }),
        [currentView, currentDate, sidebarOpen, modalExam, modalFocusEvent, showPlanner, openModal, closeModal, toggleSidebar, prevPeriod, nextPeriod, goToday]
    );

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

/* ─── Hook ─── */
export function useUI() {
    const ctx = useContext(UIContext);
    if (!ctx) throw new Error('useUI must be used within UIProvider');
    return ctx;
}
