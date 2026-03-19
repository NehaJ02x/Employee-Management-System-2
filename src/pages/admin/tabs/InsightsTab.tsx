import { Users, TrendingUp, Clock, UserCheck, Briefcase, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { employees, departments, designations } from '../../../data/mockData';

const deptData = departments.map(d => ({ name: d.name, count: d.employeeCount }));
const typeData = [
  { name: 'Full-Time', value: employees.filter(e => e.type === 'Full-Time').length },
  { name: 'Contract', value: employees.filter(e => e.type === 'Contract').length },
  { name: 'Intern', value: employees.filter(e => e.type === 'Intern').length },
  { name: 'Part-Time', value: employees.filter(e => e.type === 'Part-Time').length },
].filter(d => d.value > 0);
const statusData = [
  { name: 'Active', value: employees.filter(e => e.status === 'Active').length, color: '#22c55e' },
  { name: 'Probation', value: employees.filter(e => e.status === 'Probation').length, color: '#f59e0b' },
  { name: 'Notice Period', value: employees.filter(e => e.status === 'Notice Period').length, color: '#ef4444' },
].filter(d => d.value > 0);
const genderData = [
  { name: 'Male', value: employees.filter(e => e.gender === 'Male').length, color: '#6366f1' },
  { name: 'Female', value: employees.filter(e => e.gender === 'Female').length, color: '#ec4899' },
].filter(d => d.value > 0);
const PIE_COLORS = ['#6366f1', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

const headcountTrend = [
  { month: 'Oct', count: 195 }, { month: 'Nov', count: 202 }, { month: 'Dec', count: 210 },
  { month: 'Jan', count: 215 }, { month: 'Feb', count: 219 }, { month: 'Mar', count: 222 },
];
const avgTenure = (employees.reduce((s, e) => {
  const y = (Date.now() - new Date(e.joinDate).getTime()) / (365.25*24*60*60*1000);
  return s + y;
}, 0) / employees.length).toFixed(1);

const levelData = [...new Set(designations.map(d => d.level))].sort().map(level => ({
  level, count: designations.filter(d => d.level === level).reduce((s, d) => s + d.employeeCount, 0),
}));

export default function InsightsTab() {
  const totalEmp = departments.reduce((s, d) => s + d.employeeCount, 0);
  const activeCount = employees.filter(e => e.status === 'Active').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Insights</h1>
      <p className="text-sm text-gray-500 mb-6">Workforce analytics and key metrics at a glance</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Headcount', value: totalEmp, icon: Users, color: 'indigo', sub: `${departments.length} departments` },
          { label: 'Active Employees', value: activeCount, icon: UserCheck, color: 'green', sub: `${((activeCount/employees.length)*100).toFixed(0)}% of listed` },
          { label: 'Avg Tenure', value: `${avgTenure} yrs`, icon: Clock, color: 'blue', sub: 'Across all employees' },
          { label: 'Open Designations', value: designations.length, icon: Briefcase, color: 'purple', sub: `${[...new Set(designations.map(d => d.level))].length} levels` },
        ].map(c => {
          const colorMap: Record<string, {bg: string; text: string; border: string}> = {
            indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-l-indigo-500' },
            green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-l-green-500' },
            blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-l-blue-500' },
            purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-l-purple-500' },
          };
          const cl = colorMap[c.color];
          return (
            <div key={c.label} className={`bg-white rounded-lg border border-gray-200 border-l-4 ${cl.border} p-4`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{c.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{c.value}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
                </div>
                <div className={`p-3 rounded-full ${cl.bg}`}><c.icon size={20} className={cl.text} /></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Headcount Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-indigo-500" />
            <h3 className="text-sm font-semibold text-gray-900">Headcount Trend (6 months)</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={headcountTrend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={{ fill: '#6366f1', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-blue-500" />
            <h3 className="text-sm font-semibold text-gray-900">Department Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Employment Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Employee Status Breakdown</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {statusData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {statusData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span className="text-sm text-gray-700">{d.name}</span>
                  <span className="text-sm font-semibold text-gray-900 ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gender Split */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Gender Distribution</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {genderData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {genderData.map(d => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span className="text-sm text-gray-700">{d.name}</span>
                  <span className="text-sm font-semibold text-gray-900 ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employment Type */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Employment Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={typeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[0,4,4,0]}>
                {typeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Level Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Employees by Level</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={levelData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="level" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
