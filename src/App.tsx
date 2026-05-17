import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { CompanyPage } from './pages/CompanyPage';
import { ConsolePage } from './pages/ConsolePage';
import { HomePage } from './pages/HomePage';
import { LayerPage } from './pages/LayerPage';
import { MapPage } from './pages/MapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TimelinePage } from './pages/TimelinePage';
import { ValueFlowPage } from './pages/ValueFlowPage';

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, search, hash]);

  return null;
};

export const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/console" element={<ConsolePage />} />
      <Route path="/layers/:layerId" element={<LayerPage />} />
      <Route path="/companies/:companyId" element={<CompanyPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/value-flow" element={<ValueFlowPage />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

const App = () => (
  <BrowserRouter>
    <AppShell>
      <AppRoutes />
    </AppShell>
  </BrowserRouter>
);

export default App;
