import { useEffect, useState } from 'react';

const PRESETS = [
  [{ id: 'T001', x: 18, y: 22, w: 12, h: 28 }, { id: 'T003', x: 55, y: 40, w: 10, h: 25 }, { id: 'T007', x: 72, y: 15, w: 11, h: 30 }],
  [{ id: 'T002', x: 30, y: 35, w: 13, h: 27 }, { id: 'T005', x: 60, y: 55, w: 10, h: 24 }],
  [{ id: 'T004', x: 42, y: 20, w: 12, h: 28 }, { id: 'T006', x: 25, y: 60, w: 11, h: 26 }, { id: 'T008', x: 68, y: 45, w: 10, h: 25 }],
];

export default function TrackingOverlay({ count = 3 }) {
  const [frame, setFrame] = useState(0);
  const [boxes, setBoxes] = useState(PRESETS[0]);

  useEffect(() => {
    const t = setInterval(() => {
      setFrame((f) => {
        const next = (f + 1) % PRESETS.length;
        setBoxes(PRESETS[next].map((b) => ({
          ...b,
          x: b.x + (Math.random() - 0.5) * 4,
          y: b.y + (Math.random() - 0.5) * 3,
        })));
        return next;
      });
    }, 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-3 left-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-mono text-red-400 bg-black/50 px-2 py-0.5 rounded">LIVE</span>
        <span className="text-xs font-mono text-cyan-400 bg-black/50 px-2 py-0.5 rounded">YOLO+DeepSORT</span>
      </div>
      <svg className="absolute inset-0 w-full h-full">
        {boxes.slice(0, count).map((b) => (
          <g key={b.id}>
            <rect
              x={`${b.x}%`} y={`${b.y}%`} width={`${b.w}%`} height={`${b.h}%`}
              fill="none" stroke="#06b6d4" strokeWidth="2"
              className="animate-pulse"
              style={{ filter: 'drop-shadow(0 0 6px #06b6d4)' }}
            />
            <rect x={`${b.x}%`} y={`${b.y - 4}%`} width="14%" height="4%" fill="#06b6d4" opacity="0.85" rx="2" />
            <text x={`${b.x + 1}%`} y={`${b.y - 1.2}%`} fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">
              ID:{b.id}
            </text>
          </g>
        ))}
      </svg>
      <div className="absolute bottom-3 left-3 text-xs font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded">
        ▶ Tracking {boxes.length} objects
      </div>
    </div>
  );
}
