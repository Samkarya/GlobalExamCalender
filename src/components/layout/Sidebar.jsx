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
                                <div key={`af-c-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.COUNTRIES, v)}>
                                    <Globe size={10} /> {v} <X size={10} />
                                </div>
                            ))}
                            {[...filters.categories].map((v) => (
                                <div key={`af-cat-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.CATEGORIES, v)}>
                                    <Layers size={10} /> {v} <X size={10} />
                                </div>
                            ))}
                            {[...filters.eventTypes].map((v) => (
                                <div key={`af-et-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.EVENT_TYPES, v)}>
                                    <CalendarDays size={10} /> {EVENT_TYPE_LABELS[v]} <X size={10} />
                                </div>
                            ))}
                            {[...filters.frequencies].map((v) => (
                                <div key={`af-f-${v}`} className="active-tag" onClick={() => toggle(FILTER_GROUPS.FREQUENCIES, v)}>
                                    <RefreshCw size={10} /> {v} <X size={10} />
                                </div>
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
                            <div
                                key={c}
                                className={`flag-chip ${filters.countries.has(c) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.COUNTRIES, c)}
                            >
                                <Globe size={14} className="flag-icon" />
                                <span>{c}</span>
                                <span className="chip-count">{filterCounts.country(c)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Category */}
                <div>
                    <div className="sidebar-section-title">Category</div>
                    <div className="filter-group">
                        {filterOptions.categories.map((c) => (
                            <div
                                key={c}
                                className={`filter-chip ${filters.categories.has(c) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.CATEGORIES, c)}
                            >
                                <div
                                    className="chip-dot"
                                    style={{ background: CATEGORY_COLORS[c], color: CATEGORY_COLORS[c] }}
                                />
                                <span style={{ textTransform: 'capitalize' }}>{c}</span>
                                <span className="chip-count">{filterCounts.category(c)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Event Type */}
                <div>
                    <div className="sidebar-section-title">Event Type</div>
                    <div className="filter-group">
                        {filterOptions.eventTypes.map((t) => (
                            <div
                                key={t}
                                className={`filter-chip ${filters.eventTypes.has(t) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.EVENT_TYPES, t)}
                            >
                                <div
                                    className="chip-dot"
                                    style={{ background: EVENT_TYPE_COLORS[t], color: EVENT_TYPE_COLORS[t] }}
                                />
                                <span>{EVENT_TYPE_LABELS[t] || t}</span>
                                <span className="chip-count">{filterCounts.eventType(t)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Frequency */}
                <div>
                    <div className="sidebar-section-title">Frequency</div>
                    <div className="filter-group">
                        {filterOptions.frequencies.map((f) => (
                            <div
                                key={f}
                                className={`filter-chip ${filters.frequencies.has(f) ? 'selected' : ''}`}
                                onClick={() => toggle(FILTER_GROUPS.FREQUENCIES, f)}
                            >
                                <div className="chip-dot" style={{ background: 'var(--accent)' }} />
                                <span style={{ textTransform: 'capitalize' }}>{f}</span>
                                <span className="chip-count">{filterCounts.frequency(f)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="separator" />

                {/* Date Range */}
                <div>
                    <div className="sidebar-section-title">Date Range</div>
                    <div className="date-range">
                        <label>From</label>
                        <input
                            type="date"
                            id="date-from"
                            value={dateFrom}
                            onChange={(e) => dispatch({ type: 'SET_DATE_FROM', payload: e.target.value })}
                        />
                        <label>To</label>
                        <input
                            type="date"
                            id="date-to"
                            value={dateTo}
                            onChange={(e) => dispatch({ type: 'SET_DATE_TO', payload: e.target.value })}
                        />
                    </div>
                </div>
            </aside>
        </>
    );
}
