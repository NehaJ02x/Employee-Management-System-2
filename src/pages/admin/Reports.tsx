import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';
import { UserCheck, Clock, CalendarDays, DollarSign, TrendingDown, Users } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import { departmentHeadcount, monthlyAttendanceTrend, leaveUtilization, payrollMonthlySummary } from '../../data/mockData';

const tabs = [
  { id: 'attendance', label: 'Attendance Report' },
  { id: 'leave', label: 'Leave Report' },
  { id: 'payroll', label: 'Payroll Report' },
  { id: 'analytics', label: 'Analytics' },
];

const headcountGrowth = [
  { year: '2022', count: 120 }, { year: '2023', count: 165 }, { year: '2024', count: 210 }, { year: '2025', count: 235 }, { year: '2026', count: 248 },
];
const attrition = [{ q: 'Q1', rate: 3.2 }, { q: 'Q2', rate: 4.8 }, { q: 'Q3', rate: 3.5 }, { q: 'Q4', rate: 4.2 }];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('attendance');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h1>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input type="date" className="input-field w-40" defaultValue="2026-03-01" />
        <span className="text-gray-400">to</span>
        <input type="date" className="input-field w-40" defaultValue="2026-03-17" />
        <select className="select-field w-40"><option>All Departments</option></select>
        <div className="ml-auto flex gap-2">
          <button className="btn-secondary text-xs">PDF</button>
          <button className="btn-secondary text-xs">Excel</button>
          <button className="btn-secondary text-xs">CSV</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <StatCard title="Avg Attendance" value="94%" icon={UserCheck} color="green" />
        <StatCard title="Late Rate" value="8%" icon={Clock} color="amber" />
        <StatCard title="Total Leaves" value={52} icon={CalendarDays} color="purple" />
        <StatCard title="Payroll" value="₹42.3L" icon={DollarSign} color="blue" />
        <StatCard title="Attrition" value="4.2%" icon={TrendingDown} color="red" />
        <StatCard title="Headcount" value={248} icon={Users} color="indigo" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'attendance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Department-wise Attendance Rate</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={departmentHeadcount.map(d => ({ name: d.name, rate: 88 + Math.floor(Math.random() * 10) }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis domain={[80, 100]} />
                  <Tooltip /><Bar dataKey="rate" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Monthly Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyAttendanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" /><YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#22c55e" name="Present %" />
                  <Bar dataKey="late" fill="#f59e0b" name="Late %" />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'leave' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Leave Utilization by Type</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={leaveUtilization}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="type" tick={{ fontSize: 10 }} /><YAxis />
                  <Tooltip />
                  <Bar dataKey="used" fill="#8b5cf6" name="Used" />
                  <Bar dataKey="total" fill="#e2e8f0" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-3">Top Leave Consumers</h3>
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-gray-50">
                  {['Employee', 'Department', 'Days', 'Type'].map(h => <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y">
                  {[['Mike Rajan', 'Marketing', '8', 'CL'], ['Alex Kumar', 'Sales', '7', 'SL'], ['Ravi Singh', 'Finance', '6', 'EL'], ['John Doe', 'Eng', '5', 'CL']].map((r, i) => (
                    <tr key={i}><td className="px-3 py-2">{r[0]}</td><td className="px-3 py-2">{r[1]}</td><td className="px-3 py-2 font-medium">{r[2]}</td><td className="px-3 py-2">{r[3]}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-gray-50">
                  {['Month', 'Gross', 'Deductions', 'PF Employer', 'ESI Employer', 'Net Payout'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y">
                  {payrollMonthlySummary.map(r => (
                    <tr key={r.month} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{r.month}</td>
                      <td className="px-4 py-2">₹{(r.gross / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-2 text-red-600">₹{(r.deductions / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-2">₹{(r.pfEmployer / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-2">₹{(r.esiEmployer / 100000).toFixed(1)}L</td>
                      <td className="px-4 py-2 font-semibold">₹{(r.netPayout / 100000).toFixed(1)}L</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Headcount Growth</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={headcountGrowth}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="year" /><YAxis />
                    <Tooltip /><Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-3">Attrition by Quarter</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={attrition}>
                    <CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="q" /><YAxis domain={[0, 10]} />
                    <Tooltip /><Line type="monotone" dataKey="rate" stroke="#ef4444" strokeWidth={2} name="Attrition %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">2.8 yrs</p><p className="text-xs text-gray-500">Avg Tenure</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">31</p><p className="text-xs text-gray-500">Avg Age</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">₹8.5L</p><p className="text-xs text-gray-500">Cost per Employee</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
