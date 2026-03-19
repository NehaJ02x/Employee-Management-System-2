import { useState } from 'react';
import { Check, X } from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import UploadArea from '../../components/common/UploadArea';
import { roles, companyInfo, policies } from '../../data/mockData';

const tabs = [
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'company', label: 'Company Info' },
  { id: 'policies', label: 'Policies' },
  { id: 'system', label: 'System Config' },
];

const modules = ['Employees', 'Attendance', 'Leave', 'Payroll', 'Recruitment', 'Performance', 'Settings'];
const permissions = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export'];

const workflows = [
  { name: 'Leave', flow: ['Employee', 'Manager', 'Auto-Approve'] },
  { name: 'Regularization', flow: ['Employee', 'Manager'] },
  { name: 'Resignation', flow: ['Employee', 'Manager', 'HR', 'Admin'] },
  { name: 'Payroll', flow: ['HR', 'Finance', 'Admin'] },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('roles');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'roles' && (
          <div>
            <div className="flex justify-end mb-4"><button className="btn-primary">+ Create Role</button></div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-gray-50">
                  {['Role', 'Description', 'Users'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y">
                  {roles.map(r => (
                    <tr key={r.name} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{r.name}</td>
                      <td className="px-4 py-2 text-gray-600">{r.description}</td>
                      <td className="px-4 py-2">{r.userCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Module</th>
                  {permissions.map(p => <th key={p} className="px-3 py-2 text-center text-xs font-medium text-gray-500">{p}</th>)}
                </tr></thead>
                <tbody className="divide-y">
                  {modules.map(mod => (
                    <tr key={mod} className="hover:bg-gray-50">
                      <td className="px-3 py-2 font-medium">{mod}</td>
                      {permissions.map(p => {
                        const has = roles[0].permissions[mod.toLowerCase() as keyof typeof roles[0]['permissions']]?.includes(p.toLowerCase());
                        return (
                          <td key={p} className="px-3 py-2 text-center">
                            {has ? <Check size={16} className="text-green-500 mx-auto" /> : <X size={16} className="text-red-400 mx-auto" />}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'company' && (
          <div className="max-w-2xl space-y-4">
            <UploadArea label="Upload Company Logo" accept="image/*" />
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm text-gray-600 mb-1 block">Company Name</label><input className="input-field" defaultValue={companyInfo.name} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Phone</label><input className="input-field" defaultValue={companyInfo.phone} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Email</label><input className="input-field" defaultValue={companyInfo.email} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Website</label><input className="input-field" defaultValue={companyInfo.website} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Industry</label><select className="select-field"><option>{companyInfo.industry}</option></select></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Registration No</label><input className="input-field" defaultValue={companyInfo.registrationNo} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">PAN</label><input className="input-field" defaultValue={companyInfo.pan} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">PF Code</label><input className="input-field" defaultValue={companyInfo.pfCode} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">ESI Code</label><input className="input-field" defaultValue={companyInfo.esiCode} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">FY Start</label><select className="select-field"><option>{companyInfo.financialYearStart}</option></select></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Work Week</label>
                <div className="flex gap-3"><label className="flex items-center gap-1"><input type="radio" name="ww" defaultChecked /><span className="text-sm">Mon-Fri</span></label><label className="flex items-center gap-1"><input type="radio" name="ww" /><span className="text-sm">Mon-Sat</span></label></div>
              </div>
              <div><label className="text-sm text-gray-600 mb-1 block">Currency</label><select className="select-field"><option>INR</option></select></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Timezone</label><select className="select-field"><option>{companyInfo.timezone}</option></select></div>
            </div>
            <div><label className="text-sm text-gray-600 mb-1 block">Address</label><textarea className="input-field" rows={2} defaultValue={companyInfo.address} /></div>
            <button className="btn-primary">Save Changes</button>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-gray-900">Leave Policy</h3><button className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>CL: {policies.leave.casualLeave}/year</p><p>SL: {policies.leave.sickLeave}/year</p><p>EL: {policies.leave.earnedLeave}/year</p>
                <p>Carry Forward: {policies.leave.carryForward}</p><p>Probation: {policies.leave.probation}</p><p>Medical Cert: {policies.leave.medicalCert}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-gray-900">Attendance Policy</h3><button className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Grace Period: {policies.attendance.gracePeriod}</p><p>Half Day: {policies.attendance.halfDay}</p>
                <p>Late Policy: {policies.attendance.latePolicy}</p><p>Max Regularizations: {policies.attendance.maxRegularizations}</p>
                <p>OT: {policies.attendance.overtime}</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-gray-900">Notice Period</h3><button className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              <div className="space-y-1 text-sm text-gray-600">
                {Object.entries(policies.noticePeriod).map(([k, v]) => <p key={k} className="capitalize">{k.replace(/([A-Z])/g, ' $1')}: {v}</p>)}
              </div>
            </div>
            <div className="p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-gray-900">Probation</h3><button className="text-xs text-indigo-600 hover:underline">Edit</button></div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Duration: {policies.probation.duration}</p><p>Extension: {policies.probation.extension}</p><p>Confirmation: {policies.probation.confirmation}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Email Settings</h3>
              <div className="grid grid-cols-2 gap-4 max-w-xl">
                <div><label className="text-sm text-gray-600 mb-1 block">SMTP Host</label><input className="input-field" placeholder="smtp.gmail.com" /></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Port</label><input className="input-field" placeholder="587" /></div>
                <div><label className="text-sm text-gray-600 mb-1 block">Sender Email</label><input className="input-field" placeholder="noreply@jexa.com" /></div>
                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /><span className="text-sm">SSL</span></label>
                  <button className="btn-secondary text-xs">Test Connection</button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Integrations</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: 'Biometric', connected: true },
                  { name: 'Google Calendar', connected: false },
                  { name: 'Slack', connected: false },
                  { name: 'Razorpay', connected: true },
                ].map(i => (
                  <div key={i.name} className="p-3 rounded-lg border border-gray-200 text-center">
                    <p className="text-sm font-medium text-gray-800">{i.name}</p>
                    {i.connected ? <span className="text-xs text-green-600">Connected ✓</span> : <button className="text-xs text-indigo-600 hover:underline">Connect</button>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Approval Workflows</h3>
              <div className="space-y-3">
                {workflows.map(wf => (
                  <div key={wf.name} className="flex items-center gap-2 p-3 rounded-lg border border-gray-200">
                    <span className="text-sm font-medium text-gray-700 w-28">{wf.name}:</span>
                    {wf.flow.map((step, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">{step}</span>
                        {i < wf.flow.length - 1 && <span className="text-gray-400">→</span>}
                      </span>
                    ))}
                  </div>
                ))}
                <button className="text-xs text-indigo-600 hover:underline">Edit Workflow Builder</button>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn-secondary">Import Data</button>
              <button className="btn-secondary">Export Data</button>
              <button className="btn-secondary">Backup</button>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Audit Logs</h3>
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-gray-50">
                  {['Timestamp', 'User', 'Action', 'Module', 'Details'].map(h => <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
                </tr></thead>
                <tbody className="divide-y">
                  {[
                    ['2026-03-17 10:30', 'John Doe', 'Updated', 'Attendance', 'Approved regularization for Sara Menon'],
                    ['2026-03-17 09:15', 'Priya Desai', 'Created', 'Leave', 'Approved CL for John Doe'],
                    ['2026-03-16 16:00', 'System', 'Processed', 'Payroll', 'February payroll marked as paid'],
                    ['2026-03-16 14:30', 'John Doe', 'Updated', 'Employee', 'Updated Ravi Singh status to Notice Period'],
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">{row.map((cell, j) => <td key={j} className="px-3 py-2 text-gray-600">{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
