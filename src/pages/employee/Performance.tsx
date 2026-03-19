import { useState } from 'react';
import Tabs from '../../components/common/Tabs';
import StatusBadge from '../../components/common/StatusBadge';
import ProgressBar from '../../components/common/ProgressBar';
import { goals, reviews, feedbackItems } from '../../data/mockData';

const tabs = [
  { id: 'goals', label: 'My Goals' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'feedback', label: 'Feedback' },
];

const typeBadge: Record<string, string> = { Individual: 'bg-blue-100 text-blue-700', Development: 'bg-green-100 text-green-700', Team: 'bg-purple-100 text-purple-700' };
const krStatus: Record<string, string> = { Done: 'text-green-600', 'In Progress': 'text-amber-600', Pending: 'text-gray-400' };

export default function EmployeePerformance() {
  const [activeTab, setActiveTab] = useState('goals');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Performance</h1>
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'goals' && (
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadge[goal.type]}`}>{goal.type}</span>
                  </div>
                  <span className="text-sm text-gray-500">Due: {goal.dueDate}</span>
                </div>
                <ProgressBar value={goal.progress} max={100} color="indigo" />
                <div className="mt-3 space-y-1">
                  {goal.keyResults.map((kr, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className={krStatus[kr.status]}>{kr.status === 'Done' ? '✓' : kr.status === 'In Progress' ? '◐' : '○'}</span>
                      <span className={kr.status === 'Done' ? 'line-through text-gray-400' : 'text-gray-700'}>{kr.title}</span>
                    </div>
                  ))}
                </div>
                <button className="text-xs text-indigo-600 hover:underline mt-2">Update Progress</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50 mb-6">
              <h3 className="font-semibold text-indigo-900">Annual Review 2025-26</h3>
              <p className="text-sm text-indigo-700">Due: March 31, 2026</p>
              <StatusBadge status="In Progress" />
            </div>
            <div className="space-y-4 mb-6">
              <div><label className="text-sm text-gray-600 mb-1 block">Overall Rating</label><select className="select-field w-48"><option>Select</option>{[5,4,3,2,1].map(r => <option key={r}>{r}</option>)}</select></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Key Contributions</label><textarea className="input-field" rows={3} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Challenges</label><textarea className="input-field" rows={3} /></div>
              <div className="flex gap-2"><button className="btn-secondary">Save Draft</button><button className="btn-primary">Submit</button></div>
            </div>
            <h3 className="text-sm font-semibold mb-3">Past Reviews</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50">
                {['Period', 'Self', 'Manager', 'Final', 'Outcome'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.filter(r => r.status === 'Completed').map(r => (
                  <tr key={r.id}><td className="px-4 py-2">{r.period}</td><td className="px-4 py-2">{r.selfRating}</td><td className="px-4 py-2">{r.managerRating}</td><td className="px-4 py-2 font-semibold">{r.finalRating}</td><td className="px-4 py-2"><StatusBadge status={r.outcome} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div>
            <div className="flex justify-end mb-4"><button className="btn-primary">Request Feedback</button></div>
            <div className="space-y-3">
              {feedbackItems.map(fb => (
                <div key={fb.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">{fb.isAnonymous ? '?' : fb.from[0]}</div>
                    <span className="text-sm font-medium">{fb.isAnonymous ? 'Anonymous' : fb.from}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${fb.fromRole === 'Manager' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{fb.fromRole}</span>
                    <span className="ml-auto text-xs text-gray-400">{fb.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{fb.text}</p>
                  <div className="flex gap-1 mt-2">{fb.tags.map(tag => <span key={tag} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{tag}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
