import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StatusBadge from '../../components/common/StatusBadge';
import Tabs from '../../components/common/Tabs';
import ProgressBar from '../../components/common/ProgressBar';
import Timeline from '../../components/common/Timeline';
import { employees, leaveBalances, attendanceRecords } from '../../data/mockData';

const profileTabs = [
  { id: 'personal', label: 'Personal' },
  { id: 'job', label: 'Job Details' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'leave', label: 'Leave' },
  { id: 'salary', label: 'Salary' },
  { id: 'documents', label: 'Documents' },
  { id: 'timeline', label: 'Timeline' },
];

export default function EmployeeProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('personal');
  const emp = employees.find(e => e.id === id) || employees[0];

  const empAttendance = attendanceRecords.filter(a => a.employeeId === emp.id);
  const tenure = Math.round((Date.now() - new Date(emp.joinDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000) * 10) / 10;

  return (
    <div>
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img src={emp.avatar} alt={emp.name} className="w-20 h-20 rounded-full border-4 border-white/30" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{emp.name}</h1>
            <p className="text-indigo-200">{emp.designation} · {emp.department}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{emp.id}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{emp.type}</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded">{emp.status}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/20 rounded-lg text-sm hover:bg-white/30">Edit</button>
            <button className="px-4 py-2 bg-red-500/80 rounded-lg text-sm hover:bg-red-600">Deactivate</button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Attendance Rate', value: `${emp.attendanceRate}%` },
          { label: 'Leaves Remaining', value: '29' },
          { label: 'Performance Rating', value: `${emp.performanceRating}/5` },
          { label: 'Tenure', value: `${tenure} yrs` },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-lg border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={profileTabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Full Name', emp.name], ['Email', emp.email], ['Phone', emp.phone],
              ['Date of Birth', emp.dateOfBirth], ['Gender', emp.gender], ['Address', emp.address],
              ['Emergency Contact', `${emp.emergencyContact.name} (${emp.emergencyContact.relation})`],
              ['Emergency Phone', emp.emergencyContact.phone],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'job' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Employee ID', emp.id], ['Department', emp.department], ['Designation', emp.designation],
              ['Reporting Manager', emp.reportingManager], ['Employment Type', emp.type], ['Shift', emp.shift],
              ['Work Location', emp.workLocation], ['Join Date', emp.joinDate], ['Status', emp.status],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50">
                {['Date', 'Day', 'Check In', 'Check Out', 'Hours', 'Status'].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-xs font-medium text-gray-500">{h}</th>
                ))}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {empAttendance.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{a.date}</td>
                    <td className="px-3 py-2">{a.day}</td>
                    <td className="px-3 py-2">{a.checkIn}</td>
                    <td className="px-3 py-2">{a.checkOut}</td>
                    <td className="px-3 py-2">{a.effectiveHrs}</td>
                    <td className="px-3 py-2"><StatusBadge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'leave' && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {leaveBalances.map(lb => (
                <div key={lb.code} className="p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{lb.code}</span>
                    <span className="text-sm font-bold">{lb.total - lb.used}/{lb.total}</span>
                  </div>
                  <ProgressBar value={lb.total - lb.used} max={lb.total} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-green-600 mb-3">Earnings</h3>
              {[
                ['Basic', emp.salary.basic], ['HRA', emp.salary.hra], ['Special Allowance', emp.salary.special],
                ['Conveyance', emp.salary.conveyance], ['Medical', emp.salary.medical],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-medium">₹{(value as number).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-600 mb-3">Deductions</h3>
              {[
                ['PF', emp.salary.pf], ['ESI', emp.salary.esi], ['PT', emp.salary.pt], ['TDS', emp.salary.tds],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{label}</span>
                  <span className="text-sm font-medium text-red-600">₹{(value as number).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['ID Proof', 'Offer Letter', 'Address Proof', 'PAN Card', 'Bank Passbook'].map(doc => (
              <div key={doc} className="p-4 rounded-lg border border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 text-xs font-bold">PDF</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{doc}</p>
                  <p className="text-xs text-gray-400">Uploaded on {emp.joinDate}</p>
                </div>
                <button className="text-xs text-indigo-600 hover:underline">Download</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'timeline' && (
          <Timeline items={[
            { time: emp.joinDate, title: 'Joined as ' + emp.designation, description: emp.department, color: 'green' },
            { time: '2023-06-01', title: 'Promoted to Senior Engineer', color: 'blue' },
            { time: '2024-01-15', title: 'Annual Review Completed', description: 'Rating: 4.0 - Exceeds Expectations', color: 'indigo' },
            { time: '2024-07-01', title: 'Promoted to Engineering Manager', color: 'purple' },
            { time: '2025-01-15', title: 'Annual Review Completed', description: 'Rating: 4.2 - Exceeds Expectations', color: 'indigo' },
          ]} />
        )}
      </div>
    </div>
  );
}
