import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('vista_theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('vista_theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('vista_token');
    if (!token) { setLoading(false); return; }
    import('../api/client').then(({ auth }) =>
      auth.me().then((r) => setUser(r.data)).catch(() => localStorage.removeItem('vista_token')).finally(() => setLoading(false))
    );
  }, []);

  const login = async (username, password) => {
    const { auth } = await import('../api/client');
    const { data } = await auth.login(username, password);
    localStorage.setItem('vista_token', data.access_token);
    const me = await auth.me();
    setUser(me.data);
    return me.data;
  };

  const logout = () => {
    localStorage.removeItem('vista_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
