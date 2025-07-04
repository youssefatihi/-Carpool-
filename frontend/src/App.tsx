import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import TripListPage from './pages/TripListPage';
import TripDetailPage from './pages/TripDetailPage';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route avec layout */}
        <Route path="/" element={<MainLayout />}>
          {/* index = route par défaut du parent */}
          <Route index element={<HomePage />} />
          
          {/* Routes des trajets */}
          <Route path="trips" element={<TripListPage />} />
          <Route path="trips/:id" element={<TripDetailPage />} />
          
          {/* TODO: Ajouter ces routes plus tard */}
          {/* <Route path="login" element={<LoginPage />} /> */}
          {/* <Route path="register" element={<RegisterPage />} /> */}
          {/* <Route path="my-trips" element={<MyTripsPage />} /> */}
          
          {/* Route 404 - doit être la dernière */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;