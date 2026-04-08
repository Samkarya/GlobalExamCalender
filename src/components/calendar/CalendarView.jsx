import { useMemo } from 'react';
import { useExams } from '../../context/ExamContext';
import { useUI } from '../../context/UIContext';
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS, DAY_LABELS, VIEW_MODES } from '../../constants';
import { parseDate, getDaysInMonth, getFirstDayOfMonth, getDaysInPrevMonth } from '../../utils/dateUtils';
import './CalendarView.css';

export default function CalendarView() {
    const { filteredEvents } = useExams();
    const { currentDate, openModal, setCurrentView } = useUI();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrev = getDaysInPrevMonth(year, month);
    const today = new Date();

    // Build a map of day → events for this month
    const eventsByDay = useMemo(() => {
        const map = {};
        filteredEvents.forEach((ev) => {
            const d = parseDate(ev.date);
            if (d.getFullYear() === year && d.getMonth() === month) {
                const day = d.getDate();
                if (!map[day]) map[day] = [];
                map[day].push(ev);
            }
        });
        return map;
    }, [filteredEvents, year, month]);

    // Previous month padding days
    const prevPadding = [];
    for (let i = 0; i < firstDay; i++) {
        prevPadding.push(daysInPrev - firstDay + 1 + i);
    }

    // Next month padding days
    const totalCells = firstDay + daysInMonth;
    const remaining = (7 - (totalCells % 7)) % 7;
    const nextPadding = [];
    for (let i = 1; i <= remaining; i++) {
        nextPadding.push(i);
    }

    const isToday = (d) =>
        today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

    const handlePillClick = (ev, e) => {
        e.stopPropagation();
        const exam = ev.exam;
        openModal(exam, ev);
    };

    return (
        <div className="cal-wrapper">
            <div className="cal-grid">
                {/* Day of week headers */}
                {DAY_LABELS.map((label, i) => (
                    <div key={label} className={`cal-dow ${i === 0 || i === 6 ? 'weekend' : ''}`}>
                        {label}
                    </div>
                ))}

                {/* Previous month padding */}
                {prevPadding.map((d) => (
                    <div key={`prev-${d}`} className="cal-day other-month">
                        <div className="day-num">{d}</div>
                    </div>
                ))}

                {/* Current month days */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                    const dayEvents = eventsByDay[d] || [];
                    const visible = dayEvents.slice(0, 3);
                    const moreCount = dayEvents.length - visible.length;

                    return (
                        <div key={d} className={`cal-day ${isToday(d) ? 'today' : ''}`}>
                            <div className="day-num">{d}</div>
                            {visible.map((ev, idx) => {
                                const color = EVENT_TYPE_COLORS[ev.type] || EVENT_TYPE_COLORS.other;
                                return (
                                    <div
                                        key={`${ev.exam.id}-${ev.type}-${idx}`}
                                        className="event-pill"
                                        onClick={(e) => handlePillClick(ev, e)}
                                        style={{
                                            background: `${color}22`,
                                            color: 'var(--text)',
                                        }}
                                        title={`${ev.exam.short_name} - ${EVENT_TYPE_LABELS[ev.type]}`}
                                    >
                                        <div className="ep-dot" style={{ background: color }} />
                                        <span className="ep-name">{ev.exam.short_name}</span>
                                    </div>
                                );
                            })}
                            {moreCount > 0 && (
                                <div className="more-events" onClick={() => setCurrentView(VIEW_MODES.LIST)}>
                                    +{moreCount} more
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Next month padding */}
                {nextPadding.map((d) => (
                    <div key={`next-${d}`} className="cal-day other-month">
                        <div className="day-num">{d}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
