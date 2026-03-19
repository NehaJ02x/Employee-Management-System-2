interface Tab {
  id: string;
  label: string;
  badge?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === tab.id
              ? 'text-indigo-600 border-indigo-600'
              : 'text-gray-500 border-transparent hover:text-indigo-600 hover:border-indigo-300'
          }`}
        >
          {tab.label}
          {tab.badge !== undefined && (
            <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{tab.badge}</span>
          )}
        </button>
      ))}
    </div>
  );
}
