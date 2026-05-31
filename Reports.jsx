import { useState, useEffect } from 'react';
import { reports } from '../api/client';
import { useAuth } from '../context/AppContext';

export default function ReportsPage() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState('');
  const [form, setForm] = useState({ start_time: '00:00:00', end_time: '00:01:00', tracking_id: '', camera_name: '' });
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { reports.list().then((r) => setHistory(r.data)).catch(() => {}); }, [result]);

  const handleUpload = async () => {
    if (!file || !user) { setError('Login required to upload videos'); return; }
    setError('');
    try {
      const { data } = await reports.upload(file);
      setFileId(data.file_id);
    } catch (e) { setError(e.response?.data?.detail || 'Upload failed'); }
  };

  const handleProcess = async () => {
    if (!fileId || !user) return;
    setProcessing(true);
    setError('');
    try {
      const { data } = await reports.process(fileId, form);
      setResult(data);
    } catch (e) { setError(e.response?.data?.detail || 'Processing failed'); }
    finally { setProcessing(false); }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="page-title mb-2">Video Report Generator</h1>
      <p className="text-slate-500 mb-8">Upload CCTV video, run tracking, and generate PDF reports</p>

      {!user && <div className="glass-card mb-6 text-amber-600">Please <a href="/login" className="underline">login as admin</a> to upload and process videos.</div>}

      <div className="glass-card space-y-4 mb-8">
        <h3 className="font-semibold">Upload Video</h3>
        <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} className="input-field" />
        <button onClick={handleUpload} disabled={!file} className="btn-primary disabled:opacity-50">Upload</button>
        {fileId && <p className="text-sm text-emerald-500">Uploaded: {fileId}</p>}
      </div>

      <div className="glass-card space-y-4 mb-8">
        <h3 className="font-semibold">Processing Parameters</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="text-sm text-slate-500">Start Time (HH:MM:SS)</label><input className="input-field" value={form.start_time} onChange={(e) => setForm({ ...form, start_time: e.target.value })} /></div>
          <div><label className="text-sm text-slate-500">End Time (HH:MM:SS)</label><input className="input-field" value={form.end_time} onChange={(e) => setForm({ ...form, end_time: e.target.value })} /></div>
          <div><label className="text-sm text-slate-500">Tracking ID</label><input className="input-field" value={form.tracking_id} onChange={(e) => setForm({ ...form, tracking_id: e.target.value })} placeholder="Optional" /></div>
          <div><label className="text-sm text-slate-500">Camera Name</label><input className="input-field" value={form.camera_name} onChange={(e) => setForm({ ...form, camera_name: e.target.value })} /></div>
        </div>
        <button onClick={handleProcess} disabled={!fileId || processing || !user} className="btn-primary disabled:opacity-50">
          {processing ? 'Processing...' : 'Run Tracking & Generate Report'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>

      {result && (
        <div className="glass-card mb-8">
          <h3 className="font-semibold mb-4">Report Generated</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm mb-4">
            <p><strong>Person Count:</strong> {result.person_count}</p>
            <p><strong>Status:</strong> {result.status}</p>
            <p className="sm:col-span-2"><strong>Summary:</strong> {result.tracking_summary}</p>
          </div>
          <div className="flex gap-3">
            <a href={reports.pdfUrl(result.id)} className="btn-primary text-sm" download>Download PDF</a>
            <a href={reports.videoUrl(result.id)} className="btn-secondary text-sm" download>Download Processed Video</a>
          </div>
        </div>
      )}

      <div className="glass-card">
        <h3 className="font-semibold mb-4">Report History</h3>
        {history.length === 0 ? <p className="text-slate-500 text-sm">No reports yet.</p> : (
          <div className="space-y-2">
            {history.map((r) => (
              <div key={r.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-500/5 text-sm">
                <span>{r.title} — {r.camera_name}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${r.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20'}`}>{r.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
