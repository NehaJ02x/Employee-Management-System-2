import { useState } from 'react';
import { Headphones, AlertCircle, CheckCircle, Clock, Plus, ChevronRight } from 'lucide-react';
import StatusBadge from '../../components/common/StatusBadge';
import Tabs from '../../components/common/Tabs';

const tabs = [
  { id: 'create', label: 'Raise Ticket' },
  { id: 'my', label: 'My Tickets' },
];

// Employee's own tickets only
const myTickets = [
  { id: 'TK003', subject: 'Request for salary certificate', category: 'HR Queries', subcategory: 'Documents', priority: 'Low', status: 'Open', assignedTo: 'HR Team', createdAt: '2026-03-16 11:00', updatedAt: '2026-03-16 11:00', description: 'Need a salary certificate for home loan application. Required within this week.', response: '' },
  { id: 'TK009', subject: 'Monitor arm request', category: 'IT Support', subcategory: 'Hardware', priority: 'Low', status: 'Resolved', assignedTo: 'IT Team', createdAt: '2026-02-20 10:00', updatedAt: '2026-02-22 14:00', description: 'Need a monitor arm for my workstation.', response: 'Monitor arm has been installed at your desk. Please confirm.' },
  { id: 'TK010', subject: 'PF account linking issue', category: 'HR Queries', subcategory: 'Payroll', priority: 'Medium', status: 'In Progress', assignedTo: 'Payroll Team', createdAt: '2026-03-10 09:30', updatedAt: '2026-03-15 11:00', description: 'My UAN is not linked to current employer. Need help transferring old PF.', response: 'We have initiated the transfer. It may take 5-7 working days.' },
];

const statusIcon: Record<string, { icon: typeof Clock; color: string }> = {
  'Open': { icon: AlertCircle, color: 'text-red-500' },
  'In Progress': { icon: Clock, color: 'text-amber-500' },
  'Resolved': { icon: CheckCircle, color: 'text-green-500' },
};

