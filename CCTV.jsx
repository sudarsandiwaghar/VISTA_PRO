import { useEffect, useState, useRef } from 'react';
import { cameras } from '../api/client';
import TrackingOverlay from '../components/TrackingOverlay';

function CameraFeed({ cam, large = false, overlay = true }) {
  const videoRef = useRef(null);
  return (
    <div className={`relative bg-slate-900 rounded-xl overflow-hidden ${large ? 'aspect-video' : 'aspect-video'}`}>
      {cam.stream_url ? (
        <video ref={videoRef} src={cam.stream_url} className="w-full h-full object-cover" autoPlay muted loop playsInline crossOrigin="anonymous" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-500 text-4xl">📷</div>
      )}
      {overlay && cam.status === 'active' && <TrackingOverlay count={Math.min(cam.person_count, 4) || 2} />}
      <div className="absolute top-2 right-2 text-[10px] font-mono bg-black/60 text-red-400 px-1.5 py-0.5 rounded flex items-center gap-1">
        {cam.is_recording && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />} REC
      </div>
      {!large && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <p className="text-white text-xs font-semibold truncate">{cam.name}</p>
          <p className="text-cyan-400 text-[10px]">👤 {cam.person_count} tracked</p>
        </div>
      )}
    </div>
  );
}

export default function CCTV() {
  const [cams, setCams] = useState([]);
  const [selected, setSelected] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [liveCounts, setLiveCounts] = useState({});

  useEffect(() => {
    cameras.list().then((r) => {
      setCams(r.data);
      if (r.data.length) setSelected(r.data[0].id);
      const counts = {};
      r.data.forEach((c) => { counts[c.id] = c.person_count; });
      setLiveCounts(counts);
    });
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setLiveCounts((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((id) => {
          const cam = cams.find((c) => c.id === parseInt(id));
          if (cam?.status === 'active') {
            next[id] = Math.max(1, (prev[id] || cam.person_count) + Math.floor(Math.random() * 3) - 1);
          }
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(t);
  }, [cams]);

  const active = cams.find((c) => c.id === selected);
  const statusColor = (s) => s === 'active' ? 'bg-emerald-500' : s === 'maintenance' ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title mb-1">CCTV Monitoring</h1>
          <p className="text-slate-500">Live feeds with AI detection overlays</p>
        </div>
        <div className="flex items-center gap-2 glass px-4 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium">{cams.filter((c) => c.status === 'active').length} cameras online</span>
        </div>
      </div>

      {active && (
        <div className={`glass-card mb-6 ${fullscreen ? 'fixed inset-4 z-50 overflow-auto' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="font-bold text-lg">{active.name}</h2>
              <p className="text-sm text-slate-500">{active.location}</p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <span className={`w-2 h-2 rounded-full ${statusColor(active.status)} animate-pulse`} />
              <span className="text-sm capitalize">{active.status}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                👤 {liveCounts[active.id] ?? active.person_count} persons
              </span>
              <button onClick={() => setFullscreen(!fullscreen)} className="btn-secondary text-sm py-1 px-3">{fullscreen ? 'Exit' : 'Fullscreen'}</button>
            </div>
          </div>
          <CameraFeed cam={active} large overlay={active.status === 'active'} />
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cams.map((cam) => (
          <button key={cam.id} onClick={() => setSelected(cam.id)}
            className={`glass-card p-2 text-left transition hover:-translate-y-0.5 ${selected === cam.id ? 'ring-2 ring-vista-500' : ''}`}>
            <CameraFeed cam={cam} overlay={cam.status === 'active'} />
            <div className="flex justify-between items-center mt-2 px-1">
              <span className={`w-2 h-2 rounded-full ${statusColor(cam.status)}`} />
              <span className="text-xs text-slate-500">{cam.is_recording ? '🔴 LIVE' : '⏸ OFF'}</span>
              <span className="text-xs text-cyan-500 font-mono">ID tracking active</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
