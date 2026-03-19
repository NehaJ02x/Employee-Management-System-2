import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, ChevronUp, ChevronDown } from 'lucide-react';
import { employees } from '../../data/mockData';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();
const avatarColors: Record<string, string> = {
  'JD': 'bg-indigo-500', 'SM': 'bg-blue-500', 'AK': 'bg-green-500',
  'PD': 'bg-sky-400', 'MR': 'bg-yellow-500', 'RS': 'bg-amber-600',
};
const statusColors: Record<string, string> = {
  'Active': 'bg-green-100 text-green-700', 'Probation': 'bg-amber-100 text-amber-700',
  'Notice Period': 'bg-red-100 text-red-700',
};

function calcAge(dob: string) {
  const d = new Date(dob);
  const now = new Date();
  const y = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  const adj = m < 0 || (m === 0 && now.getDate() < d.getDate()) ? 1 : 0;
  return `${y - adj} year(s) ${((m + 12) % 12)} month(s)`;
}

function calcExp(joinDate: string) {
  const d = new Date(joinDate);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor((diffMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
  return `${years} year(s) ${months} month(s)`;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center justify-between p-5 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h2>
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400 hover:text-gray-600" onClick={e => e.stopPropagation()}>
            <Edit3 size={14} />
          </button>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm text-gray-900">{value || '-'}</p>
    </div>
  );
}

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const emp = employees.find(e => e.id === id);
  if (!emp) return <div className="p-8 text-center text-gray-500">Employee not found</div>;

  const firstName = emp.name.split(' ')[0];
  const lastName = emp.name.split(' ').slice(1).join(' ');
  const initials = getInitials(emp.name);
  const color = avatarColors[initials] || 'bg-gray-500';

  return (
    <div>
      <button onClick={() => navigate('/employee-management')} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-4">
        <ArrowLeft size={16} /> Back to Employee List
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center text-white text-xl font-semibold`}>{initials}</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{emp.name}</h1>
              <p className="text-sm text-gray-500">{emp.designation} · {emp.department}</p>
              <p className="text-xs text-gray-400 mt-0.5">{emp.id} · {emp.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[emp.status] || 'bg-gray-100 text-gray-700'}`}>{emp.status}</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <CollapsibleSection title="Basic Information">
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Employee ID" value={emp.id} />
          <InfoRow label="Nick name" value={emp.nickname} />
          <InfoRow label="First Name" value={firstName} />
          <InfoRow label="Email address" value={emp.email} />
          <InfoRow label="Last Name" value={lastName} />
        </div>
      </CollapsibleSection>

      {/* Work Information */}
      <CollapsibleSection title="Work Information">
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Department" value={emp.department} />

          <InfoRow label="Location" value={emp.workLocation} />
          <InfoRow label="Employment Type" value={emp.type} />
          <InfoRow label="Designation" value={emp.designation} />
          <InfoRow label="Employee Status" value={emp.status} />
          <div />
          <InfoRow label="Source of Hire" value={emp.sourceOfHire} />
          <div />
          <InfoRow label="Date of Joining" value={emp.joinDate} />
          <div />
          <InfoRow label="Current Experience" value={calcExp(emp.joinDate)} />
          <div />
          <InfoRow label="Total Experience" value={emp.totalExperience} />
        </div>
      </CollapsibleSection>

      {/* Hierarchy Information */}
      <CollapsibleSection title="Hierarchy Information">
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Reporting Manager" value={emp.reportingManager} />
        </div>
      </CollapsibleSection>

      {/* Personal Details */}
      <CollapsibleSection title="Personal Details">
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Date of Birth" value={emp.dateOfBirth} />
          <InfoRow label="Age" value={calcAge(emp.dateOfBirth)} />
          <InfoRow label="Gender" value={emp.gender} />
          <InfoRow label="Marital Status" value={emp.maritalStatus} />
          <InfoRow label="About Me" value={emp.aboutMe} />
          <InfoRow label="Ask me about/Expertise" value={emp.expertise} />
        </div>
      </CollapsibleSection>

      {/* Identity Information */}
      <CollapsibleSection title="Identity Information">
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="UAN" value={emp.uan} />
          <InfoRow label="PAN" value={emp.bankDetails.pan} />
          <InfoRow label="Aadhaar" value={emp.aadhaar} />
        </div>
      </CollapsibleSection>

      {/* Contact Details */}
      <CollapsibleSection title="Contact Details">
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Work Phone Number" value={emp.phone} />
          <InfoRow label="Extension" value={emp.extension} />
          <InfoRow label="Seating Location" value={emp.seatingLocation} />
          <InfoRow label="Tags" value="-" />
          <InfoRow label="Present Address" value={emp.address} />
          <InfoRow label="Permanent Address" value={emp.permanentAddress} />
          <InfoRow label="Personal Mobile Number" value={emp.personalMobile} />
          <InfoRow label="Personal Email Address" value={emp.personalEmail} />
        </div>
      </CollapsibleSection>

      {/* Separation Information */}
      <CollapsibleSection title="Separation Information" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Date of Exit" value={emp.dateOfExit} />
        </div>
      </CollapsibleSection>

      {/* System Fields */}
      <CollapsibleSection title="System Fields" defaultOpen={false}>
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Added By" value={emp.addedBy} />
          <InfoRow label="Added Time" value={emp.addedTime} />
          <InfoRow label="Modified By" value={emp.modifiedBy} />
          <InfoRow label="Modified Time" value={emp.modifiedTime} />
        </div>
      </CollapsibleSection>

      {/* Work Experience */}
      <CollapsibleSection title="Work Experience" defaultOpen={false}>
        {emp.workExperience.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Company Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Job Title</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">From Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">To Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Job Description</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Relevant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {emp.workExperience.map((w, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{w.company}</td>
                    <td className="px-4 py-2 text-gray-700">{w.jobTitle}</td>
                    <td className="px-4 py-2 text-gray-700">{w.fromDate}</td>
                    <td className="px-4 py-2 text-gray-700">{w.toDate}</td>
                    <td className="px-4 py-2 text-gray-700">{w.description || '-'}</td>
                    <td className="px-4 py-2 text-gray-700">{w.relevant ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No rows found.</p>
        )}
      </CollapsibleSection>

      {/* Education Details */}
      <CollapsibleSection title="Education Details" defaultOpen={false}>
        {emp.education.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Institute Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Degree/Diploma</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Specialization</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date of Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {emp.education.map((ed, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{ed.institute}</td>
                    <td className="px-4 py-2 text-gray-700">{ed.degree}</td>
                    <td className="px-4 py-2 text-gray-700">{ed.specialization}</td>
                    <td className="px-4 py-2 text-gray-700">{ed.dateOfCompletion || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No rows found.</p>
        )}
      </CollapsibleSection>

      {/* Dependent Details */}
      <CollapsibleSection title="Dependent Details" defaultOpen={false}>
        {emp.dependents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Relationship</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Date of Birth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {emp.dependents.map((dep, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{dep.name}</td>
                    <td className="px-4 py-2 text-gray-700">{dep.relationship}</td>
                    <td className="px-4 py-2 text-gray-700">{dep.dateOfBirth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No rows found.</p>
        )}
      </CollapsibleSection>
    </div>
  );
}
