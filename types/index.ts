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

// ─── Nav Item ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  key: string;
  href?: string;
  icon: string;
}

// stay Options in stay type of program creation
export interface StayOption {
  id: string;
  label: string;
  price: string;
}


//_____Stay Type in program creation_______________________________________
export interface StayType {
  id: string;
  label: string;
  enabled: boolean;
  options: StayOption[];
}

//program saved status

export enum PROGRAM_SAVED_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
}