import { Search } from 'lucide-react';

interface Filter {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  filters: Filter[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSearch?: (query: string) => void;
}

export default function FilterBar({ filters, values, onChange, onSearch }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      {onSearch && (
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            onChange={e => onSearch(e.target.value)}
          />
        </div>
      )}
      {filters.map(f => (
        <select
          key={f.key}
          value={values[f.key] || ''}
          onChange={e => onChange(f.key, e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">{f.label}</option>
          {f.options.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
