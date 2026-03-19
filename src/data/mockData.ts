import type {
  Employee, Department, AttendanceRecord, LeaveBalance, LeaveRequest,
  RegularizationRequest, Shift, JobPost, Candidate, Interview,
  PayslipRecord, SalaryStructure, Goal, Review, Feedback, Task,
  ChatContact, ChatChannel, ChatMessage, NotificationItem, Announcement,
  ExitRecord, ApprovalItem
} from '../types';

const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=128`;

const extFields = (overrides: Partial<Employee> = {}): Omit<Employee, 'id'|'name'|'email'|'phone'|'avatar'|'department'|'subDepartment'|'designation'|'type'|'status'|'joinDate'|'dateOfBirth'|'gender'|'address'|'emergencyContact'|'reportingManager'|'workLocation'|'shift'|'bankDetails'|'salary'|'performanceRating'|'attendanceRate'> => ({
  nickname: '', maritalStatus: 'Single', aboutMe: '-', expertise: '-',
  uan: '**********', aadhaar: '**********', extension: '-', seatingLocation: '-',
  permanentAddress: '-', personalMobile: '-', personalEmail: '-',
  totalExperience: '-', sourceOfHire: '-', dateOfExit: '-',
  addedBy: 'Sonali Debnath', addedTime: '16-Mar-2026 01:23 PM',
  modifiedBy: 'Sonali Debnath', modifiedTime: '16-Mar-2026 01:23 PM',
  workExperience: [], education: [], dependents: [],
  ...overrides,
});

export const employees: Employee[] = [
  {
    id: 'EMP001', name: 'John Doe', email: 'john.doe@jexa.com', phone: '+91 98765 43210',
    avatar: avatar('John Doe'), department: 'Engineering', subDepartment: 'Backend', designation: 'Engineering Manager',
    type: 'Full-Time', status: 'Active', joinDate: '2022-03-15', dateOfBirth: '1990-06-20',
    gender: 'Male', address: '42 MG Road, Bangalore 560001',
    emergencyContact: { name: 'Jane Doe', phone: '+91 98765 43211', relation: 'Spouse' },
    reportingManager: 'VP Engineering', workLocation: 'Bangalore HQ', shift: 'General',
    bankDetails: { bankName: 'HDFC Bank', accountNumber: '1234567890', ifsc: 'HDFC0001234', pan: 'ABCDE1234F' },
    salary: { ctc: 1800000, basic: 35000, hra: 14000, special: 20000, conveyance: 3000, medical: 2500, pf: 4200, esi: 640, pt: 200, tds: 5000 },
    performanceRating: 4.2, attendanceRate: 95,
    ...extFields({
      nickname: 'John', maritalStatus: 'Married', totalExperience: '9 year(s)',
      extension: '5', seatingLocation: 'BLR_ENG_12', personalMobile: '+91 99887 76655',
      workExperience: [
        { company: 'TechCorp', jobTitle: 'Senior Developer', fromDate: '2016-04-01', toDate: '2022-03-10', description: 'Full-stack development', relevant: true },
      ],
      education: [
        { institute: 'IIT Bangalore', degree: 'B.Tech', specialization: 'Computer Science', dateOfCompletion: '2012' },
      ],
      dependents: [
        { name: 'Jane Doe', relationship: 'Spouse', dateOfBirth: '1991-09-15' },
      ],
    }),
  },
  {
    id: 'EMP002', name: 'Sara Menon', email: 'sara.menon@jexa.com', phone: '+91 98765 43220',
    avatar: avatar('Sara Menon'), department: 'Engineering', subDepartment: 'Frontend', designation: 'UI Developer',
    type: 'Full-Time', status: 'Active', joinDate: '2023-01-10', dateOfBirth: '1995-11-15',
    gender: 'Female', address: '15 Indiranagar, Bangalore 560038',
    emergencyContact: { name: 'Raj Menon', phone: '+91 98765 43221', relation: 'Father' },
    reportingManager: 'John Doe', workLocation: 'Bangalore HQ', shift: 'General',
    bankDetails: { bankName: 'ICICI Bank', accountNumber: '2345678901', ifsc: 'ICIC0002345', pan: 'FGHIJ5678K' },
    salary: { ctc: 1200000, basic: 28000, hra: 11200, special: 15000, conveyance: 2500, medical: 2000, pf: 3360, esi: 500, pt: 200, tds: 3000 },
    performanceRating: 4.5, attendanceRate: 98,
    ...extFields({
      nickname: 'Sara', totalExperience: '5 year(s)',
      education: [
        { institute: 'NID Ahmedabad', degree: 'M.Des', specialization: 'Interaction Design', dateOfCompletion: '2019' },
      ],
    }),
  },
  {
    id: 'EMP003', name: 'Alex Kumar', email: 'alex.kumar@jexa.com', phone: '+91 98765 43230',
    avatar: avatar('Alex Kumar'), department: 'Sales', subDepartment: 'Enterprise', designation: 'Sales Lead',
    type: 'Full-Time', status: 'Active', joinDate: '2021-07-20', dateOfBirth: '1988-03-10',
    gender: 'Male', address: '88 Koramangala, Bangalore 560034',
    emergencyContact: { name: 'Meera Kumar', phone: '+91 98765 43231', relation: 'Spouse' },
    reportingManager: 'VP Sales', workLocation: 'Bangalore HQ', shift: 'General',
    bankDetails: { bankName: 'SBI', accountNumber: '3456789012', ifsc: 'SBIN0003456', pan: 'KLMNO9012P' },
    salary: { ctc: 1500000, basic: 32000, hra: 12800, special: 18000, conveyance: 3000, medical: 2500, pf: 3840, esi: 580, pt: 200, tds: 4500 },
    performanceRating: 3.8, attendanceRate: 92,
    ...extFields({
      nickname: 'Alex', maritalStatus: 'Married', totalExperience: '10 year(s)',
      workExperience: [
        { company: 'SalesPro Inc', jobTitle: 'Sales Executive', fromDate: '2015-06-01', toDate: '2021-07-15', description: 'Enterprise sales', relevant: true },
      ],
      education: [
        { institute: 'Christ University', degree: 'MBA', specialization: 'Marketing', dateOfCompletion: '2014' },
      ],
      dependents: [
        { name: 'Meera Kumar', relationship: 'Spouse', dateOfBirth: '1990-07-22' },
      ],
    }),
  },
  {
    id: 'EMP004', name: 'Priya Desai', email: 'priya.desai@jexa.com', phone: '+91 98765 43240',
    avatar: avatar('Priya Desai'), department: 'HR', subDepartment: 'People Ops', designation: 'HR Manager',
    type: 'Full-Time', status: 'Active', joinDate: '2020-11-05', dateOfBirth: '1992-08-25',
    gender: 'Female', address: '22 HSR Layout, Bangalore 560102',
    emergencyContact: { name: 'Amit Desai', phone: '+91 98765 43241', relation: 'Spouse' },
    reportingManager: 'CHRO', workLocation: 'Bangalore HQ', shift: 'General',
    bankDetails: { bankName: 'Axis Bank', accountNumber: '4567890123', ifsc: 'UTIB0004567', pan: 'PQRST3456U' },
    salary: { ctc: 1400000, basic: 30000, hra: 12000, special: 16000, conveyance: 2800, medical: 2200, pf: 3600, esi: 550, pt: 200, tds: 4000 },
    performanceRating: 4.0, attendanceRate: 96,
    ...extFields({
      nickname: 'Priya', maritalStatus: 'Married', totalExperience: '8 year(s)',
      education: [
        { institute: 'XLRI Jamshedpur', degree: 'MBA', specialization: 'HR Management', dateOfCompletion: '2016' },
      ],
      dependents: [
        { name: 'Amit Desai', relationship: 'Spouse', dateOfBirth: '1991-04-12' },
      ],
    }),
  },
  {
    id: 'EMP005', name: 'Mike Rajan', email: 'mike.rajan@jexa.com', phone: '+91 98765 43250',
    avatar: avatar('Mike Rajan'), department: 'Marketing', subDepartment: 'Digital', designation: 'Marketing Lead',
    type: 'Full-Time', status: 'Probation', joinDate: '2025-12-01', dateOfBirth: '1993-01-30',
    gender: 'Male', address: '55 Whitefield, Bangalore 560066',
    emergencyContact: { name: 'Anita Rajan', phone: '+91 98765 43251', relation: 'Mother' },
    reportingManager: 'VP Marketing', workLocation: 'Bangalore HQ', shift: 'General',
    bankDetails: { bankName: 'Kotak Bank', accountNumber: '5678901234', ifsc: 'KKBK0005678', pan: 'UVWXY7890Z' },
    salary: { ctc: 1100000, basic: 25000, hra: 10000, special: 14000, conveyance: 2500, medical: 2000, pf: 3000, esi: 460, pt: 200, tds: 2500 },
    performanceRating: 3.5, attendanceRate: 88,
    ...extFields({ nickname: 'Mike', totalExperience: '6 year(s)' }),
  },
  {
    id: 'EMP006', name: 'Ravi Singh', email: 'ravi.singh@jexa.com', phone: '+91 98765 43260',
    avatar: avatar('Ravi Singh'), department: 'Finance', subDepartment: 'Accounting', designation: 'Finance Analyst',
    type: 'Contract', status: 'Notice Period', joinDate: '2023-06-15', dateOfBirth: '1991-12-05',
    gender: 'Male', address: '77 Electronic City, Bangalore 560100',
    emergencyContact: { name: 'Kavita Singh', phone: '+91 98765 43261', relation: 'Spouse' },
    reportingManager: 'Finance Director', workLocation: 'Bangalore HQ', shift: 'General',
    bankDetails: { bankName: 'Yes Bank', accountNumber: '6789012345', ifsc: 'YESB0006789', pan: 'ABCDE5678F' },
    salary: { ctc: 900000, basic: 22000, hra: 8800, special: 12000, conveyance: 2000, medical: 1500, pf: 2640, esi: 400, pt: 200, tds: 2000 },
    performanceRating: 3.2, attendanceRate: 90,
    ...extFields({
      nickname: 'Ravi', maritalStatus: 'Married', totalExperience: '7 year(s)',
      dependents: [
        { name: 'Kavita Singh', relationship: 'Spouse', dateOfBirth: '1993-03-18' },
      ],
    }),
  }
];

export const currentEmployee = employees[0];

export const departments: Department[] = [
  { id: 'D001', name: 'Engineering', head: 'John Doe', employeeCount: 85, subDepartments: ['Frontend', 'Backend', 'DevOps', 'QA'], budget: '₹2.5 Cr' },
  { id: 'D002', name: 'Sales', head: 'Alex Kumar', employeeCount: 52, subDepartments: ['Inside Sales', 'Enterprise', 'Partnerships'], budget: '₹1.8 Cr' },
  { id: 'D003', name: 'Marketing', head: 'Mike Rajan', employeeCount: 35, subDepartments: ['Digital', 'Content', 'Brand'], budget: '₹1.2 Cr' },
  { id: 'D004', name: 'HR', head: 'Priya Desai', employeeCount: 28, subDepartments: ['Recruitment', 'People Ops', 'L&D'], budget: '₹80 L' },
  { id: 'D005', name: 'Finance', head: 'Ravi Singh', employeeCount: 22, subDepartments: ['Accounting', 'Payroll', 'Compliance'], budget: '₹60 L' },
];

export interface SubDepartment {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  lead: string;
  employeeCount: number;
  description: string;
}

export const subDepartments: SubDepartment[] = [
  { id: 'SD001', name: 'Frontend', departmentId: 'D001', departmentName: 'Engineering', lead: 'Sara Menon', employeeCount: 22, description: 'UI/UX implementation, React & Angular apps' },
  { id: 'SD002', name: 'Backend', departmentId: 'D001', departmentName: 'Engineering', lead: 'John Doe', employeeCount: 30, description: 'APIs, microservices, database management' },
  { id: 'SD003', name: 'DevOps', departmentId: 'D001', departmentName: 'Engineering', lead: 'DevOps Lead', employeeCount: 15, description: 'CI/CD, infrastructure, cloud management' },
  { id: 'SD004', name: 'QA', departmentId: 'D001', departmentName: 'Engineering', lead: 'QA Manager', employeeCount: 18, description: 'Testing, automation, quality assurance' },
  { id: 'SD005', name: 'Inside Sales', departmentId: 'D002', departmentName: 'Sales', lead: 'Sales Manager', employeeCount: 20, description: 'Inbound sales and lead qualification' },
  { id: 'SD006', name: 'Enterprise', departmentId: 'D002', departmentName: 'Sales', lead: 'Enterprise Lead', employeeCount: 18, description: 'Enterprise client management' },
  { id: 'SD007', name: 'Partnerships', departmentId: 'D002', departmentName: 'Sales', lead: 'Partnerships Lead', employeeCount: 14, description: 'Strategic partnerships and alliances' },
  { id: 'SD008', name: 'Digital', departmentId: 'D003', departmentName: 'Marketing', lead: 'Digital Lead', employeeCount: 15, description: 'Digital marketing and campaigns' },
  { id: 'SD009', name: 'Content', departmentId: 'D003', departmentName: 'Marketing', lead: 'Content Lead', employeeCount: 12, description: 'Content strategy and creation' },
  { id: 'SD010', name: 'Brand', departmentId: 'D003', departmentName: 'Marketing', lead: 'Brand Lead', employeeCount: 8, description: 'Brand management and communications' },
  { id: 'SD011', name: 'Recruitment', departmentId: 'D004', departmentName: 'HR', lead: 'Recruitment Lead', employeeCount: 10, description: 'Talent acquisition and hiring' },
  { id: 'SD012', name: 'People Ops', departmentId: 'D004', departmentName: 'HR', lead: 'People Ops Lead', employeeCount: 10, description: 'People operations and employee relations' },
  { id: 'SD013', name: 'L&D', departmentId: 'D004', departmentName: 'HR', lead: 'L&D Lead', employeeCount: 8, description: 'Learning and development programs' },
  { id: 'SD014', name: 'Accounting', departmentId: 'D005', departmentName: 'Finance', lead: 'Accounting Lead', employeeCount: 8, description: 'Financial accounting and reporting' },
  { id: 'SD015', name: 'Payroll', departmentId: 'D005', departmentName: 'Finance', lead: 'Payroll Lead', employeeCount: 8, description: 'Payroll processing and compliance' },
  { id: 'SD016', name: 'Compliance', departmentId: 'D005', departmentName: 'Finance', lead: 'Compliance Lead', employeeCount: 6, description: 'Regulatory compliance and auditing' },
];

export interface Designation {
  id: string;
  name: string;
  department: string;
  level: string;
  employeeCount: number;
  minSalary: string;
  maxSalary: string;
}

export const designations: Designation[] = [
  { id: 'DES001', name: 'Engineering Manager', department: 'Engineering', level: 'L5', employeeCount: 3, minSalary: '₹18L', maxSalary: '₹30L' },
  { id: 'DES002', name: 'Senior Developer', department: 'Engineering', level: 'L4', employeeCount: 15, minSalary: '₹14L', maxSalary: '₹22L' },
  { id: 'DES003', name: 'UI Developer', department: 'Engineering', level: 'L3', employeeCount: 20, minSalary: '₹10L', maxSalary: '₹16L' },
  { id: 'DES004', name: 'Junior Developer', department: 'Engineering', level: 'L2', employeeCount: 25, minSalary: '₹6L', maxSalary: '₹10L' },
  { id: 'DES005', name: 'HR Manager', department: 'HR', level: 'L5', employeeCount: 2, minSalary: '₹14L', maxSalary: '₹24L' },
  { id: 'DES006', name: 'HR Executive', department: 'HR', level: 'L3', employeeCount: 8, minSalary: '₹6L', maxSalary: '₹12L' },
  { id: 'DES007', name: 'Sales Lead', department: 'Sales', level: 'L4', employeeCount: 5, minSalary: '₹12L', maxSalary: '₹20L' },
  { id: 'DES008', name: 'Sales Executive', department: 'Sales', level: 'L2', employeeCount: 18, minSalary: '₹5L', maxSalary: '₹10L' },
  { id: 'DES009', name: 'Marketing Lead', department: 'Marketing', level: 'L4', employeeCount: 3, minSalary: '₹12L', maxSalary: '₹18L' },
  { id: 'DES010', name: 'Finance Analyst', department: 'Finance', level: 'L3', employeeCount: 6, minSalary: '₹8L', maxSalary: '₹14L' },
];

export const shifts: Shift[] = [
  { id: 'S001', name: 'General', startTime: '09:00 AM', endTime: '06:00 PM', breakDuration: '1 hr', gracePeriod: '15 min', minHours: '8 hrs', employeeCount: 180 },
  { id: 'S002', name: 'Morning', startTime: '06:00 AM', endTime: '02:00 PM', breakDuration: '30 min', gracePeriod: '10 min', minHours: '7.5 hrs', employeeCount: 35 },
  { id: 'S003', name: 'Night', startTime: '10:00 PM', endTime: '06:00 AM', breakDuration: '30 min', gracePeriod: '15 min', minHours: '7.5 hrs', employeeCount: 25 },
  { id: 'S004', name: 'Flexible', startTime: '10:00 AM', endTime: '07:00 PM', breakDuration: '1 hr', gracePeriod: '30 min', minHours: '8 hrs', employeeCount: 8 }
];

export const attendanceRecords: AttendanceRecord[] = [
  { id: 'A001', employeeId: 'EMP001', employeeName: 'John Doe', date: '2026-03-17', day: 'Tuesday', checkIn: '09:02', breakStart: '13:00', breakEnd: '13:45', breakTotal: '0:45', checkOut: '--:--', effectiveHrs: '7:15', overtime: '0:00', status: 'Present' },
  { id: 'A002', employeeId: 'EMP001', employeeName: 'John Doe', date: '2026-03-16', day: 'Monday', checkIn: '09:05', breakStart: '12:30', breakEnd: '13:15', breakTotal: '0:45', checkOut: '18:10', effectiveHrs: '8:20', overtime: '0:20', status: 'Present' },
  { id: 'A003', employeeId: 'EMP001', employeeName: 'John Doe', date: '2026-03-15', day: 'Sunday', checkIn: '--', breakStart: '--', breakEnd: '--', breakTotal: '--', checkOut: '--', effectiveHrs: '--', overtime: '--', status: 'Weekend' },
  { id: 'A004', employeeId: 'EMP001', employeeName: 'John Doe', date: '2026-03-14', day: 'Saturday', checkIn: '--', breakStart: '--', breakEnd: '--', breakTotal: '--', checkOut: '--', effectiveHrs: '--', overtime: '--', status: 'Weekend' },
  { id: 'A005', employeeId: 'EMP001', employeeName: 'John Doe', date: '2026-03-13', day: 'Friday', checkIn: '09:15', breakStart: '13:00', breakEnd: '13:30', breakTotal: '0:30', checkOut: '18:00', effectiveHrs: '8:15', overtime: '0:15', status: 'Late' },
  { id: 'A006', employeeId: 'EMP001', employeeName: 'John Doe', date: '2026-03-12', day: 'Thursday', checkIn: '08:55', breakStart: '12:45', breakEnd: '13:30', breakTotal: '0:45', checkOut: '18:05', effectiveHrs: '8:25', overtime: '0:25', status: 'Present' },
  { id: 'A007', employeeId: 'EMP001', employeeName: 'John Doe', date: '2026-03-11', day: 'Wednesday', checkIn: '--', breakStart: '--', breakEnd: '--', breakTotal: '--', checkOut: '--', effectiveHrs: '--', overtime: '--', status: 'Leave' },
  { id: 'A008', employeeId: 'EMP002', employeeName: 'Sara Menon', date: '2026-03-17', day: 'Tuesday', checkIn: '08:50', breakStart: '12:30', breakEnd: '13:15', breakTotal: '0:45', checkOut: '--:--', effectiveHrs: '7:30', overtime: '0:00', status: 'Present' },
  { id: 'A009', employeeId: 'EMP003', employeeName: 'Alex Kumar', date: '2026-03-17', day: 'Tuesday', checkIn: '09:20', breakStart: '13:15', breakEnd: '13:50', breakTotal: '0:35', checkOut: '--:--', effectiveHrs: '6:45', overtime: '0:00', status: 'Late' },
  { id: 'A010', employeeId: 'EMP004', employeeName: 'Priya Desai', date: '2026-03-17', day: 'Tuesday', checkIn: '08:45', breakStart: '12:00', breakEnd: '12:45', breakTotal: '0:45', checkOut: '--:--', effectiveHrs: '7:45', overtime: '0:00', status: 'Present' },
  { id: 'A011', employeeId: 'EMP005', employeeName: 'Mike Rajan', date: '2026-03-17', day: 'Tuesday', checkIn: '--', breakStart: '--', breakEnd: '--', breakTotal: '--', checkOut: '--', effectiveHrs: '--', overtime: '--', status: 'WFH' },
  { id: 'A012', employeeId: 'EMP006', employeeName: 'Ravi Singh', date: '2026-03-17', day: 'Tuesday', checkIn: '--', breakStart: '--', breakEnd: '--', breakTotal: '--', checkOut: '--', effectiveHrs: '--', overtime: '--', status: 'Leave' },
];

export const weeklyAttendance = [
  { day: 'Monday', checkIn: '09:05', checkOut: '18:10', breaks: '0:45', hours: '8:20', status: 'Present' as const },
  { day: 'Tuesday', checkIn: '09:02', checkOut: '--:--', breaks: '0:45', hours: '7:15', status: 'Present' as const },
  { day: 'Wednesday', checkIn: '--', checkOut: '--', breaks: '--', hours: '--', status: 'Leave' as const },
  { day: 'Thursday', checkIn: '08:55', checkOut: '18:05', breaks: '0:45', hours: '8:25', status: 'Present' as const },
  { day: 'Friday', checkIn: '09:15', checkOut: '18:00', breaks: '0:30', hours: '8:15', status: 'Late' as const },
];

export const attendanceDaySummary: Record<number, string> = {
  1: 'weekend', 2: 'present', 3: 'present', 4: 'present', 5: 'late', 6: 'present',
  7: 'weekend', 8: 'weekend', 9: 'present', 10: 'holiday', 11: 'leave', 12: 'present',
  13: 'late', 14: 'weekend', 15: 'weekend', 16: 'present', 17: 'holiday', 18: 'present',
  19: 'wfh', 20: 'present', 21: 'weekend', 22: 'weekend', 23: 'present', 24: 'present',
  25: 'present', 26: 'present', 27: 'absent', 28: 'weekend', 29: 'weekend', 30: 'present', 31: 'holiday',
};

export const indianHolidays2026 = [
  { date: '2026-01-26', name: 'Republic Day', type: 'National' as const },
  { date: '2026-03-10', name: 'Maha Shivaratri', type: 'Gazetted' as const },
  { date: '2026-03-17', name: 'Holi', type: 'Gazetted' as const },
  { date: '2026-03-31', name: 'Id-ul-Fitr (Eid)', type: 'Gazetted' as const },
  { date: '2026-04-02', name: 'Ram Navami', type: 'Gazetted' as const },
  { date: '2026-04-06', name: 'Mahavir Jayanti', type: 'Gazetted' as const },
  { date: '2026-04-14', name: 'Dr. Ambedkar Jayanti', type: 'National' as const },
  { date: '2026-04-18', name: 'Good Friday', type: 'Gazetted' as const },
  { date: '2026-05-01', name: 'May Day', type: 'Gazetted' as const },
  { date: '2026-05-24', name: 'Buddha Purnima', type: 'Gazetted' as const },
  { date: '2026-06-07', name: 'Id-ul-Zuha (Bakrid)', type: 'Gazetted' as const },
  { date: '2026-07-06', name: 'Muharram', type: 'Gazetted' as const },
  { date: '2026-08-15', name: 'Independence Day', type: 'National' as const },
  { date: '2026-08-16', name: 'Janmashtami', type: 'Gazetted' as const },
  { date: '2026-09-05', name: 'Milad-un-Nabi', type: 'Gazetted' as const },
  { date: '2026-10-02', name: 'Gandhi Jayanti', type: 'National' as const },
  { date: '2026-10-21', name: 'Dussehra', type: 'Gazetted' as const },
  { date: '2026-11-10', name: 'Diwali', type: 'Gazetted' as const },
  { date: '2026-11-11', name: 'Diwali (Day 2)', type: 'Gazetted' as const },
  { date: '2026-11-27', name: 'Guru Nanak Jayanti', type: 'Gazetted' as const },
  { date: '2026-12-25', name: 'Christmas', type: 'Gazetted' as const },
];

export const leaveBalances: LeaveBalance[] = [
  { type: 'Casual Leave', code: 'CL', used: 5, total: 12, pending: 1 },
  { type: 'Sick Leave', code: 'SL', used: 2, total: 10, pending: 0 },
  { type: 'Earned Leave', code: 'EL', used: 3, total: 15, pending: 0 },
  { type: 'Compensatory Off', code: 'CO', used: 0, total: 2, pending: 0 },
];

export const leaveHistory: LeaveRequest[] = [
  { id: 'L001', employeeId: 'EMP001', employeeName: 'John Doe', avatar: avatar('John Doe'), type: 'Casual Leave', from: '2026-03-11', to: '2026-03-11', days: 1, reason: 'Personal work', status: 'Approved', approvedBy: 'Priya Desai', appliedOn: '2026-03-08' },
  { id: 'L002', employeeId: 'EMP001', employeeName: 'John Doe', avatar: avatar('John Doe'), type: 'Sick Leave', from: '2026-02-15', to: '2026-02-16', days: 2, reason: 'Fever', status: 'Approved', approvedBy: 'Priya Desai', appliedOn: '2026-02-14', hasAttachment: true },
  { id: 'L003', employeeId: 'EMP002', employeeName: 'Sara Menon', avatar: avatar('Sara Menon'), type: 'Earned Leave', from: '2026-03-25', to: '2026-03-28', days: 4, reason: 'Family vacation', status: 'Pending', approvedBy: '', appliedOn: '2026-03-15' },
  { id: 'L004', employeeId: 'EMP003', employeeName: 'Alex Kumar', avatar: avatar('Alex Kumar'), type: 'Casual Leave', from: '2026-03-20', to: '2026-03-20', days: 1, reason: 'Doctor appointment', status: 'Pending', approvedBy: '', appliedOn: '2026-03-16' },
  { id: 'L005', employeeId: 'EMP001', employeeName: 'John Doe', avatar: avatar('John Doe'), type: 'Casual Leave', from: '2026-01-20', to: '2026-01-21', days: 2, reason: 'Moving house', status: 'Approved', approvedBy: 'Priya Desai', appliedOn: '2026-01-15' },
  { id: 'L006', employeeId: 'EMP004', employeeName: 'Priya Desai', avatar: avatar('Priya Desai'), type: 'Sick Leave', from: '2026-03-22', to: '2026-03-24', days: 3, reason: 'Medical procedure', status: 'Pending', approvedBy: '', appliedOn: '2026-03-16', hasAttachment: true },
  { id: 'L007', employeeId: 'EMP005', employeeName: 'Mike Rajan', avatar: avatar('Mike Rajan'), type: 'Compensatory Off', from: '2026-03-19', to: '2026-03-19', days: 1, reason: 'Worked on Saturday', status: 'Approved', approvedBy: 'VP Marketing', appliedOn: '2026-03-14' },
];

export const regularizationRequests: RegularizationRequest[] = [
  { id: 'R001', employeeId: 'EMP001', employeeName: 'John Doe', avatar: avatar('John Doe'), date: '2026-03-10', type: 'Forgot Check-out', checkIn: '09:00', checkOut: '18:00', reason: 'Forgot to check out, was in a meeting', status: 'Approved', approvedBy: 'VP Engineering', appliedOn: '2026-03-11' },
  { id: 'R002', employeeId: 'EMP001', employeeName: 'John Doe', avatar: avatar('John Doe'), date: '2026-03-05', type: 'WFH', checkIn: '09:30', checkOut: '18:30', reason: 'Internet issue at office area', status: 'Pending', approvedBy: '', appliedOn: '2026-03-06' },
  { id: 'R003', employeeId: 'EMP002', employeeName: 'Sara Menon', avatar: avatar('Sara Menon'), date: '2026-03-12', type: 'Forgot Check-in', checkIn: '08:55', checkOut: '17:50', reason: 'Biometric not working', status: 'Pending', approvedBy: '', appliedOn: '2026-03-13' },
  { id: 'R004', employeeId: 'EMP003', employeeName: 'Alex Kumar', avatar: avatar('Alex Kumar'), date: '2026-03-09', type: 'On-Duty', checkIn: '10:00', checkOut: '19:00', reason: 'Client meeting at their office', status: 'Approved', approvedBy: 'VP Sales', appliedOn: '2026-03-10' },
  { id: 'R005', employeeId: 'EMP005', employeeName: 'Mike Rajan', avatar: avatar('Mike Rajan'), date: '2026-03-14', type: 'System Error', checkIn: '09:10', checkOut: '18:05', reason: 'System showed half day incorrectly', status: 'Rejected', approvedBy: 'VP Marketing', appliedOn: '2026-03-15' },
];

export const jobPosts: JobPost[] = [
  { id: 'JP001', title: 'Senior React Developer', department: 'Engineering', location: 'Bangalore', type: 'Full-Time', applications: 32, postedDate: '2026-02-28', status: 'Active', experience: '4-6 years', salaryRange: '₹15-25 LPA', description: 'Build and maintain React applications', skills: ['React', 'TypeScript', 'Redux', 'Node.js'] },
  { id: 'JP002', title: 'Product Designer', department: 'Engineering', location: 'Remote', type: 'Full-Time', applications: 18, postedDate: '2026-03-05', status: 'Active', experience: '3-5 years', salaryRange: '₹12-18 LPA', description: 'Design product interfaces and user experiences', skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping'] },
  { id: 'JP003', title: 'Sales Executive', department: 'Sales', location: 'Mumbai', type: 'Full-Time', applications: 45, postedDate: '2026-02-15', status: 'Active', experience: '2-4 years', salaryRange: '₹8-12 LPA', description: 'Drive enterprise sales', skills: ['B2B Sales', 'CRM', 'Negotiation'] },
  { id: 'JP004', title: 'DevOps Engineer', department: 'Engineering', location: 'Bangalore', type: 'Full-Time', applications: 12, postedDate: '2026-03-10', status: 'Active', experience: '3-5 years', salaryRange: '₹14-22 LPA', description: 'Manage CI/CD and cloud infrastructure', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform'] },
  { id: 'JP005', title: 'Content Writer', department: 'Marketing', location: 'Bangalore', type: 'Part-Time', applications: 8, postedDate: '2026-03-01', status: 'Active', experience: '1-3 years', salaryRange: '₹4-7 LPA', description: 'Create blog posts and marketing content', skills: ['SEO', 'Copywriting', 'WordPress'] },
  { id: 'JP006', title: 'Data Analyst Intern', department: 'Finance', location: 'Bangalore', type: 'Intern', applications: 55, postedDate: '2026-01-20', status: 'Closed', experience: '0-1 years', salaryRange: '₹15-25K/month', description: 'Analyze financial data and create reports', skills: ['Excel', 'SQL', 'Python', 'Tableau'] },
  { id: 'JP007', title: 'HR Business Partner', department: 'HR', location: 'Bangalore', type: 'Full-Time', applications: 6, postedDate: '2026-03-12', status: 'Draft', experience: '5-8 years', salaryRange: '₹12-18 LPA', description: 'Strategic HR partnering with business units', skills: ['HRBP', 'Employee Relations', 'Performance Management'] },
  { id: 'JP008', title: 'QA Engineer', department: 'Engineering', location: 'Bangalore', type: 'Contract', applications: 15, postedDate: '2026-03-08', status: 'Active', experience: '2-4 years', salaryRange: '₹8-14 LPA', description: 'Automate testing and ensure quality', skills: ['Selenium', 'Jest', 'Cypress', 'API Testing'] },
];

export const candidates: Candidate[] = [
  { id: 'C001', name: 'Arun Prakash', email: 'arun.p@email.com', position: 'Senior React Developer', experience: '5 years', stage: 'Interview', rating: 4, source: 'LinkedIn', appliedDate: '2026-03-01' },
  { id: 'C002', name: 'Deepika Sharma', email: 'deepika.s@email.com', position: 'Senior React Developer', experience: '6 years', stage: 'Offer', rating: 5, source: 'Referral', appliedDate: '2026-02-28' },
  { id: 'C003', name: 'Karthik N', email: 'karthik.n@email.com', position: 'Product Designer', experience: '4 years', stage: 'Screening', rating: 3, source: 'Portal', appliedDate: '2026-03-06' },
  { id: 'C004', name: 'Neha Gupta', email: 'neha.g@email.com', position: 'Sales Executive', experience: '3 years', stage: 'Applied', rating: 4, source: 'LinkedIn', appliedDate: '2026-03-10' },
  { id: 'C005', name: 'Rahul Verma', email: 'rahul.v@email.com', position: 'DevOps Engineer', experience: '4 years', stage: 'Interview', rating: 4, source: 'Portal', appliedDate: '2026-03-11' },
  { id: 'C006', name: 'Sneha Patel', email: 'sneha.p@email.com', position: 'Senior React Developer', experience: '5 years', stage: 'Applied', rating: 3, source: 'Direct', appliedDate: '2026-03-12' },
  { id: 'C007', name: 'Vikram Rao', email: 'vikram.r@email.com', position: 'QA Engineer', experience: '3 years', stage: 'Hired', rating: 4, source: 'Referral', appliedDate: '2026-02-20' },
  { id: 'C008', name: 'Anjali Reddy', email: 'anjali.r@email.com', position: 'Content Writer', experience: '2 years', stage: 'Screening', rating: 3, source: 'LinkedIn', appliedDate: '2026-03-05' },
  { id: 'C009', name: 'Sanjay Nair', email: 'sanjay.n@email.com', position: 'Sales Executive', experience: '4 years', stage: 'Applied', rating: 4, source: 'Portal', appliedDate: '2026-03-14' },
  { id: 'C010', name: 'Meghna Iyer', email: 'meghna.i@email.com', position: 'Senior React Developer', experience: '7 years', stage: 'Hired', rating: 5, source: 'Referral', appliedDate: '2026-02-15' },
];

export const pipelineCandidates = {
  applied: candidates.filter(c => c.stage === 'Applied'),
  screening: candidates.filter(c => c.stage === 'Screening'),
  interview: candidates.filter(c => c.stage === 'Interview'),
  offer: candidates.filter(c => c.stage === 'Offer'),
  hired: candidates.filter(c => c.stage === 'Hired'),
};

export const interviews: Interview[] = [
  { id: 'I001', candidateId: 'C001', candidateName: 'Arun Prakash', position: 'Senior React Developer', date: '2026-03-17', time: '10:00 AM', round: 'Technical Round 2', panelists: ['John Doe', 'Sara Menon'], room: 'Meeting Room A', status: 'Scheduled' },
  { id: 'I002', candidateId: 'C005', candidateName: 'Rahul Verma', position: 'DevOps Engineer', date: '2026-03-17', time: '02:00 PM', round: 'Technical Round 1', panelists: ['John Doe'], room: 'Meeting Room B', status: 'Scheduled' },
  { id: 'I003', candidateId: 'C002', candidateName: 'Deepika Sharma', position: 'Senior React Developer', date: '2026-03-18', time: '11:00 AM', round: 'HR Round', panelists: ['Priya Desai'], room: 'Meeting Room A', status: 'Scheduled' },
  { id: 'I004', candidateId: 'C003', candidateName: 'Karthik N', position: 'Product Designer', date: '2026-03-19', time: '10:30 AM', round: 'Portfolio Review', panelists: ['Sara Menon', 'Mike Rajan'], room: 'Conference Room', status: 'Scheduled' },
  { id: 'I005', candidateId: 'C007', candidateName: 'Vikram Rao', position: 'QA Engineer', date: '2026-03-14', time: '03:00 PM', round: 'Final Round', panelists: ['John Doe', 'Priya Desai'], room: 'Meeting Room A', status: 'Completed' },
  { id: 'I006', candidateId: 'C010', candidateName: 'Meghna Iyer', position: 'Senior React Developer', date: '2026-03-10', time: '11:00 AM', round: 'Final Round', panelists: ['John Doe'], room: 'Meeting Room B', status: 'Completed' },
];

export const payslips: PayslipRecord[] = [
  { id: 'P001', month: 'March', year: 2026, gross: 85000, deductions: 19040, netPay: 65960, status: 'Processing' },
  { id: 'P002', month: 'February', year: 2026, gross: 85000, deductions: 19040, netPay: 65960, status: 'Paid' },
  { id: 'P003', month: 'January', year: 2026, gross: 85000, deductions: 19040, netPay: 65960, status: 'Paid' },
  { id: 'P004', month: 'December', year: 2025, gross: 85000, deductions: 19040, netPay: 65960, status: 'Paid' },
  { id: 'P005', month: 'November', year: 2025, gross: 85000, deductions: 19040, netPay: 65960, status: 'Paid' },
  { id: 'P006', month: 'October', year: 2025, gross: 82000, deductions: 18540, netPay: 63460, status: 'Paid' },
];

export const salaryStructures: SalaryStructure[] = [
  { id: 'SS001', name: 'Standard', employeeCount: 180, components: [
    { name: 'Basic', type: 'Earning', calculation: '40% of CTC', taxable: true },
    { name: 'HRA', type: 'Earning', calculation: '40% of Basic', taxable: true },
    { name: 'Special Allowance', type: 'Earning', calculation: 'Balance', taxable: true },
    { name: 'Conveyance', type: 'Earning', calculation: '₹3,000 fixed', taxable: false },
    { name: 'Medical', type: 'Earning', calculation: '₹2,500 fixed', taxable: false },
    { name: 'PF', type: 'Deduction', calculation: '12% of Basic', taxable: false },
    { name: 'ESI', type: 'Deduction', calculation: '0.75% of Gross', taxable: false },
    { name: 'Professional Tax', type: 'Deduction', calculation: '₹200/month', taxable: false },
    { name: 'TDS', type: 'Deduction', calculation: 'As per slab', taxable: false },
  ]},
  { id: 'SS002', name: 'Management', employeeCount: 35, components: [
    { name: 'Basic', type: 'Earning', calculation: '45% of CTC', taxable: true },
    { name: 'HRA', type: 'Earning', calculation: '50% of Basic', taxable: true },
    { name: 'Special Allowance', type: 'Earning', calculation: 'Balance', taxable: true },
    { name: 'Car Allowance', type: 'Earning', calculation: '₹10,000 fixed', taxable: true },
    { name: 'PF', type: 'Deduction', calculation: '12% of Basic (capped)', taxable: false },
    { name: 'TDS', type: 'Deduction', calculation: 'As per slab', taxable: false },
  ]},
  { id: 'SS003', name: 'Intern', employeeCount: 12, components: [
    { name: 'Stipend', type: 'Earning', calculation: 'Fixed amount', taxable: true },
    { name: 'TDS', type: 'Deduction', calculation: '10% if > ₹2.5L/yr', taxable: false },
  ]},
  { id: 'SS004', name: 'Contract', employeeCount: 21, components: [
    { name: 'Professional Fee', type: 'Earning', calculation: 'As per contract', taxable: true },
    { name: 'TDS', type: 'Deduction', calculation: '10% of Fee', taxable: false },
  ]},
];

export const salaryComponents = {
  earnings: [
    { name: 'Basic Salary', amount: 35000 },
    { name: 'HRA', amount: 14000 },
    { name: 'Special Allowance', amount: 20000 },
    { name: 'Conveyance Allowance', amount: 3000 },
    { name: 'Medical Allowance', amount: 2500 },
    { name: 'Overtime', amount: 500 },
  ],
  deductions: [
    { name: 'Provident Fund (PF)', amount: 4200 },
    { name: 'ESI', amount: 640 },
    { name: 'Professional Tax', amount: 200 },
    { name: 'TDS', amount: 5000 },
    { name: 'LOP Deduction', amount: 0 },
  ],
  totalEarnings: 75000,
  totalDeductions: 10040,
  grossSalary: 85000,
  netSalary: 65960,
};

export const payrollProcessingSteps = [
  { step: 1, name: 'Fetch Attendance', status: 'done' as const },
  { step: 2, name: 'Calculate LOP', status: 'done' as const },
  { step: 3, name: 'Process Salary', status: 'done' as const },
  { step: 4, name: 'Review', status: 'active' as const },
  { step: 5, name: 'Approve', status: 'pending' as const },
  { step: 6, name: 'Generate Bank File', status: 'pending' as const },
  { step: 7, name: 'Mark Paid', status: 'pending' as const },
];

export const goals: Goal[] = [
  { id: 'G001', title: 'Complete Q1 OKRs', type: 'Individual', weight: 30, dueDate: '2026-03-31', progress: 72,
    keyResults: [
      { title: 'Ship 3 major features', status: 'Done' },
      { title: 'Reduce bug count by 40%', status: 'In Progress' },
      { title: 'Achieve 95% test coverage', status: 'Pending' },
    ]
  },
  { id: 'G002', title: 'Improve Team Velocity', type: 'Team', weight: 25, dueDate: '2026-06-30', progress: 45,
    keyResults: [
      { title: 'Implement CI/CD pipeline', status: 'Done' },
      { title: 'Reduce deployment time to < 10 min', status: 'In Progress' },
      { title: 'Achieve 0 rollbacks in Q2', status: 'Pending' },
    ]
  },
  { id: 'G003', title: 'AWS Solutions Architect Certification', type: 'Development', weight: 20, dueDate: '2026-04-30', progress: 60,
    keyResults: [
      { title: 'Complete all training modules', status: 'Done' },
      { title: 'Pass practice exams with > 80%', status: 'In Progress' },
      { title: 'Schedule and pass certification', status: 'Pending' },
    ]
  },
  { id: 'G004', title: 'Mentor Junior Developers', type: 'Team', weight: 15, dueDate: '2026-06-30', progress: 50,
    keyResults: [
      { title: 'Conduct 4 knowledge sharing sessions', status: 'In Progress' },
      { title: 'Review 20+ PRs per month', status: 'Done' },
      { title: 'Help 2 juniors get promoted', status: 'Pending' },
    ]
  },
  { id: 'G005', title: 'Reduce Technical Debt', type: 'Individual', weight: 10, dueDate: '2026-03-31', progress: 35,
    keyResults: [
      { title: 'Refactor authentication module', status: 'In Progress' },
      { title: 'Update deprecated dependencies', status: 'Pending' },
    ]
  },
];

export const reviews: Review[] = [
  { id: 'RV001', period: 'H2 2025-26', selfRating: 4.2, managerRating: 0, finalRating: 0, outcome: '', status: 'In Progress' },
  { id: 'RV002', period: 'H1 2025-26', selfRating: 4.0, managerRating: 4.2, finalRating: 4.1, outcome: 'Exceeds Expectations', status: 'Completed' },
  { id: 'RV003', period: 'H2 2024-25', selfRating: 3.8, managerRating: 4.0, finalRating: 3.9, outcome: 'Meets Expectations', status: 'Completed' },
  { id: 'RV004', period: 'H1 2024-25', selfRating: 3.5, managerRating: 3.8, finalRating: 3.7, outcome: 'Meets Expectations', status: 'Completed' },
];

export const feedbackItems: Feedback[] = [
  { id: 'F001', from: 'VP Engineering', fromRole: 'Manager', isAnonymous: false, date: '2026-03-10', text: 'John has shown exceptional leadership in Q1. His ability to coordinate across teams while maintaining code quality is impressive.', tags: ['#leadership', '#technical'] },
  { id: 'F002', from: 'Sara Menon', fromRole: 'Peer', isAnonymous: false, date: '2026-03-05', text: 'Great mentor! Always available for code reviews and provides constructive feedback that helps me grow.', tags: ['#mentoring', '#collaboration'] },
  { id: 'F003', from: 'Anonymous', fromRole: 'Peer', isAnonymous: true, date: '2026-02-28', text: 'Could improve on documentation habits. Sometimes PRs lack proper descriptions.', tags: ['#documentation'] },
  { id: 'F004', from: 'Priya Desai', fromRole: 'Peer', isAnonymous: false, date: '2026-02-20', text: 'Very responsive during the HR system implementation. Made the cross-team collaboration smooth.', tags: ['#collaboration', '#communication'] },
  { id: 'F005', from: 'Alex Kumar', fromRole: 'Peer', isAnonymous: false, date: '2026-02-15', text: 'Helped our team understand the API integration. Technical knowledge is top-notch.', tags: ['#technical', '#helpfulness'] },
];

export const tasks: Task[] = [
  { id: 'T001', title: 'Fix login page responsive issues', description: 'Login page breaks on mobile devices below 375px width', priority: 'High', status: 'In Progress', dueDate: '2026-03-18', progress: 60, assignedTo: 'John Doe', assignedToAvatar: avatar('John Doe') },
  { id: 'T002', title: 'Implement dark mode toggle', description: 'Add dark mode support across all pages', priority: 'Medium', status: 'To Do', dueDate: '2026-03-22', progress: 0, assignedTo: 'Sara Menon', assignedToAvatar: avatar('Sara Menon') },
  { id: 'T003', title: 'API rate limiting middleware', description: 'Implement rate limiting for all public API endpoints', priority: 'High', status: 'In Review', dueDate: '2026-03-17', progress: 90, assignedTo: 'John Doe', assignedToAvatar: avatar('John Doe') },
  { id: 'T004', title: 'Update onboarding documentation', description: 'Review and update developer onboarding guide', priority: 'Low', status: 'To Do', dueDate: '2026-03-25', progress: 0, assignedTo: 'John Doe', assignedToAvatar: avatar('John Doe') },
  { id: 'T005', title: 'Database migration script', description: 'Write migration for new user preferences table', priority: 'High', status: 'Done', dueDate: '2026-03-14', progress: 100, assignedTo: 'John Doe', assignedToAvatar: avatar('John Doe') },
  { id: 'T006', title: 'Setup monitoring dashboard', description: 'Configure Grafana dashboards for API metrics', priority: 'Medium', status: 'In Progress', dueDate: '2026-03-20', progress: 40, assignedTo: 'Sara Menon', assignedToAvatar: avatar('Sara Menon') },
  { id: 'T007', title: 'Write unit tests for auth module', description: 'Achieve 90% coverage for authentication service', priority: 'Medium', status: 'Done', dueDate: '2026-03-12', progress: 100, assignedTo: 'John Doe', assignedToAvatar: avatar('John Doe') },
  { id: 'T008', title: 'Optimize image loading', description: 'Implement lazy loading and WebP conversion', priority: 'Low', status: 'To Do', dueDate: '2026-03-28', progress: 0, assignedTo: 'Sara Menon', assignedToAvatar: avatar('Sara Menon') },
  { id: 'T009', title: 'Customer feedback integration', description: 'Integrate Zendesk feedback widget', priority: 'Medium', status: 'Done', dueDate: '2026-03-10', progress: 100, assignedTo: 'Alex Kumar', assignedToAvatar: avatar('Alex Kumar') },
  { id: 'T010', title: 'Security audit fixes', description: 'Address findings from Q1 security audit', priority: 'High', status: 'Done', dueDate: '2026-03-15', progress: 100, assignedTo: 'John Doe', assignedToAvatar: avatar('John Doe') },
];

export const chatContacts: ChatContact[] = [
  { id: 'EMP002', name: 'Sara Menon', avatar: avatar('Sara Menon'), lastMessage: 'Sure, I will push the PR today', time: '10:30 AM', online: true, unread: 2 },
  { id: 'EMP003', name: 'Alex Kumar', avatar: avatar('Alex Kumar'), lastMessage: 'Can we discuss the sales dashboard?', time: '9:45 AM', online: true, unread: 0 },
  { id: 'EMP004', name: 'Priya Desai', avatar: avatar('Priya Desai'), lastMessage: 'Leave request has been approved', time: 'Yesterday', online: false, unread: 0 },
  { id: 'EMP005', name: 'Mike Rajan', avatar: avatar('Mike Rajan'), lastMessage: 'Marketing deck is ready for review', time: 'Yesterday', online: false, unread: 1 },
  { id: 'EMP006', name: 'Ravi Singh', avatar: avatar('Ravi Singh'), lastMessage: 'Budget report attached', time: 'Mar 15', online: false, unread: 0 },
];

export const chatChannels: ChatChannel[] = [
  { id: 'CH001', name: 'engineering', lastMessage: 'Deployment completed successfully', time: '11:00 AM' },
  { id: 'CH002', name: 'general', lastMessage: 'Happy birthday to Mike! 🎂', time: '10:15 AM' },
  { id: 'CH003', name: 'hr-team', lastMessage: 'New policy document uploaded', time: 'Yesterday' },
];

export const chatMessages: ChatMessage[] = [
  { id: 'M001', senderId: 'EMP002', text: 'Hi John! I finished the UI components for the dashboard.', time: '10:15 AM', isSent: false },
  { id: 'M002', senderId: 'EMP001', text: 'Great work Sara! Can you also add the chart integration?', time: '10:18 AM', isSent: true },
  { id: 'M003', senderId: 'EMP002', text: 'Yes, I am working on it. Should be done by EOD.', time: '10:20 AM', isSent: false },
  { id: 'M004', senderId: 'EMP001', text: 'Perfect. Also, please review the PR I raised for the auth module.', time: '10:22 AM', isSent: true },
  { id: 'M005', senderId: 'EMP002', text: 'Sure, I will push the PR today', time: '10:30 AM', isSent: false },
];

export const notifications: NotificationItem[] = [
  { id: 'N001', type: 'leave', title: 'Leave Request Approved', description: 'Your casual leave for March 11 has been approved by Priya Desai', time: '10 min ago', read: false, group: 'Today' },
  { id: 'N002', type: 'task', title: 'New Task Assigned', description: 'You have been assigned "Fix login page responsive issues"', time: '30 min ago', read: false, group: 'Today' },
  { id: 'N003', type: 'attendance', title: 'Late Check-in Alert', description: 'You checked in at 09:15 AM, 15 minutes past grace period', time: '2 hours ago', read: false, group: 'Today' },
  { id: 'N004', type: 'payroll', title: 'Payslip Generated', description: 'Your February 2026 payslip is now available for download', time: '5 hours ago', read: true, group: 'Today' },
  { id: 'N005', type: 'general', title: 'Team Meeting Reminder', description: 'Sprint planning meeting at 2:00 PM in Conference Room A', time: '6 hours ago', read: true, group: 'Today' },
  { id: 'N006', type: 'leave', title: 'Leave Request Pending', description: 'Sara Menon has applied for earned leave (Mar 25-28)', time: 'Yesterday', read: false, group: 'Yesterday' },
  { id: 'N007', type: 'attendance', title: 'Regularization Approved', description: 'Your regularization request for March 10 has been approved', time: 'Yesterday', read: true, group: 'Yesterday' },
  { id: 'N008', type: 'task', title: 'Task Completed', description: 'Alex Kumar completed "Customer feedback integration"', time: 'Yesterday', read: true, group: 'Yesterday' },
  { id: 'N009', type: 'general', title: 'New Announcement', description: 'Company town hall scheduled for March 25 at 4 PM', time: 'Yesterday', read: true, group: 'Yesterday' },
  { id: 'N010', type: 'payroll', title: 'Tax Declaration Reminder', description: 'Please submit your tax declaration for FY 2025-26 by March 31', time: '2 days ago', read: true, group: 'This Week' },
  { id: 'N011', type: 'leave', title: 'Leave Request Rejected', description: 'Mike Rajan\'s compensatory off request has been rejected', time: '2 days ago', read: true, group: 'This Week' },
  { id: 'N012', type: 'task', title: 'Task Overdue', description: '"API rate limiting middleware" is past due date', time: '3 days ago', read: true, group: 'This Week' },
  { id: 'N013', type: 'attendance', title: 'Monthly Attendance Report', description: 'Your February attendance report is ready for review', time: '3 days ago', read: true, group: 'This Week' },
  { id: 'N014', type: 'general', title: 'Policy Update', description: 'Updated work from home policy effective April 1, 2026', time: '4 days ago', read: true, group: 'This Week' },
  { id: 'N015', type: 'payroll', title: 'Bonus Credited', description: 'Performance bonus of ₹15,000 has been credited to your account', time: '5 days ago', read: true, group: 'This Week' },
];

export const announcements: Announcement[] = [
  { id: 'AN001', title: 'Company Town Hall - Q1 Review', content: 'Join us for the quarterly town hall on March 25 at 4 PM. We will review Q1 performance, discuss upcoming initiatives, and celebrate team achievements.', postedBy: 'CEO Office', date: '2026-03-15', audience: 'All Employees', views: 186, pinned: true, color: '#4f46e5' },
  { id: 'AN002', title: 'Updated WFH Policy', content: 'Starting April 1, all employees can avail up to 2 WFH days per week. Please coordinate with your manager and update the attendance system accordingly.', postedBy: 'HR Department', date: '2026-03-12', audience: 'All Employees', views: 210, pinned: false, color: '#22c55e' },
  { id: 'AN003', title: 'Holi Celebration at Office', content: 'We are celebrating Holi on March 14 in the office premises. Organic colors and snacks will be provided. Dress in white!', postedBy: 'Culture Team', date: '2026-03-10', audience: 'Bangalore Office', views: 145, pinned: false, color: '#f59e0b' },
  { id: 'AN004', title: 'New Health Insurance Benefits', content: 'We have upgraded our health insurance plan. Coverage now includes OPD, dental, and mental health counseling. Details shared via email.', postedBy: 'HR Department', date: '2026-03-08', audience: 'All Employees', views: 198, pinned: false, color: '#3b82f6' },
  { id: 'AN005', title: 'Engineering Hackathon', content: 'Annual hackathon on March 28-29. Form teams of 3-5 and register by March 22. Top 3 teams win exciting prizes!', postedBy: 'Engineering', date: '2026-03-05', audience: 'Engineering', views: 72, pinned: false, color: '#8b5cf6' },
];

export const exitRecords: ExitRecord[] = [
  { id: 'EX001', employeeId: 'EMP006', employeeName: 'Ravi Singh', department: 'Finance', submittedDate: '2026-03-01', lastWorkingDay: '2026-03-31', reason: 'Better Opportunity', status: 'Serving Notice', noticeDays: 30, remainingDays: 14, ktProgress: 65, buyoutStatus: 'Not Requested' },
  { id: 'EX002', employeeId: 'EMP010', employeeName: 'Anjali Mehta', department: 'Engineering', submittedDate: '2026-02-20', lastWorkingDay: '2026-03-22', reason: 'Higher Studies', status: 'Serving Notice', noticeDays: 30, remainingDays: 5, ktProgress: 90, buyoutStatus: 'Not Requested' },
  { id: 'EX003', employeeId: 'EMP015', employeeName: 'Rakesh Jain', department: 'Sales', submittedDate: '2026-03-10', lastWorkingDay: '2026-04-10', reason: 'Relocation', status: 'Serving Notice', noticeDays: 30, remainingDays: 24, ktProgress: 20, buyoutStatus: 'Requested' },
  { id: 'EX004', employeeId: 'EMP020', employeeName: 'Divya Nair', department: 'Marketing', submittedDate: '2026-03-15', lastWorkingDay: '2026-04-15', reason: 'Personal', status: 'Pending Approval', noticeDays: 30, remainingDays: 30, ktProgress: 0, buyoutStatus: 'Not Applicable' },
  { id: 'EX005', employeeId: 'EMP025', employeeName: 'Suresh Reddy', department: 'Engineering', submittedDate: '2026-01-15', lastWorkingDay: '2026-02-15', reason: 'Better Opportunity', status: 'Completed', noticeDays: 30, remainingDays: 0, ktProgress: 100, buyoutStatus: 'Not Requested' },
  { id: 'EX006', employeeId: 'EMP030', employeeName: 'Nisha Agarwal', department: 'HR', submittedDate: '2026-03-05', lastWorkingDay: '2026-04-05', reason: 'Personal', status: 'Serving Notice', noticeDays: 30, remainingDays: 19, ktProgress: 40, buyoutStatus: 'Not Requested' },
];

export const pendingApprovals: ApprovalItem[] = [
  { id: 'PA001', employeeName: 'Sara Menon', employeeAvatar: avatar('Sara Menon'), type: 'Leave Request', date: 'Mar 25-28', details: 'Earned Leave - Family vacation', status: 'Pending' },
  { id: 'PA002', employeeName: 'Alex Kumar', employeeAvatar: avatar('Alex Kumar'), type: 'Leave Request', date: 'Mar 20', details: 'Casual Leave - Doctor appointment', status: 'Pending' },
  { id: 'PA003', employeeName: 'Sara Menon', employeeAvatar: avatar('Sara Menon'), type: 'Regularization', date: 'Mar 12', details: 'Forgot Check-in - Biometric issue', status: 'Pending' },
  { id: 'PA004', employeeName: 'Divya Nair', employeeAvatar: avatar('Divya Nair'), type: 'Resignation', date: 'Mar 15', details: 'Resignation - Personal reasons', status: 'Pending' },
];

export const departmentHeadcount = [
  { name: 'Engineering', count: 85, color: '#4f46e5' },
  { name: 'Sales', count: 52, color: '#3b82f6' },
  { name: 'Marketing', count: 35, color: '#8b5cf6' },
  { name: 'HR', count: 28, color: '#22c55e' },
  { name: 'Finance', count: 22, color: '#f59e0b' },
  { name: 'Operations', count: 16, color: '#ef4444' },
  { name: 'Support', count: 10, color: '#06b6d4' },
];

export const monthlyAttendanceTrend = [
  { month: 'Oct', present: 92, late: 5, absent: 3 },
  { month: 'Nov', present: 94, late: 4, absent: 2 },
  { month: 'Dec', present: 88, late: 6, absent: 6 },
  { month: 'Jan', present: 93, late: 4, absent: 3 },
  { month: 'Feb', present: 95, late: 3, absent: 2 },
  { month: 'Mar', present: 94, late: 4, absent: 2 },
];

export const birthdayList = [
  { name: 'Sara Menon', avatar: avatar('Sara Menon'), date: 'Mar 18', department: 'Engineering' },
  { name: 'Alex Kumar', avatar: avatar('Alex Kumar'), date: 'Mar 22', department: 'Sales' },
  { name: 'Priya Desai', avatar: avatar('Priya Desai'), date: 'Mar 28', department: 'HR' },
  { name: 'Neha Gupta', avatar: avatar('Neha Gupta'), date: 'Apr 02', department: 'Sales' },
];

export const reportStats = {
  avgAttendance: '94%',
  lateRate: '8%',
  totalLeaves: 52,
  payrollAmount: '₹42.3L',
  attritionRate: '4.2%',
  headcount: 248,
};

export const leaveUtilization = [
  { type: 'Casual Leave', used: 156, total: 360 },
  { type: 'Sick Leave', used: 89, total: 300 },
  { type: 'Earned Leave', used: 210, total: 450 },
  { type: 'Comp Off', used: 15, total: 60 },
];

export const payrollMonthlySummary = [
  { month: 'Oct 2025', gross: 3800000, deductions: 850000, pfEmployer: 380000, esiEmployer: 120000, netPayout: 2950000 },
  { month: 'Nov 2025', gross: 3850000, deductions: 860000, pfEmployer: 385000, esiEmployer: 122000, netPayout: 2990000 },
  { month: 'Dec 2025', gross: 3900000, deductions: 870000, pfEmployer: 390000, esiEmployer: 124000, netPayout: 3030000 },
  { month: 'Jan 2026', gross: 4000000, deductions: 900000, pfEmployer: 400000, esiEmployer: 128000, netPayout: 3100000 },
  { month: 'Feb 2026', gross: 4100000, deductions: 920000, pfEmployer: 410000, esiEmployer: 131000, netPayout: 3180000 },
  { month: 'Mar 2026', gross: 4230000, deductions: 950000, pfEmployer: 423000, esiEmployer: 135000, netPayout: 3280000 },
];

export const roles = [
  { name: 'Super Admin', description: 'Full access to all modules', userCount: 2, permissions: { employees: ['view','create','edit','delete','approve','export'], attendance: ['view','create','edit','delete','approve','export'], leave: ['view','create','edit','delete','approve','export'], payroll: ['view','create','edit','delete','approve','export'], recruitment: ['view','create','edit','delete','approve','export'], performance: ['view','create','edit','delete','approve','export'], settings: ['view','create','edit','delete','approve','export'] }},
  { name: 'HR Manager', description: 'HR operations and approvals', userCount: 4, permissions: { employees: ['view','create','edit','approve','export'], attendance: ['view','edit','approve','export'], leave: ['view','create','edit','approve','export'], payroll: ['view','export'], recruitment: ['view','create','edit','approve'], performance: ['view','create','edit','approve'], settings: ['view'] }},
  { name: 'Manager', description: 'Team management and approvals', userCount: 25, permissions: { employees: ['view'], attendance: ['view','approve','export'], leave: ['view','approve'], payroll: ['view'], recruitment: ['view'], performance: ['view','create','edit','approve'], settings: [] }},
  { name: 'Employee', description: 'Self-service access', userCount: 217, permissions: { employees: ['view'], attendance: ['view','create'], leave: ['view','create'], payroll: ['view'], recruitment: [], performance: ['view','create'], settings: [] }},
];

export const companyInfo = {
  name: 'JEXA Technologies Pvt. Ltd.',
  address: '42 MG Road, 5th Floor, Prestige Tower, Bangalore 560001, Karnataka, India',
  phone: '+91 80 4567 8900',
  email: 'hr@jexa.com',
  website: 'www.jexa.com',
  industry: 'Information Technology',
  registrationNo: 'U72200KA2018PTC123456',
  pan: 'AABCJ1234E',
  pfCode: 'KA/BLR/1234567',
  esiCode: 'KA/12345678901',
  financialYearStart: 'April',
  workWeek: 'Mon-Fri',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
};

export const policies = {
  leave: {
    casualLeave: 12, sickLeave: 10, earnedLeave: 15,
    carryForward: 'EL max 30 days', probation: '50% of quota',
    medicalCert: 'Required for Sick Leave > 2 days',
  },
  attendance: {
    gracePeriod: '15 minutes', halfDay: '< 4 hours work',
    latePolicy: '3 late arrivals = 1 CL deducted',
    maxRegularizations: '3 per month', overtime: 'After 9 hours',
  },
  noticePeriod: {
    fullTime: '30 days', contract: '15 days', intern: '7 days',
    management: '60 days', buyout: '1x daily gross salary',
  },
  probation: {
    duration: '6 months', extension: 'Up to 3 months',
    confirmation: 'Requires Manager + HR sign-off',
  },
};

export const teamMembers = [
  { name: 'Sara Menon', avatar: avatar('Sara Menon'), status: 'Working' as const },
  { name: 'Alex Kumar', avatar: avatar('Alex Kumar'), status: 'On Break' as const },
  { name: 'Priya Desai', avatar: avatar('Priya Desai'), status: 'Working' as const },
  { name: 'Mike Rajan', avatar: avatar('Mike Rajan'), status: 'Not Checked In' as const },
  { name: 'Ravi Singh', avatar: avatar('Ravi Singh'), status: 'On Leave' as const },
];
