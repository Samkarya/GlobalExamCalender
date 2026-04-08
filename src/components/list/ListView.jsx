import { useMemo } from 'react';
import { useExams } from '../../context/ExamContext';
import { useUI } from '../../context/UIContext';
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS, CATEGORY_COLORS } from '../../constants';
import { formatDate } from '../../utils/dateUtils';
import { Building2, MapPin, AlertTriangle, Inbox } from 'lucide-react';
import './ListView.css';

export default function ListView() {
    const { filteredEvents } = useExams();
    const { openModal } = useUI();

    // Group events by date
    const groupedByDate = useMemo(() => {
        const groups = {};
        filteredEvents.forEach((ev) => {
            if (!groups[ev.date]) groups[ev.date] = [];
            groups[ev.date].push(ev);
        });
        return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
    }, [filteredEvents]);

    if (!filteredEvents.length) {
        return (
            <div className="empty-state">
                <Inbox size={48} strokeWidth={1} />
                <p>No events match your filters.</p>
                <p style={{ fontSize: '0.75rem' }}>Try adjusting filters or clearing them.</p>
            </div>
        );
    }

    return (
        <div className="list-view">
            {groupedByDate.map(([date, events]) => (
                <div key={date} className="list-group">
                    <div className="list-date-header">
                        <div className="list-date-badge">{formatDate(date)}</div>
                        <div className="list-date-line" />
                    </div>
                    {events.map((ev, idx) => {
                        const typeColor = EVENT_TYPE_COLORS[ev.type] || EVENT_TYPE_COLORS.other;
                        const catColor = CATEGORY_COLORS[ev.exam.category] || '#6b7491';

                        return (
                            <div
                                key={`${ev.exam.id}-${ev.type}-${idx}`}
                                className="exam-card"
                                onClick={() => openModal(ev.exam, ev)}
                                style={{ '--card-color': typeColor }}
                            >
                                <div className="exam-card-flag">
                                    <MapPin size={20} style={{ color: catColor }} />
                                </div>
                                <div className="exam-card-body">
                                    <div className="exam-card-name">
                                        {ev.exam.name}
                                        <span className="exam-card-short">{ev.exam.short_name}</span>
                                    </div>
                                    <div className="exam-card-meta">
                                        <span><Building2 size={12} /> {ev.exam.conducting_body}</span>
                                        <span><MapPin size={12} /> {ev.exam.country}</span>
                                        <span
                                            className="cat-badge"
                                            style={{ background: `${catColor}22`, color: catColor }}
                                        >
                                            {ev.exam.category}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="event-type-badge"
                                        style={{ background: `${typeColor}22`, color: typeColor }}
                                    >
                                        {EVENT_TYPE_LABELS[ev.type] || ev.type}
                                    </div>
                                    {ev.tentative && (
                                        <div className="tentative-label">
                                            <AlertTriangle size={10} /> Tentative
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
