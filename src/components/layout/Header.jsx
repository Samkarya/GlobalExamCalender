import { Link, useNavigate } from 'react-router-dom';
import { useExams } from '../../context/ExamContext';
import { useUI } from '../../context/UIContext';
import { VIEW_MODES } from '../../constants';
import { exportToICS } from '../../utils/icsExport';
import {
    CalendarDays,
    List,
    GitBranch,
    Menu,
    GitFork,
    Star,
    Globe,
    FileText,
    CalendarClock,
    Download,
    Sun,
    Moon,
} from 'lucide-react';
import './Header.css';

export default function Header() {
    const { stats, filteredEvents } = useExams();
    const { currentView, setCurrentView, toggleSidebar, showPlanner, setShowPlanner, theme, setTheme } = useUI();
    const navigate = useNavigate();

    const handleViewToggle = (key) => {
        setCurrentView(key);
        navigate('/');
    };

    const viewButtons = [
        { key: VIEW_MODES.CALENDAR, label: 'Calendar', icon: <CalendarDays size={14} /> },
        { key: VIEW_MODES.LIST, label: 'List', icon: <List size={14} /> },
        { key: VIEW_MODES.TIMELINE, label: 'Timeline', icon: <GitBranch size={14} /> },
    ];

    return (
        <header className="app-header">
            <button
                className="mobile-menu-btn btn-outline"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
            >
                <Menu size={18} />
            </button>

            <Link to="/" className="logo">
                <div className="logo-dot" />
                Global Exam <em>Calendar</em>
            </Link>

            <div className="header-actions">
                <button
                    className="btn-outline"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                </button>
                <button
                    className={`btn-outline ${showPlanner ? 'btn-planner-active' : ''}`}
                    onClick={() => setShowPlanner((p) => !p)}
                    aria-label="Toggle My Planner filter"
                    aria-pressed={showPlanner}
                >
                    <Star size={14} />
                    <span className="desktop-only">My Planner</span>
                </button>
                <button
                    className="btn-outline"
                    onClick={() => exportToICS(filteredEvents)}
                    title="Export visible events to .ics"
                    aria-label="Export visible events to ICS format"
                >
                    <Download size={14} />
                    <span className="desktop-only">Export .ics</span>
                </button>
                <a
                    href="https://github.com/Samkarya/GlobalExamCalender"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-accent"
                >
                    <GitFork size={14} />
                    <span className="desktop-only">Contribute</span>
                </a>
            </div>

            <div className="view-toggle" role="group" aria-label="View modes">
                {viewButtons.map((vb) => (
                    <button
                        key={vb.key}
                        className={`view-btn ${currentView === vb.key ? 'active' : ''}`}
                        onClick={() => handleViewToggle(vb.key)}
                        aria-label={`${vb.label} view`}
                        aria-pressed={currentView === vb.key}
                    >
                        {vb.icon}
                        {vb.label}
                    </button>
                ))}
            </div>

            <div className="header-stats">
                <div className="stat-pill">
                    <Globe size={12} />
                    <span>{stats.totalCountries}</span> countries
                </div>
                <div className="stat-pill">
                    <FileText size={12} />
                    <span>{stats.totalExams}</span> exams
                </div>
                <div className="stat-pill">
                    <CalendarClock size={12} />
                    <span>{stats.totalEvents}</span> events
                </div>
            </div>
        </header>
    );
}
