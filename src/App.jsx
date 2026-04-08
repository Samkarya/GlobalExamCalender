import { ExamProvider } from './context/ExamContext';
import { UIProvider, useUI } from './context/UIContext';
import CalendarPage from './pages/CalendarPage';

/**
 * Inner shell that connects UIContext's showPlanner state
 * to ExamProvider's filtering pipeline.
 */
function AppShell() {
  const { showPlanner } = useUI();

  return (
    <ExamProvider showPlannerOnly={showPlanner}>
      <CalendarPage />
    </ExamProvider>
  );
}

export default function App() {
  return (
    <UIProvider>
      <AppShell />
    </UIProvider>
  );
}