export default function EmployeeHelpdesk() {
  const [activeTab, setActiveTab] = useState('create');
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const openCount = myTickets.filter(t => t.status === 'Open').length;
  const inProgressCount = myTickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = myTickets.filter(t => t.status === 'Resolved').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Headphones size={28} className="text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Helpdesk</h1>
          <p className="text-sm text-gray-500">IT Support & HR Queries</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="p-2 bg-red-100 rounded-full"><AlertCircle size={18} className="text-red-600" /></div>
          <div><p className="text-xl font-bold text-gray-900">{openCount}</p><p className="text-xs text-gray-500">Open</p></div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-full"><Clock size={18} className="text-amber-600" /></div>
          <div><p className="text-xl font-bold text-gray-900">{inProgressCount}</p><p className="text-xs text-gray-500">In Progress</p></div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-full"><CheckCircle size={18} className="text-green-600" /></div>
          <div><p className="text-xl font-bold text-gray-900">{resolvedCount}</p><p className="text-xs text-gray-500">Resolved</p></div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'create' && (
          <div>
            {submitted && (
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle size={20} className="text-green-600 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">Ticket Submitted Successfully!</p>
                  <p className="text-xs text-green-600">Your ticket ID is TK011. You'll receive updates via notifications.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Category *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'IT Support', icon: '🖥️', desc: 'Hardware, software, network, email, access issues' },
                    { value: 'HR Queries', icon: '👥', desc: 'Documents, policy, payroll, benefits queries' },
                  ].map(cat => (
                    <label key={cat.value} className="flex items-start gap-3 p-4 rounded-xl border-2 border-gray-200 cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/50 transition-all has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                      <input type="radio" name="category" value={cat.value} defaultChecked={cat.value === 'IT Support'} className="mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{cat.icon} {cat.value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{cat.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Type *</label>
                <select className="select-field">
                  <option value="">Select issue type...</option>
                  <option>Hardware</option>
                  <option>Software</option>
                  <option>Network / VPN</option>
                  <option>Email</option>
                  <option>Access / Permissions</option>
                  <option>Documents / Certificates</option>
                  <option>Policy Clarification</option>
                  <option>Payroll / Tax</option>
                  <option>Benefits / Insurance</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Subject *</label>
                <input className="input-field" placeholder="Brief description of your issue" required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Priority *</label>
                <div className="flex gap-4">
                  {[
                    { value: 'Low', color: 'text-green-700', desc: 'Can wait a few days' },
                    { value: 'Medium', color: 'text-amber-700', desc: 'Needs attention soon' },
                    { value: 'High', color: 'text-red-700', desc: 'Blocking my work' },
                  ].map(p => (
                    <label key={p.value} className="flex items-center gap-2 p-2.5 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 flex-1">
                      <input type="radio" name="priority" defaultChecked={p.value === 'Medium'} className="text-indigo-600" />
                      <div>
                        <p className={`text-sm font-medium ${p.color}`}>{p.value}</p>
                        <p className="text-[10px] text-gray-400">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Description *</label>
                <textarea className="input-field" rows={4} placeholder="Describe your issue in detail. Include any error messages, steps to reproduce, or relevant context..." required />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Attachment (optional)</label>
                <input type="file" className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100" />
                <p className="text-xs text-gray-400 mt-1">Upload screenshots or documents (max 5MB)</p>
              </div>

              <button type="submit" className="btn-primary flex items-center gap-2">
                <Plus size={16} />
                Submit Ticket
              </button>
            </form>
          </div>
        )}

        {activeTab === 'my' && (
          <div className="space-y-3">
            {myTickets.length === 0 ? (
              <div className="text-center py-12">
                <Headphones size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No tickets yet</p>
                <button onClick={() => setActiveTab('create')} className="text-sm text-indigo-600 hover:underline mt-2">Create your first ticket</button>
              </div>
            ) : (
              myTickets.map(ticket => {
                const { icon: StatusIcon, color } = statusIcon[ticket.status] || statusIcon['Open'];
                const isExpanded = expandedTicket === ticket.id;
                return (
                  <div key={ticket.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Ticket Header - always visible */}
                    <button
                      onClick={() => setExpandedTicket(isExpanded ? null : ticket.id)}
                      className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                    >
                      <StatusIcon size={20} className={color} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs text-gray-400 font-mono">{ticket.id}</span>
                          <StatusBadge status={ticket.status} />
                          <StatusBadge status={ticket.priority} />
                        </div>
                        <p className="text-sm font-semibold text-gray-900 mt-1">{ticket.subject}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {ticket.category} · {ticket.subcategory} · Created {ticket.createdAt}
                        </p>
                      </div>
                      <ChevronRight size={18} className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-1">Description</p>
                          <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-gray-200">{ticket.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-gray-500">Assigned To</p>
                            <p className="font-medium text-gray-800">{ticket.assignedTo}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Last Updated</p>
                            <p className="font-medium text-gray-800">{ticket.updatedAt}</p>
                          </div>
                        </div>
                        {ticket.response && (
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Response</p>
                            <div className="text-sm text-gray-700 bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                              <p className="text-xs text-indigo-600 font-medium mb-1">{ticket.assignedTo}</p>
                              {ticket.response}
                            </div>
                          </div>
                        )}
                        {ticket.status !== 'Resolved' && (
                          <div className="pt-2">
                            <div className="flex gap-2">
                              <input className="input-field text-sm" placeholder="Add a follow-up comment..." />
                              <button className="btn-secondary text-xs shrink-0">Send</button>
                            </div>
                          </div>
                        )}
                        {ticket.status === 'Resolved' && (
                          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg border border-green-200">
                            <CheckCircle size={16} className="text-green-600" />
                            <span className="text-xs text-green-700">This ticket has been resolved. If the issue persists, raise a new ticket.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
