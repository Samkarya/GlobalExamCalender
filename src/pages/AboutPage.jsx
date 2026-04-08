import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './StaticPage.css';

export default function AboutPage() {
    return (
        <div className="page-wrapper">
            <Header />
            <main className="static-page-container">
                <h1 className="static-page-title">About Us</h1>
                <div className="static-page-content">
                    <p>
                        The Global Exam Calendar was born out of a simple necessity: students and professionals need a centralized, reliable, and accessible way to track critical examination dates worldwide.
                    </p>
                    <h2>Our Mission</h2>
                    <p>
                        We aim to democratize access to examination schedules by providing an open-source, community-driven platform. We believe that no one should miss a certification or academic opportunity because of a lack of visibility into registration or examination dates.
                    </p>
                    <h2>Open Source</h2>
                    <p>
                        This platform is entirely open-source. All of our data is stored as accessible JSON files, easily updatable by contributors around the globe. If you see missing information or incorrect dates, you can submit a pull request on our GitHub repository.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
