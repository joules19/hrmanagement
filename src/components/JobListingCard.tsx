import React from 'react';
import { Card } from 'antd';
import { JobPosting } from '../types/onboarding';

interface JobListingCardProps {
  jobPosting: JobPosting;
  onClick: () => void;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ jobPosting, onClick }) => {
  return (
    <Card
      title={jobPosting.title}
      extra={<a href="#" onClick={onClick}>View Applicants</a>}
      style={{ width: 300, margin: '10px' }}
      hoverable
    >
      <p><strong>Department:</strong> {jobPosting.department}</p>
      <p><strong>Location:</strong> {jobPosting.location}</p>
      <p><strong>Status:</strong> {jobPosting.status}</p>
      <p><strong>Salary:</strong> ${jobPosting.salaryMin} - ${jobPosting.salaryMax}</p>
    </Card>
  );
};

export default JobListingCard;