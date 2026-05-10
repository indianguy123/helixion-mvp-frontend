import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/DashboardShell";
import type { User } from "@/types";
import { decodeJwtPayload, getAccessToken } from "@/utils/token";
import { EMP_NAV_SECTIONS } from "@/constants/employee";
import { TRAINING_PROVIDER_NAV_SECTIONS } from "@/constants/training-provider";
import { DEFAULT_KEY, USER_ROLES } from "@/constants/navigation";
import { NavSection } from "@/types/employee";


interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const token = await getAccessToken();

  if (!token) {
    redirect("/signin");
  }

  const payload = await decodeJwtPayload(token);

  let navSections:NavSection[] =  [];
  let defaultActiveKey = DEFAULT_KEY.DASHBOARD;

  if (payload.role === USER_ROLES.EMPLOYEE) {
    navSections = EMP_NAV_SECTIONS;
    defaultActiveKey = DEFAULT_KEY.ENROLLMENTS;
  } else if (payload.role === USER_ROLES.TRAINING_PROVIDER) {
    navSections = TRAINING_PROVIDER_NAV_SECTIONS;
    defaultActiveKey = DEFAULT_KEY.DASHBOARD;
  }

  const user: User = {
    userId: payload.userId,
    name: payload.name,
    email: payload.email,
    location: payload.location,
    role: payload.role,
  };

  return (
    <DashboardShell
      user={user}
      navSections={navSections}
      defaultActiveKey={defaultActiveKey}
    >
      {children}
    </DashboardShell>
  );
}