import { useMemo } from 'react';
import { useExams } from '../../context/ExamContext';
import { useUI } from '../../context/UIContext';
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS, CATEGORY_COLORS } from '../../constants';
import { formatDate } from '../../utils/dateUtils';
import { CalendarDays, MapPin, AlertTriangle, Inbox } from 'lucide-react';
import './TimelineView.css';

export default function TimelineView() {
    const { filteredEvents } = useExams();
    const { openModal, currentDate } = useUI();

    const currentMonthEvents = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const prefix = `${year}-${month}`;
        return filteredEvents.filter((ev) => ev.date.startsWith(prefix));
    }, [filteredEvents, currentDate]);

    if (!currentMonthEvents.length) {
        return (
            <div className="empty-state">
                <Inbox size={48} strokeWidth={1} />
                <p>No events match your filters.</p>
                <p style={{ fontSize: '0.75rem' }}>Try adjusting filters or clearing them.</p>
            </div>
        );
    }

    const visible = currentMonthEvents.slice(0, 60);

    return (
        <div className="timeline-wrap">
            {visible.map((ev, i) => {
                const typeColor = EVENT_TYPE_COLORS[ev.type] || EVENT_TYPE_COLORS.other;
                const catColor = CATEGORY_COLORS[ev.exam.category] || '#6b7491';

                return (
                    <div
                        key={`${ev.exam.id}-${ev.type}-${i}`}
                        className="timeline-item"
                        style={{ animationDelay: `${i * 0.03}s` }}
                    >
                        <div
                            className="timeline-dot"
                            style={{ background: typeColor, boxShadow: `0 0 10px ${typeColor}` }}
                        />
                        <div
                            className="exam-card timeline-card"
                            onClick={() => openModal(ev.exam, ev)}
                            style={{ '--card-color': typeColor }}
                        >
                            <div className="exam-card-body">
                                <div className="exam-card-name">
                                    {ev.exam.short_name} — {ev.label}
                                    {ev.tentative && (
                                        <span className="tentative-inline">
                                            <AlertTriangle size={10} /> Tentative
                                        </span>
                                    )}
                                </div>
                                <div className="exam-card-meta">
                                    <span><CalendarDays size={12} /> {formatDate(ev.date)}</span>
                                    <span><MapPin size={12} /> {ev.exam.country}</span>
                                    <span
                                        className="cat-badge"
                                        style={{ background: `${catColor}22`, color: 'var(--text)' }}
                                    >
                                        {ev.exam.category}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="event-type-badge"
                                style={{ background: `${typeColor}22`, color: 'var(--text)' }}
                            >
                                {EVENT_TYPE_LABELS[ev.type]}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
