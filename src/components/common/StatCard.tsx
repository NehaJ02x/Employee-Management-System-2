import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: string;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', border: 'border-l-indigo-500' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-l-green-500' },
  red: { bg: 'bg-red-100', text: 'text-red-600', border: 'border-l-red-500' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600', border: 'border-l-amber-500' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-l-blue-500' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-l-purple-500' },
  cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600', border: 'border-l-cyan-500' },
};

export default function StatCard({ title, value, icon: Icon, trend, color = 'indigo' }: StatCardProps) {
  const c = colorMap[color] || colorMap.indigo;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 border-l-4 ${c.border} p-4 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-1 text-xs ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${c.bg}`}>
          <Icon size={24} className={c.text} />
        </div>
      </div>
    </div>
  );
}
