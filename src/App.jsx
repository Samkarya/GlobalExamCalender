import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import { UIProvider, useUI } from './context/UIContext';
import CalendarPage from './pages/CalendarPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ContactPage from './pages/ContactPage';
import SyncPage from './pages/SyncPage';

/**
 * Inner shell that connects UIContext's showPlanner state
 * to ExamProvider's filtering pipeline.
 */
function AppShell() {
  const { showPlanner } = useUI();

  return (
    <ExamProvider showPlannerOnly={showPlanner}>
      <Routes>
        <Route path="/" element={<CalendarPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sync" element={<SyncPage />} />
      </Routes>
    </ExamProvider>
  );
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <UIProvider>
        <AppShell />
      </UIProvider>
    </Router>
  );
}
