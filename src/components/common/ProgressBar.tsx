interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
};

const sizeMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

export default function ProgressBar({ value, max, color = 'indigo', showLabel = true, size = 'md' }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const barColor = colorMap[color] || 'bg-indigo-500';

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 bg-gray-200 rounded-full overflow-hidden ${sizeMap[size]}`}>
        <div className={`${barColor} ${sizeMap[size]} rounded-full transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="text-xs text-gray-500 min-w-[36px] text-right">{pct}%</span>}
    </div>
  );
}
