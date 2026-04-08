import { useExams } from '../context/ExamContext';
import { useUI } from '../context/UIContext';
import { VIEW_MODES, MONTH_NAMES } from '../constants';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import CalendarView from '../components/calendar/CalendarView';
import ListView from '../components/list/ListView';
import TimelineView from '../components/timeline/TimelineView';
import ExamModal from '../components/common/ExamModal';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import './CalendarPage.css';

export default function CalendarPage() {
    const { loading, error, filteredEvents } = useExams();
    const { currentView, currentDate, prevPeriod, nextPeriod, goToday } = useUI();

    if (loading) {
        return (
            <div className="loading-state">
                <Loader2 size={32} className="spin" />
                <p>Loading exam data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading-state">
                <p style={{ color: 'var(--rose)' }}>Error: {error}</p>
            </div>
        );
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    return (
        <>
            <Header />

            <div className="app-shell">
                <Sidebar />

                <main className="main-content">
                    {/* Navigation */}
                    <div className="month-nav">
                        <button className="nav-btn" onClick={prevPeriod} aria-label="Previous month">
                            <ChevronLeft size={18} />
                        </button>
                        <button className="nav-btn" onClick={nextPeriod} aria-label="Next month">
                            <ChevronRight size={18} />
                        </button>
                        <div className="month-title">
                            {MONTH_NAMES[month]} <em>{year}</em>
                        </div>
                        <button className="today-btn" onClick={goToday}>
                            Today
                        </button>
                    </div>

                    {/* Results bar */}
                    <div className="results-bar">
                        <span className="results-count">{filteredEvents.length}</span>
                        <span>events visible</span>
                    </div>

                    {/* View content */}
                    {currentView === VIEW_MODES.CALENDAR && <CalendarView />}
                    {currentView === VIEW_MODES.LIST && <ListView />}
                    {currentView === VIEW_MODES.TIMELINE && <TimelineView />}
                </main>
            </div>

            <ExamModal />
        </>
    );
}
