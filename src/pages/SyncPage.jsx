import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { RefreshCw, Copy, Check, ExternalLink, Calendar } from 'lucide-react';
import { useState } from 'react';
import './SyncPage.css';

export default function SyncPage() {
    const [copied, setCopied] = useState(false);

    const copyLink = () => {
        const url = `${window.location.origin}/global.ics`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="page-wrapper">
            <Header />
            <main className="sync-page-container">
                <header className="sync-hero">
                    <div className="sync-icon-circle">
                        <RefreshCw size={32} className="spin-slow" />
                    </div>
                    <h1 className="static-page-title">Calendar Sync</h1>
                    <p className="sync-subtitle">
                        Keep your personal calendar updated with all global exam dates automatically.
                    </p>
                </header>

                <div className="sync-grid">
                    <section className="sync-card main-sync">
                        <h2>Subscribe to Global Feed</h2>
                        <p>
                            Get a live, auto-updating subscription to every exam in our database.
                        </p>

                        <div className="sync-actions">
                            <a href="/global.ics" className="btn-accent sync-btn">
                                <Calendar size={18} /> Subscribe Now
                            </a>
                            <button className="btn-outline sync-btn" onClick={copyLink}>
                                {copied ? <Check size={18} color="var(--success)" /> : <Copy size={18} />}
                                {copied ? 'Copied Link!' : 'Copy Feed URL'}
                            </button>
                        </div>

                        <p className="sync-note">
                            <strong>Note:</strong> Subscription updates can take 12-24 hours to reflect in your calendar app (Google, Outlook, Apple) depending on their polling frequency.
                        </p>
                    </section>

                    <section className="sync-card">
                        <h2>How to connect</h2>
                        <div className="guide-steps">
                            <div className="step">
                                <div className="step-num">1</div>
                                <div className="step-content">
                                    <h3>Copy the URL</h3>
                                    <p>Use the "Copy Feed URL" button above to get the unique .ics link.</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">2</div>
                                <div className="step-content">
                                    <h3>Open your Calendar</h3>
                                    <p>Go to your preferred app (Google Calendar, Outlook, or Apple Calendar).</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">3</div>
                                <div className="step-content">
                                    <h3>Add via URL</h3>
                                    <p>Look for "Add from URL", "Subscribe to Calendar", or "New Internet Calendar".</p>
                                </div>
                            </div>
                            <div className="step">
                                <div className="step-num">4</div>
                                <div className="step-content">
                                    <h3>Paste & Save</h3>
                                    <p>Paste the copied URL and your calendar will now auto-update!</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="sync-faq">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-item">
                        <h3>Is there a specific feed for just one exam?</h3>
                        <p>
                            Currently we provide a global consolidated feed. However, you can use the <strong>"Export .ics"</strong> button on the main calendar view to download a specific snapshot of your currently filtered exams.
                        </p>
                    </div>
                    <div className="faq-item">
                        <h3>Does this work on mobile?</h3>
                        <p>
                            Yes! Both iOS and Android support iCalendar subscriptions. On iOS, clicking "Subscribe" will usually trigger a system prompt automatically.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
