interface CalendarEvent {
  date: number;
  type: 'present' | 'absent' | 'late' | 'leave' | 'wfh' | 'holiday' | 'weekend';
}

interface HolidayInfo {
  date: number;
  name: string;
}

interface CalendarProps {
  year: number;
  month: number;
  events: CalendarEvent[];
  holidays?: HolidayInfo[];
  onDateClick?: (date: number) => void;
}

const dotColor: Record<string, string> = {
  present: 'bg-green-500',
  absent: 'bg-red-500',
  late: 'bg-yellow-500',
  leave: 'bg-purple-500',
  wfh: 'bg-blue-500',
  holiday: 'bg-red-400',
  weekend: 'bg-gray-300',
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Calendar({ year, month, events, holidays = [], onDateClick }: CalendarProps) {
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const eventMap = new Map(events.map(e => [e.date, e.type]));
  const holidayMap = new Map(holidays.map(h => [h.date, h.name]));
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-500 py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const event = eventMap.get(day);
          const holidayName = holidayMap.get(day);
          const isHoliday = event === 'holiday' || !!holidayName;
          const isToday = isCurrentMonth && day === today.getDate();

          return (
            <div
              key={i}
              className={`min-h-[56px] flex flex-col items-center justify-start rounded-lg text-sm p-1 transition-colors ${
                day ? 'hover:bg-gray-100 cursor-pointer' : ''
              } ${isToday ? 'bg-indigo-50 ring-2 ring-indigo-500' : ''} ${isHoliday && !isToday ? 'bg-red-50' : ''}`}
              onClick={() => day && onDateClick?.(day)}
              title={holidayName || ''}
            >
              <span className={`text-xs font-medium ${
                isToday ? 'text-indigo-700' :
                isHoliday ? 'text-red-600 font-bold' :
                event === 'weekend' ? 'text-gray-400' :
                'text-gray-700'
              }`}>{day}</span>
              {event && (
                <div className={`w-2 h-2 rounded-full mt-0.5 ${dotColor[event]}`} />
              )}
              {holidayName && (
                <p className="text-[8px] text-red-500 leading-tight text-center mt-0.5 line-clamp-2">{holidayName}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-gray-200">
        {Object.entries(dotColor).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-xs text-gray-500 capitalize">{type}</span>
          </div>
        ))}
      </div>

      {/* Holidays this month */}
      {holidays.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Holidays this month</p>
          <div className="space-y-1">
            {holidays.map(h => (
              <div key={h.date} className="flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center">{h.date}</span>
                <span className="text-gray-700">{h.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
