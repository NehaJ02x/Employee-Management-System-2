import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, ChevronUp, ChevronDown, FileText, Download, Upload, Eye, Trash2, X, AlertTriangle, Check, Camera } from 'lucide-react';
import { employees, departments, designations, subDepartments } from '../../data/mockData';
import type { Employee } from '../../types';

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase();
const avatarColors: Record<string, string> = {
  'JD': 'bg-indigo-500', 'SM': 'bg-blue-500', 'AK': 'bg-green-500',
  'PD': 'bg-sky-400', 'MR': 'bg-yellow-500', 'RS': 'bg-amber-600',
};
const statusColors: Record<string, string> = {
  'Active': 'bg-green-100 text-green-700', 'Probation': 'bg-amber-100 text-amber-700',
  'Notice Period': 'bg-red-100 text-red-700', 'Inactive': 'bg-gray-100 text-gray-500',
};
const allStatuses: Employee['status'][] = ['Active', 'Probation', 'Notice Period', 'Inactive'];

function calcAge(dob: string) {
  if (!dob || dob === '-') return '-';
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
  onEdit?: () => void;
}

function CollapsibleSection({ title, children, defaultOpen = true, onEdit }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center justify-between p-5 cursor-pointer" onClick={() => setOpen(o => !o)}>
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h2>
        <div className="flex items-center gap-2">
          {onEdit && (
            <button className="p-1 text-gray-400 hover:text-indigo-600" onClick={e => { e.stopPropagation(); onEdit(); }}>
              <Edit3 size={14} />
            </button>
          )}
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

// Reusable input/field components for edit modal
const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white";
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-gray-600 mb-1.5 block">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      {children}
    </div>
  );
}

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const originalEmp = employees.find(e => e.id === id);
  if (!originalEmp) return <div className="p-8 text-center text-gray-500">Employee not found</div>;

  // Local editable copy of employee
  const [emp, setEmp] = useState<Employee>({ ...originalEmp });
  const [isDeleted, setIsDeleted] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSection, setEditSection] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState<Employee['status'] | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  // Edit form state — mirrors employee fields
  const [editForm, setEditForm] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  if (isDeleted) {
    return (
      <div className="p-12 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={28} className="text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Employee Deleted</h2>
        <p className="text-sm text-gray-500 mb-6">This employee record has been removed successfully.</p>
        <button onClick={() => navigate('/employee-management')} className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          Back to Employee List
        </button>
      </div>
    );
  }

  const firstName = emp.name.split(' ')[0];
  const lastName = emp.name.split(' ').slice(1).join(' ');
  const initials = getInitials(emp.name);
  const color = avatarColors[initials] || 'bg-gray-500';

  // Open edit modal for a specific section
  const openEdit = (section: string) => {
    setEditSection(section);
    // Pre-populate form based on section
    const fields: Record<string, Record<string, string>> = {
      'Basic Information': { firstName, lastName, nickname: emp.nickname, email: emp.email },
      'Work Information': { department: emp.department, subDepartment: emp.subDepartment, designation: emp.designation, type: emp.type, workLocation: emp.workLocation, status: emp.status, sourceOfHire: emp.sourceOfHire, joinDate: emp.joinDate, totalExperience: emp.totalExperience },
      'Hierarchy Information': { reportingManager: emp.reportingManager },
      'Personal Details': { dateOfBirth: emp.dateOfBirth, gender: emp.gender, maritalStatus: emp.maritalStatus, aboutMe: emp.aboutMe, expertise: emp.expertise },
      'Identity Information': { uan: emp.uan, pan: emp.bankDetails.pan, aadhaar: emp.aadhaar },
      'Contact Details': { phone: emp.phone, extension: emp.extension, seatingLocation: emp.seatingLocation, address: emp.address, permanentAddress: emp.permanentAddress, personalMobile: emp.personalMobile, personalEmail: emp.personalEmail },
      'Profile': { firstName, lastName, nickname: emp.nickname, email: emp.email, department: emp.department, designation: emp.designation, type: emp.type, workLocation: emp.workLocation, phone: emp.phone, dateOfBirth: emp.dateOfBirth, gender: emp.gender, maritalStatus: emp.maritalStatus, aboutMe: emp.aboutMe, expertise: emp.expertise, reportingManager: emp.reportingManager },
    };
    setEditForm(fields[section] || {});
    setShowEditModal(true);
  };

  const updateEditField = (key: string, value: string) => setEditForm(f => ({ ...f, [key]: value }));

  // Save edits back to employee state
  const saveEdit = () => {
    setEmp(prev => {
      const updated = { ...prev, modifiedBy: 'Admin', modifiedTime: new Date().toLocaleString() };
      if (editForm.firstName !== undefined || editForm.lastName !== undefined) {
        const fn = editForm.firstName ?? firstName;
        const ln = editForm.lastName ?? lastName;
        updated.name = `${fn} ${ln}`.trim();
      }
      if (editForm.nickname !== undefined) updated.nickname = editForm.nickname;
      if (editForm.email !== undefined) updated.email = editForm.email;
      if (editForm.department !== undefined) updated.department = editForm.department;
      if (editForm.subDepartment !== undefined) updated.subDepartment = editForm.subDepartment;
      if (editForm.designation !== undefined) updated.designation = editForm.designation;
      if (editForm.type !== undefined) updated.type = editForm.type as Employee['type'];
      if (editForm.workLocation !== undefined) updated.workLocation = editForm.workLocation;
      if (editForm.sourceOfHire !== undefined) updated.sourceOfHire = editForm.sourceOfHire;
      if (editForm.joinDate !== undefined) updated.joinDate = editForm.joinDate;
      if (editForm.totalExperience !== undefined) updated.totalExperience = editForm.totalExperience;
      if (editForm.reportingManager !== undefined) updated.reportingManager = editForm.reportingManager;
      if (editForm.dateOfBirth !== undefined) updated.dateOfBirth = editForm.dateOfBirth;
      if (editForm.gender !== undefined) updated.gender = editForm.gender as Employee['gender'];
      if (editForm.maritalStatus !== undefined) updated.maritalStatus = editForm.maritalStatus;
      if (editForm.aboutMe !== undefined) updated.aboutMe = editForm.aboutMe;
      if (editForm.expertise !== undefined) updated.expertise = editForm.expertise;
      if (editForm.uan !== undefined) updated.uan = editForm.uan;
      if (editForm.aadhaar !== undefined) updated.aadhaar = editForm.aadhaar;
      if (editForm.pan !== undefined) updated.bankDetails = { ...updated.bankDetails, pan: editForm.pan };
      if (editForm.phone !== undefined) updated.phone = editForm.phone;
      if (editForm.extension !== undefined) updated.extension = editForm.extension;
      if (editForm.seatingLocation !== undefined) updated.seatingLocation = editForm.seatingLocation;
      if (editForm.address !== undefined) updated.address = editForm.address;
      if (editForm.permanentAddress !== undefined) updated.permanentAddress = editForm.permanentAddress;
      if (editForm.personalMobile !== undefined) updated.personalMobile = editForm.personalMobile;
      if (editForm.personalEmail !== undefined) updated.personalEmail = editForm.personalEmail;
      return updated;
    });
    setShowEditModal(false);
  };

  // Change status with confirmation
  const confirmStatusChange = (newStatus: Employee['status']) => {
    setShowStatusConfirm(newStatus);
    setShowStatusDropdown(false);
  };
  const applyStatusChange = () => {
    if (!showStatusConfirm) return;
    setEmp(prev => ({
      ...prev,
      status: showStatusConfirm,
      modifiedBy: 'Admin',
      modifiedTime: new Date().toLocaleString(),
      ...(showStatusConfirm === 'Inactive' ? { dateOfExit: new Date().toISOString().split('T')[0] } : {}),
    }));
    setShowStatusConfirm(null);
  };

  // Delete
  const handleDelete = () => {
    if (deleteConfirmText !== emp.name) return;
    setIsDeleted(true);
    setShowDeleteConfirm(false);
  };

  // Dynamic designation options
  const deptDesignations = editForm.department
    ? designations.filter(d => d.department === editForm.department)
    : designations;
  const deptSubDepts = editForm.department
    ? subDepartments.filter(sd => sd.departmentName === editForm.department)
    : [];

  // Render edit modal fields based on section
  const renderEditFields = () => {
    switch (editSection) {
      case 'Basic Information':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="First Name" required><input className={inputCls} value={editForm.firstName || ''} onChange={e => updateEditField('firstName', e.target.value)} /></Field>
            <Field label="Last Name" required><input className={inputCls} value={editForm.lastName || ''} onChange={e => updateEditField('lastName', e.target.value)} /></Field>
            <Field label="Nick Name"><input className={inputCls} value={editForm.nickname || ''} onChange={e => updateEditField('nickname', e.target.value)} /></Field>
            <Field label="Email Address" required><input className={inputCls} type="email" value={editForm.email || ''} onChange={e => updateEditField('email', e.target.value)} /></Field>
          </div>
        );
      case 'Work Information':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Department" required>
              <select className={inputCls} value={editForm.department || ''} onChange={e => { updateEditField('department', e.target.value); updateEditField('designation', ''); updateEditField('subDepartment', ''); }}>
                <option value="">Select</option>
                {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </Field>
            {deptSubDepts.length > 0 && (
              <Field label="Sub-department">
                <select className={inputCls} value={editForm.subDepartment || ''} onChange={e => updateEditField('subDepartment', e.target.value)}>
                  <option value="">Select</option>
                  {deptSubDepts.map(sd => <option key={sd.id} value={sd.name}>{sd.name}</option>)}
                </select>
              </Field>
            )}
            <Field label="Designation" required>
              <select className={inputCls} value={editForm.designation || ''} onChange={e => updateEditField('designation', e.target.value)}>
                <option value="">Select</option>
                {deptDesignations.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </Field>
            <Field label="Employment Type">
              <select className={inputCls} value={editForm.type || ''} onChange={e => updateEditField('type', e.target.value)}>
                <option>Full-Time</option><option>Contract</option><option>Intern</option><option>Part-Time</option>
              </select>
            </Field>
            <Field label="Work Location"><input className={inputCls} value={editForm.workLocation || ''} onChange={e => updateEditField('workLocation', e.target.value)} /></Field>
            <Field label="Source of Hire">
              <select className={inputCls} value={editForm.sourceOfHire || ''} onChange={e => updateEditField('sourceOfHire', e.target.value)}>
                <option value="">Select</option><option>LinkedIn</option><option>Referral</option><option>Job Portal</option><option>Direct</option><option>Campus</option>
              </select>
            </Field>
            <Field label="Date of Joining"><input className={inputCls} type="date" value={editForm.joinDate || ''} onChange={e => updateEditField('joinDate', e.target.value)} /></Field>
            <Field label="Total Experience"><input className={inputCls} value={editForm.totalExperience || ''} onChange={e => updateEditField('totalExperience', e.target.value)} /></Field>
          </div>
        );
      case 'Hierarchy Information':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Reporting Manager">
              <select className={inputCls} value={editForm.reportingManager || ''} onChange={e => updateEditField('reportingManager', e.target.value)}>
                <option value="">Select</option>
                {employees.filter(e => e.id !== id).map(e => <option key={e.id} value={e.name}>{e.name} — {e.designation}</option>)}
                <option value="VP Engineering">VP Engineering</option>
              </select>
            </Field>
          </div>
        );
      case 'Personal Details':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Date of Birth"><input className={inputCls} type="date" value={editForm.dateOfBirth || ''} onChange={e => updateEditField('dateOfBirth', e.target.value)} /></Field>
            <Field label="Gender">
              <select className={inputCls} value={editForm.gender || ''} onChange={e => updateEditField('gender', e.target.value)}>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </Field>
            <Field label="Marital Status">
              <select className={inputCls} value={editForm.maritalStatus || ''} onChange={e => updateEditField('maritalStatus', e.target.value)}>
                <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
              </select>
            </Field>
            <div />
            <Field label="About Me"><textarea className={inputCls} rows={2} value={editForm.aboutMe || ''} onChange={e => updateEditField('aboutMe', e.target.value)} /></Field>
            <Field label="Expertise"><textarea className={inputCls} rows={2} value={editForm.expertise || ''} onChange={e => updateEditField('expertise', e.target.value)} /></Field>
          </div>
        );
      case 'Identity Information':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="UAN"><input className={inputCls} value={editForm.uan || ''} onChange={e => updateEditField('uan', e.target.value)} /></Field>
            <Field label="PAN"><input className={inputCls} value={editForm.pan || ''} onChange={e => updateEditField('pan', e.target.value)} /></Field>
            <Field label="Aadhaar"><input className={inputCls} value={editForm.aadhaar || ''} onChange={e => updateEditField('aadhaar', e.target.value)} /></Field>
          </div>
        );
      case 'Contact Details':
        return (
          <div className="grid grid-cols-2 gap-4">
            <Field label="Work Phone"><input className={inputCls} value={editForm.phone || ''} onChange={e => updateEditField('phone', e.target.value)} /></Field>
            <Field label="Extension"><input className={inputCls} value={editForm.extension || ''} onChange={e => updateEditField('extension', e.target.value)} /></Field>
            <Field label="Seating Location"><input className={inputCls} value={editForm.seatingLocation || ''} onChange={e => updateEditField('seatingLocation', e.target.value)} /></Field>
            <div />
            <Field label="Personal Mobile"><input className={inputCls} value={editForm.personalMobile || ''} onChange={e => updateEditField('personalMobile', e.target.value)} /></Field>
            <Field label="Personal Email"><input className={inputCls} type="email" value={editForm.personalEmail || ''} onChange={e => updateEditField('personalEmail', e.target.value)} /></Field>
            <div className="col-span-2"><Field label="Present Address"><textarea className={inputCls} rows={2} value={editForm.address || ''} onChange={e => updateEditField('address', e.target.value)} /></Field></div>
            <div className="col-span-2"><Field label="Permanent Address"><textarea className={inputCls} rows={2} value={editForm.permanentAddress || ''} onChange={e => updateEditField('permanentAddress', e.target.value)} /></Field></div>
          </div>
        );
      case 'Profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div onClick={() => fileRef.current?.click()} className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-indigo-400 overflow-hidden">
                <div className="text-center"><Camera size={20} className="text-gray-400 mx-auto" /><p className="text-[10px] text-gray-400 mt-0.5">Change</p></div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" />
              <div>
                <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.id}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="First Name" required><input className={inputCls} value={editForm.firstName || ''} onChange={e => updateEditField('firstName', e.target.value)} /></Field>
              <Field label="Last Name" required><input className={inputCls} value={editForm.lastName || ''} onChange={e => updateEditField('lastName', e.target.value)} /></Field>
              <Field label="Nick Name"><input className={inputCls} value={editForm.nickname || ''} onChange={e => updateEditField('nickname', e.target.value)} /></Field>
              <Field label="Email Address" required><input className={inputCls} type="email" value={editForm.email || ''} onChange={e => updateEditField('email', e.target.value)} /></Field>
              <Field label="Department">
                <select className={inputCls} value={editForm.department || ''} onChange={e => updateEditField('department', e.target.value)}>
                  {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </Field>
              <Field label="Designation"><input className={inputCls} value={editForm.designation || ''} onChange={e => updateEditField('designation', e.target.value)} /></Field>
              <Field label="Employment Type">
                <select className={inputCls} value={editForm.type || ''} onChange={e => updateEditField('type', e.target.value)}>
                  <option>Full-Time</option><option>Contract</option><option>Intern</option><option>Part-Time</option>
                </select>
              </Field>
              <Field label="Work Location"><input className={inputCls} value={editForm.workLocation || ''} onChange={e => updateEditField('workLocation', e.target.value)} /></Field>
              <Field label="Phone"><input className={inputCls} value={editForm.phone || ''} onChange={e => updateEditField('phone', e.target.value)} /></Field>
              <Field label="Date of Birth"><input className={inputCls} type="date" value={editForm.dateOfBirth || ''} onChange={e => updateEditField('dateOfBirth', e.target.value)} /></Field>
              <Field label="Gender">
                <select className={inputCls} value={editForm.gender || ''} onChange={e => updateEditField('gender', e.target.value)}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </Field>
              <Field label="Marital Status">
                <select className={inputCls} value={editForm.maritalStatus || ''} onChange={e => updateEditField('maritalStatus', e.target.value)}>
                  <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                </select>
              </Field>
              <Field label="Reporting Manager">
                <select className={inputCls} value={editForm.reportingManager || ''} onChange={e => updateEditField('reportingManager', e.target.value)}>
                  <option value="">Select</option>
                  {employees.filter(e => e.id !== id).map(e => <option key={e.id} value={e.name}>{e.name}</option>)}
                  <option value="VP Engineering">VP Engineering</option>
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="About Me"><textarea className={inputCls} rows={2} value={editForm.aboutMe || ''} onChange={e => updateEditField('aboutMe', e.target.value)} /></Field>
              <Field label="Expertise"><textarea className={inputCls} rows={2} value={editForm.expertise || ''} onChange={e => updateEditField('expertise', e.target.value)} /></Field>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
            {/* Status dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowStatusDropdown(o => !o)}
                className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer flex items-center gap-1.5 ${statusColors[emp.status] || 'bg-gray-100 text-gray-700'}`}
              >
                {emp.status}
                <ChevronDown size={12} />
              </button>
              {showStatusDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowStatusDropdown(false)} />
                  <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 min-w-[180px]">
                    <p className="px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Change Status</p>
                    {allStatuses.map(s => (
                      <button
                        key={s}
                        onClick={() => confirmStatusChange(s)}
                        disabled={s === emp.status}
                        className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${s === emp.status ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${s === 'Active' ? 'bg-green-500' : s === 'Probation' ? 'bg-amber-500' : s === 'Notice Period' ? 'bg-red-500' : 'bg-gray-400'}`} />
                          {s}
                        </span>
                        {s === emp.status && <Check size={14} className="text-gray-300" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button onClick={() => openEdit('Profile')} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
              <Edit3 size={14} /> Edit Profile
            </button>
            <button onClick={() => setShowDeleteConfirm(true)} className="px-3 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-1.5">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <CollapsibleSection title="Basic Information" onEdit={() => openEdit('Basic Information')}>
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Employee ID" value={emp.id} />
          <InfoRow label="Nick name" value={emp.nickname} />
          <InfoRow label="First Name" value={firstName} />
          <InfoRow label="Email address" value={emp.email} />
          <InfoRow label="Last Name" value={lastName} />
        </div>
      </CollapsibleSection>

      {/* Work Information */}
      <CollapsibleSection title="Work Information" onEdit={() => openEdit('Work Information')}>
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
      <CollapsibleSection title="Hierarchy Information" onEdit={() => openEdit('Hierarchy Information')}>
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="Reporting Manager" value={emp.reportingManager} />
        </div>
      </CollapsibleSection>

      {/* Personal Details */}
      <CollapsibleSection title="Personal Details" onEdit={() => openEdit('Personal Details')}>
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
      <CollapsibleSection title="Identity Information" onEdit={() => openEdit('Identity Information')}>
        <div className="grid grid-cols-2 gap-y-4 gap-x-12">
          <InfoRow label="UAN" value={emp.uan} />
          <InfoRow label="PAN" value={emp.bankDetails.pan} />
          <InfoRow label="Aadhaar" value={emp.aadhaar} />
        </div>
      </CollapsibleSection>

      {/* Contact Details */}
      <CollapsibleSection title="Contact Details" onEdit={() => openEdit('Contact Details')}>
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

      {/* Documents */}
      <CollapsibleSection title="Documents">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-500">Important employee documents</p>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              <Upload size={13} /> Upload Document
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Aadhaar Card', type: 'ID Proof', date: '15 Jan 2024', uploaded: true },
              { name: 'PAN Card', type: 'Tax Document', date: '15 Jan 2024', uploaded: true },
              { name: 'Offer Letter', type: 'Employment', date: '10 Dec 2023', uploaded: true },
              { name: 'Resume / CV', type: 'Employment', date: '08 Dec 2023', uploaded: true },
              { name: 'Educational Certificates', type: 'Education', date: '15 Jan 2024', uploaded: true },
              { name: 'Address Proof', type: 'ID Proof', date: '15 Jan 2024', uploaded: true },
              { name: 'Bank Passbook / Cheque', type: 'Banking', date: '20 Jan 2024', uploaded: true },
              { name: 'Relieving Letter', type: 'Employment', date: '', uploaded: false },
              { name: 'Experience Letter', type: 'Employment', date: '', uploaded: false },
            ].map((doc, i) => (
              <div key={i} className={`flex items-start gap-3 p-3.5 rounded-lg border ${doc.uploaded ? 'border-gray-200 bg-white' : 'border-dashed border-gray-300 bg-gray-50'}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${doc.uploaded ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                  <FileText size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{doc.type}</p>
                  {doc.uploaded ? (
                    <p className="text-xs text-gray-400 mt-1">Uploaded: {doc.date}</p>
                  ) : (
                    <p className="text-xs text-amber-500 mt-1">Not uploaded</p>
                  )}
                </div>
                {doc.uploaded ? (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="View">
                      <Eye size={14} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Download">
                      <Download size={14} />
                    </button>
                  </div>
                ) : (
                  <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors flex-shrink-0" title="Upload">
                    <Upload size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
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

      {/* ===== EDIT MODAL ===== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white">Edit {editSection}</h2>
                  <p className="text-indigo-200 text-xs mt-0.5">{emp.name} · {emp.id}</p>
                </div>
                <button onClick={() => setShowEditModal(false)} className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white"><X size={18} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {renderEditFields()}
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-gray-200 bg-gray-50 shrink-0">
              <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">Cancel</button>
              <button onClick={saveEdit} className="px-5 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ===== STATUS CHANGE CONFIRMATION ===== */}
      {showStatusConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowStatusConfirm(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  showStatusConfirm === 'Active' ? 'bg-green-100' : showStatusConfirm === 'Inactive' ? 'bg-gray-100' : showStatusConfirm === 'Notice Period' ? 'bg-red-100' : 'bg-amber-100'
                }`}>
                  <AlertTriangle size={20} className={
                    showStatusConfirm === 'Active' ? 'text-green-600' : showStatusConfirm === 'Inactive' ? 'text-gray-500' : showStatusConfirm === 'Notice Period' ? 'text-red-600' : 'text-amber-600'
                  } />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Change Employee Status</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Are you sure you want to change <span className="font-medium text-gray-700">{emp.name}</span>'s status from{' '}
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium ${statusColors[emp.status]}`}>{emp.status}</span>
                    {' '}to{' '}
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium ${statusColors[showStatusConfirm]}`}>{showStatusConfirm}</span>?
                  </p>
                  {showStatusConfirm === 'Inactive' && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100">
                      <p className="text-xs text-red-700">Setting status to <strong>Inactive</strong> will mark today as the date of exit. This action represents employee separation.</p>
                    </div>
                  )}
                  {showStatusConfirm === 'Notice Period' && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <p className="text-xs text-amber-700">This will initiate the exit process for this employee.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-gray-200 bg-gray-50">
              <button onClick={() => setShowStatusConfirm(null)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">Cancel</button>
              <button onClick={applyStatusChange} className={`px-5 py-2 text-sm text-white rounded-lg font-medium ${
                showStatusConfirm === 'Active' ? 'bg-green-600 hover:bg-green-700' : showStatusConfirm === 'Inactive' ? 'bg-gray-600 hover:bg-gray-700' : showStatusConfirm === 'Notice Period' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'
              }`}>
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRMATION ===== */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }} />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900">Delete Employee</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    This will permanently remove <span className="font-medium text-gray-700">{emp.name}</span> ({emp.id}) and all associated data. This action cannot be undone.
                  </p>
                  <div className="mt-4">
                    <label className="text-xs font-medium text-gray-600 block mb-1.5">
                      Type <span className="font-bold text-gray-900">"{emp.name}"</span> to confirm
                    </label>
                    <input
                      className={inputCls}
                      placeholder={emp.name}
                      value={deleteConfirmText}
                      onChange={e => setDeleteConfirmText(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-gray-200 bg-gray-50">
              <button onClick={() => { setShowDeleteConfirm(false); setDeleteConfirmText(''); }} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100">Cancel</button>
              <button
                onClick={handleDelete}
                disabled={deleteConfirmText !== emp.name}
                className={`px-5 py-2 text-sm text-white rounded-lg font-medium transition-colors ${deleteConfirmText === emp.name ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
