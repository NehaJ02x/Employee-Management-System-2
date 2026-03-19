import { useState } from 'react';
import { Check } from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { payslips, salaryStructures, salaryComponents, payrollProcessingSteps, employees } from '../../data/mockData';

const tabs = [
  { id: 'salary', label: 'My Salary' },
  { id: 'payslips', label: 'Payslips' },
  { id: 'structures', label: 'Salary Structure' },
  { id: 'processing', label: 'Payroll Processing' },
  { id: 'deductions', label: 'Deductions' },
];

export default function AdminPayroll() {
  const [activeTab, setActiveTab] = useState('salary');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payroll</h1>

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
          </div>
        )}

        {activeTab === 'payslips' && (
          <div>
            <div className="flex justify-end gap-2 mb-4">
              <button className="btn-secondary">Form 16</button>
              <button className="btn-secondary">Annual Tax Statement</button>
            </div>
            <DataTable
              columns={[
                { key: 'month', label: 'Month', render: (r) => <span>{r.month as string} {r.year as number}</span> },
                { key: 'gross', label: 'Gross (₹)', render: (r) => `₹${(r.gross as number).toLocaleString()}` },
                { key: 'deductions', label: 'Deductions (₹)', render: (r) => `₹${(r.deductions as number).toLocaleString()}` },
                { key: 'netPay', label: 'Net Pay (₹)', render: (r) => <span className="font-semibold">₹{(r.netPay as number).toLocaleString()}</span> },
                { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
                { key: 'actions', label: '', render: () => <button className="text-xs text-indigo-600 hover:underline">Download PDF</button> },
              ]}
              data={payslips as unknown as Record<string, unknown>[]}
            />
          </div>
        )}

        {activeTab === 'structures' && (
          <div>
            <div className="flex justify-end mb-4"><button className="btn-primary">+ Create Structure</button></div>
            {salaryStructures.map(ss => (
              <div key={ss.id} className="mb-6 border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                  <div><span className="font-semibold text-gray-900">{ss.name}</span><span className="text-sm text-gray-500 ml-2">{ss.employeeCount} employees · {ss.components.length} components</span></div>
                </div>
                <table className="w-full text-sm">
                  <thead><tr className="border-b bg-gray-50">
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Component</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Calculation</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Taxable</th>
                  </tr></thead>
                  <tbody className="divide-y divide-gray-100">
                    {ss.components.map(c => (
                      <tr key={c.name} className="hover:bg-gray-50">
                        <td className="px-4 py-2 font-medium">{c.name}</td>
                        <td className="px-4 py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${c.type === 'Earning' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.type}</span></td>
                        <td className="px-4 py-2 text-gray-600">{c.calculation}</td>
                        <td className="px-4 py-2">{c.taxable ? '✓' : '✗'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'processing' && (
          <div>
            <div className="flex items-center justify-between mb-6 overflow-x-auto py-4">
              {payrollProcessingSteps.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.status === 'done' ? 'bg-green-500 text-white' :
                      step.status === 'active' ? 'bg-indigo-600 text-white animate-pulse' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {step.status === 'done' ? <Check size={18} /> : step.step}
                    </div>
                    <span className={`text-xs mt-1 text-center max-w-[80px] ${step.status !== 'pending' ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>{step.name}</span>
                  </div>
                  {i < payrollProcessingSteps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-1 ${step.status === 'done' ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
            <DataTable
              columns={[
                { key: 'name', label: 'Employee', sortable: true },
                { key: 'gross', label: 'Gross (₹)', render: () => '₹85,000' },
                { key: 'deductions', label: 'Deductions', render: () => '₹19,040' },
                { key: 'netPay', label: 'Net Pay', render: () => <span className="font-semibold">₹65,960</span> },
                { key: 'lop', label: 'LOP Days', render: () => '0' },
                { key: 'status', label: 'Status', render: () => <StatusBadge status="Processing" /> },
              ]}
              data={employees.slice(0, 6) as unknown as Record<string, unknown>[]}
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <p className="text-lg font-semibold">Total Payout: <span className="text-indigo-600">₹42,30,000</span></p>
              <div className="flex gap-2">
                <button className="btn-primary">Run Payroll</button>
                <button className="btn-secondary">Export to Bank</button>
                <button className="btn-secondary">Send Payslips</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deductions' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Statutory Deductions</h3>
              <div className="space-y-3">
                {[
                  { name: 'Provident Fund (PF)', desc: 'Employee 12% + Employer 12% of Basic', checked: true },
                  { name: 'ESI', desc: 'Employee 0.75% + Employer 3.25% of Gross', checked: true },
                  { name: 'Professional Tax', desc: 'As per state regulations', checked: true },
                  { name: 'TDS', desc: 'Auto-calculated as per income tax slabs', checked: true },
                ].map(d => (
                  <label key={d.name} className="flex items-start gap-3 p-3 rounded-lg border border-gray-200">
                    <input type="checkbox" defaultChecked={d.checked} className="mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{d.name}</p>
                      <p className="text-xs text-gray-500">{d.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Custom Deductions</h3>
                <button className="btn-primary text-xs px-3 py-1.5">+ Add Deduction</button>
              </div>
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Applied To</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2">Meal Deduction</td>
                    <td className="px-4 py-2">Fixed</td>
                    <td className="px-4 py-2">₹1,500</td>
                    <td className="px-4 py-2">All Full-Time</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
