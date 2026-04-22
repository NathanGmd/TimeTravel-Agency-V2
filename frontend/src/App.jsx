import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Cursor from './components/ui/Cursor.jsx';
import Toast from './components/ui/Toast.jsx';
import HomePage from './pages/HomePage.jsx';
import DestinationsPage from './pages/DestinationsPage.jsx';
import { useToast } from './hooks/useToast.js';
import { ToastContext } from './hooks/useToast.js';

export default function App() {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
        </Routes>
      </main>
      <Footer />
      <Toast />
    </ToastContext.Provider>
  );
}
