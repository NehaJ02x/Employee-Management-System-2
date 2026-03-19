import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Building2, Mail, Users, Award, Phone, PhoneCall, MapPin, Monitor, Edit3, ChevronUp, Briefcase, GraduationCap, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { employees } from '../../data/mockData';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();
const avatarColors: Record<string, string> = {
  'JD': 'bg-indigo-500', 'SM': 'bg-blue-500', 'AK': 'bg-green-500',
  'PD': 'bg-sky-400', 'MR': 'bg-yellow-500', 'RS': 'bg-amber-600',
};

function calcAge(dob: string) {
  if (!dob || dob === '-') return '-';
  const d = new Date(dob); const now = new Date();
  const y = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  const adj = m < 0 || (m === 0 && now.getDate() < d.getDate()) ? 1 : 0;
  return `${y - adj} year(s) ${((m + 12) % 12)} month(s)`;
}
function calcExp(joinDate: string) {
  const d = new Date(joinDate); const now = new Date();
  const diff = now.getTime() - d.getTime();
  const y = Math.floor(diff / (365.25*24*60*60*1000));
  const m = Math.floor((diff % (365.25*24*60*60*1000)) / (30.44*24*60*60*1000));
  return `${y} year(s) ${m} month(s)`;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-gray-500 mb-0.5">{label}</p><p className="text-sm text-gray-900">{value || '-'}</p></div>;
}

function CollapsibleSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center justify-between p-5 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400 hover:text-gray-600" onClick={e => e.stopPropagation()}><Edit3 size={14} /></button>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </div>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

