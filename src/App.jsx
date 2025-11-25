import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code-splitting
const Home = lazy(() => import('./pages/Home'));
const SnippetsPage = lazy(() => import('./pages/SnippetsPage'));
const SnippetDetail = lazy(() => import('./pages/SnippetDetail'));
const CheatSheetsPage = lazy(() => import('./pages/CheatSheetsPage'));
const CheatSheetDetail = lazy(() => import('./pages/CheatSheetDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-[#FAFAF5] flex items-center justify-center">
    <div className="text-2xl font-black">Loading...</div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/snippets" element={<SnippetsPage />} />
          <Route path="/snippet/:id" element={<SnippetDetail />} />
          <Route path="/cheat-sheets" element={<CheatSheetsPage />} />
          <Route path="/cheat-sheet/:id" element={<CheatSheetDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
