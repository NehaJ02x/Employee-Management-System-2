import { useState, useEffect, useMemo } from 'react';
import { UserCheck, UserX, Clock, Timer, Coffee, Play, Square, Search } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Calendar from '../../components/common/Calendar';
import { attendanceRecords, attendanceDaySummary, indianHolidays2026 } from '../../data/mockData';

const tabs = [
  { id: 'records', label: 'My Records' },
  { id: 'calendar', label: 'Calendar' },
];

export default function EmployeeAttendance() {
  const [activeTab, setActiveTab] = useState('records');
  const [seconds, setSeconds] = useState(26625);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const i = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(i);
  }, []);

  const fmt = (s: number) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const myRecords = attendanceRecords.filter(a => a.employeeId === 'EMP001');

  const filteredRecords = useMemo(() => {
    return myRecords.filter(record => {
      if (searchDate && !record.date.includes(searchDate)) return false;
      if (filterStatus && record.status !== filterStatus) return false;
      return true;
    });
  }, [myRecords, searchDate, filterStatus]);

  const calEvents = Object.entries(attendanceDaySummary).map(([date, type]) => ({
    date: parseInt(date), type: type as 'present' | 'absent' | 'late' | 'leave' | 'wfh' | 'holiday' | 'weekend',
  }));

  // Compute monthly stats from calendar data
  const summary = useMemo(() => {
    const counts = { present: 0, absent: 0, late: 0, leave: 0, wfh: 0 };
    Object.values(attendanceDaySummary).forEach(type => {
      if (type in counts) counts[type as keyof typeof counts]++;
    });
    return counts;
  }, []);

  const hasFilters = searchDate || filterStatus;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Attendance</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-500">Net Working Time</p>
            <p className="text-3xl font-mono font-bold text-gray-900">{fmt(seconds)}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white opacity-50" disabled>Check In</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-amber-500 text-white hover:bg-amber-600"><Coffee size={14} className="inline mr-1" />Start Break</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white opacity-50" disabled><Play size={14} className="inline mr-1" />End Break</button>
            <button className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"><Square size={14} className="inline mr-1" />Check Out</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Present" value={summary.present} icon={UserCheck} color="green" />
        <StatCard title="Absent" value={summary.absent} icon={UserX} color="red" />
        <StatCard title="Late Arrivals" value={summary.late} icon={Clock} color="amber" />
        <StatCard title="Avg Working Hours" value="8.1h" icon={Timer} color="blue" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'records' && (
          <div>
            {/* Search & Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchDate}
                  onChange={e => setSearchDate(e.target.value)}
                  placeholder="Search by date (e.g. 2026-03-17)..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Statuses</option>
                {['Present', 'Absent', 'Late', 'WFH', 'Leave', 'Weekend'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              {hasFilters && (
                <button
                  onClick={() => { setSearchDate(''); setFilterStatus(''); }}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {hasFilters && (
              <p className="text-sm text-gray-500 mb-3">
                Showing {filteredRecords.length} of {myRecords.length} records
              </p>
            )}

            <DataTable
              columns={[
                { key: 'date', label: 'Date', sortable: true },
                { key: 'day', label: 'Day' },
                { key: 'checkIn', label: 'Check In' },
                { key: 'breakTotal', label: 'Breaks' },
                { key: 'checkOut', label: 'Check Out' },
                { key: 'effectiveHrs', label: 'Hours' },
                { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              ]}
              data={filteredRecords as unknown as Record<string, unknown>[]}
            />
          </div>
        )}

        {activeTab === 'calendar' && (
          <Calendar
            year={2026}
            month={3}
            events={calEvents}
            holidays={indianHolidays2026
              .filter(h => h.date.startsWith('2026-03'))
              .map(h => ({ date: new Date(h.date).getDate(), name: h.name }))}
          />
        )}
      </div>
    </div>
  );
}
