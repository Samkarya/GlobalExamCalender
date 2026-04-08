import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './StaticPage.css';

export default function PrivacyPage() {
    return (
        <div className="page-wrapper">
            <Header />
            <main className="static-page-container">
                <h1 className="static-page-title">Privacy Policy</h1>
                <div className="static-page-content">
                    <p>Last updated: April 2026</p>
                    <h2>Information We Collect</h2>
                    <p>
                        The Global Exam Calendar is designed to be privacy-first. We do not require user accounts, and we do not actively collect personally identifiable information (PII). Any preferences, such as your saved "My Planner" exams, are stored locally on your device using IndexedDB or LocalStorage.
                    </p>
                    <h2>Analytics</h2>
                    <p>
                        We may use minimal, privacy-focused, cookie-less analytics to understand broad traffic patterns on the website. This data is fully anonymized.
                    </p>
                    <h2>Notifications</h2>
                    <p>
                        If you opt-in to exam background notifications, these are processed via the native browser Notification API. Neither your location nor your alert preferences are sent to our servers.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
