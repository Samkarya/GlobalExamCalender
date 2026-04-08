import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './StaticPage.css';

export default function ContactPage() {
    return (
        <div className="page-wrapper">
            <Header />
            <main className="static-page-container">
                <h1 className="static-page-title">Contact Us</h1>
                <div className="static-page-content">
                    <p>
                        We love hearing from students, educators, and open-source contributors!
                    </p>
                    <h2>Reporting Errors</h2>
                    <p>
                        Spotted a typo or an outdated exam date? The fastest way to get it fixed is to submit an issue or a direct Pull Request on our GitHub repository.
                    </p>
                    <ul>
                        <li><a href="https://github.com/yourusername/global-exam-calendar/issues" target="_blank" rel="noopener noreferrer">Open a GitHub Issue</a></li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}
