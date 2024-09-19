export interface JobPosting {
  id?: number;
  title: string;
  department: string;
  location: string;
  description: string;
  qualifications: string[];
  requirements: string[];
  benefits: string[];

  status: "Open" | "Closed" | "On Hold";
  postedDate: string;
}

export interface Application {
  id: number;
  applicantName: string;
  position: string;
  status: string;
}

export interface OnboardingStep {
  id: number;
  stepName: string;
  description: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
}

export interface ParsedResume {
  id: number;
  candidateName: string;
  email: string;
  phone: string;
  skills: string[];
  experience: string;
  education: string;
  resumeText: string;
}

export interface OnboardingTask {
  id: number;
  taskName: string;
  assignee: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
  description: string;
}

export interface Interview {
  id: number;
  candidateName: string;
  interviewerName: string;
  interviewDate: string;
  interviewTime: string;
  position: string;
  notes: string;
}
