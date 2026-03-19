import { useState } from 'react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import UploadArea from '../../components/common/UploadArea';
import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import { regularizationRequests } from '../../data/mockData';

const tabs = [
  { id: 'apply', label: 'Apply Request' },
  { id: 'requests', label: 'My Requests' },
  { id: 'approvals', label: 'Approvals' },
];

export default function AdminRegularization() {
  const [activeTab, setActiveTab] = useState('apply');

  const pending = regularizationRequests.filter(r => r.status === 'Pending');

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
              <div><label className="text-sm text-gray-600 mb-1 block">Reason</label><textarea className="input-field" rows={3} placeholder="Explain why regularization is needed..." /></div>
              <UploadArea label="Attach supporting document (optional)" />
              <button className="btn-primary">Submit Request</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatCard title="Pending" value={2} icon={Clock} color="amber" />
                <StatCard title="Approved" value={5} icon={CheckCircle} color="green" />
                <StatCard title="Rejected" value={1} icon={XCircle} color="red" />
                <StatCard title="Total" value={8} icon={FileText} color="blue" />
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800 font-medium">Policy Reminder</p>
                <p className="text-xs text-blue-600 mt-1">Maximum 3 regularization requests per month. Requests must be submitted within 7 days of the attendance date.</p>
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
              { key: 'actions', label: 'Actions', render: (r) => r.status === 'Pending' ? <button className="text-xs text-red-600 hover:underline">Cancel</button> : null },
            ]}
            data={regularizationRequests as unknown as Record<string, unknown>[]}
          />
        )}

        {activeTab === 'approvals' && (
          <div>
            <div className="flex justify-end mb-4">
              <button className="btn-primary">Bulk Approve</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pending.map(req => (
                <div key={req.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={req.avatar} alt="" className="w-10 h-10 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{req.employeeName}</p>
                      <p className="text-xs text-gray-500">Applied: {req.appliedOn}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Date:</strong> {req.date}</p>
                    <p><strong>Type:</strong> {req.type}</p>
                    <p><strong>Reason:</strong> {req.reason}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="btn-success text-xs px-3 py-1.5">Approve</button>
                    <button className="btn-danger text-xs px-3 py-1.5">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
