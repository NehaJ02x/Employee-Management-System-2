import { useState } from 'react';
import { Building2, ArrowUpDown, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { departments, employees } from '../../../data/mockData';

export default function DepartmentsTab() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Departments</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">All Departments</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            <Plus size={16} /> Add Department
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Department <ArrowUpDown size={12} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Department Head <ArrowUpDown size={12} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Employees <ArrowUpDown size={12} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sub-departments</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Budget <ArrowUpDown size={12} /></span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {departments.map(dept => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-gray-400" />
                      <button
                        onClick={() => navigate(`/employee-management/departments/${dept.id}`)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        {dept.name}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{dept.head}</td>
                  <td className="px-4 py-3 text-gray-700">{dept.employeeCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {dept.subDepartments.map(sub => (
                        <span key={sub} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{dept.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Add Department</h2>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-1 block font-medium">Department Name *</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Operations" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block font-medium">Department Code *</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. OPS, ENG, HR" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block font-medium">Mail Alias</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. operations@company.com" />
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block font-medium">Department Lead *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Select</option>
                  {employees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 mb-1 block font-medium">Parent Department</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Select</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-gray-200">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
