import { useState, useEffect } from 'react';
import { Clock, CalendarDays, CheckSquare, TrendingUp, FileText, MessageSquare, ClipboardList, UserCheck, UserX, AlertTriangle, Wifi, LogIn, Coffee, Play, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import StatusBadge from '../../components/common/StatusBadge';
import ProgressBar from '../../components/common/ProgressBar';
import { weeklyAttendance, leaveBalances, tasks, announcements, teamMembers, attendanceDaySummary } from '../../data/mockData';

function computeAttendanceSummary() {
  const counts = { present: 0, absent: 0, late: 0, wfh: 0, leave: 0, weekend: 0, holiday: 0 };
  Object.values(attendanceDaySummary).forEach(type => {
    if (type in counts) counts[type as keyof typeof counts]++;
  });
  return counts;
}

type EmployeeStatus = 'not-checked-in' | 'working' | 'on-break' | 'checked-out';

export default function EmployeeDashboard() {
  const [seconds, setSeconds] = useState(26625);
  const [status, setStatus] = useState<EmployeeStatus>('working');
  const summary = computeAttendanceSummary();

  useEffect(() => {
    if (status !== 'working') return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const statusConfig: Record<EmployeeStatus, { label: string; color: string; dotColor: string; bgColor: string }> = {
    'not-checked-in': { label: 'Not Checked In', color: 'text-gray-600', dotColor: 'bg-gray-400', bgColor: 'bg-gray-50 border-gray-200' },
    'working': { label: 'Working', color: 'text-green-700', dotColor: 'bg-green-500', bgColor: 'bg-green-50 border-green-200' },
    'on-break': { label: 'On Break', color: 'text-amber-700', dotColor: 'bg-amber-500', bgColor: 'bg-amber-50 border-amber-200' },
    'checked-out': { label: 'Checked Out', color: 'text-red-700', dotColor: 'bg-red-500', bgColor: 'bg-red-50 border-red-200' },
  };

  const currentStatus = statusConfig[status];

  const handleCheckIn = () => { setStatus('working'); setSeconds(0); };
  const handleStartBreak = () => setStatus('on-break');
  const handleEndBreak = () => setStatus('working');
  const handleCheckOut = () => setStatus('checked-out');

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, John! 👋</h1>
        <p className="text-gray-500 text-sm">General Shift: 9:00 AM - 6:00 PM · Tuesday, March 17, 2026</p>
      </div>

      {/* Status + Time Tracker - Redesigned */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
        {/* Status Bar */}
        <div className={`flex items-center justify-between px-6 py-3 border-b ${currentStatus.bgColor}`}>
          <div className="flex items-center gap-2.5">
            <span className={`relative flex h-3 w-3`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.dotColor} opacity-75`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${currentStatus.dotColor}`} />
            </span>
            <span className={`text-sm font-semibold ${currentStatus.color}`}>{currentStatus.label}</span>
          </div>
          <div className="text-xs text-gray-500">
            Checked in at <span className="font-medium">9:02 AM</span>
          </div>
        </div>

        {/* Timer + Actions */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Timer Circle */}
            <div className="relative">
              <div className="w-44 h-44 rounded-full border-8 border-gray-100 flex items-center justify-center relative">
                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 176 176">
                  <circle cx="88" cy="88" r="80" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="88" cy="88" r="80" fill="none"
                    stroke={status === 'working' ? '#22c55e' : status === 'on-break' ? '#f59e0b' : '#94a3b8'}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 80}`}
                    strokeDashoffset={`${2 * Math.PI * 80 * (1 - Math.min(seconds / 32400, 1))}`}
                  />
                </svg>
                <div className="text-center z-10">
                  <p className="text-3xl font-mono font-bold text-gray-900">{formatTime(seconds)}</p>
                  <p className="text-xs text-gray-400 mt-1">of 9:00 hrs</p>
                </div>
              </div>
            </div>

            {/* Action Buttons - Card Style */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-3">
                {/* Check In */}
                <button
                  onClick={handleCheckIn}
                  disabled={status === 'working' || status === 'on-break'}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300 disabled:hover:bg-green-50 disabled:hover:border-green-200"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <LogIn size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-green-800">Check In</p>
                    <p className="text-[10px] text-green-600">Start your day</p>
                  </div>
                </button>

                {/* Start Break */}
                <button
                  onClick={handleStartBreak}
                  disabled={status !== 'working'}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-amber-200 bg-amber-50 hover:bg-amber-100 hover:border-amber-300 disabled:hover:bg-amber-50 disabled:hover:border-amber-200"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                    <Coffee size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-amber-800">Start Break</p>
                    <p className="text-[10px] text-amber-600">Pause timer</p>
                  </div>
                </button>

                {/* End Break */}
                <button
                  onClick={handleEndBreak}
                  disabled={status !== 'on-break'}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 disabled:hover:bg-blue-50 disabled:hover:border-blue-200"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <Play size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-blue-800">End Break</p>
                    <p className="text-[10px] text-blue-600">Resume work</p>
                  </div>
                </button>

                {/* Check Out */}
                <button
                  onClick={handleCheckOut}
                  disabled={status === 'not-checked-in' || status === 'checked-out'}
                  className="flex items-center gap-3 p-4 rounded-xl border-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-red-200 bg-red-50 hover:bg-red-100 hover:border-red-300 disabled:hover:bg-red-50 disabled:hover:border-red-200"
                >
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <LogOut size={20} className="text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-red-800">Check Out</p>
                    <p className="text-[10px] text-red-600">End your day</p>
                  </div>
                </button>
              </div>

              {/* Today's Timeline */}
              <div className="mt-4 flex items-center gap-2 overflow-x-auto py-2">
                {[
                  { label: 'In', time: '9:02', done: true },
                  { label: 'Break', time: '11:30', done: true },
                  { label: 'Resume', time: '11:45', done: true },
                  { label: 'Lunch', time: '1:00', done: true },
                  { label: 'Resume', time: '1:30', done: true },
                  { label: 'Out', time: '--:--', done: false },
                ].map((evt, i, arr) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center min-w-[48px]">
                      <div className={`w-2 h-2 rounded-full ${evt.done ? 'bg-indigo-500' : 'bg-gray-300'}`} />
                      <p className="text-[10px] font-medium text-gray-600 mt-0.5">{evt.time}</p>
                      <p className="text-[9px] text-gray-400">{evt.label}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-6 h-px ${evt.done && arr[i + 1].done ? 'bg-indigo-400' : 'bg-gray-200'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <StatCard title="Present" value={summary.present} icon={UserCheck} color="green" trend={{ value: `${Math.round((summary.present / (summary.present + summary.absent + summary.late + summary.leave + summary.wfh || 1)) * 100)}%`, positive: true }} />
        <StatCard title="Absent" value={summary.absent} icon={UserX} color="red" />
        <StatCard title="Late" value={summary.late} icon={AlertTriangle} color="amber" />
        <StatCard title="WFH" value={summary.wfh} icon={Wifi} color="blue" />
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="My Attendance" value="95%" icon={Clock} color="green" />
        <StatCard title="Leaves Remaining" value={29} icon={CalendarDays} color="blue" />
        <StatCard title="Active Tasks" value={5} icon={CheckSquare} color="amber" />
        <StatCard title="Performance" value="4.2/5" icon={TrendingUp} color="indigo" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Weekly Attendance */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Attendance This Week</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Day</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">In</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Out</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Breaks</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Hrs</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {weeklyAttendance.map((d, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">{d.day}</td>
                      <td className="px-3 py-2 text-gray-600">{d.checkIn}</td>
                      <td className="px-3 py-2 text-gray-600">{d.checkOut}</td>
                      <td className="px-3 py-2 text-gray-600">{d.breaks}</td>
                      <td className="px-3 py-2 text-gray-600">{d.hours}</td>
                      <td className="px-3 py-2"><StatusBadge status={d.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Leave Balance */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h2>
            <div className="grid grid-cols-2 gap-3">
              {leaveBalances.map(lb => (
                <div key={lb.code} className={`p-3 rounded-lg border ${lb.pending > 0 ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{lb.code}</span>
                    <span className="text-sm font-bold text-gray-900">{lb.total - lb.used}/{lb.total}</span>
                  </div>
                  <ProgressBar value={lb.total - lb.used} max={lb.total} color={lb.code === 'CL' ? 'green' : lb.code === 'SL' ? 'blue' : lb.code === 'EL' ? 'amber' : 'purple'} size="sm" />
                  {lb.pending > 0 && <p className="text-xs text-amber-600 mt-1">{lb.pending} pending</p>}
                </div>
              ))}
            </div>
          </div>

          {/* My Tasks */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Tasks</h2>
            <div className="space-y-2">
              {tasks.filter(t => t.status !== 'Done').slice(0, 5).map(task => (
                <div key={task.id} className={`p-3 rounded-lg border-l-4 bg-gray-50 ${
                  task.priority === 'High' ? 'border-l-red-500' : task.priority === 'Medium' ? 'border-l-yellow-500' : 'border-l-green-500'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-800">{task.title}</h3>
                    <StatusBadge status={task.status} />
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">Due: {task.dueDate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Salary Snapshot */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Salary Snapshot</h2>
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg p-5 text-white mb-4">
              <p className="text-sm opacity-80">Net Salary (Feb 2026)</p>
              <p className="text-3xl font-bold mt-1">₹65,960</p>
            </div>
            <div className="flex justify-between text-sm">
              <div><span className="text-gray-500">Gross:</span> <span className="font-medium">₹85,000</span></div>
              <div><span className="text-gray-500">Deductions:</span> <span className="font-medium text-red-600">₹19,040</span></div>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h2>
            <div className="space-y-3">
              {announcements.slice(0, 2).map(ann => (
                <div key={ann.id} className="p-3 rounded-lg border-l-4 bg-gray-50" style={{ borderLeftColor: ann.color }}>
                  <h3 className="text-sm font-semibold text-gray-800">{ann.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{ann.date}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: CalendarDays, label: 'Apply Leave', to: '/leave-employee' },
                { icon: ClipboardList, label: 'Regularize', to: '/regularization-employee' },
                { icon: MessageSquare, label: 'Chat', to: '/chat' },
                { icon: FileText, label: 'Payslips', to: '/payroll-employee' },
              ].map(action => (
                <Link key={action.label} to={action.to} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 transition-colors">
                  <action.icon size={20} className="text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h2>
            <div className="grid grid-cols-2 gap-3">
              {teamMembers.map((member, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100">
                  <img src={member.avatar} alt="" className="w-8 h-8 rounded-full" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">{member.name}</p>
                    <StatusBadge status={member.status} size="sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
