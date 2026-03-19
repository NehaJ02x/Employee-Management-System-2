import ProgressBar from './ProgressBar';

interface KanbanItem {
  id: string;
  title: string;
  subtitle?: string;
  priority?: 'High' | 'Medium' | 'Low';
  dueDate?: string;
  progress?: number;
  tags?: string[];
  avatar?: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  count: number;
  items: KanbanItem[];
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
}

const priorityBorder: Record<string, string> = {
  High: 'border-l-red-500',
  Medium: 'border-l-yellow-500',
  Low: 'border-l-green-500',
};

const priorityBadge: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  Low: 'bg-green-100 text-green-700',
};

export default function KanbanBoard({ columns }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map(col => (
        <div key={col.id} className="min-w-[280px] flex-1 bg-gray-50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-700 text-sm">{col.title}</h3>
            <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{col.count}</span>
          </div>
          <div className="space-y-3">
            {col.items.map(item => (
              <div
                key={item.id}
                className={`bg-white rounded-lg border border-gray-200 border-l-4 ${item.priority ? priorityBorder[item.priority] : 'border-l-gray-300'} p-3 cursor-grab shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                  {item.avatar && <img src={item.avatar} alt="" className="w-6 h-6 rounded-full" />}
                </div>
                {item.subtitle && <p className="text-xs text-gray-500 mb-2">{item.subtitle}</p>}
                <div className="flex items-center gap-2 flex-wrap">
                  {item.priority && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityBadge[item.priority]}`}>{item.priority}</span>
                  )}
                  {item.dueDate && <span className="text-xs text-gray-400">{item.dueDate}</span>}
                </div>
                {item.progress !== undefined && item.progress < 100 && (
                  <div className="mt-2">
                    <ProgressBar value={item.progress} max={100} size="sm" />
                  </div>
                )}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
