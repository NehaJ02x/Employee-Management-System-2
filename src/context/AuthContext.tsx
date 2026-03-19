import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type UserRole = 'admin' | 'employee';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
  designation: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (data: SignupData) => { success: boolean; error?: string };
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  department: string;
  designation: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Pre-seeded accounts
const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: 'EMP001', name: 'John Doe', email: 'admin@jexa.com', password: 'admin123',
    role: 'admin', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4f46e5&color=fff&size=128',
    department: 'Engineering', designation: 'Engineering Manager',
  },
  {
    id: 'EMP002', name: 'Sara Menon', email: 'employee@jexa.com', password: 'emp123',
    role: 'employee', avatar: 'https://ui-avatars.com/api/?name=Sara+Menon&background=random&size=128',
    department: 'Engineering', designation: 'UI Developer',
  },
];

const STORAGE_KEY = 'jexa_hrms_auth';
const USERS_KEY = 'jexa_hrms_users';

function getStoredUsers(): (AuthUser & { password: string })[] {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [...MOCK_USERS];
  } catch {
    return [...MOCK_USERS];
  }
}

function saveUsers(users: (AuthUser & { password: string })[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = (data: SignupData) => {
    const users = getStoredUsers();
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists' };
    }
    const newUser: AuthUser & { password: string } = {
      id: `EMP${String(users.length + 1).padStart(3, '0')}`,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random&size=128`,
      department: data.department,
      designation: data.designation,
    };
    users.push(newUser);
    saveUsers(users);
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
