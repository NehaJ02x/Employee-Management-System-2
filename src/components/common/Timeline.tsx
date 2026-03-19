interface TimelineItem {
  time: string;
  title: string;
  description?: string;
  color?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const dotColorMap: Record<string, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  amber: 'bg-amber-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
};

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4 relative">
            <div className={`w-3 h-3 rounded-full mt-1.5 z-10 shrink-0 ml-[10px] ${dotColorMap[item.color || 'indigo']}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-mono">{item.time}</span>
              </div>
              <p className="text-sm font-medium text-gray-800">{item.title}</p>
              {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
