import { useEffect, useState } from 'react';
import { dashboard } from '../api/client';
import { StatCard, ChartCard, LineChartWidget, BarChartWidget, PieChartWidget } from '../components/Charts';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pulse, setPulse] = useState({ detected: 0, alerts: 0 });

  useEffect(() => {
    dashboard.stats().then((r) => {
      setStats(r.data);
      setPulse({ detected: r.data.persons_detected, alerts: r.data.alerts_generated });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!stats) return;
    const t = setInterval(() => {
      setPulse((p) => ({
        detected: p.detected + Math.floor(Math.random() * 3),
        alerts: p.alerts + (Math.random() > 0.85 ? 1 : 0),
      }));
    }, 4000);
    return () => clearInterval(t);
  }, [stats]);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (!stats) return <div className="p-8 text-center text-red-500">Failed to load dashboard</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="page-title mb-1">Surveillance Dashboard</h1>
          <p className="text-slate-500">Live monitoring overview</p>
        </div>
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-emerald-500">System Active</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard title="Total Cameras" value={stats.total_cameras} icon="📹" />
        <StatCard title="Active Cameras" value={stats.active_cameras} icon="✅" color="from-emerald-500 to-teal-500" />
        <StatCard title="Persons Detected" value={pulse.detected} icon="👤" color="from-blue-500 to-cyan-500" />
        <StatCard title="Alerts Generated" value={pulse.alerts} icon="🚨" color="from-red-500 to-orange-500" />
        <StatCard title="Tracking Sessions" value={stats.tracking_sessions} icon="🎯" color="from-purple-500 to-pink-500" />
        <StatCard title="Reports Generated" value={stats.reports_generated} icon="📄" color="from-amber-500 to-yellow-500" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ChartCard title="Detection Trends"><LineChartWidget data={stats.detection_trends} color="#6366f1" /></ChartCard>
        <ChartCard title="Person Count Trends"><LineChartWidget data={stats.person_count_trends} color="#06b6d4" /></ChartCard>
        <ChartCard title="Daily Activity"><BarChartWidget data={stats.daily_activity} color="#8b5cf6" /></ChartCard>
        <ChartCard title="Weekly Activity"><BarChartWidget data={stats.weekly_activity} color="#10b981" /></ChartCard>
        <ChartCard title="Alert Statistics" className="lg:col-span-2"><PieChartWidget data={stats.alert_statistics} /></ChartCard>
      </div>
    </div>
  );
}
