import { useState } from 'react';
import { Users, UserCheck, Clock, AlertTriangle, Grid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import FilterBar from '../../components/common/FilterBar';
import Stepper from '../../components/common/Stepper';
import UploadArea from '../../components/common/UploadArea';
import { employees, departments } from '../../data/mockData';

const tabsList = [
  { id: 'list', label: 'Employee List' },
  { id: 'add', label: 'Add Employee' },
  { id: 'departments', label: 'Departments' },
  { id: 'types', label: 'Employee Types' },
];

const addSteps = ['Personal Info', 'Job Details', 'Bank & Salary', 'Documents'];

const employeeTypes = [
  { type: 'Full-Time', count: 180, benefits: 'Full', leavePolicy: 'Standard (CL 12, SL 10, EL 15)', notice: '30 days' },
  { type: 'Contract', count: 21, benefits: 'Limited', leavePolicy: 'CL 6, SL 6', notice: '15 days' },
  { type: 'Intern', count: 12, benefits: 'Minimal', leavePolicy: 'CL 6', notice: '7 days' },
  { type: 'Part-Time', count: 8, benefits: 'Proportional', leavePolicy: 'CL 6, SL 4', notice: '15 days' },
];

export default function Employees() {
  const [activeTab, setActiveTab] = useState('list');
  const [formStep, setFormStep] = useState(0);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Employees</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Employees" value={248} icon={Users} color="indigo" />
        <StatCard title="Active" value={230} icon={UserCheck} color="green" />
        <StatCard title="Probation" value={12} icon={Clock} color="amber" />
        <StatCard title="Notice Period" value={6} icon={AlertTriangle} color="red" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabsList} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <FilterBar
                filters={[
                  { key: 'dept', label: 'Department', options: departments.map(d => ({ value: d.name, label: d.name })) },
                  { key: 'type', label: 'Type', options: ['Full-Time', 'Contract', 'Intern', 'Part-Time'].map(t => ({ value: t, label: t })) },
                  { key: 'status', label: 'Status', options: ['Active', 'Probation', 'Notice Period', 'Inactive'].map(s => ({ value: s, label: s })) },
                ]}
                values={filters}
                onChange={(k, v) => setFilters(f => ({ ...f, [k]: v }))}
                onSearch={() => {}}
              />
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMode('table')} className={`p-2 rounded ${viewMode === 'table' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}><List size={18} /></button>
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400'}`}><Grid size={18} /></button>
                <button className="btn-secondary">Export</button>
              </div>
            </div>
            {viewMode === 'table' ? (
              <DataTable
                columns={[
                  { key: 'name', label: 'Employee', sortable: true, render: (r) => (
                    <div className="flex items-center gap-3">
                      <img src={r.avatar as string} alt="" className="w-8 h-8 rounded-full" />
                      <div><p className="font-medium text-gray-900">{r.name as string}</p><p className="text-xs text-gray-500">{r.email as string}</p></div>
                    </div>
                  )},
                  { key: 'id', label: 'ID' },
                  { key: 'department', label: 'Department', sortable: true },
                  { key: 'designation', label: 'Designation' },
                  { key: 'type', label: 'Type', render: (r) => <StatusBadge status={r.type as string} /> },
                  { key: 'joinDate', label: 'Join Date', sortable: true },
                  { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
                ]}
                data={employees as unknown as Record<string, unknown>[]}
                onRowClick={(r) => navigate(`/employees/${r.id}`)}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {employees.map(emp => (
                  <div key={emp.id} onClick={() => navigate(`/employees/${emp.id}`)} className="p-4 rounded-lg border border-gray-200 hover:shadow-md cursor-pointer transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={emp.avatar} alt="" className="w-12 h-12 rounded-full" />
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-500">{emp.designation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{emp.id}</span>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{emp.department}</span>
                      <StatusBadge status={emp.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div>
            <Stepper steps={addSteps} currentStep={formStep} />
            <div className="max-w-2xl mx-auto">
              {formStep === 0 && (
                <div className="space-y-4">
                  <UploadArea label="Upload Photo" accept="image/*" />
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm text-gray-600 mb-1 block">First Name</label><input className="input-field" placeholder="John" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Last Name</label><input className="input-field" placeholder="Doe" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Email</label><input className="input-field" type="email" placeholder="john@jexa.com" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Phone</label><input className="input-field" placeholder="+91 98765 43210" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Date of Birth</label><input className="input-field" type="date" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Gender</label><select className="select-field"><option>Male</option><option>Female</option><option>Other</option></select></div>
                  </div>
                  <div><label className="text-sm text-gray-600 mb-1 block">Address</label><textarea className="input-field" rows={2} /></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div><label className="text-sm text-gray-600 mb-1 block">Emergency Contact</label><input className="input-field" placeholder="Name" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Phone</label><input className="input-field" placeholder="Phone" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Relation</label><input className="input-field" placeholder="Spouse" /></div>
                  </div>
                </div>
              )}
              {formStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm text-gray-600 mb-1 block">Employee ID</label><input className="input-field" placeholder="EMP007" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Joining Date</label><input className="input-field" type="date" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Department</label><select className="select-field">{departments.map(d => <option key={d.id}>{d.name}</option>)}</select></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Designation</label><input className="input-field" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Reporting Manager</label><select className="select-field">{employees.map(e => <option key={e.id}>{e.name}</option>)}</select></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Employment Type</label><select className="select-field"><option>Full-Time</option><option>Contract</option><option>Intern</option><option>Part-Time</option></select></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Work Location</label><input className="input-field" placeholder="Bangalore HQ" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Shift</label><select className="select-field"><option>General</option><option>Morning</option><option>Night</option><option>Flexible</option></select></div>
                  </div>
                </div>
              )}
              {formStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="text-sm text-gray-600 mb-1 block">Bank Name</label><input className="input-field" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">Account Number</label><input className="input-field" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">IFSC Code</label><input className="input-field" /></div>
                    <div><label className="text-sm text-gray-600 mb-1 block">PAN</label><input className="input-field" /></div>
                    <div className="col-span-2"><label className="text-sm text-gray-600 mb-1 block">CTC (Annual)</label><input className="input-field" type="number" placeholder="1800000" /></div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Salary Breakdown (Auto-calculated)</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>Basic: 40% of CTC</div>
                      <div>HRA: 40% of Basic</div>
                      <div>Special: Balance</div>
                    </div>
                  </div>
                </div>
              )}
              {formStep === 3 && (
                <div className="space-y-4">
                  <div><label className="text-sm text-gray-600 mb-2 block">ID Proof</label><UploadArea label="Upload ID Proof" accept=".pdf,.jpg,.png" /></div>
                  <div><label className="text-sm text-gray-600 mb-2 block">Offer Letter</label><UploadArea label="Upload Offer Letter" accept=".pdf" /></div>
                  <div><label className="text-sm text-gray-600 mb-2 block">Address Proof</label><UploadArea label="Upload Address Proof" accept=".pdf,.jpg,.png" /></div>
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button onClick={() => setFormStep(s => Math.max(0, s - 1))} className="btn-secondary" disabled={formStep === 0}>Back</button>
                {formStep < 3 ? (
                  <button onClick={() => setFormStep(s => s + 1)} className="btn-primary">Next</button>
                ) : (
                  <button className="btn-primary">Submit</button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div>
            <div className="flex justify-end mb-4"><button className="btn-primary">+ Add Department</button></div>
            <DataTable
              columns={[
                { key: 'name', label: 'Department', sortable: true },
                { key: 'head', label: 'Head' },
                { key: 'employeeCount', label: 'Employees', sortable: true },
                { key: 'subDepartments', label: 'Sub-departments', render: (r) => <span className="text-sm">{(r.subDepartments as string[]).join(', ')}</span> },
                { key: 'budget', label: 'Budget' },
              ]}
              data={departments as unknown as Record<string, unknown>[]}
            />
          </div>
        )}

        {activeTab === 'types' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Count</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Benefits</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Leave Policy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Notice Period</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {employeeTypes.map(et => (
                  <tr key={et.type} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">{et.type}</td>
                    <td className="px-4 py-3">{et.count}</td>
                    <td className="px-4 py-3">{et.benefits}</td>
                    <td className="px-4 py-3 text-gray-600">{et.leavePolicy}</td>
                    <td className="px-4 py-3">{et.notice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
