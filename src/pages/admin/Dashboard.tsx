import { useState } from 'react';
import { Users, UserCheck, CalendarOff, Briefcase, Clock, DollarSign, Play, Coffee, Square } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import StatCard from '../../components/common/StatCard';
import Timeline from '../../components/common/Timeline';
import { pendingApprovals, departmentHeadcount, birthdayList, announcements } from '../../data/mockData';

const attendanceOverview = [
  { name: 'Present', value: 215, fill: '#22c55e' },
  { name: 'Late', value: 7, fill: '#f59e0b' },
  { name: 'WFH', value: 8, fill: '#3b82f6' },
  { name: 'Leave', value: 18, fill: '#8b5cf6' },
  { name: 'Absent', value: 0, fill: '#ef4444' },
];

const recentActivity = [
  { time: '10:30 AM', title: 'Sara Menon applied for Earned Leave', description: 'Mar 25-28, 4 days', color: 'purple' },
  { time: '10:15 AM', title: 'Arun Prakash interview scheduled', description: 'Technical Round 2 at Meeting Room A', color: 'blue' },
  { time: '09:45 AM', title: 'Payroll processing started for March', description: 'Step 4 of 7 - Review', color: 'green' },
  { time: '09:20 AM', title: 'Alex Kumar checked in late', description: '09:20 AM (15 min late)', color: 'amber' },
  { time: '09:02 AM', title: 'John Doe checked in', description: 'On time', color: 'green' },
];

export default function AdminDashboard() {
  const [myStatus] = useState<'working' | 'break'>('working');

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h1>
          <p className="text-gray-500 text-sm">Tuesday, March 17, 2026</p>
        </div>
      </div>

      {/* Attendance Strip */}
      <div className="bg-white rounded-lg border border-gray-200 p-3 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-gray-700">My Status: {myStatus === 'working' ? 'Working' : 'On Break'}</span>
          <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">07:23:45</span>
        </div>
        <div className="flex gap-2 ml-auto">
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-green-500 text-white opacity-50 cursor-not-allowed" disabled>Check In</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500 text-white hover:bg-amber-600"><Coffee size={14} className="inline mr-1" />Start Break</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white opacity-50 cursor-not-allowed" disabled><Play size={14} className="inline mr-1" />End Break</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-500 text-white hover:bg-red-600"><Square size={14} className="inline mr-1" />Check Out</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard title="Total Employees" value={248} icon={Users} color="indigo" trend={{ value: '+3 this month', positive: true }} />
        <StatCard title="Present Today" value={215} icon={UserCheck} color="green" trend={{ value: '86.7%', positive: true }} />
        <StatCard title="On Leave" value={18} icon={CalendarOff} color="amber" />
        <StatCard title="Open Positions" value={5} icon={Briefcase} color="blue" />
        <StatCard title="Late Arrivals" value={7} icon={Clock} color="red" trend={{ value: '+2 vs yesterday', positive: false }} />
        <StatCard title="Payroll Status" value="₹42.3L" icon={DollarSign} color="purple" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Attendance Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={attendanceOverview} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
              <span className="text-sm text-gray-500">{pendingApprovals.length} pending</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Employee</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Date</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pendingApprovals.map(item => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <img src={item.employeeAvatar} alt="" className="w-7 h-7 rounded-full" />
                          <span className="font-medium text-gray-700">{item.employeeName}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{item.type}</td>
                      <td className="px-3 py-2 text-gray-600">{item.date}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-2">
                          <button className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                          <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Department Headcount */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Headcount</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={departmentHeadcount}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Upcoming Birthdays */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Birthdays 🎂</h2>
            <div className="space-y-3">
              {birthdayList.map((person, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={person.avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.department}</p>
                  </div>
                  <span className="text-sm text-indigo-600 font-medium">{person.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>
            <div className="space-y-3">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="p-3 rounded-lg border-l-4 bg-gray-50" style={{ borderLeftColor: ann.color }}>
                  <h3 className="text-sm font-semibold text-gray-800">{ann.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{ann.postedBy} · {ann.date}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <Timeline items={recentActivity} />
          </div>
        </div>
      </div>
    </div>
  );
}
