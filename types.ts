export enum Step {
  Home,
  Form,
  Preview,
  Reading,
  Success,
  GroupRegistration,
  InitiativeDetails,
  Debug
}

// Basic types shared across the app

export type PosterTemplate = 'tricolor' | 'gold-dark' | 'minimalist';

export interface School {
  id: string;                 // Unique identifier (e.g., '1', 'general-public')
  name: string;               // "Delhi Public School"
  location: string;           // "New Delhi"
  subLocation: string;        // "R.K. Puram"
  icon: string;               // "🏛️" (emoji fallback)
  logoUrl?: string;           // School logo image URL
  isActive: boolean;          // Whether accepting submissions
  isFeatured?: boolean;       // Show on homepage
  templateId: PosterTemplate; // Which poster design to use
  posterLogoUrl?: string;     // Override for poster-only logos
  logoPosition?: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
}

export interface StudentData {
  name: string;
  phone: string;
  email: string;
  photoUrl: string | null;
  optIn?: boolean;
}

// Legacy interface for existing components
export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  photo: string;
  optInSimilarEvents?: boolean;
}

export interface Submission {
  id: string;                 // UUID generated on submission
  studentName: string;        // From StudentData.name
  phone: string;              // Required contact
  email: string;              // Required contact
  timestamp: string;          // ISO 8601 format
  posterGenerated: boolean;   // Always true when created
  posterDownloaded: boolean;  // Tracks if user downloaded
  optIn?: boolean;            // Tracks user consent for future contact
}

export interface AppContextType {
  selectedSchool: School | null;
  setSelectedSchool: (school: School | null) => void;
  studentData: StudentData;
  updateStudentData: (data: Partial<StudentData>) => void;
  currentSubmissionId: string | null;
  setCurrentSubmissionId: (id: string | null) => void;
}

export interface Pledge {
  id: number;
  text: string;
  explanation: string;
}

export const FIXED_PLEDGE: Pledge = {
  id: 1,
  text: 'I PLEDGE TO PROTECT SEA TURTLES',
  explanation: 'My Pledge to Marine Life'
};