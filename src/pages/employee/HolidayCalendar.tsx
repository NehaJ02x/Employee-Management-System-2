import { useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { indianHolidays2026 as indianHolidays } from '../../data/mockData';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HolidayCalendar() {
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const year = 2026;

  const firstDay = new Date(year, currentMonth, 1);
  const daysInMonth = new Date(year, currentMonth + 1, 0).getDate();
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const holidayMap = new Map<string, typeof indianHolidays[0]>();
  indianHolidays.forEach(h => {
    const d = new Date(h.date);
    if (d.getMonth() === currentMonth) {
      holidayMap.set(String(d.getDate()), h);
    }
  });

  const isWeekend = (day: number) => {
    const d = new Date(year, currentMonth, day);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const today = new Date();
  const isToday = (day: number) => today.getFullYear() === year && today.getMonth() === currentMonth && today.getDate() === day;

  const monthHolidays = indianHolidays.filter(h => new Date(h.date).getMonth() === currentMonth);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate()} ${months[d.getMonth()].slice(0, 3)}, ${dayLabels[(d.getDay() + 6) % 7]}`;
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <CalendarHeart size={28} className="text-red-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Holiday Calendar 2026</h1>
          <p className="text-sm text-gray-500">Indian National & Gazetted Holidays</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={() => setCurrentMonth(m => Math.max(0, m - 1))}
              disabled={currentMonth === 0}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-900">{months[currentMonth]} {year}</h2>
            <button
              onClick={() => setCurrentMonth(m => Math.min(11, m + 1))}
              disabled={currentMonth === 11}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayLabels.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const holiday = holidayMap.get(String(day));
              const weekend = isWeekend(day);
              const todayHighlight = isToday(day);
              return (
                <div
                  key={i}
                  className={`relative p-2 min-h-[64px] rounded-lg text-sm transition-colors ${
                    todayHighlight ? 'bg-indigo-50 ring-2 ring-indigo-500' :
                    holiday ? 'bg-red-50 border border-red-200' :
                    weekend ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`text-sm ${
                    todayHighlight ? 'font-bold text-indigo-700' :
                    holiday ? 'font-bold text-red-600' :
                    weekend ? 'text-gray-400' : 'text-gray-700'
                  }`}>{day}</span>
                  {holiday && (
                    <p className="text-[9px] text-red-600 mt-0.5 leading-tight truncate" title={holiday.name}>
                      {holiday.name}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-50 border border-red-200" /><span className="text-xs text-gray-500">Holiday</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-gray-50 border border-gray-200" /><span className="text-xs text-gray-500">Weekend</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-indigo-50 ring-2 ring-indigo-500" /><span className="text-xs text-gray-500">Today</span></div>
          </div>
        </div>

        {/* Holiday List for Current Month + Full Year */}
        <div className="space-y-6">
          {/* This Month */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Holidays in {months[currentMonth]}
            </h3>
            {monthHolidays.length > 0 ? (
              <div className="space-y-2">
                {monthHolidays.map(h => (
                  <div key={h.date} className="flex items-center gap-3 p-2 rounded-lg bg-red-50">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex flex-col items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-red-600 leading-none">{new Date(h.date).getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{h.name}</p>
                      <p className="text-xs text-gray-500">{formatDate(h.date)} · <span className={h.type === 'National' ? 'text-red-600 font-medium' : 'text-gray-500'}>{h.type}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-4">No holidays this month</p>
            )}
          </div>

          {/* Plan Your Leave */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
            <h3 className="font-semibold mb-2">Plan Your Leave</h3>
            <p className="text-sm text-indigo-100 mb-4">
              Check holidays to plan long weekends. Combine leaves with holidays for maximum time off!
            </p>
            <Link
              to="/leave-employee"
              className="inline-block px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
            >
              Apply Leave
            </Link>
          </div>

          {/* All Holidays */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">All Holidays ({year})</h3>
            <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
              {indianHolidays.map(h => {
                const past = h.date < '2026-03-17';
                return (
                  <div key={h.date} className={`flex items-center justify-between py-1.5 px-2 rounded text-sm ${past ? 'opacity-40' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${h.type === 'National' ? 'bg-red-500' : 'bg-orange-400'}`} />
                      <span className="text-gray-800 truncate">{h.name}</span>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-2">{formatDate(h.date)}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-3 pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /><span className="text-[10px] text-gray-500">National</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400" /><span className="text-[10px] text-gray-500">Gazetted</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
