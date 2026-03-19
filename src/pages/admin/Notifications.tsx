import { useState } from 'react';
import { Bell, Clock, CalendarDays, CheckSquare, DollarSign, Settings } from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import { notifications, announcements } from '../../data/mockData';

const tabs = [
  { id: 'all', label: 'All Notifications' },
  { id: 'announcements', label: 'Announcements' },
];

const typeIcon: Record<string, { icon: typeof Bell; color: string }> = {
  leave: { icon: CalendarDays, color: 'text-purple-600 bg-purple-100' },
  attendance: { icon: Clock, color: 'text-green-600 bg-green-100' },
  task: { icon: CheckSquare, color: 'text-amber-600 bg-amber-100' },
  payroll: { icon: DollarSign, color: 'text-blue-600 bg-blue-100' },
  general: { icon: Bell, color: 'text-gray-600 bg-gray-100' },
};

const filters = ['All', 'Unread', 'Leave', 'Attendance', 'Tasks', 'Payroll'] as const;

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = activeFilter === 'All' ? notifications :
    activeFilter === 'Unread' ? notifications.filter(n => !n.read) :
    notifications.filter(n => n.type === activeFilter.toLowerCase());

  const grouped = {
    Today: filtered.filter(n => n.group === 'Today'),
    Yesterday: filtered.filter(n => n.group === 'Yesterday'),
    'This Week': filtered.filter(n => n.group === 'This Week'),
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Notifications</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'all' && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex flex-wrap gap-2">
                {filters.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1 text-sm rounded-full ${activeFilter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {f}{f === 'Unread' && unreadCount > 0 && <span className="ml-1 text-xs">({unreadCount})</span>}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-indigo-600 hover:underline">Mark All Read</button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100"><Settings size={16} className="text-gray-500" /></button>
              </div>
            </div>
            {Object.entries(grouped).map(([group, items]) => items.length > 0 && (
              <div key={group} className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">{group}</h3>
                <div className="space-y-1">
                  {items.map(n => {
                    const { icon: Icon, color } = typeIcon[n.type];
                    return (
                      <div key={n.id} className={`flex items-start gap-3 p-3 rounded-lg ${!n.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'}`}>
                        <div className={`p-2 rounded-full ${color} shrink-0`}><Icon size={16} /></div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${!n.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{n.description}</p>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0">{n.time}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'announcements' && (
          <div>
            <div className="space-y-4 mb-6">
              {announcements.map(ann => (
                <div key={ann.id} className="p-4 rounded-lg border-l-4 bg-gray-50 border border-gray-200" style={{ borderLeftColor: ann.color }}>
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                    {ann.pinned && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Pinned</span>}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{ann.postedBy} · {ann.date} · {ann.audience} · {ann.views} views</p>
                  <p className="text-sm text-gray-700 mt-2">{ann.content}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Create Announcement</h3>
              <div className="space-y-4 max-w-2xl">
                <div><label className="text-sm text-gray-600 mb-1 block">Title</label><input className="input-field" /></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Content</label><textarea className="input-field" rows={4} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-sm text-gray-600 mb-1 block">Audience</label><select className="select-field"><option>All Employees</option><option>Engineering</option><option>Management</option></select></div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Schedule</label>
                    <div className="flex gap-3"><label className="flex items-center gap-1"><input type="radio" name="schedule" defaultChecked /><span className="text-sm">Now</span></label><label className="flex items-center gap-1"><input type="radio" name="schedule" /><span className="text-sm">Later</span></label></div>
                  </div>
                </div>
                <label className="flex items-center gap-2"><input type="checkbox" /><span className="text-sm text-gray-600">Pin this announcement</span></label>
                <div className="flex gap-2"><button className="btn-secondary">Save Draft</button><button className="btn-primary">Publish</button></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
