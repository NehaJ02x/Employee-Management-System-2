import { useState } from 'react';
import { Headphones, Monitor, Users, AlertCircle, CheckCircle, Clock, MessageSquare, Plus } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import Modal from '../../components/common/Modal';

const tabs = [
  { id: 'all', label: 'All Tickets' },
  { id: 'it', label: 'IT Support' },
  { id: 'hr', label: 'HR Queries' },
  { id: 'create', label: 'Create Ticket' },
];

const tickets = [
  { id: 'TK001', subject: 'Laptop not starting', category: 'IT Support', subcategory: 'Hardware', priority: 'High', status: 'Open', raisedBy: 'Sara Menon', raisedByAvatar: 'https://ui-avatars.com/api/?name=Sara+Menon&background=random&size=128', assignedTo: 'IT Team', createdAt: '2026-03-17 09:30', updatedAt: '2026-03-17 10:00', description: 'My laptop is not turning on since morning. Power button shows no response.' },
  { id: 'TK002', subject: 'VPN access not working', category: 'IT Support', subcategory: 'Network', priority: 'Medium', status: 'In Progress', raisedBy: 'Alex Kumar', raisedByAvatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=random&size=128', assignedTo: 'Network Admin', createdAt: '2026-03-16 14:15', updatedAt: '2026-03-17 08:30', description: 'Unable to connect to VPN from home. Getting timeout errors.' },
  { id: 'TK003', subject: 'Request for salary certificate', category: 'HR Queries', subcategory: 'Documents', priority: 'Low', status: 'Open', raisedBy: 'John Doe', raisedByAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random&size=128', assignedTo: 'HR Team', createdAt: '2026-03-16 11:00', updatedAt: '2026-03-16 11:00', description: 'Need a salary certificate for home loan application. Required within this week.' },
  { id: 'TK004', subject: 'Email not syncing on phone', category: 'IT Support', subcategory: 'Email', priority: 'Medium', status: 'Resolved', raisedBy: 'Priya Desai', raisedByAvatar: 'https://ui-avatars.com/api/?name=Priya+Desai&background=random&size=128', assignedTo: 'IT Team', createdAt: '2026-03-15 16:45', updatedAt: '2026-03-16 09:00', description: 'Office email stopped syncing on my mobile after password change.' },
  { id: 'TK005', subject: 'Leave policy clarification', category: 'HR Queries', subcategory: 'Policy', priority: 'Low', status: 'Resolved', raisedBy: 'Mike Rajan', raisedByAvatar: 'https://ui-avatars.com/api/?name=Mike+Rajan&background=random&size=128', assignedTo: 'HR Team', createdAt: '2026-03-14 10:30', updatedAt: '2026-03-15 14:00', description: 'Can probation employees avail earned leave? Need clarification on policy.' },
  { id: 'TK006', subject: 'New software installation request', category: 'IT Support', subcategory: 'Software', priority: 'Low', status: 'Open', raisedBy: 'Sara Menon', raisedByAvatar: 'https://ui-avatars.com/api/?name=Sara+Menon&background=random&size=128', assignedTo: 'IT Team', createdAt: '2026-03-17 11:00', updatedAt: '2026-03-17 11:00', description: 'Need Figma desktop app installed on my work machine for design work.' },
  { id: 'TK007', subject: 'Tax declaration form issue', category: 'HR Queries', subcategory: 'Payroll', priority: 'High', status: 'In Progress', raisedBy: 'Ravi Singh', raisedByAvatar: 'https://ui-avatars.com/api/?name=Ravi+Singh&background=random&size=128', assignedTo: 'Payroll Team', createdAt: '2026-03-16 09:00', updatedAt: '2026-03-17 10:30', description: 'Unable to submit tax declaration on the portal. Getting validation error on HRA section.' },
  { id: 'TK008', subject: 'Monitor flickering', category: 'IT Support', subcategory: 'Hardware', priority: 'Medium', status: 'Open', raisedBy: 'Alex Kumar', raisedByAvatar: 'https://ui-avatars.com/api/?name=Alex+Kumar&background=random&size=128', assignedTo: 'IT Team', createdAt: '2026-03-17 08:45', updatedAt: '2026-03-17 08:45', description: 'External monitor is flickering intermittently. Tried different cables.' },
];

export default function Helpdesk() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewTicket, setViewTicket] = useState<typeof tickets[0] | null>(null);

  const filtered = activeTab === 'it' ? tickets.filter(t => t.category === 'IT Support')
    : activeTab === 'hr' ? tickets.filter(t => t.category === 'HR Queries')
    : tickets;

  const openCount = tickets.filter(t => t.status === 'Open').length;
  const inProgressCount = tickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter(t => t.status === 'Resolved').length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Helpdesk</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Tickets" value={tickets.length} icon={Headphones} color="indigo" />
        <StatCard title="Open" value={openCount} icon={AlertCircle} color="red" />
        <StatCard title="In Progress" value={inProgressCount} icon={Clock} color="amber" />
        <StatCard title="Resolved" value={resolvedCount} icon={CheckCircle} color="green" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab !== 'create' && (
          <DataTable
            columns={[
              { key: 'id', label: 'Ticket ID', sortable: true },
              { key: 'subject', label: 'Subject', sortable: true, render: (r) => (
                <button onClick={() => setViewTicket(r as unknown as typeof tickets[0])} className="text-left text-indigo-600 hover:underline font-medium">
                  {r.subject as string}
                </button>
              )},
              { key: 'category', label: 'Category', render: (r) => (
                <span className={`text-xs px-2 py-0.5 rounded-full ${r.category === 'IT Support' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {r.category === 'IT Support' ? <><Monitor size={12} className="inline mr-1" />{r.category as string}</> : <><Users size={12} className="inline mr-1" />{r.category as string}</>}
                </span>
              )},
              { key: 'subcategory', label: 'Type' },
              { key: 'priority', label: 'Priority', render: (r) => <StatusBadge status={r.priority as string} /> },
              { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              { key: 'raisedBy', label: 'Raised By', render: (r) => (
                <div className="flex items-center gap-2">
                  <img src={r.raisedByAvatar as string} alt="" className="w-6 h-6 rounded-full" />
                  <span className="text-sm">{r.raisedBy as string}</span>
                </div>
              )},
              { key: 'createdAt', label: 'Created', sortable: true },
            ]}
            data={filtered as unknown as Record<string, unknown>[]}
          />
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
              <select className="select-field">
                <option>IT Support</option>
                <option>HR Queries</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Type *</label>
              <select className="select-field">
                <option>Hardware</option>
                <option>Software</option>
                <option>Network</option>
                <option>Email</option>
                <option>Access / Permissions</option>
                <option>Documents</option>
                <option>Policy</option>
                <option>Payroll</option>
                <option>Benefits</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Subject *</label>
              <input className="input-field" placeholder="Brief description of your issue" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Priority *</label>
              <div className="flex gap-3">
                {['Low', 'Medium', 'High'].map(p => (
                  <label key={p} className="flex items-center gap-1.5">
                    <input type="radio" name="priority" defaultChecked={p === 'Medium'} className="text-indigo-600" />
                    <span className="text-sm">{p}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
              <textarea className="input-field" rows={4} placeholder="Describe your issue in detail..." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Attachment (optional)</label>
              <input type="file" className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" />
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus size={16} />
              Submit Ticket
            </button>
          </div>
        )}
      </div>

      {/* Ticket Detail Modal */}
      <Modal isOpen={!!viewTicket} onClose={() => setViewTicket(null)} title={viewTicket?.id || ''} size="lg">
        {viewTicket && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{viewTicket.subject}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${viewTicket.category === 'IT Support' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {viewTicket.category}
                </span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{viewTicket.subcategory}</span>
                <StatusBadge status={viewTicket.priority} />
                <StatusBadge status={viewTicket.status} />
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
              {viewTicket.description}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">Raised by:</span> <span className="font-medium">{viewTicket.raisedBy}</span></div>
              <div><span className="text-gray-500">Assigned to:</span> <span className="font-medium">{viewTicket.assignedTo}</span></div>
              <div><span className="text-gray-500">Created:</span> <span className="font-medium">{viewTicket.createdAt}</span></div>
              <div><span className="text-gray-500">Last Updated:</span> <span className="font-medium">{viewTicket.updatedAt}</span></div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Add Comment</label>
              <div className="flex gap-2">
                <input className="input-field" placeholder="Type your reply..." />
                <button className="btn-primary shrink-0 flex items-center gap-1"><MessageSquare size={14} />Reply</button>
              </div>
            </div>
            {viewTicket.status !== 'Resolved' && (
              <div className="flex gap-2 pt-2 border-t border-gray-200">
                <button className="btn-success text-xs">Mark Resolved</button>
                <button className="btn-secondary text-xs">Reassign</button>
                <button className="btn-danger text-xs">Close Ticket</button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
