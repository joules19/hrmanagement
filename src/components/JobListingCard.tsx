import React from 'react';
import { Card, Tooltip } from 'antd';
import { JobPosting, JobPostingDetails } from '../types/onboarding';
import { formatCurrencyRange } from '../utils/helperMethods';

interface JobListingCardProps {
  jobPosting: JobPostingDetails;
  onClick: () => void;
}

const JobListingCard: React.FC<JobListingCardProps> = ({ jobPosting, onClick }) => {
  return (
    <Tooltip title={jobPosting.jobTitle}>  <Card
      title={<Tooltip title={jobPosting.jobTitle}>{jobPosting.jobTitle}</Tooltip>}
      extra={<a href="#" className="ml-3 text-xs font-medium text-primary-1 hover:text-primary-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-1"
        onClick={onClick}>View Applicants</a>}
      style={{ width: 300, margin: '10px' }}
      hoverable
    >
      <p><strong>Department:</strong> {jobPosting.department}</p>
      <p><strong>Location:</strong> {jobPosting.companyAddress}</p>
      <p><strong>Status:</strong> {jobPosting.status}</p>
      <p><strong>Salary:</strong> {formatCurrencyRange(jobPosting.minSalaryRange, jobPosting.maxSalaryRange)}</p>
    </Card></Tooltip>

  );
};

export default JobListingCard;