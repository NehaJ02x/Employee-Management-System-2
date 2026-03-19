import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { employees } from '../../../data/mockData';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();

const avatarColors: Record<string, string> = {
  'JD': 'bg-indigo-500',
  'SM': 'bg-blue-500',
  'AK': 'bg-green-500',
  'PD': 'bg-sky-400',
  'MR': 'bg-yellow-500',
  'RS': 'bg-amber-600',
};

export default function UserOperationsTab() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = employees.filter(e =>
    !search ||
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">User-specific Operations</h1>
      <p className="text-gray-500 text-sm mb-6">
        Search for an employee to view their complete profile, HR process, career history and audit trail.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, employee ID, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(emp => {
          const initials = getInitials(emp.name);
          const color = avatarColors[initials] || 'bg-gray-500';
          return (
            <div
              key={emp.id}
              onClick={() => navigate(`/employee-management/user-operations/${emp.id}`)}
              className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-sm font-semibold`}>
                  {initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{emp.name}</p>
                  <p className="text-xs text-gray-500">{emp.id}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                <span className="text-indigo-600">{emp.designation}</span>
                <span className="mx-1">·</span>
                <span>{emp.department}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
