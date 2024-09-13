export interface JobPosting {
  id?: number;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  status: "Open" | "Closed" | "On Hold";
  postedDate: string;
}
