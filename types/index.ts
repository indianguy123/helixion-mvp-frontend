import { LucideIcon } from "lucide-react";


// ─── User ────────────────────────────────────────────────────────────────────
export interface User {
  userId: string;
  name: string;
  email: string;
  location: string;
  role: string; 
}

// ─── Enrollment ──────────────────────────────────────────────────────────────
export interface Enrollment {
  _id: string;
  userId: string;
  programId: string;
  status: "pending" | "active" | "completed";
  enrolledAt: Date;
  programDetails: Programme;
}

// ─── Programme ───────────────────────────────────────────────────────────────
export interface Programme {
  _id: string;
  name: string;
  description: string;
  duration: string;
  mode: string;
  location: string;
  status: string; 
  fee: number;
}

// ─── Draft Program (Training Provider) ───────────────────────────────────────
export interface DraftProgram {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  venue?: string;
  singleOccupancyFee?: number;
  twinSharingFee?: number;
  nonResidentialFee?: number;
  brochureUrl?: string;
  brochurePublicId?: string;
  minParticipants?: number;
  maxParticipants?: number;
  status: 'draft' | 'published';
  training_providerId: string;
  batchId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Draft Programs Paginated Response ───────────────────────────────────────
export interface DraftProgramsResponse {
  programs: DraftProgram[];
  total: number;
  page: number;
  totalPages: number;
}

// ─── Nav Item ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  key: string;
  href?: string;
  icon: string;
  badge?: number;
}