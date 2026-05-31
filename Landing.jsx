import { Link } from 'react-router-dom';

const features = [
  { icon: '🎯', title: 'Multi-Object Tracking', desc: 'Track multiple persons across camera feeds in real-time.' },
  { icon: '🔍', title: 'Person Re-ID', desc: 'Re-identify individuals across different camera zones.' },
  { icon: '📹', title: 'CCTV Monitoring', desc: 'Monitor 5-10 camera feeds with live detection overlays.' },
  { icon: '📊', title: 'Movement Analytics', desc: 'Analyze footfall, crowd density, and zone occupancy.' },
  { icon: '📄', title: 'Report Generation', desc: 'Generate PDF reports and processed video clips.' },
  { icon: '🚨', title: 'Alert System', desc: 'Configurable alert thresholds for security events.' },
];

export default function Landing() {
  return (
    <div>
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-vista-gradient opacity-10 dark:opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1 rounded-full glass text-sm font-medium text-vista-600 dark:text-cyan-glow mb-6">AI-Powered Surveillance</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-vista-gradient bg-clip-text text-transparent">VISTA</span>
              <br />Smart Surveillance System
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Visual Intelligence – Surveillance for Tracking and Analysis. Automate monitoring, track individuals across cameras, and generate actionable security reports.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/dashboard" className="btn-primary">Open Dashboard</Link>
              <Link to="/about" className="btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="page-title text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-card hover:-translate-y-1 group">
              <span className="text-4xl mb-4 block group-hover:animate-float">{f.icon}</span>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-slate-100/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="page-title mb-6">Why VISTA?</h2>
            <ul className="space-y-4">
              {['Reduce manual monitoring workload', 'Track persons across multiple cameras', 'Detect suspicious activities faster', 'Generate professional surveillance reports', 'Configurable admin-controlled settings'].map((b) => (
                <li key={b} className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-vista-gradient text-white flex items-center justify-center text-xs">✓</span>{b}</li>
              ))}
            </ul>
          </div>
          <div className="glass-card p-8">
            <h3 className="font-bold mb-4">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Python', 'FastAPI', 'OpenCV', 'YOLO', 'DeepSORT', 'React', 'Tailwind CSS', 'Recharts'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg bg-vista-500/10 text-vista-600 dark:text-vista-400 text-sm font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="page-title text-center mb-8">System Preview</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {['Dashboard Overview', 'CCTV Grid View', 'Analytics Charts'].map((title, i) => (
            <div key={title} className="glass-card aspect-video flex items-center justify-center bg-gradient-to-br from-indigo-500/20 to-cyan-500/20">
              <div className="text-center">
                <div className="text-5xl mb-2">{['📊', '📹', '📈'][i]}</div>
                <p className="font-semibold">{title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4 glass-card">
          <h2 className="text-2xl font-bold mb-4">Ready to Monitor?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Access the surveillance dashboard and start configuring your system.</p>
          <Link to="/login" className="btn-primary">Admin Login</Link>
        </div>
      </section>
    </div>
  );
}
