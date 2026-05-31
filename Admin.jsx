import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { dashboard, cameras, analytics, team, tracking, alerts, dashboard as dashApi } from '../api/client';

const TABS = ['Dashboard', 'Cameras', 'Analytics', 'Tracking', 'Alerts', 'Team'];

export default function Admin() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('Dashboard');
  const [stats, setStats] = useState({});
  const [cams, setCams] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({});
  const [events, setEvents] = useState([]);
  const [alertList, setAlertList] = useState([]);
  const [members, setMembers] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const load = async () => {
    const [s, c, e, a, m] = await Promise.all([
      dashboard.stats(), cameras.list(), tracking.list(), alerts.list(), team.list(),
    ]);
    setStats(s.data);
    setCams(c.data);
    setEvents(e.data);
    setAlertList(a.data);
    setMembers(m.data);
    const cats = ['daily_footfall', 'hourly_crowd', 'zone_occupancy', 'alert_frequency', 'camera_usage', 'peak_movement'];
    const ad = {};
    for (const cat of cats) {
      const r = await analytics.get(cat);
      ad[cat] = r.data;
    }
    setAnalyticsData(ad);
  };

  useEffect(() => { if (user) load(); }, [user]);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const saveStats = async () => {
    await dashboard.updateStats({
      total_cameras: parseInt(stats.total_cameras),
      active_cameras: parseInt(stats.active_cameras),
      persons_detected: parseInt(stats.persons_detected),
      alerts_generated: parseInt(stats.alerts_generated),
      tracking_sessions: parseInt(stats.tracking_sessions),
      reports_generated: parseInt(stats.reports_generated),
      alert_threshold: parseInt(stats.alert_threshold),
    });
    flash('Dashboard stats saved');
  };

  const saveChart = async (key) => {
    await dashApi.updateChart(key, stats[key]);
    flash(`${key} saved`);
  };

  const updateCam = async (id, field, value) => {
    await cameras.update(id, { [field]: value });
    load();
    flash('Camera updated');
  };

  const setCamCount = async (count) => {
    await cameras.setCount(count);
    load();
    flash(`Camera count set to ${count}`);
  };

  const saveAnalytics = async (cat) => {
    await analytics.update(cat, analyticsData[cat].map((d) => ({ category: cat, label: d.label, value: d.value, sort_order: d.sort_order })));
    flash(`${cat} saved`);
  };

  const addTracking = async () => {
    await tracking.create({ tracking_id: 'T001', camera_name: 'Camera 1', event_type: 'detection', zone: 'Zone A', confidence: 0.95 });
    load();
  };

  const addAlert = async () => {
    await alerts.create({ title: 'New Alert', message: 'Configured by admin', severity: 'medium', camera_name: 'Camera 1' });
    load();
  };

  const addMember = async () => {
    await team.create({ name: 'New Member', role: 'Developer', email: 'member@vista.local' });
    load();
  };

  if (loading || !user) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="page-title mb-2">Admin Panel</h1>
      <p className="text-slate-500 mb-4">Configure all system values manually</p>
      {msg && <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 text-emerald-600 text-sm">{msg}</div>}

      <div className="flex flex-wrap gap-2 mb-6">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium transition ${tab === t ? 'bg-vista-gradient text-white' : 'glass hover:bg-slate-500/10'}`}>{t}</button>
        ))}
      </div>

      {tab === 'Dashboard' && (
        <div className="space-y-6">
          <div className="glass-card grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['total_cameras', 'active_cameras', 'persons_detected', 'alerts_generated', 'tracking_sessions', 'reports_generated', 'alert_threshold'].map((k) => (
              <div key={k}><label className="text-xs text-slate-500 capitalize">{k.replace(/_/g, ' ')}</label>
                <input className="input-field" type="number" value={stats[k] ?? 0} onChange={(e) => setStats({ ...stats, [k]: e.target.value })} /></div>
            ))}
            <div className="sm:col-span-2 lg:col-span-3"><button onClick={saveStats} className="btn-primary">Save Stats</button></div>
          </div>
          {['detection_trends', 'person_count_trends', 'daily_activity', 'weekly_activity', 'alert_statistics'].map((key) => (
            <div key={key} className="glass-card">
              <h3 className="font-semibold mb-2 capitalize">{key.replace(/_/g, ' ')} (JSON array: label, value)</h3>
              <textarea className="input-field font-mono text-xs min-h-[100px]" value={JSON.stringify(stats[key] || [], null, 2)}
                onChange={(e) => { try { setStats({ ...stats, [key]: JSON.parse(e.target.value) }); } catch {} }} />
              <button onClick={() => saveChart(key)} className="btn-secondary mt-2 text-sm">Save Chart</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Cameras' && (
        <div className="space-y-4">
          <div className="glass-card flex gap-4 items-end">
            <div><label className="text-xs text-slate-500">Camera Count (5-10)</label>
              <input type="number" min={5} max={10} className="input-field w-24" defaultValue={cams.length} id="camCount" /></div>
            <button onClick={() => setCamCount(parseInt(document.getElementById('camCount').value))} className="btn-primary">Set Count</button>
          </div>
          {cams.map((c) => (
            <div key={c.id} className="glass-card grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <input className="input-field" defaultValue={c.name} onBlur={(e) => updateCam(c.id, 'name', e.target.value)} placeholder="Name" />
              <input className="input-field" defaultValue={c.location} onBlur={(e) => updateCam(c.id, 'location', e.target.value)} placeholder="Location" />
              <select className="input-field" defaultValue={c.status} onChange={(e) => updateCam(c.id, 'status', e.target.value)}>
                <option value="active">Active</option><option value="inactive">Inactive</option><option value="maintenance">Maintenance</option>
              </select>
              <input className="input-field" type="number" defaultValue={c.person_count} onBlur={(e) => updateCam(c.id, 'person_count', parseInt(e.target.value))} placeholder="Person Count" />
              <input className="input-field" type="number" defaultValue={c.alert_threshold} onBlur={(e) => updateCam(c.id, 'alert_threshold', parseInt(e.target.value))} placeholder="Alert Threshold" />
              <input className="input-field sm:col-span-2" defaultValue={c.stream_url} onBlur={(e) => updateCam(c.id, 'stream_url', e.target.value)} placeholder="Stream URL" />
            </div>
          ))}
        </div>
      )}

      {tab === 'Analytics' && (
        <div className="space-y-6">
          {Object.entries(analyticsData).map(([cat, items]) => (
            <div key={cat} className="glass-card">
              <h3 className="font-semibold mb-3 capitalize">{cat.replace(/_/g, ' ')}</h3>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={item.id} className="flex gap-2">
                    <input className="input-field flex-1" value={item.label} readOnly />
                    <input className="input-field w-32" type="number" value={item.value}
                      onChange={(e) => { const u = [...items]; u[i] = { ...item, value: parseFloat(e.target.value) }; setAnalyticsData({ ...analyticsData, [cat]: u }); }} />
                  </div>
                ))}
              </div>
              <button onClick={() => saveAnalytics(cat)} className="btn-secondary mt-3 text-sm">Save {cat}</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Tracking' && (
        <div className="glass-card">
          <button onClick={addTracking} className="btn-primary mb-4">Add Sample Event</button>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {events.map((e) => (
              <div key={e.id} className="flex justify-between p-2 rounded bg-slate-500/5 text-sm">
                <span>#{e.tracking_id} — {e.camera_name} — {e.event_type}</span>
                <button onClick={() => tracking.delete(e.id).then(load)} className="text-red-500 text-xs">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'Alerts' && (
        <div className="glass-card">
          <button onClick={addAlert} className="btn-primary mb-4">Add Alert</button>
          {alertList.map((a) => (
            <div key={a.id} className="p-3 mb-2 rounded bg-slate-500/5 text-sm flex justify-between">
              <span>{a.title} ({a.severity})</span>
              <button onClick={() => alerts.delete(a.id).then(load)} className="text-red-500 text-xs">Delete</button>
            </div>
          ))}
        </div>
      )}

      {tab === 'Team' && (
        <div className="space-y-4">
          <button onClick={addMember} className="btn-primary">Add Member</button>
          {members.map((m) => (
            <div key={m.id} className="glass-card grid sm:grid-cols-2 gap-3">
              <input className="input-field" defaultValue={m.name} onBlur={(e) => team.update(m.id, { name: e.target.value }).then(load)} />
              <input className="input-field" defaultValue={m.role} onBlur={(e) => team.update(m.id, { role: e.target.value }).then(load)} />
              <input className="input-field" defaultValue={m.email} onBlur={(e) => team.update(m.id, { email: e.target.value }).then(load)} />
              <input className="input-field" defaultValue={m.phone} onBlur={(e) => team.update(m.id, { phone: e.target.value }).then(load)} />
              <textarea className="input-field sm:col-span-2" defaultValue={m.bio} onBlur={(e) => team.update(m.id, { bio: e.target.value }).then(load)} />
              <button onClick={() => team.delete(m.id).then(load)} className="text-red-500 text-sm">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
