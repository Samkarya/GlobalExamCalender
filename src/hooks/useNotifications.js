import { useEffect } from 'react';
import { useExams } from '../context/ExamContext';
import { flattenExamsToEvents } from '../utils/examUtils';

export function useNotifications() {
    const { exams, plannerIds } = useExams();

    useEffect(() => {
        // Request permission on mount if not granted or denied
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        if (!exams.length || !plannerIds.length) return;

        // Check for upcoming events every hour
        const checkForUpcoming = () => {
            const plannerExams = exams.filter(e => plannerIds.includes(e.id));
            const plannerEvents = flattenExamsToEvents(plannerExams);

            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);

            // Check if any planner event is happening exactly tomorrow (or next 24 hours essentially)
            // Note: Since our data is statically 2026 for this demo, notifications will fire
            // if the user's system clock is approaching those dates.
            plannerEvents.forEach(event => {
                const eventDate = new Date(event.date);
                // Simple logic: if the event is 1 day away
                const diffTime = eventDate.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                // If it's precisely 1 day away and we haven't notified yet (using localStorage as a simple DB)
                if (diffDays === 1) {
                    const notifyKey = `notified-${event.exam_id}-${event.type}`;
                    if (!localStorage.getItem(notifyKey)) {
                        new Notification("Upcoming Exam Event", {
                            body: `${event.exam_short_name}: ${event.label} is tomorrow (${event.date})!`,
                            icon: '/vite.svg'
                        });
                        localStorage.setItem(notifyKey, 'true');
                    }
                }
            });
        };

        checkForUpcoming();

        // Setup interval to check every 1 hour (3600000ms)
        const intervalId = setInterval(checkForUpcoming, 3600000);
        return () => clearInterval(intervalId);
    }, [exams, plannerIds]);

    return null;
}
