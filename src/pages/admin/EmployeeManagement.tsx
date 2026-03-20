import { NavLink, Outlet } from 'react-router-dom';

const tabs = [
  { to: '/employee-management', label: 'Employees', end: true },
  { to: '/employee-management/user-operations', label: 'User-specific Operations' },
  { to: '/employee-management/insights', label: 'Insights' },
  { to: '/employee-management/departments', label: 'Departments' },
  { to: '/employee-management/designations', label: 'Designations' },
];

export default function EmployeeManagement() {
  return (
    <div>
      {/* Tabs — clean, professional */}
      <div className="bg-white border-b border-gray-200 -mx-4 lg:-mx-6 px-4 lg:px-6 mb-4">
        <nav className="flex gap-0 overflow-x-auto">
          {tabs.map(tab => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `px-3 py-2.5 text-[12px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? 'text-indigo-600 border-indigo-600'
                    : 'text-gray-400 border-transparent hover:text-gray-600 hover:border-gray-300'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
