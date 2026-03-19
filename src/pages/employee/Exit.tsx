import EmptyState from '../../components/common/EmptyState';
import { FileText } from 'lucide-react';
import { policies } from '../../data/mockData';

export default function EmployeeExit() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Exit / Resignation</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Submit Resignation</h2>
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
            <p className="text-sm text-amber-800 font-medium">⚠️ Important</p>
            <p className="text-xs text-amber-700 mt-1">Once submitted, resignation can only be withdrawn with manager and HR approval within 7 days of submission.</p>
          </div>
          <div className="space-y-4">
            <div><label className="text-sm text-gray-600 mb-1 block">Resignation Date</label><input className="input-field" type="date" /></div>
            <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
              Last Working Day: <strong>Auto-calculated based on notice period</strong>
            </div>
            <div><label className="text-sm text-gray-600 mb-1 block">Reason</label>
              <select className="select-field"><option>Better Opportunity</option><option>Personal</option><option>Higher Studies</option><option>Relocation</option><option>Other</option></select>
            </div>
            <div><label className="text-sm text-gray-600 mb-1 block">Details</label><textarea className="input-field" rows={4} placeholder="Please provide details about your reason for leaving..." /></div>
            <button className="btn-danger w-full">Submit Resignation</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notice Period Policy</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(policies.noticePeriod).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">My Resignation Status</h2>
            <EmptyState
              icon={FileText}
              title="No Active Resignation"
              description="You haven't submitted a resignation request."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
