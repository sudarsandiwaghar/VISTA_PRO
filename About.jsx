export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="page-title mb-8">About VISTA</h1>
      <div className="space-y-6">
        <div className="glass-card">
          <h2 className="font-bold text-xl mb-3">Project</h2>
          <p className="text-slate-600 dark:text-slate-300">VISTA (Visual Intelligence – Surveillance for Tracking and Analysis) is an AI-based Smart Surveillance System integrating Multi-Object Tracking, Person Re-Identification, CCTV Monitoring, Movement Analytics, and Report Generation.</p>
        </div>
        <div className="glass-card">
          <h2 className="font-bold text-xl mb-3">Problem Statement</h2>
          <p className="text-slate-600 dark:text-slate-300">Traditional surveillance systems require continuous human monitoring, making it difficult to efficiently track individuals across multiple cameras and identify suspicious activities in crowded environments.</p>
        </div>
        <div className="glass-card">
          <h2 className="font-bold text-xl mb-3">Solution</h2>
          <p className="text-slate-600 dark:text-slate-300">VISTA uses AI-powered object detection, multi-object tracking, person re-identification, and movement analytics to automate surveillance, improve monitoring efficiency, and support faster security responses.</p>
        </div>
        <div className="glass-card">
          <h2 className="font-bold text-xl mb-3">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {['Python', 'OpenCV', 'YOLO', 'DeepSORT', 'FastAPI', 'React', 'Tailwind CSS', 'Recharts', 'ReportLab'].map((t) => (
              <span key={t} className="px-4 py-2 rounded-xl bg-vista-500/10 text-vista-600 dark:text-vista-400 font-medium">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
