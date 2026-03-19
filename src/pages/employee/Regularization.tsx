import { useState } from 'react';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import UploadArea from '../../components/common/UploadArea';
import { regularizationRequests } from '../../data/mockData';

const tabs = [
  { id: 'apply', label: 'Apply Request' },
  { id: 'requests', label: 'My Requests' },
];

export default function EmployeeRegularization() {
  const [activeTab, setActiveTab] = useState('apply');
  const myRequests = regularizationRequests.filter(r => r.employeeId === 'EMP001');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Regularization</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'apply' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-sm text-gray-600 mb-1 block">Date</label><input className="input-field" type="date" max="2026-03-17" /></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Type</label>
                  <select className="select-field"><option>Forgot Check-in</option><option>Forgot Check-out</option><option>WFH</option><option>On-Duty</option><option>System Error</option><option>Shift Swap</option></select>
                </div>
                <div><label className="text-sm text-gray-600 mb-1 block">Check-in Time</label><input className="input-field" type="time" /></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Check-out Time</label><input className="input-field" type="time" /></div>
              </div>
              <div><label className="text-sm text-gray-600 mb-1 block">Reason</label><textarea className="input-field" rows={3} /></div>
              <UploadArea label="Attach supporting document (optional)" />
              <button className="btn-primary">Submit Request</button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <StatCard title="Pending" value={1} icon={Clock} color="amber" />
                <StatCard title="Approved" value={1} icon={CheckCircle} color="green" />
                <StatCard title="Rejected" value={0} icon={XCircle} color="red" />
                <StatCard title="Remaining" value="1/3" icon={FileText} color="blue" />
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs text-amber-700">You have used 2 of 3 regularizations this month.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <DataTable
            columns={[
              { key: 'date', label: 'Date', sortable: true },
              { key: 'type', label: 'Type' },
              { key: 'checkIn', label: 'Check In' },
              { key: 'checkOut', label: 'Check Out' },
              { key: 'reason', label: 'Reason' },
              { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              { key: 'approvedBy', label: 'Approved By' },
            ]}
            data={myRequests as unknown as Record<string, unknown>[]}
          />
        )}
      </div>
    </div>
  );
}
