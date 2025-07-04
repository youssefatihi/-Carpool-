// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import TripListPage from './pages/TripListPage';
import TripDetailPage from './pages/TripDetailPage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Toutes les routes utilisent MainLayout */}
        <Route path="/" element={<MainLayout />}>
          {/* Pages publiques */}
          <Route index element={<HomePage />} />
          <Route path="trips" element={<TripListPage />} />
          <Route path="trips/:id" element={<TripDetailPage />} />
          
          {/* Pages authentifiées avec sidebar */}
          <Route path="dashboard" element={<DashboardPage />} />

          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
        {/* Routes sans layout (futures) */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;