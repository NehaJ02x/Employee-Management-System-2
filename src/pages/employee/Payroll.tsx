import { useState } from 'react';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { payslips, salaryComponents } from '../../data/mockData';

const tabs = [
  { id: 'salary', label: 'My Salary' },
  { id: 'payslips', label: 'Payslips' },
];

export default function EmployeePayroll() {
  const [activeTab, setActiveTab] = useState('salary');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Payroll</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'salary' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold text-green-600 mb-3">Earnings</h3>
                {salaryComponents.earnings.map(c => (
                  <div key={c.name} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-600">{c.name}</span>
                    <span className="font-medium">₹{c.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 font-semibold text-green-700">
                  <span>Total Earnings</span><span>₹{salaryComponents.grossSalary.toLocaleString()}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-red-600 mb-3">Deductions</h3>
                {salaryComponents.deductions.map(c => (
                  <div key={c.name} className="flex justify-between py-2 border-b border-gray-100 text-sm">
                    <span className="text-gray-600">{c.name}</span>
                    <span className="font-medium text-red-600">₹{c.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 font-semibold text-red-700">
                  <span>Total Deductions</span><span>₹{salaryComponents.totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-xl p-6 text-white text-center">
              <p className="text-sm opacity-80">Net Salary</p>
              <p className="text-4xl font-bold mt-1">₹{salaryComponents.netSalary.toLocaleString()}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn-secondary">Form 16</button>
              <button className="btn-secondary">Tax Statement</button>
              <button className="btn-primary">Tax Declaration</button>
            </div>
          </div>
        )}

        {activeTab === 'payslips' && (
          <DataTable
            columns={[
              { key: 'month', label: 'Month', render: (r) => <span>{r.month as string} {r.year as number}</span> },
              { key: 'gross', label: 'Gross', render: (r) => `₹${(r.gross as number).toLocaleString()}` },
              { key: 'deductions', label: 'Deductions', render: (r) => `₹${(r.deductions as number).toLocaleString()}` },
              { key: 'netPay', label: 'Net Pay', render: (r) => <span className="font-semibold">₹{(r.netPay as number).toLocaleString()}</span> },
              { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              { key: 'actions', label: '', render: () => <button className="text-xs text-indigo-600 hover:underline">Download PDF</button> },
            ]}
            data={payslips as unknown as Record<string, unknown>[]}
          />
        )}
      </div>
    </div>
  );
}
