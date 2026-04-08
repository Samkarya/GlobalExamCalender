import { Link } from 'react-router-dom';
import { useExams } from '../../context/ExamContext';
import { useUI } from '../../context/UIContext';
import { CATEGORY_COLORS, EVENT_TYPE_COLORS, EVENT_TYPE_LABELS, FILTER_GROUPS } from '../../constants';
import { Search, X, Globe, Layers, CalendarDays, RefreshCw } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
    const {
        filters,
        filterOptions,
        filterCounts,
        activeFilterCount,
        searchQuery,
        dateFrom,
        dateTo,
        dispatch,
    } = useExams();
    const { sidebarOpen, setSidebarOpen } = useUI();


    const toggle = (group, value) => {
        dispatch({ type: 'TOGGLE_FILTER', payload: { group, value } });
    };

    const clearAll = () => {
        dispatch({ type: 'CLEAR_FILTERS' });
    };

    return (
        <>
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
            )}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                {/* Mobile close */}
                <div className="sidebar-header">
                    <span className="sidebar-section-title" style={{ margin: 0 }}>Filters</span>
                    <button
                        className="sidebar-close-btn nav-btn"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Search */}
                <div className="search-wrap">
                    <Search size={14} className="search-icon" />
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search exams..."
                        aria-label="Search exams by name or tag"
                        value={searchQuery}
                        onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                    />
                </div>

                {/* Active Filters */}
                {activeFilterCount > 0 && (
                    <div className="active-filters-section">
                        <div className="sidebar-section-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Active filters
                            <button className="clear-all-btn" onClick={clearAll}>clear all</button>
                        </div>
                        <div className="active-filters">
                            {[...filters.countries].map((v) => (
                                <button key={`af-c-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.COUNTRIES, v)} aria-label={`Remove filter ${v}`}>
                                    <Globe size={10} aria-hidden="true" /> {v} <X size={10} aria-hidden="true" />
                                </button>
                            ))}
                            {[...filters.categories].map((v) => (
                                <button key={`af-cat-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.CATEGORIES, v)} aria-label={`Remove filter ${v}`}>
                                    <Layers size={10} aria-hidden="true" /> {v} <X size={10} aria-hidden="true" />
                                </button>
                            ))}
                            {[...filters.eventTypes].map((v) => (
                                <button key={`af-et-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.EVENT_TYPES, v)} aria-label={`Remove filter ${EVENT_TYPE_LABELS[v]}`}>
                                    <CalendarDays size={10} aria-hidden="true" /> {EVENT_TYPE_LABELS[v]} <X size={10} aria-hidden="true" />
                                </button>
                            ))}
                            {[...filters.frequencies].map((v) => (
                                <button key={`af-f-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.FREQUENCIES, v)} aria-label={`Remove filter ${v}`}>
                                    <RefreshCw size={10} aria-hidden="true" /> {v} <X size={10} aria-hidden="true" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="separator" />

                {/* Country */}
                <div>
                    <div className="sidebar-section-title">Country / Region</div>
                    <div className="filter-group">
                        {filterOptions.countries.map((c) => (
                            <button
                                key={c}
                                className={`flag-chip ${filters.countries.has(c) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.COUNTRIES, c)}
                                aria-pressed={filters.countries.has(c)}
                            >
                                <Globe size={14} className="flag-icon" aria-hidden="true" />
                                <span>{c}</span>
                                <span className="chip-count" aria-label={`${filterCounts.country(c)} exams`}>{filterCounts.country(c)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Category */}
                <div>
                    <div className="sidebar-section-title">Category</div>
                    <div className="filter-group">
                        {filterOptions.categories.map((c) => (
                            <button
                                key={c}
                                className={`filter-chip ${filters.categories.has(c) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.CATEGORIES, c)}
                                aria-pressed={filters.categories.has(c)}
                            >
                                <div
                                    className="chip-dot"
                                    style={{ background: CATEGORY_COLORS[c], color: CATEGORY_COLORS[c] }}
                                    aria-hidden="true"
                                />
                                <span style={{ textTransform: 'capitalize' }}>{c}</span>
                                <span className="chip-count" aria-label={`${filterCounts.category(c)} exams`}>{filterCounts.category(c)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Event Type */}
                <div>
                    <div className="sidebar-section-title">Event Type</div>
                    <div className="filter-group">
                        {filterOptions.eventTypes.map((t) => (
                            <button
                                key={t}
                                className={`filter-chip ${filters.eventTypes.has(t) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.EVENT_TYPES, t)}
                                aria-pressed={filters.eventTypes.has(t)}
                            >
                                <div
                                    className="chip-dot"
                                    style={{ background: EVENT_TYPE_COLORS[t], color: EVENT_TYPE_COLORS[t] }}
                                    aria-hidden="true"
                                />
                                <span>{EVENT_TYPE_LABELS[t] || t}</span>
                                <span className="chip-count" aria-label={`${filterCounts.eventType(t)} events`}>{filterCounts.eventType(t)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Frequency */}
                <div>
                    <div className="sidebar-section-title">Frequency</div>
                    <div className="filter-group">
                        {filterOptions.frequencies.map((f) => (
                            <button
                                key={f}
                                className={`filter-chip ${filters.frequencies.has(f) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.FREQUENCIES, f)}
                                aria-pressed={filters.frequencies.has(f)}
                            >
                                <div className="chip-dot" style={{ background: 'var(--accent)' }} aria-hidden="true" />
                                <span style={{ textTransform: 'capitalize' }}>{f}</span>
                                <span className="chip-count" aria-label={`${filterCounts.frequency(f)} exams`}>{filterCounts.frequency(f)}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Date Range */}
                <div>
                    <div className="sidebar-section-title">Date Range</div>
                    <div className="date-range">
                        <label htmlFor="date-from">From</label>
                        <input
                            type="text"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            placeholder="Select start date"
                            id="date-from"
                            value={dateFrom}
                            onChange={(e) => dispatch({ type: 'SET_DATE_FROM', payload: e.target.value })}
                        />
                        <label htmlFor="date-to">To</label>
                        <input
                            type="text"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            placeholder="Select end date"
                            id="date-to"
                            value={dateTo}
                            onChange={(e) => dispatch({ type: 'SET_DATE_TO', payload: e.target.value })}
                        />
                    </div>
                </div>

                <div className="separator" />

                {/* Subscription Feed Link */}
                <div className="sidebar-footer-links">
                    <Link to="/sync" className="sidebar-footer-link">
                        <RefreshCw size={14} />
                        <span>Calendar Sync (Webcal)</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
