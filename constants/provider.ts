import { NavSection } from "@/types/employee";
import { ROUTES } from "./navigation";

export const PROVIDER_NAV_SECTIONS: NavSection[] = [
  {
    category: 'Workspace',
    items: [
      {
        label: 'Dashboard',
        key: 'dashboard',
        href: ROUTES.PROVIDER_DASHBOARD,
        icon: 'layout-dashboard',
      },
      {
        label: 'Profile',
        key: 'profile',
        href: '/dashboard/profile',
        icon: 'user-circle',
      },
    ],
  },
  {
    category: 'Programs',
    items: [
      {
        label: 'Create New Program',
        key: 'create-program',
        href: '/dashboard/programs/create',
        icon: 'plus-circle',
      },
      {
        label: 'Bulk Upload',
        key: 'bulk-upload',
        href: ROUTES.PROVIDER_BULK_UPLOAD,
        icon: 'upload-cloud',
      },
      {
        label: 'View Drafts',
        key: 'drafts',
        href: '/dashboard/programs/drafts',
        icon: 'file-text',
      },
    ],
  },
  {
    category: 'Operations',
    items: [
      {
        label: 'Download Enrolment Data',
        key: 'enrolments',
        href: '/dashboard/operations/enrolments',
        icon: 'download',
      },
      {
        label: 'Upload Attendance',
        key: 'attendance',
        href: '/dashboard/operations/attendance',
        icon: 'upload',
      },
      {
        label: 'View Reports',
        key: 'reports',
        href: '/dashboard/operations/reports',
        icon: 'bar-chart',
      },
    ],
  },
];

/** Expected CSV column headers for bulk program upload — mirrors the backend Zod schema */
export const PROGRAM_CSV_COLUMNS = [
  'title', 'startDate', 'endDate', 'venue', 'isResidential', 'stayType',
  'singleOccupancyFee', 'twinSharingFee', 'nonResidentialFee',
  'brochureUrl', 'minParticipants', 'maxParticipants', 'status',
] as const;

export const SAMPLE_CSV_ROW = 'Leadership Workshop,2026-06-01,2026-06-03,Mumbai,true,single,15000,12000,8000,,10,50,draft';
