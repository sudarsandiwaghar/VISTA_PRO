import { useState, useEffect } from 'react';
import { contact, team } from '../api/client';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [members, setMembers] = useState([]);

  useEffect(() => { team.list().then((r) => setMembers(r.data)); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await contact.submit(form);
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="page-title mb-8 text-center">Contact Us</h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="glass-card space-y-4">
          <h3 className="font-semibold">Send a Message</h3>
          {sent && <p className="text-emerald-500 text-sm">Message sent successfully!</p>}
          <input className="input-field" placeholder="Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input-field" type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input-field" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
          <textarea className="input-field min-h-[120px]" placeholder="Message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          <button type="submit" className="btn-primary w-full">Send Message</button>
        </form>
        <div className="space-y-6">
          <div className="glass-card">
            <h3 className="font-semibold mb-4">Team Contacts</h3>
            {members.map((m) => (
              <div key={m.id} className="mb-3 pb-3 border-b border-slate-200 dark:border-slate-700 last:border-0">
                <p className="font-medium">{m.name}</p>
                <p className="text-sm text-slate-500">{m.role}</p>
                {m.email && <p className="text-sm">{m.email}</p>}
              </div>
            ))}
          </div>
          <div className="glass-card">
            <h3 className="font-semibold mb-2">Project Information</h3>
            <p className="text-sm text-slate-500">VISTA — Visual Intelligence Surveillance for Tracking and Analysis</p>
            <div className="flex gap-3 mt-4">
              {['GitHub', 'LinkedIn', 'Email'].map((s) => (
                <span key={s} className="px-3 py-1 rounded-lg bg-vista-500/10 text-sm text-vista-600 dark:text-vista-400">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
