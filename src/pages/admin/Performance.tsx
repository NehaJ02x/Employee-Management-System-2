import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Tabs from '../../components/common/Tabs';
import StatusBadge from '../../components/common/StatusBadge';
import ProgressBar from '../../components/common/ProgressBar';
import { goals, reviews, feedbackItems, employees } from '../../data/mockData';

const tabs = [
  { id: 'goals', label: 'Goals' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'ratings', label: 'Ratings Dashboard' },
];

const typeBadge: Record<string, string> = { Individual: 'bg-blue-100 text-blue-700', Development: 'bg-green-100 text-green-700', Team: 'bg-purple-100 text-purple-700' };
const krStatus: Record<string, string> = { Done: 'text-green-600', 'In Progress': 'text-amber-600', Pending: 'text-gray-400' };

const ratingDist = [
  { label: 'Outstanding', pct: 12, count: 30 },
  { label: 'Excellent', pct: 28, count: 69 },
  { label: 'Good', pct: 42, count: 104 },
  { label: 'Average', pct: 15, count: 37 },
  { label: 'Below', pct: 3, count: 8 },
];

export default function AdminPerformance() {
  const [activeTab, setActiveTab] = useState('goals');
  const [goalView, setGoalView] = useState<'my' | 'team'>('my');
  const [fbTab, setFbTab] = useState<'received' | 'given' | 'requested'>('received');

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Performance</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'goals' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button onClick={() => setGoalView('my')} className={`px-3 py-1 text-sm rounded-lg ${goalView === 'my' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>My Goals</button>
                <button onClick={() => setGoalView('team')} className={`px-3 py-1 text-sm rounded-lg ${goalView === 'team' ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>Team Goals</button>
              </div>
              <button className="btn-primary">+ Add Goal</button>
            </div>
            <div className="space-y-4">
              {goals.map(goal => (
                <div key={goal.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${typeBadge[goal.type]}`}>{goal.type}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>Weight: {goal.weight}%</span>
                      <span>Due: {goal.dueDate}</span>
                    </div>
                  </div>
                  <ProgressBar value={goal.progress} max={100} color="indigo" />
                  <div className="mt-3 space-y-1">
                    {goal.keyResults.map((kr, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <span className={`${krStatus[kr.status]}`}>{kr.status === 'Done' ? '✓' : kr.status === 'In Progress' ? '◐' : '○'}</span>
                        <span className={kr.status === 'Done' ? 'line-through text-gray-400' : 'text-gray-700'}>{kr.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="text-xs text-indigo-600 hover:underline">Update Progress</button>
                    <button className="text-xs text-gray-500 hover:underline">Comment</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-indigo-900">Annual Review 2025-26</h3>
                  <p className="text-sm text-indigo-700">Due: March 31, 2026</p>
                </div>
                <StatusBadge status="In Progress" />
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div><label className="text-sm text-gray-600 mb-1 block">Overall Rating</label>
                <select className="select-field w-48"><option>Select Rating</option>{[5,4,3,2,1].map(r => <option key={r}>{r} - {['','Below','Average','Good','Excellent','Outstanding'][r]}</option>)}</select>
              </div>
              <div><label className="text-sm text-gray-600 mb-1 block">Key Contributions</label><textarea className="input-field" rows={3} placeholder="Describe your key contributions..." /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Challenges Faced</label><textarea className="input-field" rows={3} /></div>
              <div><label className="text-sm text-gray-600 mb-1 block">Growth Areas</label><textarea className="input-field" rows={3} /></div>
              <div className="flex gap-2">
                <button className="btn-secondary">Save Draft</button>
                <button className="btn-primary">Submit</button>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Past Reviews</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50">
                {['Period', 'Self', 'Manager', 'Final', 'Outcome'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {reviews.filter(r => r.status === 'Completed').map(r => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{r.period}</td>
                    <td className="px-4 py-2">{r.selfRating}</td>
                    <td className="px-4 py-2">{r.managerRating}</td>
                    <td className="px-4 py-2 font-semibold">{r.finalRating}</td>
                    <td className="px-4 py-2"><StatusBadge status={r.outcome} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                {(['received', 'given', 'requested'] as const).map(t => (
                  <button key={t} onClick={() => setFbTab(t)} className={`px-3 py-1 text-sm rounded-lg capitalize ${fbTab === t ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>{t}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="btn-primary">Give Feedback</button>
                <button className="btn-secondary">Request Feedback</button>
              </div>
            </div>
            <div className="space-y-3">
              {feedbackItems.map(fb => (
                <div key={fb.id} className="p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">{fb.isAnonymous ? '?' : fb.from[0]}</div>
                    <div>
                      <span className="text-sm font-medium text-gray-900">{fb.isAnonymous ? 'Anonymous' : fb.from}</span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${fb.fromRole === 'Manager' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>{fb.fromRole}</span>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">{fb.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{fb.text}</p>
                  <div className="flex gap-1 mt-2">{fb.tags.map(tag => <span key={tag} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{tag}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ratings' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <select className="select-field w-48"><option>All Departments</option>{['Engineering','Sales','Marketing','HR','Finance'].map(d => <option key={d}>{d}</option>)}</select>
              <select className="select-field w-48"><option>H2 2025-26</option><option>H1 2025-26</option></select>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Rating Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={ratingDist} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="label" type="category" width={90} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="pct" fill="#4f46e5" radius={[0, 4, 4, 0]} name="%" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50">
                {['Employee', 'Self', 'Manager', 'Final', 'Action'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {employees.slice(0, 6).map(e => (
                  <tr key={e.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{e.name}</td>
                    <td className="px-4 py-2">{e.performanceRating}</td>
                    <td className="px-4 py-2">{(e.performanceRating + 0.2).toFixed(1)}</td>
                    <td className="px-4 py-2 font-semibold">{((e.performanceRating + e.performanceRating + 0.2) / 2).toFixed(1)}</td>
                    <td className="px-4 py-2"><button className="text-xs text-indigo-600 hover:underline">Finalize</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex gap-2 mt-4">
              <button className="btn-primary">Calibrate Ratings</button>
              <button className="btn-secondary">Finalize All</button>
              <button className="btn-secondary">Export</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
