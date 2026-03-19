import { useState } from 'react';
import { CalendarHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ProgressBar from '../../components/common/ProgressBar';
import UploadArea from '../../components/common/UploadArea';
import Calendar from '../../components/common/Calendar';
import { leaveBalances, leaveHistory, attendanceDaySummary, indianHolidays2026 } from '../../data/mockData';

const tabs = [
  { id: 'apply', label: 'Apply Leave' },
  { id: 'balance', label: 'Leave Balance' },
  { id: 'history', label: 'My Leave History' },
  { id: 'calendar', label: 'Calendar & Holidays' },
];

const colors: Record<string, string> = { CL: 'green', SL: 'blue', EL: 'amber', CO: 'purple' };

const formatHolidayDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getDate()} ${d.toLocaleString('en-IN', { month: 'short' })}, ${d.toLocaleString('en-IN', { weekday: 'short' })}`;
};

export default function EmployeeLeave() {
  const [activeTab, setActiveTab] = useState('apply');
  const [calMonth, setCalMonth] = useState(3);
  const myHistory = leaveHistory.filter(l => l.employeeId === 'EMP001');

  const today = '2026-03-17';
  const upcomingHolidays = indianHolidays2026.filter(h => h.date >= today);

  const calEvents = Object.entries(attendanceDaySummary).map(([date, type]) => ({
    date: parseInt(date),
    type: type as 'present' | 'absent' | 'late' | 'leave' | 'wfh' | 'holiday' | 'weekend',
  }));

  const monthHolidays = indianHolidays2026
    .filter(h => new Date(h.date).getMonth() + 1 === calMonth)
    .map(h => ({ date: new Date(h.date).getDate(), name: h.name }));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Leave</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {leaveBalances.map(lb => (
          <div key={lb.code} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{lb.code}</span>
              <span className="text-lg font-bold">{lb.total - lb.used}<span className="text-sm font-normal text-gray-400">/{lb.total}</span></span>
            </div>
            <ProgressBar value={lb.total - lb.used} max={lb.total} color={colors[lb.code]} size="sm" showLabel={false} />
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'apply' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div><label className="text-sm text-gray-600 mb-1 block">Leave Type</label>
                <select className="select-field">{leaveBalances.map(lb => <option key={lb.code}>{lb.type} ({lb.total - lb.used} remaining)</option>)}</select>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2"><input type="radio" name="dur" defaultChecked /><span className="text-sm">Full Day</span></label>
                <label className="flex items-center gap-2"><input type="radio" name="dur" /><span className="text-sm">Half Day</span></label>
                <label className="flex items-center gap-2"><input type="radio" name="dur" /><span className="text-sm">Multiple Days</span></label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-600 mb-1 block">From</label><input className="input-field" type="date" /></div>
                <div><label className="text-sm text-gray-600 mb-1 block">To</label><input className="input-field" type="date" /></div>
              </div>
              <div><label className="text-sm text-gray-600 mb-1 block">Reason</label><textarea className="input-field" rows={3} /></div>
              <UploadArea label="Attachment (required for Sick Leave > 2 days)" />
              <button className="btn-primary">Submit Leave Request</button>
            </div>

            {/* Upcoming Holidays sidebar */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-red-200 bg-red-50">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarHeart size={18} className="text-red-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Upcoming Holidays</h3>
                </div>
                <div className="space-y-2">
                  {upcomingHolidays.slice(0, 5).map(h => (
                    <div key={h.date} className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center shrink-0">
                        {new Date(h.date).getDate()}
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-800 truncate">{h.name}</p>
                        <p className="text-[10px] text-gray-400">{formatHolidayDate(h.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/holidays" className="block mt-3 text-xs text-center text-indigo-600 hover:underline">
                  View Full Holiday Calendar →
                </Link>
              </div>

              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-xs text-indigo-800 font-medium">Tip</p>
                <p className="text-xs text-indigo-600 mt-1">Plan leaves around holidays for long weekends! Next holiday: <strong>{upcomingHolidays[0]?.name}</strong> on {upcomingHolidays[0]?.date}.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'balance' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {leaveBalances.map(lb => (
              <div key={lb.code} className={`p-4 rounded-lg border ${lb.pending > 0 ? 'border-amber-300 bg-amber-50' : 'border-gray-200'}`}>
                <h3 className="font-medium text-gray-900 mb-2">{lb.type} ({lb.code})</h3>
                <div className="flex justify-between text-sm mb-2">
                  <span>Used: {lb.used}</span><span>Remaining: {lb.total - lb.used}</span>
                </div>
                <ProgressBar value={lb.total - lb.used} max={lb.total} color={colors[lb.code]} />
                {lb.pending > 0 && <p className="text-xs text-amber-600 mt-2">{lb.pending} pending</p>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <DataTable
            columns={[
              { key: 'type', label: 'Type', sortable: true },
              { key: 'from', label: 'From-To', render: (r) => <span>{r.from as string} → {r.to as string}</span> },
              { key: 'days', label: 'Days' },
              { key: 'reason', label: 'Reason' },
              { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              { key: 'appliedOn', label: 'Applied On' },
            ]}
            data={myHistory as unknown as Record<string, unknown>[]}
          />
        )}

        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setCalMonth(m => Math.max(1, m - 1))} className="btn-secondary text-xs">&lt; Prev</button>
                <h3 className="font-semibold text-gray-900">
                  {new Date(2026, calMonth - 1).toLocaleString('en-IN', { month: 'long' })} 2026
                </h3>
                <button onClick={() => setCalMonth(m => Math.min(12, m + 1))} className="btn-secondary text-xs">Next &gt;</button>
              </div>
              <Calendar
                year={2026}
                month={calMonth}
                events={calMonth === 3 ? calEvents : []}
                holidays={monthHolidays}
              />
            </div>

            {/* Holidays List */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarHeart size={18} className="text-red-500" />
                  <h3 className="text-sm font-semibold text-gray-900">All Holidays 2026</h3>
                </div>
                <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                  {indianHolidays2026.map(h => {
                    const past = h.date < '2026-03-17';
                    const isThisMonth = new Date(h.date).getMonth() + 1 === calMonth;
                    return (
                      <div key={h.date} className={`flex items-center justify-between py-1.5 px-2 rounded text-sm ${
                        isThisMonth ? 'bg-red-50 font-medium' : past ? 'opacity-40' : 'hover:bg-gray-50'
                      }`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-2 h-2 rounded-full shrink-0 ${h.type === 'National' ? 'bg-red-500' : 'bg-orange-400'}`} />
                          <span className="text-gray-800 truncate">{h.name}</span>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{formatHolidayDate(h.date)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-4 mt-3 pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[10px] text-gray-500">National</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400" /><span className="text-[10px] text-gray-500">Gazetted</span></div>
                </div>
              </div>

              <Link to="/holidays" className="block p-3 text-center bg-indigo-50 rounded-lg border border-indigo-200 text-sm text-indigo-600 font-medium hover:bg-indigo-100 transition-colors">
                Open Full Holiday Calendar →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
