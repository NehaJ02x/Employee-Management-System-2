import { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, ChevronDown, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
          <Menu size={20} className="text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 hidden sm:block">JEXA HRMS</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 w-64 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(o => !o)}
            className="flex items-center gap-2 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-lg py-1 pr-2 transition-colors"
          >
            <img
              src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=ccc&size=128'}
              alt={user?.name || 'User'}
              className="w-8 h-8 rounded-full shrink-0"
            />
            <div className="hidden sm:block text-left max-w-[120px]">
              <p className="text-sm font-medium text-gray-700 leading-tight truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role || 'Guest'}</p>
            </div>
            <ChevronDown size={16} className={`text-gray-400 hidden sm:block shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {dropdownOpen && (
            <div className="fixed sm:absolute right-4 sm:right-0 top-16 sm:top-full sm:mt-2 w-60 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-[999]">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                <span className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  user?.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {user?.role === 'admin' ? 'Administrator' : 'Employee'}
                </span>
              </div>
              <button
                onClick={() => { setDropdownOpen(false); navigate(user?.role === 'employee' ? '/my-profile' : '/employees/EMP001'); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User size={16} />
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
