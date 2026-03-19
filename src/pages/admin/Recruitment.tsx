import { useState } from 'react';
import { Briefcase, Users, Calendar, Award } from 'lucide-react';
import StatCard from '../../components/common/StatCard';
import Tabs from '../../components/common/Tabs';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import KanbanBoard from '../../components/common/KanbanBoard';
import { jobPosts, candidates, interviews, pipelineCandidates } from '../../data/mockData';

const tabs = [
  { id: 'jobs', label: 'Job Posts' },
  { id: 'candidates', label: 'Candidates' },
  { id: 'interviews', label: 'Interviews' },
  { id: 'pipeline', label: 'Hiring Pipeline' },
];

export default function Recruitment() {
  const [activeTab, setActiveTab] = useState('jobs');

  const renderStars = (rating: number) => '★'.repeat(rating) + '☆'.repeat(5 - rating);

  const kanbanColumns = [
    { id: 'applied', title: 'Applied', count: pipelineCandidates.applied.length, items: pipelineCandidates.applied.map(c => ({ id: c.id, title: c.name, subtitle: c.position, tags: [c.source], dueDate: c.appliedDate })) },
    { id: 'screening', title: 'Screening', count: pipelineCandidates.screening.length, items: pipelineCandidates.screening.map(c => ({ id: c.id, title: c.name, subtitle: c.position, tags: [c.source], dueDate: c.appliedDate })) },
    { id: 'interview', title: 'Interview', count: pipelineCandidates.interview.length, items: pipelineCandidates.interview.map(c => ({ id: c.id, title: c.name, subtitle: c.position, tags: [c.source], dueDate: c.appliedDate })) },
    { id: 'offer', title: 'Offer', count: pipelineCandidates.offer.length, items: pipelineCandidates.offer.map(c => ({ id: c.id, title: c.name, subtitle: c.position, tags: [c.source], dueDate: c.appliedDate })) },
    { id: 'hired', title: 'Hired', count: pipelineCandidates.hired.length, items: pipelineCandidates.hired.map(c => ({ id: c.id, title: c.name, subtitle: c.position, tags: [c.source], dueDate: c.appliedDate })) },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Recruitment</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Active Posts" value={8} icon={Briefcase} color="indigo" />
        <StatCard title="Total Candidates" value={124} icon={Users} color="blue" />
        <StatCard title="Interviews This Week" value={6} icon={Calendar} color="amber" />
        <StatCard title="Offers Extended" value={3} icon={Award} color="green" />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'jobs' && (
          <div>
            <div className="flex justify-end mb-4">
              <button className="btn-primary">+ Create Job Post</button>
            </div>
            <DataTable
              columns={[
                { key: 'title', label: 'Title', sortable: true },
                { key: 'department', label: 'Department', sortable: true },
                { key: 'location', label: 'Location' },
                { key: 'type', label: 'Type', render: (r) => <StatusBadge status={r.type as string} /> },
                { key: 'applications', label: 'Applications', sortable: true },
                { key: 'postedDate', label: 'Posted' },
                { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              ]}
              data={jobPosts as unknown as Record<string, unknown>[]}
            />
          </div>
        )}

        {activeTab === 'candidates' && (
          <DataTable
            columns={[
              { key: 'name', label: 'Candidate', sortable: true, render: (r) => (
                <div><p className="font-medium text-gray-900">{r.name as string}</p><p className="text-xs text-gray-500">{r.email as string}</p></div>
              )},
              { key: 'position', label: 'Position' },
              { key: 'experience', label: 'Experience' },
              { key: 'stage', label: 'Stage', render: (r) => <StatusBadge status={r.stage as string} /> },
              { key: 'rating', label: 'Rating', render: (r) => <span className="text-amber-500">{renderStars(r.rating as number)}</span> },
              { key: 'source', label: 'Source', render: (r) => <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{r.source as string}</span> },
              { key: 'actions', label: 'Actions', render: () => (
                <div className="flex gap-2">
                  <button className="text-xs text-indigo-600 hover:underline">View</button>
                  <button className="text-xs text-indigo-600 hover:underline">Schedule</button>
                </div>
              )},
            ]}
            data={candidates as unknown as Record<string, unknown>[]}
          />
        )}

        {activeTab === 'interviews' && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Today's Interviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {interviews.filter(i => i.date === '2026-03-17').map(iv => (
                <div key={iv.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-indigo-600">{iv.time}</span>
                    <StatusBadge status={iv.status} />
                  </div>
                  <p className="font-medium text-gray-900">{iv.candidateName}</p>
                  <p className="text-sm text-gray-600">{iv.position} · {iv.round}</p>
                  <p className="text-xs text-gray-500 mt-1">Panel: {iv.panelists.join(', ')} · {iv.room}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="btn-primary text-xs px-3 py-1">Join</button>
                    <button className="btn-secondary text-xs px-3 py-1">Feedback</button>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">This Week Schedule</h3>
            <DataTable
              columns={[
                { key: 'date', label: 'Date' },
                { key: 'time', label: 'Time' },
                { key: 'candidateName', label: 'Candidate' },
                { key: 'position', label: 'Position' },
                { key: 'round', label: 'Round' },
                { key: 'room', label: 'Room' },
                { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status as string} /> },
              ]}
              data={interviews as unknown as Record<string, unknown>[]}
            />
          </div>
        )}

        {activeTab === 'pipeline' && <KanbanBoard columns={kanbanColumns} />}
      </div>
    </div>
  );
}
