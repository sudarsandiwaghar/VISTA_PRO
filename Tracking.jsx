import { useEffect, useState } from 'react';
import { tracking, dashboard } from '../api/client';

export default function TrackingPage() {
  const [events, setEvents] = useState([]);
  const [heatmap, setHeatmap] = useState([]);

  useEffect(() => {
    tracking.list().then((r) => setEvents(r.data));
    dashboard.heatmap().then((r) => setHeatmap(r.data));
  }, []);

  const transitions = events.filter((e) => e.event_type === 'transition');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="page-title mb-2">Tracking Analysis</h1>
      <p className="text-slate-500 mb-8">Person tracking history and re-identification results</p>

      <div className="glass-card mb-6 flex items-center gap-3 overflow-hidden">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
        <p className="text-sm text-slate-500 shrink-0">Live tracking:</p>
        <div className="flex gap-4 animate-marquee whitespace-nowrap">
          {events.slice(0, 8).map((e) => (
            <span key={e.id} className="text-sm font-mono text-cyan-400">
              [{e.tracking_id}] {e.event_type} @ {e.camera_name?.split(' - ')[0]}
            </span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card">
          <h3 className="font-semibold mb-4">Movement Heatmap</h3>
          <div className="aspect-video bg-slate-900 rounded-xl relative overflow-hidden">
            {heatmap.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500">Configure heatmap points in Admin</div>
            ) : heatmap.map((p, i) => (
              <div key={i} className="absolute w-8 h-8 rounded-full bg-red-500/60 blur-sm" style={{ left: `${p.x}%`, top: `${p.y}%`, opacity: p.intensity }} />
            ))}
          </div>
        </div>
        <div className="glass-card">
          <h3 className="font-semibold mb-4">Camera Transition Timeline</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transitions.length === 0 ? (
              <p className="text-slate-500 text-sm">No transitions recorded. Add tracking events in Admin.</p>
            ) : transitions.map((t) => (
              <div key={t.id} className="flex gap-3 items-start p-3 rounded-xl bg-slate-500/5">
                <span className="text-vista-500 font-bold">#{t.tracking_id}</span>
                <div>
                  <p className="text-sm font-medium">{t.camera_name}</p>
                  <p className="text-xs text-slate-500">{t.description || t.zone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card overflow-x-auto">
        <h3 className="font-semibold mb-4">Tracking Event Table</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              {['ID', 'Tracking ID', 'Camera', 'Type', 'Zone', 'Confidence', 'Time'].map((h) => (
                <th key={h} className="text-left py-3 px-2 font-medium text-slate-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr><td colSpan={7} className="py-8 text-center text-slate-500">No tracking events. Configure in Admin panel.</td></tr>
            ) : events.map((e) => (
              <tr key={e.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-500/5">
                <td className="py-3 px-2">{e.id}</td>
                <td className="py-3 px-2 font-mono text-vista-500">{e.tracking_id}</td>
                <td className="py-3 px-2">{e.camera_name}</td>
                <td className="py-3 px-2 capitalize">{e.event_type}</td>
                <td className="py-3 px-2">{e.zone}</td>
                <td className="py-3 px-2">{(e.confidence * 100).toFixed(0)}%</td>
                <td className="py-3 px-2 text-xs">{e.timestamp ? new Date(e.timestamp).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
