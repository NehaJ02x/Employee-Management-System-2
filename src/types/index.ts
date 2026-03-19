export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  department: string;
  subDepartment: string;
  designation: string;
  type: 'Full-Time' | 'Contract' | 'Intern' | 'Part-Time';
  status: 'Active' | 'Probation' | 'Notice Period' | 'Inactive';
  joinDate: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  emergencyContact: { name: string; phone: string; relation: string };
  reportingManager: string;
  workLocation: string;
  shift: string;
  bankDetails: { bankName: string; accountNumber: string; ifsc: string; pan: string };
  salary: { ctc: number; basic: number; hra: number; special: number; conveyance: number; medical: number; pf: number; esi: number; pt: number; tds: number };
  performanceRating: number;
  attendanceRate: number;
  // Extended fields
  nickname: string;
  maritalStatus: string;
  aboutMe: string;
  expertise: string;
  uan: string;
  aadhaar: string;
  extension: string;
  seatingLocation: string;
  permanentAddress: string;
  personalMobile: string;
  personalEmail: string;
  totalExperience: string;
  sourceOfHire: string;
  dateOfExit: string;
  addedBy: string;
  addedTime: string;
  modifiedBy: string;
  modifiedTime: string;
  workExperience: { company: string; jobTitle: string; fromDate: string; toDate: string; description: string; relevant: boolean }[];
  education: { institute: string; degree: string; specialization: string; dateOfCompletion: string }[];
  dependents: { name: string; relationship: string; dateOfBirth: string }[];
}

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  subDepartments: string[];
  budget: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  day: string;
  checkIn: string;
  breakStart: string;
  breakEnd: string;
  breakTotal: string;
  checkOut: string;
  effectiveHrs: string;
  overtime: string;
  status: 'Present' | 'Absent' | 'Late' | 'Half Day' | 'WFH' | 'Leave' | 'Holiday' | 'Weekend';
}

export interface LeaveBalance {
  type: string;
  code: string;
  used: number;
  total: number;
  pending: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar?: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy: string;
  appliedOn: string;
  hasAttachment?: boolean;
}

export interface RegularizationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar?: string;
  date: string;
  type: string;
  checkIn: string;
  checkOut: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  approvedBy: string;
  appliedOn: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakDuration: string;
  gracePeriod: string;
  minHours: string;
  employeeCount: number;
}

export interface JobPost {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract' | 'Intern';
  applications: number;
  postedDate: string;
  status: 'Active' | 'Draft' | 'Closed';
  experience: string;
  salaryRange: string;
  description: string;
  skills: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  position: string;
  experience: string;
  stage: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected';
  rating: number;
  source: 'LinkedIn' | 'Referral' | 'Portal' | 'Direct';
  appliedDate: string;
}

export interface Interview {
  id: string;
  candidateId: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  round: string;
  panelists: string[];
  room: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface PayslipRecord {
  id: string;
  month: string;
  year: number;
  gross: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Processing' | 'Pending';
}

export interface SalaryStructure {
  id: string;
  name: string;
  employeeCount: number;
  components: SalaryComponent[];
}

export interface SalaryComponent {
  name: string;
  type: 'Earning' | 'Deduction';
  calculation: string;
  taxable: boolean;
}

export interface Goal {
  id: string;
  title: string;
  type: 'Individual' | 'Development' | 'Team';
  weight: number;
  dueDate: string;
  progress: number;
  keyResults: { title: string; status: 'Done' | 'In Progress' | 'Pending' }[];
}

export interface Review {
  id: string;
  period: string;
  selfRating: number;
  managerRating: number;
  finalRating: number;
  outcome: string;
  status: 'Completed' | 'Pending' | 'In Progress';
}

export interface Feedback {
  id: string;
  from: string;
  fromRole: 'Manager' | 'Peer' | 'Self';
  isAnonymous: boolean;
  date: string;
  text: string;
  tags: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done';
  dueDate: string;
  progress: number;
  assignedTo?: string;
  assignedToAvatar?: string;
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unread: number;
}

export interface ChatChannel {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  time: string;
  isSent: boolean;
}

export interface NotificationItem {
  id: string;
  type: 'leave' | 'attendance' | 'task' | 'payroll' | 'general';
  title: string;
  description: string;
  time: string;
  read: boolean;
  group: 'Today' | 'Yesterday' | 'This Week';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  postedBy: string;
  date: string;
  audience: string;
  views: number;
  pinned: boolean;
  color: string;
}

export interface ExitRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  submittedDate: string;
  lastWorkingDay: string;
  reason: string;
  status: 'Serving Notice' | 'Pending Approval' | 'Completed' | 'Withdrawn';
  noticeDays: number;
  remainingDays: number;
  ktProgress: number;
  buyoutStatus: string;
}

export interface ApprovalItem {
  id: string;
  employeeName: string;
  employeeAvatar: string;
  type: string;
  date: string;
  details: string;
  status: 'Pending';
}
