import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';

export default function Login() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/admin');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="glass-card w-full max-w-md space-y-4">
        <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-vista-gradient flex items-center justify-center text-2xl text-white font-bold mb-3">V</div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-slate-500">VISTA Surveillance System</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <input className="input-field" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="input-field" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-primary w-full">Login</button>
        <p className="text-xs text-center text-slate-400">Default: admin / admin123</p>
      </form>
    </div>
  );
}
