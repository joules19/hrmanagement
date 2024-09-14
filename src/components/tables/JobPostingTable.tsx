import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface JobPosting {
  id: number;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string;
  status: "Open" | "Closed" | "On Hold";
  postedDate: string;
}

const columns: TableColumnsType<JobPosting> = [
  {
    title: "Title",
    dataIndex: "title",
    width: "25%",
    filterSearch: true,
  },
  {
    title: "Department",
    dataIndex: "department",
    width: "20%",
    filters: [
      { text: "Engineering", value: "Engineering" },
      { text: "Human Resources", value: "Human Resources" },
      { text: "Marketing", value: "Marketing" },
    ],
    onFilter: (value, record) => record.department.includes(value as string),
  },
  {
    title: "Location",
    dataIndex: "location",
    width: "20%",
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "15%",
    filters: [
      { text: "Open", value: "Open" },
      { text: "Closed", value: "Closed" },
      { text: "On Hold", value: "On Hold" },
    ],
    onFilter: (value, record) => record.status.includes(value as string),
  },
  {
    title: "Posted Date",
    dataIndex: "postedDate",
    width: "20%",
    sorter: (a, b) =>
      new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime(),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: "10%",
    render: (_, record) => (
      <div className="flex space-x-2">
        <button
          className="text-primary-1 py-1 px-2 rounded"
          onClick={() => console.log("Edit", record)}
        >
          <PencilSquareIcon className="w-4 h-4" />
        </button>
        <button
          className="text-red-500 py-1 px-2 rounded"
          onClick={() => console.log("Delete", record.id)}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

const data: JobPosting[] = [
  {
    id: 1,
    title: "Frontend Developer",
    department: "Engineering",
    location: "San Francisco, CA",
    description: "Develop and maintain user interfaces.",
    requirements: "React, Tailwind CSS",
    status: "Open",
    postedDate: "2024-09-01",
  },
  {
    id: 2,
    title: "Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    description: "Oversee marketing campaigns.",
    requirements: "SEO, Content Marketing",
    status: "Closed",
    postedDate: "2023-06-15",
  },
  {
    id: 3,
    title: "HR Specialist",
    department: "Human Resources",
    location: "London, UK",
    description: "Manage recruitment and employee relations.",
    requirements: "Recruitment, Employee Relations",
    status: "On Hold",
    postedDate: "2024-01-22",
  },
];

const onChange: TableProps<JobPosting>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("Table parameters", pagination, filters, sorter, extra);
};

const JobPostingTable: React.FC = () => (
  <div className="w-full">
    <Table
      scroll={{ x: 1200 }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      rowKey="id"
      className="bg-white shadow-md rounded-lg"
    />
  </div>
);

export default JobPostingTable;
