import { useEffect, useCallback } from 'react';
import { useUI } from '../../context/UIContext';
import { useExams } from '../../context/ExamContext';
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS, CATEGORY_COLORS } from '../../constants';
import { formatDate } from '../../utils/dateUtils';
import {
    X,
    ExternalLink,
    Building2,
    RefreshCw,
    GraduationCap,
    Star,
    StarOff,
    AlertTriangle,
    Hash,
} from 'lucide-react';
import './ExamModal.css';

export default function ExamModal() {
    const { modalExam: exam, modalFocusEvent: focusEvent, closeModal } = useUI();
    const { isInPlanner, togglePlanner } = useExams();

    const handleOverlayClick = useCallback(
        (e) => {
            if (e.target === e.currentTarget) closeModal();
        },
        [closeModal]
    );

    // Close on Escape key
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        if (exam) {
            document.addEventListener('keydown', handler);
            return () => document.removeEventListener('keydown', handler);
        }
    }, [exam, closeModal]);

    if (!exam) return null;

    const catColor = CATEGORY_COLORS[exam.category] || '#6b7491';
    const saved = isInPlanner(exam.id);

    return (
        <div className={`modal-overlay ${exam ? 'open' : ''}`} onClick={handleOverlayClick}>
            <div className="modal" role="dialog" aria-modal="true">
                <div className="modal-header">
                    <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                        <X size={16} />
                    </button>

                    {focusEvent && (
                        <div className="modal-event-type">
                            <span style={{ color: EVENT_TYPE_COLORS[focusEvent.type] }}>
                                {EVENT_TYPE_LABELS[focusEvent.type]}
                            </span>
                            {' · '}
                            {focusEvent.date}
                            {focusEvent.tentative && (
                                <span className="modal-tentative">
                                    <AlertTriangle size={10} /> Tentative
                                </span>
                            )}
                        </div>
                    )}

                    <div className="modal-exam-name">{exam.name}</div>

                    <div className="modal-meta">
                        <span className="cat-badge" style={{ background: `${catColor}22`, color: catColor }}>
                            {exam.category}
                        </span>
                        <span className="tag-pill">
                            <Building2 size={11} /> {exam.country}
                        </span>
                        <span className="tag-pill">
                            <RefreshCw size={11} /> {exam.frequency}
                        </span>
                    </div>
                </div>

                <div className="modal-body">
                    {/* All dates */}
                    <div className="modal-section-label">All Dates</div>
                    <div className="timeline-dates">
                        {exam.dates.map((d, i) => (
                            <div key={i} className="td-item">
                                <div className="td-dot" style={{ background: EVENT_TYPE_COLORS[d.type] }} />
                                <div className="td-label">
                                    {d.label}{' '}
                                    <span className="td-type-label">({EVENT_TYPE_LABELS[d.type]})</span>
                                </div>
                                <div className="td-date">{formatDate(d.date)}</div>
                                {d.tentative && (
                                    <span className="td-tentative">
                                        <AlertTriangle size={10} /> Tentative
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Info grid */}
                    <div className="modal-info-grid">
                        <div className="info-cell">
                            <div className="info-label">Conducted By</div>
                            <div className="info-val">{exam.conducting_body}</div>
                        </div>
                        <div className="info-cell">
                            <div className="info-label">Frequency</div>
                            <div className="info-val" style={{ textTransform: 'capitalize' }}>
                                {exam.frequency}
                            </div>
                        </div>
                        <div className="info-cell" style={{ gridColumn: '1 / -1' }}>
                            <div className="info-label">Eligibility</div>
                            <div className="info-val">{exam.eligibility || '—'}</div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="modal-section-label">Tags</div>
                    <div className="tags-wrap">
                        {exam.tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                                <Hash size={10} /> {tag}
                            </span>
                        ))}
                    </div>

                    {/* Official link */}
                    <a
                        className="official-link"
                        href={exam.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink size={14} /> Official Website
                    </a>

                    {/* Bookmark button */}
                    <button
                        className={`bookmark-btn ${saved ? 'saved' : ''}`}
                        onClick={() => togglePlanner(exam.id)}
                    >
                        {saved ? <StarOff size={14} /> : <Star size={14} />}
                        {saved ? 'Remove from Planner' : 'Add to My Planner'}
                    </button>
                </div>
            </div>
        </div>
    );
}
