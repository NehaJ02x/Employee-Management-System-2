import KanbanBoard from '../../components/common/KanbanBoard';
import { tasks } from '../../data/mockData';

export default function EmployeeTasks() {
  const myTasks = tasks.filter(t => t.assignedTo === 'John Doe');
  const byStatus = (status: string) => myTasks.filter(t => t.status === status);

  const kanbanCols = [
    { id: 'todo', title: 'To Do', count: byStatus('To Do').length, items: byStatus('To Do').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
    { id: 'progress', title: 'In Progress', count: byStatus('In Progress').length, items: byStatus('In Progress').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
    { id: 'review', title: 'In Review', count: byStatus('In Review').length, items: byStatus('In Review').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
    { id: 'done', title: 'Done', count: byStatus('Done').length, items: byStatus('Done').map(t => ({ id: t.id, title: t.title, subtitle: t.description, priority: t.priority, dueDate: t.dueDate, progress: t.progress })) },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
        <button className="btn-primary">+ Create Task</button>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <KanbanBoard columns={kanbanCols} />
      </div>
    </div>
  );
}