// Generate career timeline events from employee data
function buildCareerTimeline(emp: typeof employees[0]) {
  const events: { date: string; title: string; description: string; type: 'join' | 'promotion' | 'transfer' | 'review' | 'education' | 'experience' }[] = [];

  // Work experience (past)
  emp.workExperience.forEach(w => {
    events.push({ date: w.fromDate, title: `Joined ${w.company}`, description: `as ${w.jobTitle}`, type: 'experience' });
    if (w.toDate) events.push({ date: w.toDate, title: `Left ${w.company}`, description: w.description || '', type: 'experience' });
  });

  // Education
  emp.education.forEach(ed => {
    events.push({ date: ed.dateOfCompletion ? `${ed.dateOfCompletion}-01-01` : '', title: `Completed ${ed.degree}`, description: `${ed.specialization} from ${ed.institute}`, type: 'education' });
  });

  // Current role
  events.push({ date: emp.joinDate, title: `Joined JEXA as ${emp.designation}`, description: `${emp.department} department · ${emp.workLocation}`, type: 'join' });

  // Simulated events
  const joinYear = new Date(emp.joinDate).getFullYear();
  if (new Date().getFullYear() - joinYear >= 1) {
    events.push({ date: `${joinYear + 1}-01-15`, title: 'Annual Performance Review', description: `Rating: ${emp.performanceRating}/5 — Meets Expectations`, type: 'review' });
  }
  if (new Date().getFullYear() - joinYear >= 2) {
    events.push({ date: `${joinYear + 2}-04-01`, title: 'Role Enhancement', description: `Additional responsibilities in ${emp.department}`, type: 'promotion' });
  }

  return events.filter(e => e.date).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function buildAuditTrail(emp: typeof employees[0]) {
  return [
    { date: emp.modifiedTime, action: 'Profile Modified', by: emp.modifiedBy, details: 'Updated work information' },
    { date: emp.addedTime, action: 'Employee Created', by: emp.addedBy, details: `Created employee record ${emp.id}` },
    { date: emp.joinDate, action: 'Onboarding Completed', by: 'System', details: 'Employee onboarding workflow completed' },
    { date: emp.joinDate, action: 'Account Activated', by: 'System', details: `Email sent to ${emp.email}` },
  ];
}

const typeIcon: Record<string, { icon: typeof Briefcase; color: string; bg: string }> = {
  join: { icon: ArrowUpRight, color: 'text-green-600', bg: 'bg-green-100' },
  promotion: { icon: ArrowUpRight, color: 'text-indigo-600', bg: 'bg-indigo-100' },
  transfer: { icon: ArrowDownRight, color: 'text-blue-600', bg: 'bg-blue-100' },
  review: { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
  education: { icon: GraduationCap, color: 'text-purple-600', bg: 'bg-purple-100' },
  experience: { icon: Briefcase, color: 'text-gray-600', bg: 'bg-gray-100' },
};

const profileTabs = ['Profile Information', 'HR Process', 'Career History', 'Audit History'];

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Profile Information');

  const emp = employees.find(e => e.id === id);
  if (!emp) return <div className="p-8 text-center text-gray-500">Employee not found</div>;

  const firstName = emp.name.split(' ')[0];
  const lastName = emp.name.split(' ').slice(1).join(' ');
  const initials = getInitials(emp.name);
  const color = avatarColors[initials] || 'bg-gray-500';

  const infoCards = [
    { icon: Building2, label: 'Department', value: emp.department },
    { icon: Mail, label: 'Email address', value: emp.email },
    { icon: Users, label: 'Zoho Role', value: 'Team member' },
    { icon: Award, label: 'Designation', value: emp.designation },
    { icon: Phone, label: 'Work Phone Number', value: emp.phone },
    { icon: PhoneCall, label: 'Extension', value: emp.extension },
    { icon: MapPin, label: 'Location', value: emp.workLocation },
    { icon: Monitor, label: 'Seating Location', value: emp.seatingLocation },
  ];

  const timeline = buildCareerTimeline(emp);
  const auditTrail = buildAuditTrail(emp);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/employee-management/user-operations')} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><ArrowLeft size={18} /></button>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white text-xs font-semibold`}>{initials}</div>
            <span className="text-sm font-medium text-gray-900">{emp.name}</span>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">Edit Profile</button>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-0">
          {profileTabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* ===== PROFILE INFORMATION ===== */}
      {activeTab === 'Profile Information' && (
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-5 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infoCards.map((card, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-lg"><card.icon size={18} className="text-gray-500" /></div>
                  <div><p className="text-xs text-gray-500">{card.label}</p><p className="text-sm font-medium text-gray-900">{card.value || '-'}</p></div>
                </div>
              ))}
            </div>
          </div>
          <CollapsibleSection title="Basic Information">
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              <InfoRow label="Employee ID" value={emp.id} /><InfoRow label="Nick name" value={emp.nickname} />
              <InfoRow label="First Name" value={firstName} /><InfoRow label="Email address" value={emp.email} />
              <InfoRow label="Last Name" value={lastName} />
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Work Information">
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              <InfoRow label="Department" value={emp.department} /><InfoRow label="Zoho Role" value="Team member" />
              <InfoRow label="Location" value={emp.workLocation} /><InfoRow label="Employment Type" value={emp.type} />
              <InfoRow label="Designation" value={emp.designation} /><InfoRow label="Employee Status" value={emp.status} />
              <div /><InfoRow label="Source of Hire" value={emp.sourceOfHire} />
              <div /><InfoRow label="Date of Joining" value={emp.joinDate} />
              <div /><InfoRow label="Current Experience" value={calcExp(emp.joinDate)} />
              <div /><InfoRow label="Total Experience" value={emp.totalExperience} />
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Hierarchy Information">
            <div className="grid grid-cols-2 gap-y-4 gap-x-12"><InfoRow label="Reporting Manager" value={emp.reportingManager} /></div>
          </CollapsibleSection>
          <CollapsibleSection title="Personal Details">
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              <InfoRow label="Date of Birth" value={emp.dateOfBirth} /><InfoRow label="Age" value={calcAge(emp.dateOfBirth)} />
              <InfoRow label="Gender" value={emp.gender} /><InfoRow label="Marital Status" value={emp.maritalStatus} />
              <InfoRow label="About Me" value={emp.aboutMe} /><InfoRow label="Ask me about/Expertise" value={emp.expertise} />
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Identity Information">
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              <InfoRow label="UAN" value={emp.uan} /><InfoRow label="PAN" value={emp.bankDetails.pan} /><InfoRow label="Aadhaar" value={emp.aadhaar} />
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Contact Details">
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              <InfoRow label="Work Phone Number" value={emp.phone} /><InfoRow label="Extension" value={emp.extension} />
              <InfoRow label="Seating Location" value={emp.seatingLocation} /><InfoRow label="Tags" value="-" />
              <InfoRow label="Present Address" value={emp.address} /><InfoRow label="Permanent Address" value={emp.permanentAddress} />
              <InfoRow label="Personal Mobile Number" value={emp.personalMobile} /><InfoRow label="Personal Email Address" value={emp.personalEmail} />
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Separation Information" defaultOpen={false}>
            <InfoRow label="Date of Exit" value={emp.dateOfExit} />
          </CollapsibleSection>
          <CollapsibleSection title="System Fields" defaultOpen={false}>
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              <InfoRow label="Added By" value={emp.addedBy} /><InfoRow label="Added Time" value={emp.addedTime} />
              <InfoRow label="Modified By" value={emp.modifiedBy} /><InfoRow label="Modified Time" value={emp.modifiedTime} />
            </div>
          </CollapsibleSection>
          <CollapsibleSection title="Work Experience" defaultOpen={false}>
            {emp.workExperience.length > 0 ? (
              <table className="w-full text-sm"><thead><tr className="border-b bg-gray-50">
                {['Company', 'Job Title', 'From', 'To', 'Description', 'Relevant'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
              </tr></thead><tbody className="divide-y divide-gray-100">
                {emp.workExperience.map((w, i) => <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-2">{w.company}</td><td className="px-4 py-2">{w.jobTitle}</td><td className="px-4 py-2">{w.fromDate}</td><td className="px-4 py-2">{w.toDate}</td><td className="px-4 py-2">{w.description||'-'}</td><td className="px-4 py-2">{w.relevant?'Yes':'No'}</td></tr>)}
              </tbody></table>
            ) : <p className="text-sm text-gray-400">No rows found.</p>}
          </CollapsibleSection>
          <CollapsibleSection title="Education Details" defaultOpen={false}>
            {emp.education.length > 0 ? (
              <table className="w-full text-sm"><thead><tr className="border-b bg-gray-50">
                {['Institute', 'Degree', 'Specialization', 'Completion'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
              </tr></thead><tbody className="divide-y divide-gray-100">
                {emp.education.map((ed, i) => <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-2">{ed.institute}</td><td className="px-4 py-2">{ed.degree}</td><td className="px-4 py-2">{ed.specialization}</td><td className="px-4 py-2">{ed.dateOfCompletion||'-'}</td></tr>)}
              </tbody></table>
            ) : <p className="text-sm text-gray-400">No rows found.</p>}
          </CollapsibleSection>
          <CollapsibleSection title="Dependent Details" defaultOpen={false}>
            {emp.dependents.length > 0 ? (
              <table className="w-full text-sm"><thead><tr className="border-b bg-gray-50">
                {['Name', 'Relationship', 'Date of Birth'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
              </tr></thead><tbody className="divide-y divide-gray-100">
                {emp.dependents.map((d, i) => <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-2">{d.name}</td><td className="px-4 py-2">{d.relationship}</td><td className="px-4 py-2">{d.dateOfBirth}</td></tr>)}
              </tbody></table>
            ) : <p className="text-sm text-gray-400">No rows found.</p>}
          </CollapsibleSection>
        </div>
      )}

      {/* ===== HR PROCESS ===== */}
      {activeTab === 'HR Process' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">HR Process Status</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Onboarding', status: 'Completed', color: 'green' },
                { label: 'Probation Review', status: emp.status === 'Probation' ? 'In Progress' : 'Completed', color: emp.status === 'Probation' ? 'amber' : 'green' },
                { label: 'Background Verification', status: 'Completed', color: 'green' },
                { label: 'Asset Assignment', status: 'Completed', color: 'green' },
                { label: 'Training', status: 'Ongoing', color: 'blue' },
                { label: 'Exit Process', status: emp.status === 'Notice Period' ? 'In Progress' : 'N/A', color: emp.status === 'Notice Period' ? 'red' : 'gray' },
              ].map(p => {
                const colors: Record<string, string> = { green: 'bg-green-100 text-green-700', amber: 'bg-amber-100 text-amber-700', blue: 'bg-blue-100 text-blue-700', red: 'bg-red-100 text-red-700', gray: 'bg-gray-100 text-gray-500' };
                return (
                  <div key={p.label} className="p-3 rounded-lg border border-gray-200">
                    <p className="text-sm font-medium text-gray-800">{p.label}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${colors[p.color]}`}>{p.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Performance Reviews</h3>
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-gray-50">
                {['Period', 'Rating', 'Outcome', 'Reviewer'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">FY 2025-26 (H1)</td>
                  <td className="px-4 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">{emp.performanceRating}/5</span></td>
                  <td className="px-4 py-2">Meets Expectations</td>
                  <td className="px-4 py-2">{emp.reportingManager}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">FY 2024-25</td>
                  <td className="px-4 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">{Math.max(3.5, emp.performanceRating - 0.2).toFixed(1)}/5</span></td>
                  <td className="px-4 py-2">Meets Expectations</td>
                  <td className="px-4 py-2">{emp.reportingManager}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ===== CAREER HISTORY ===== */}
      {activeTab === 'Career History' && (
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-6">Career Timeline</h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-6">
                {timeline.map((event, i) => {
                  const ti = typeIcon[event.type] || typeIcon.experience;
                  const Icon = ti.icon;
                  return (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`relative z-10 w-10 h-10 rounded-full ${ti.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={18} className={ti.color} />
                      </div>
                      <div className="flex-1 pb-1">
                        <div className="flex items-baseline gap-2">
                          <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                          <span className="text-xs text-gray-400">{event.date}</span>
                        </div>
                        {event.description && <p className="text-xs text-gray-500 mt-0.5">{event.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== AUDIT HISTORY ===== */}
      {activeTab === 'Audit History' && (
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Audit Trail</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  {['Date/Time', 'Action', 'By', 'Details'].map(h => <th key={h} className="px-4 py-2 text-left text-xs font-medium text-gray-500">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {auditTrail.map((a, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-500 whitespace-nowrap">{a.date}</td>
                    <td className="px-4 py-2 font-medium text-gray-800">{a.action}</td>
                    <td className="px-4 py-2 text-gray-700">{a.by}</td>
                    <td className="px-4 py-2 text-gray-500">{a.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
