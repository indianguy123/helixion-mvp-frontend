import { NavSection } from "@/types/employee";

export const TRAINING_PROVIDER_NAV_SECTIONS: NavSection[] = [
  {
    category: "Workspace",
    items: [
      {
        label: "Dashboard",
        key: "dashboard",
        href: "/dashboard",
        icon: "layout-dashboard",
      },
      {
        label: "Profile",
        key: "profile",
        href: "/dashboard/profile",
        icon: "user",
      },
    ],
  },

  {
    category: "Programs",
    items: [
      {
        label: "Create New Program",
        key: "create_program",
        href: "/dashboard/create-program",
        icon: "plus-circle",
      },
      {
        label: "Bulk Upload",
        key: "bulk_upload",
        href: "/dashboard/bulk-program-upload",
        icon: "upload",
      },
      {
        label: "View Drafts",
        key: "view_drafts",
        href: "/dashboard/view-draft",
        icon: "file-text",
      },
    ],
  },

  {
    category: "Operations",
    items: [
      {
        label: "Download Enrollment Data",
        key: "download_enrollment_data",
        href: "/dashboard/download-enrol-data",
        icon: "download",
      },
      {
        label: "Upload Attendance",
        key: "upload_attendance",
        href: "/dashboard/update-attendance",
        icon: "clipboard-check",
      },
      {
        label: "View Reports",
        key: "view_reports",
        href: "/dashboard/view-report",
        icon: "bar-chart-3",
      },
    ],
  },
];