import { Link } from 'react-router-dom';
import { GitFork, Globe } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="logo-dot" />
                    <span className="logo-text">Global Exam <em>Calendar</em></span>
                    <p className="footer-tagline">
                        The open-source directory for all academic and professional exams.
                    </p>
                </div>

                <div className="footer-links">
                    <div className="footer-col">
                        <h4>Platform</h4>
                        <Link to="/">Home (Calendar)</Link>
                        <Link to="/sync">Calendar Sync</Link>
                        <a href="https://github.com/yourusername/global-exam-calendar" target="_blank" rel="noopener noreferrer">Contribute</a>
                    </div>

                    <div className="footer-col">
                        <h4>Legal</h4>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Company</h4>
                        <Link to="/about">About Us</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-socials">
                    <a href="#" aria-label="Website"><Globe size={16} /></a>
                    <a href="https://github.com/yourusername/global-exam-calendar" aria-label="GitHub"><GitFork size={16} /></a>
                </div>
                <p>&copy; {new Date().getFullYear()} Global Exam Calendar. Open Source.</p>
            </div>
        </footer>
    );
}
