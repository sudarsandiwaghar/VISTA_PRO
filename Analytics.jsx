import { useEffect, useState } from 'react';
import { analytics } from '../api/client';
import { ChartCard, LineChartWidget, BarChartWidget, PieChartWidget } from '../components/Charts';

const CATEGORIES = [
  { key: 'daily_footfall', title: 'Daily Footfall', type: 'bar', color: '#6366f1' },
  { key: 'hourly_crowd', title: 'Hourly Crowd Density', type: 'line', color: '#06b6d4' },
  { key: 'zone_occupancy', title: 'Zone Occupancy', type: 'bar', color: '#8b5cf6' },
  { key: 'alert_frequency', title: 'Alert Frequency', type: 'pie' },
  { key: 'camera_usage', title: 'Camera Usage Statistics', type: 'bar', color: '#10b981' },
  { key: 'peak_movement', title: 'Peak Movement Hours', type: 'line', color: '#f59e0b' },
];

export default function AnalyticsPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    CATEGORIES.forEach(({ key }) => {
      analytics.get(key).then((r) => {
        setData((prev) => ({ ...prev, [key]: r.data.map((d) => ({ label: d.label, value: d.value })) }));
      });
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="page-title mb-2">Movement Analytics</h1>
      <p className="text-slate-500 mb-8">Professional analytics dashboard — admin configurable values</p>
      <div className="grid lg:grid-cols-2 gap-6">
        {CATEGORIES.map(({ key, title, type, color }) => (
          <ChartCard key={key} title={title}>
            {type === 'pie' ? <PieChartWidget data={data[key]} /> :
             type === 'line' ? <LineChartWidget data={data[key]} color={color} /> :
             <BarChartWidget data={data[key]} color={color} />}
          </ChartCard>
        ))}
      </div>
    </div>
  );
}
