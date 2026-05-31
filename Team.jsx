import { useEffect, useState } from 'react';
import { team } from '../api/client';

export default function TeamPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => { team.list().then((r) => setMembers(r.data)); }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="page-title mb-2 text-center">Project Team</h1>
      <p className="text-slate-500 text-center mb-12">Meet the VISTA development team</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m) => (
          <div key={m.id} className="glass-card text-center hover:-translate-y-1 transition">
            <div className="w-24 h-24 mx-auto rounded-full bg-vista-gradient flex items-center justify-center text-3xl text-white font-bold mb-4">
              {m.photo_url ? <img src={m.photo_url} alt={m.name} className="w-full h-full rounded-full object-cover" /> : m.name.charAt(0)}
            </div>
            <h3 className="font-bold text-lg">{m.name}</h3>
            <p className="text-vista-500 dark:text-cyan-glow text-sm mb-2">{m.role}</p>
            {m.bio && <p className="text-sm text-slate-500 mb-3">{m.bio}</p>}
            <div className="text-sm space-y-1">
              {m.email && <p>📧 {m.email}</p>}
              {m.phone && <p>📞 {m.phone}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
