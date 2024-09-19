import React, { useState } from "react";
import {  Application } from "../../../types/onboarding";
import ApplicationTable from "../../../components/tables/ApplicationTable";
import ApplicationModal from "../../../components/modals/ApplicationModal";
import JobListingCard from "../../../components/JobListingCard";
import PageTitle from "../../../components/ui/PageTitle";
import { Button } from "../../../components/ui/Button";
import { JobPosting as FullJobPosting } from "../../../types/onboarding";

type JobPosting = Pick<FullJobPosting, 'id' | 'title' | 'department' | 'location' | 'status' | 'salaryMin' | 'salaryMax'>;


// Mock data for job postings
const mockJobPostings: JobPosting[] = [
  {
    id: 1,
    title: "Software Engineer",
    department: "Engineering",
    location: "New York",
    status: "Open",
    salaryMin: "80000",
    salaryMax: "120000",
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco",
    status: "Open",
    salaryMin: "100000",
    salaryMax: "150000",
  },
  {
    id: 3,
    title: "UX Designer",
    department: "Design",
    location: "Remote",
    status: "Open",
    salaryMin: "70000",
    salaryMax: "110000",
  },
];

// Mock data for applications
const mockApplications: Application[] = [
  {
    id: 1,
    applicantName: "John Doe",
    position: "Software Engineer",
    status: "Applied",
    dateApplied: "2023-05-01",
  },
  {
    id: 2,
    applicantName: "Jane Smith",
    position: "Software Engineer",
    status: "Screening",
    dateApplied: "2023-05-02",
  },
  {
    id: 3,
    applicantName: "Bob Johnson",
    position: "Product Manager",
    status: "Interview",
    dateApplied: "2023-05-03",
  },
  {
    id: 4,
    applicantName: "Alice Brown",
    position: "UX Designer",
    status: "Applied",
    dateApplied: "2023-05-04",
  },
];

const Applications: React.FC = () => {
  const [jobPostings] = useState<JobPosting[]>(mockJobPostings);
  const [selectedJobPosting, setSelectedJobPosting] = useState<JobPosting | null>(null);
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [showModal, setShowModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);

  const handleShowModal = (application: Application | null) => {
    setCurrentApplication(application);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentApplication(null);
  };

  const handleSaveApplication = (application: Application) => {
    if (currentApplication) {
      setApplications(
        applications.map((app) =>
          app.id === currentApplication.id ? application : app
        )
      );
    } else {
      setApplications([...applications, { ...application, id: applications.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleDeleteApplication = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  const handleSelectJobPosting = (jobPosting: JobPosting) => {
    setSelectedJobPosting(jobPosting);
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Job Applications" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-wrap justify-start">
          {jobPostings.map((jobPosting) => (
            <JobListingCard
              key={jobPosting.id}
              jobPosting={jobPosting as FullJobPosting}
              onClick={() => handleSelectJobPosting(jobPosting)}
            />
          ))}
        </div>

        {selectedJobPosting && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Applicants for {selectedJobPosting.title}
            </h2>
            <div className="flex w-[200px] h-[38px] mb-4">
              <Button
                onClick={() => handleShowModal(null)}
                mode={"solid"}
                buttonText="Add New Application"
                loading={false}
                defaultColor="primary-1"
                hoverColor="primary-2"
              />
            </div>
            <ApplicationTable
              applications={applications.filter(app => app.position === selectedJobPosting.title)}
              onEdit={handleShowModal}
              onDelete={handleDeleteApplication}
            />
          </div>
        )}

        <ApplicationModal
          show={showModal}
          handleClose={handleCloseModal}
          currentApplication={currentApplication}
          onSave={handleSaveApplication}
        />
      </div>
    </div>
  );
};

export default Applications;
