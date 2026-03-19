import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, ArrowUpDown, MapPin } from 'lucide-react';
import { departments, subDepartments, employees } from '../../data/mockData';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const avatarColors: Record<string, string> = {
  'JD': 'bg-indigo-500',
  'SM': 'bg-blue-500',
  'AK': 'bg-green-500',
  'PD': 'bg-sky-400',
  'MR': 'bg-yellow-500',
  'RS': 'bg-amber-600',
};

const statusColors: Record<string, string> = {
  'Active': 'text-green-600',
  'Probation': 'text-amber-600',
  'Notice Period': 'text-red-600',
};

export default function SubDepartmentDetail() {
  const { deptId, subDeptId } = useParams();
  const navigate = useNavigate();

  const dept = departments.find(d => d.id === deptId);
  const subDept = subDepartments.find(sd => sd.id === subDeptId);

  const [filterLocation, setFilterLocation] = useState('');

  if (!dept || !subDept) return <div className="p-8 text-center text-gray-500">Not found</div>;

  const deptEmployees = employees.filter(e => e.department === dept.name && e.subDepartment === subDept.name);
  const locations = [...new Set(deptEmployees.map(e => e.workLocation))];
  const filteredEmployees = filterLocation
    ? deptEmployees.filter(e => e.workLocation === filterLocation)
    : deptEmployees;

  return (
    <div>
      <button
        onClick={() => navigate(`/employee-management/departments/${deptId}`)}
        className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-4"
      >
        <ArrowLeft size={16} /> Back to {dept.name}
      </button>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Building2 size={24} className="text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{subDept.name}</h1>
              <p className="text-sm text-gray-500">Sub-department of {dept.name} · Lead: {subDept.lead}</p>
              <p className="text-xs text-gray-400 mt-0.5">{subDept.description}</p>
            </div>
          </div>
          <span className="text-sm text-gray-500">{subDept.employeeCount} employee(s)</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Employees in {subDept.name}</h2>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={filterLocation}
              onChange={e => setFilterLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Employee <ArrowUpDown size={12} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Designation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employment Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Location <ArrowUpDown size={12} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <span className="flex items-center gap-1">Date of Joining <ArrowUpDown size={12} /></span>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEmployees.map(emp => {
                const initials = getInitials(emp.name);
                const color = avatarColors[initials] || 'bg-gray-500';
                return (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-semibold`}>
                          {initials}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-400">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{emp.id}</td>
                    <td className="px-4 py-3 text-gray-700">{emp.designation}</td>
                    <td className="px-4 py-3 text-gray-700">{emp.type}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-gray-700">
                        <MapPin size={13} className="text-gray-400" />
                        {emp.workLocation}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{emp.joinDate}</td>
                    <td className="px-4 py-3">
                      <span className={`font-medium ${statusColors[emp.status] || 'text-gray-500'}`}>{emp.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
