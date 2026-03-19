import { useState } from 'react';
import Tabs from '../../components/common/Tabs';
import KanbanBoard from '../../components/common/KanbanBoard';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import ProgressBar from '../../components/common/ProgressBar';
import { tasks } from '../../data/mockData';

const tabsList = [
  { id: 'my', label: 'My Tasks' },
  { id: 'assigned', label: 'Assigned Tasks' },
  { id: 'tracking', label: 'Status Tracking' },
];

export default function AdminTasks() {
  const [activeTab, setActiveTab] = useState('my');

  const byStatus = (status: string) => tasks.filter(t => t.status === status);
  const kanbanCols = [
    { id: 'todo', title: 'To Do', count: byStatus('To Do').length, items: byStatus('To Do').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
    { id: 'progress', title: 'In Progress', count: byStatus('In Progress').length, items: byStatus('In Progress').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
    { id: 'review', title: 'In Review', count: byStatus('In Review').length, items: byStatus('In Review').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
    { id: 'done', title: 'Done', count: byStatus('Done').length, items: byStatus('Done').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tasks</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabsList} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'my' && (
          <div>
            <div className="flex justify-end mb-4"><button className="btn-primary">+ Create Task</button></div>
            <KanbanBoard columns={kanbanCols} />
          </div>
        )}

        {activeTab === 'assigned' && (
          <div>
            <div className="flex justify-end mb-4"><button className="btn-primary">+ Assign Task</button></div>
            <DataTable
              columns={[
                { key: 'title', label: 'Task', sortable: true },
                { key: 'assignedTo', label: 'Assigned To', render: (r) => (
                  <div className="flex items-center gap-2">
                    <img src={r.assignedToAvatar as string} alt="" className="w-6 h-6 rounded-full" />
                    <span>{r.assignedTo as string}</span>
                  </div>
                )},
                { key: 'priority', label: 'Priority', render: (r) => <StatusBadge status={r.priority as string} /> },
                { key: 'dueDate', label: 'Due Date' },
                { key: 'progress', label: 'Progress', render: (r) => <div className="w-24"><ProgressBar value={r.progress as number} max={100} size="sm" /></div> },
                { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              ]}
              data={tasks as unknown as Record<string, unknown>[]}
            />
            <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-gray-600">
              <span>Team completion rate: <strong className="text-green-600">72%</strong></span>
              <span>Overdue tasks: <strong className="text-red-600">3</strong></span>
            </div>
          </div>
        )}

        {activeTab === 'tracking' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Tasks', value: tasks.length, color: 'indigo' },
              { label: 'Completed', value: byStatus('Done').length, color: 'green' },
              { label: 'In Progress', value: byStatus('In Progress').length + byStatus('In Review').length, color: 'amber' },
              { label: 'Overdue', value: 3, color: 'red' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
