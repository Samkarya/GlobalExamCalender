import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './StaticPage.css';

export default function TermsPage() {
    return (
        <div className="page-wrapper">
            <Header />
            <main className="static-page-container">
                <h1 className="static-page-title">Terms of Service</h1>
                <div className="static-page-content">
                    <p>Last updated: April 2026</p>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using the Global Exam Calendar, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                    <h2>2. Disclaimer of Warranties</h2>
                    <p>
                        Our platform acts as a community-sourced directory for public exam dates. While we strive to ensure the accuracy of the dates and information provided, we offer absolutely no guarantees. Dates for registrations, admit cards, and examinations are entirely subject to change by their respective official regulatory bodies. You must always verify critical deadlines via the official links provided on the exam pages.
                    </p>
                    <h2>3. Intellectual Property</h2>
                    <p>
                        Global Exam Calendar is open-source software licensed under MIT. All exam trademarks, logos, and specific copyrights mentioned belong strictly to their respective official bodies.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
