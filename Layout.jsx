import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTheme, useAuth } from '../context/AppContext';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/cctv', label: 'CCTV' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/tracking', label: 'Tracking' },
  { to: '/reports', label: 'Reports' },
  { to: '/about', label: 'About' },
  { to: '/team', label: 'Team' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const loc = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="w-9 h-9 rounded-xl bg-vista-gradient flex items-center justify-center text-white text-sm">V</span>
            <span className="bg-vista-gradient bg-clip-text text-transparent hidden sm:inline">VISTA</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={`px-3 py-2 rounded-lg text-sm font-medium transition ${loc.pathname === n.to ? 'bg-vista-500/20 text-vista-600 dark:text-vista-400' : 'hover:bg-slate-500/10'}`}>{n.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggle} className="p-2 rounded-lg hover:bg-slate-500/10" aria-label="Toggle theme">{dark ? '☀️' : '🌙'}</button>
            {user ? (
              <>
                <Link to="/admin" className="btn-secondary text-sm py-1.5 px-3 hidden sm:inline">Admin</Link>
                <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-1.5 px-4">Login</Link>
            )}
            <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>☰</button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden px-4 pb-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-500/10">{n.label}</Link>
            ))}
          </div>
        )}
      </nav>
      <main className="flex-1"><Outlet /></main>
      <footer className="glass border-t border-white/10 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
          <p className="font-semibold text-vista-600 dark:text-vista-400">VISTA — Visual Intelligence Surveillance</p>
          <p className="mt-1">© 2026 VISTA Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
