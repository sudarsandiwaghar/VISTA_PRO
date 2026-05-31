import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import CCTV from './pages/CCTV';
import Analytics from './pages/Analytics';
import Tracking from './pages/Tracking';
import Reports from './pages/Reports';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cctv" element={<CCTV />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="reports" element={<Reports />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}
