import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

export function StatCard({ title, value, icon, color = 'from-indigo-500 to-purple-500' }) {
  return (
    <div className="glass-card group hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
          <p className="text-3xl font-bold mt-1">{value ?? 0}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg`}>{icon}</div>
      </div>
    </div>
  );
}

export function ChartCard({ title, children, className = '' }) {
  return (
    <div className={`glass-card ${className}`}>
      <h3 className="font-semibold mb-4 text-slate-700 dark:text-slate-200">{title}</h3>
      {children}
    </div>
  );
}

export function LineChartWidget({ data, dataKey = 'value', color = '#6366f1' }) {
  const chartData = Array.isArray(data) && data.length ? data : [{ label: 'No data', value: 0 }];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: 'none', borderRadius: 12 }} />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarChartWidget({ data, dataKey = 'value', color = '#06b6d4' }) {
  const chartData = Array.isArray(data) && data.length ? data : [{ label: 'No data', value: 0 }];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
        <XAxis dataKey="label" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.9)', border: 'none', borderRadius: 12 }} />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function PieChartWidget({ data }) {
  const chartData = Array.isArray(data) && data.length ? data : [{ label: 'No data', value: 1 }];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={80} label>
          {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

export { COLORS };
