interface ChartBarItem {
  label: string;
  value: number;
  color?: string;
}

interface ChartBarProps {
  data: ChartBarItem[];
  maxValue?: number;
}

export default function ChartBar({ data, maxValue }: ChartBarProps) {
  const max = maxValue || Math.max(...data.map(d => d.value));

  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-700">{item.label}</span>
            <span className="text-sm font-medium text-gray-900">{item.value}</span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${max > 0 ? (item.value / max) * 100 : 0}%`,
                backgroundColor: item.color || '#4f46e5',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
