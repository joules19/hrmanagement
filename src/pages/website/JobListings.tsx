import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import CareersHero from "../../components/ui/sections/CareersHero";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
}

const jobListings: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "New York, NY",
    description: "Build and maintain frontend applications.",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "DevCompany",
    location: "San Francisco, CA",
    description: "Develop scalable backend services.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studios",
    location: "Remote",
    description: "Design user-centered interfaces and experiences.",
  },
];

const JobListings: React.FC = () => {
  return (
    <section className="bg-primary- min-h-screen flex flex-col  items-center px-4 md:px-8 lg:px-16 py-12">
      <CareersHero />
      <div
        className="py-20 px-4 bg-primary- rounded-[4px]  mt-24"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(54, 162, 235, 0.6) 1px, rgba(54, 162, 235, 0) 1px)`,
          backgroundSize: "20px 20px", // Adjust size of the pattern
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">
          Job Listings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobListings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <Link to={`/job-listing/${job.id}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h2>
                <p className="text-gray-700">
                  {job.company} - {job.location}
                </p>
                <p className="text-gray-600 mt-4">{job.description}</p>
                <button className="mt-4 inline-block px-4 py-2 bg-primary text-white font-semibold rounded-lg">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;
