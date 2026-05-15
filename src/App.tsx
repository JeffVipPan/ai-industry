import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { NodeUniverse } from './components/NodeUniverse';
import { CompanyPage } from './pages/CompanyPage';
import { HomePage } from './pages/HomePage';
import { LayerPage } from './pages/LayerPage';
import { MapPage } from './pages/MapPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TimelinePage } from './pages/TimelinePage';
import { ValueFlowPage } from './pages/ValueFlowPage';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/layers/:layerId" element={<LayerPage />} />
    <Route path="/companies/:companyId" element={<CompanyPage />} />
    <Route path="/map" element={<MapPage />} />
    <Route path="/value-flow" element={<ValueFlowPage />} />
    <Route path="/timeline" element={<TimelinePage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <NodeUniverse />
    <AppShell>
      <AppRoutes />
    </AppShell>
  </BrowserRouter>
);

export default App;
