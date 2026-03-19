import { useState } from 'react';
import { Calendar, Users, Sun, Moon } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import { shifts, employees } from '../../data/mockData';

const tabs = [
  { id: 'list', label: 'Shift List' },
  { id: 'assign', label: 'Assign Shift' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'policies', label: 'Shift Policies' },
];

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const shiftColors: Record<string, string> = { General: 'bg-blue-100 text-blue-700', Morning: 'bg-green-100 text-green-700', Night: 'bg-purple-100 text-purple-700', Leave: 'bg-red-100 text-red-700', OFF: 'bg-gray-100 text-gray-500' };

const schedule = employees.slice(0, 6).map(e => ({
  name: e.name, shifts: weekDays.map((_, i) => i >= 5 ? 'OFF' : e.shift === 'General' ? 'General' : e.shift)
}));

export default function Shifts() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shifts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Shifts" value={4} icon={Calendar} color="indigo" />
        <StatCard title="General" value={180} icon={Users} color="blue" />
        <StatCard title="Morning" value={35} icon={Sun} color="amber" />
        <StatCard title="Night" value={25} icon={Moon} color="purple" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'list' && (
          <div>
            <div className="flex justify-end mb-4"><button className="btn-primary">+ Create Shift</button></div>
            <DataTable
              columns={[
                { key: 'name', label: 'Shift Name', sortable: true },
                { key: 'startTime', label: 'Start Time' },
                { key: 'endTime', label: 'End Time' },
                { key: 'breakDuration', label: 'Break' },
                { key: 'gracePeriod', label: 'Grace Period' },
                { key: 'minHours', label: 'Min Hours' },
                { key: 'employeeCount', label: 'Employees', sortable: true },
              ]}
              data={shifts as unknown as Record<string, unknown>[]}
            />
          </div>
        )}

        {activeTab === 'assign' && (
          <div className="max-w-2xl space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2"><input type="radio" name="assignType" defaultChecked className="text-indigo-600" /><span className="text-sm">Individual</span></label>
              <label className="flex items-center gap-2"><input type="radio" name="assignType" className="text-indigo-600" /><span className="text-sm">Bulk by Department</span></label>
            </div>
            <div><label className="text-sm text-gray-600 mb-1 block">Select Employee(s)</label><select className="select-field" multiple>{employees.map(e => <option key={e.id}>{e.name}</option>)}</select></div>
            <div><label className="text-sm text-gray-600 mb-1 block">Shift</label><select className="select-field">{shifts.map(s => <option key={s.id}>{s.name}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm text-gray-600 mb-1 block">Effective From</label><input className="input-field" type="date" /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Effective To</label><input className="input-field" type="date" /></div>
            </div>
            <label className="flex items-center gap-2"><input type="checkbox" className="text-indigo-600" /><span className="text-sm text-gray-600">Until further notice</span></label>
            <button className="btn-primary">Assign Shift</button>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <button className="btn-secondary">&lt; Previous Week</button>
              <span className="font-medium text-gray-700">Mar 16 - Mar 22, 2026</span>
              <button className="btn-secondary">Next Week &gt;</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 w-40">Employee</th>
                  {weekDays.map(d => <th key={d} className="px-3 py-2 text-center text-xs font-medium text-gray-500">{d}</th>)}
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {schedule.map(row => (
                    <tr key={row.name} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium text-gray-700">{row.name}</td>
                      {row.shifts.map((s, i) => (
                        <td key={i} className="px-3 py-2 text-center">
                          <span className={`text-xs px-2 py-1 rounded-full ${shiftColors[s] || 'bg-gray-100 text-gray-600'}`}>{s}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="max-w-2xl space-y-4">
            {[
              { label: 'Auto-rotate shifts every', type: 'number', suffix: 'weeks' },
              { label: 'Allow shift swap', type: 'checkbox' },
              { label: 'Require approval for swap', type: 'checkbox' },
              { label: 'Night shift allowance (₹)', type: 'number' },
              { label: 'Min gap between shifts (hours)', type: 'number' },
              { label: 'Max consecutive nights', type: 'number' },
              { label: 'OT after (hours)', type: 'number' },
            ].map(field => (
              <div key={field.label} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{field.label}</span>
                {field.type === 'checkbox' ? (
                  <input type="checkbox" className="w-5 h-5 text-indigo-600" />
                ) : (
                  <input type="number" className="input-field w-24 text-center" defaultValue={field.label.includes('OT') ? 9 : field.label.includes('gap') ? 12 : 4} />
                )}
              </div>
            ))}
            <button className="btn-primary">Save Policies</button>
          </div>
        )}
      </div>
    </div>
  );
}
