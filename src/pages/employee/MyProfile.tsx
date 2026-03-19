import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Building, Briefcase, User, Shield, CreditCard, Heart, Clock, Award } from 'lucide-react';
import Tabs from '../../components/common/Tabs';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { employees, leaveBalances } from '../../data/mockData';

const tabs = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'job', label: 'Job Details' },
  { id: 'bank', label: 'Bank & Salary' },
  { id: 'documents', label: 'Documents' },
];

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="p-2 bg-gray-100 rounded-lg shrink-0">
        <Icon size={16} className="text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900 mt-0.5">{value}</p>
      </div>
    </div>
  );
}

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState('personal');
  const { user } = useAuth();

  // Match logged-in user to mock employee data (fallback to first employee)
  const emp = employees.find(e => e.email.toLowerCase() === user?.email?.toLowerCase())
    || employees.find(e => e.name === user?.name)
    || employees[1]; // Sara Menon as default employee

  const tenure = Math.round((Date.now() - new Date(emp.joinDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000) * 10) / 10;

  return (
    <div>
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img src={emp.avatar} alt={emp.name} className="w-24 h-24 rounded-full border-4 border-white/30 shadow-lg" />
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold">{emp.name}</h1>
            <p className="text-indigo-200 mt-0.5">{emp.designation}</p>
            <p className="text-indigo-300 text-sm">{emp.department}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{emp.id}</span>
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{emp.type}</span>
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{emp.status}</span>
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full">{emp.shift} Shift</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <Clock size={20} className="text-green-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900">{emp.attendanceRate}%</p>
          <p className="text-xs text-gray-500">Attendance Rate</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <Calendar size={20} className="text-blue-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900">{leaveBalances.reduce((s, l) => s + (l.total - l.used), 0)}</p>
          <p className="text-xs text-gray-500">Leaves Remaining</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <Award size={20} className="text-indigo-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900">{emp.performanceRating}/5</p>
          <p className="text-xs text-gray-500">Performance</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <Briefcase size={20} className="text-purple-500 mx-auto mb-1" />
          <p className="text-xl font-bold text-gray-900">{tenure} yrs</p>
          <p className="text-xs text-gray-500">Tenure</p>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InfoRow icon={User} label="Full Name" value={emp.name} />
            <InfoRow icon={Mail} label="Email" value={emp.email} />
            <InfoRow icon={Phone} label="Phone" value={emp.phone} />
            <InfoRow icon={Calendar} label="Date of Birth" value={emp.dateOfBirth} />
            <InfoRow icon={User} label="Gender" value={emp.gender} />
            <InfoRow icon={MapPin} label="Address" value={emp.address} />
            <InfoRow icon={Heart} label="Emergency Contact" value={`${emp.emergencyContact.name} (${emp.emergencyContact.relation})`} />
            <InfoRow icon={Phone} label="Emergency Phone" value={emp.emergencyContact.phone} />
          </div>
        )}

        {activeTab === 'job' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <InfoRow icon={Shield} label="Employee ID" value={emp.id} />
            <InfoRow icon={Building} label="Department" value={emp.department} />
            <InfoRow icon={Briefcase} label="Designation" value={emp.designation} />
            <InfoRow icon={User} label="Reporting Manager" value={emp.reportingManager} />
            <InfoRow icon={Briefcase} label="Employment Type" value={emp.type} />
            <InfoRow icon={Clock} label="Shift" value={emp.shift} />
            <InfoRow icon={MapPin} label="Work Location" value={emp.workLocation} />
            <InfoRow icon={Calendar} label="Join Date" value={emp.joinDate} />
            <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Shield size={16} className="text-gray-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <div className="mt-1"><StatusBadge status={emp.status} size="md" /></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bank' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 mb-6">
              <InfoRow icon={CreditCard} label="Bank Name" value={emp.bankDetails.bankName} />
              <InfoRow icon={CreditCard} label="Account Number" value={emp.bankDetails.accountNumber.replace(/(.{4})/g, '$1 ').trim()} />
              <InfoRow icon={CreditCard} label="IFSC Code" value={emp.bankDetails.ifsc} />
              <InfoRow icon={CreditCard} label="PAN" value={emp.bankDetails.pan} />
            </div>

            <h3 className="text-sm font-semibold text-gray-700 mb-3 mt-6">Salary Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">Earnings</h4>
                {[
                  ['Basic', emp.salary.basic],
                  ['HRA', emp.salary.hra],
                  ['Special Allowance', emp.salary.special],
                  ['Conveyance', emp.salary.conveyance],
                  ['Medical', emp.salary.medical],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between py-1.5 border-b border-gray-100 text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium">₹{(value as number).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Deductions</h4>
                {[
                  ['PF', emp.salary.pf],
                  ['ESI', emp.salary.esi],
                  ['Professional Tax', emp.salary.pt],
                  ['TDS', emp.salary.tds],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between py-1.5 border-b border-gray-100 text-sm">
                    <span className="text-gray-600">{label}</span>
                    <span className="font-medium text-red-600">₹{(value as number).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-lg p-4 text-white flex items-center justify-between">
              <span className="text-sm opacity-80">Net Monthly Salary</span>
              <span className="text-2xl font-bold">
                ₹{(emp.salary.basic + emp.salary.hra + emp.salary.special + emp.salary.conveyance + emp.salary.medical - emp.salary.pf - emp.salary.esi - emp.salary.pt - emp.salary.tds).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Annual CTC: ₹{emp.salary.ctc.toLocaleString()}</p>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'ID Proof (Aadhaar)', date: emp.joinDate, type: 'PDF' },
              { name: 'PAN Card', date: emp.joinDate, type: 'PDF' },
              { name: 'Offer Letter', date: emp.joinDate, type: 'PDF' },
              { name: 'Address Proof', date: emp.joinDate, type: 'PDF' },
              { name: 'Bank Passbook', date: emp.joinDate, type: 'PDF' },
              { name: 'Educational Certificates', date: emp.joinDate, type: 'PDF' },
            ].map(doc => (
              <div key={doc.name} className="p-4 rounded-lg border border-gray-200 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-xs font-bold shrink-0">
                  {doc.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400">Uploaded: {doc.date}</p>
                </div>
                <button className="text-xs text-indigo-600 hover:underline shrink-0">View</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
