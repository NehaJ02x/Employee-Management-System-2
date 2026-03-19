import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
}

export default function Sidebar({ isOpen, collapsed, onClose, onToggleCollapse }: SidebarProps) {
  const { user } = useAuth();
  const role = user?.role || 'employee';

  const width = collapsed ? 'w-[72px]' : 'w-[260px]';

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 z-50 h-screen ${width} bg-[#0f172a] text-white flex flex-col transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          {!collapsed && (
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold text-indigo-400">JEXA</span>
              <span className="text-xl font-light text-gray-400">HRMS</span>
            </div>
          )}
          {collapsed && (
            <span className="text-xl font-bold text-indigo-400 mx-auto">J</span>
          )}
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-slate-700">
            <X size={20} />
          </button>
        </div>

        {user && !collapsed && (
          <div className="px-4 py-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold border-2 border-slate-600 shrink-0">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wide">
                  {role === 'admin' ? (
                    <span className="bg-indigo-500/30 text-indigo-300 px-1.5 py-0.5 rounded">ADMIN</span>
                  ) : (
                    <span className="bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded">Employee</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {user && collapsed && (
          <div className="py-3 border-b border-slate-700 flex justify-center">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-semibold border-2 border-slate-600">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? '!justify-center !px-0' : ''}`}
            title={collapsed ? 'Dashboard' : undefined}
          >
            <LayoutDashboard size={18} />
            {!collapsed && <span className="flex-1 truncate">Dashboard</span>}
          </NavLink>
          <NavLink
            to="/employee-management"
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? '!justify-center !px-0' : ''}`}
            title={collapsed ? 'Employee Management' : undefined}
          >
            <Users size={18} />
            {!collapsed && <span className="flex-1 truncate">Employee Management</span>}
          </NavLink>
        </nav>

        {/* Collapse toggle button - desktop only */}
        <div className="hidden lg:flex border-t border-slate-700 p-3">
          <button
            onClick={onToggleCollapse}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>
    </>
  );
}
