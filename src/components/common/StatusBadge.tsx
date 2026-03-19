interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

const statusColors: Record<string, string> = {
  'Active': 'bg-green-100 text-green-700',
  'Approved': 'bg-green-100 text-green-700',
  'Present': 'bg-green-100 text-green-700',
  'Done': 'bg-green-100 text-green-700',
  'Paid': 'bg-green-100 text-green-700',
  'Hired': 'bg-green-100 text-green-700',
  'Connected': 'bg-green-100 text-green-700',
  'Completed': 'bg-green-100 text-green-700',
  'Working': 'bg-green-100 text-green-700',

  'Pending': 'bg-amber-100 text-amber-700',
  'Pending Approval': 'bg-amber-100 text-amber-700',
  'Processing': 'bg-amber-100 text-amber-700',
  'In Progress': 'bg-amber-100 text-amber-700',
  'Probation': 'bg-amber-100 text-amber-700',
  'Screening': 'bg-amber-100 text-amber-700',
  'Draft': 'bg-amber-100 text-amber-700',
  'On Break': 'bg-amber-100 text-amber-700',

  'Rejected': 'bg-red-100 text-red-700',
  'Absent': 'bg-red-100 text-red-700',
  'Inactive': 'bg-red-100 text-red-700',
  'Closed': 'bg-red-100 text-red-700',
  'Overdue': 'bg-red-100 text-red-700',
  'High': 'bg-red-100 text-red-700',

  'Notice Period': 'bg-orange-100 text-orange-700',
  'Serving Notice': 'bg-orange-100 text-orange-700',
  'Late': 'bg-orange-100 text-orange-700',

  'WFH': 'bg-blue-100 text-blue-700',
  'Interview': 'bg-blue-100 text-blue-700',
  'Offer': 'bg-blue-100 text-blue-700',
  'Info': 'bg-blue-100 text-blue-700',
  'Scheduled': 'bg-blue-100 text-blue-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'Not Checked In': 'bg-gray-100 text-gray-700',

  'Leave': 'bg-purple-100 text-purple-700',
  'Holiday': 'bg-purple-100 text-purple-700',
  'On Leave': 'bg-purple-100 text-purple-700',
  'Half Day': 'bg-purple-100 text-purple-700',
  'Applied': 'bg-blue-100 text-blue-700',

  'Low': 'bg-green-100 text-green-700',
  'In Review': 'bg-indigo-100 text-indigo-700',
  'To Do': 'bg-gray-100 text-gray-700',
  'Weekend': 'bg-gray-100 text-gray-600',
  'Withdrawn': 'bg-gray-100 text-gray-600',

  'Exceeds Expectations': 'bg-green-100 text-green-700',
  'Meets Expectations': 'bg-blue-100 text-blue-700',
};

export default function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const colors = statusColors[status] || 'bg-gray-100 text-gray-700';
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${colors} ${sizeClasses}`}>
      {status}
    </span>
  );
}
