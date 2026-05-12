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
