import { useState } from 'react';
import { LogOut, Clock, MessageSquare, DollarSign, Check } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ProgressBar from '../../components/common/ProgressBar';
import { exitRecords } from '../../data/mockData';

const tabs = [
  { id: 'resignation', label: 'Resignation' },
  { id: 'notice', label: 'Notice Period' },
  { id: 'interview', label: 'Exit Interview' },
  { id: 'settlement', label: 'Final Settlement' },
];

const checklist = [
  'Resignation Accepted', 'Knowledge Transfer Done', 'Assets Returned',
  'Exit Interview Completed', 'Manager Sign-off', 'HR Sign-off',
  'IT Access Revoked', 'Settlement Processed'
];

export default function AdminExit() {
  const [activeTab, setActiveTab] = useState('resignation');
  const [checked, setChecked] = useState([0, 1, 2, 3]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Exit / Offboarding</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Exits" value={6} icon={LogOut} color="red" />
        <StatCard title="In Notice" value={4} icon={Clock} color="amber" />
        <StatCard title="Exit Interviews Due" value={2} icon={MessageSquare} color="blue" />
        <StatCard title="Settlements Pending" value={1} icon={DollarSign} color="green" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'resignation' && (
          <div>
            <div className="max-w-xl mb-6 space-y-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700">Submit Resignation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-600 mb-1 block">Resignation Date</label><input className="input-field" type="date" /></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Last Working Day</label><input className="input-field" type="date" disabled value="2026-04-16" /></div>
              </div>
              <div><label className="text-sm text-gray-600 mb-1 block">Reason</label>
                <select className="select-field"><option>Better Opportunity</option><option>Personal</option><option>Higher Studies</option><option>Relocation</option><option>Other</option></select>
              </div>
              <div><label className="text-sm text-gray-600 mb-1 block">Details</label><textarea className="input-field" rows={3} /></div>
              <button className="btn-primary">Submit Resignation</button>
            </div>
            <DataTable
              columns={[
                { key: 'employeeName', label: 'Employee', sortable: true },
                { key: 'department', label: 'Department' },
                { key: 'submittedDate', label: 'Submitted' },
                { key: 'lastWorkingDay', label: 'LWD' },
                { key: 'reason', label: 'Reason' },
                { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
                { key: 'actions', label: '', render: (r) => r.status === 'Pending Approval' ? <button className="text-xs text-indigo-600 hover:underline">Accept</button> : null },
              ]}
              data={exitRecords as unknown as Record<string, unknown>[]}
            />
          </div>
        )}

        {activeTab === 'notice' && (
          <DataTable
            columns={[
              { key: 'employeeName', label: 'Employee' },
              { key: 'department', label: 'Department' },
              { key: 'noticeDays', label: 'Notice Days' },
              { key: 'remainingDays', label: 'Remaining' },
              { key: 'ktProgress', label: 'KT Status', render: (r) => <div className="w-24"><ProgressBar value={r.ktProgress as number} max={100} size="sm" color={((r.ktProgress as number) > 70) ? 'green' : 'amber'} /></div> },
              { key: 'buyoutStatus', label: 'Buyout' },
              { key: 'actions', label: '', render: () => <button className="text-xs text-indigo-600 hover:underline">Manage</button> },
            ]}
            data={exitRecords.filter(e => e.status === 'Serving Notice') as unknown as Record<string, unknown>[]}
          />
        )}

        {activeTab === 'interview' && (
          <div className="max-w-2xl space-y-4">
            <div><label className="text-sm text-gray-600 mb-1 block">Reason for Leaving</label>
              <select className="select-field"><option>Better Opportunity</option><option>Growth</option><option>Culture</option><option>Compensation</option></select>
            </div>
            <div><label className="text-sm text-gray-600 mb-1 block">What did you enjoy most?</label><textarea className="input-field" rows={3} /></div>
            <div><label className="text-sm text-gray-600 mb-1 block">Areas for improvement</label><textarea className="input-field" rows={3} /></div>
            <div><label className="text-sm text-gray-600 mb-1 block">Would you recommend this company?</label>
              <div className="flex gap-4"><label className="flex items-center gap-1"><input type="radio" name="recommend" /><span className="text-sm">Yes</span></label><label className="flex items-center gap-1"><input type="radio" name="recommend" /><span className="text-sm">No</span></label><label className="flex items-center gap-1"><input type="radio" name="recommend" /><span className="text-sm">Maybe</span></label></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {['Culture', 'Growth', 'Manager'].map(cat => (
                <div key={cat}><label className="text-sm text-gray-600 mb-1 block">{cat} Satisfaction (1-5)</label>
                  <select className="select-field"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select>
                </div>
              ))}
            </div>
            <div><label className="text-sm text-gray-600 mb-1 block">Additional Comments</label><textarea className="input-field" rows={3} /></div>
            <button className="btn-primary">Submit Interview</button>
          </div>
        )}

        {activeTab === 'settlement' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Exit Checklist</h3>
              <div className="space-y-2">
                {checklist.map((item, i) => (
                  <label key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${checked.includes(i) ? 'bg-green-500 text-white' : 'border-2 border-gray-300'}`}
                      onClick={() => setChecked(c => c.includes(i) ? c.filter(x => x !== i) : [...c, i])}>
                      {checked.includes(i) && <Check size={14} />}
                    </div>
                    <span className={`text-sm ${checked.includes(i) ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item}</span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3">Progress: {checked.length}/{checklist.length}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Settlement Breakdown</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Pending Salary', '₹45,000', false],
                  ['Leave Encashment', '₹32,000', false],
                  ['Gratuity', '₹0', false],
                  ['Performance Bonus', '₹15,000', false],
                  ['Notice Period Adjustment', '-₹0', true],
                  ['Loan Recovery', '-₹0', true],
                ].map(([label, value, isDeduction]) => (
                  <div key={label as string} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{label}</span>
                    <span className={`font-medium ${isDeduction ? 'text-red-600' : 'text-gray-900'}`}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 font-bold text-lg border-t-2 border-gray-900">
                  <span>Net Amount</span><span className="text-green-600">₹92,000</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="btn-primary">Generate F&F Letter</button>
                <button className="btn-success">Process Payment</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
