import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { Application } from "../../types/onboarding";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

interface ApplicationTableProps {
  applications: Application[];
  onEdit: (application: Application) => void;
  onDelete: (id: number) => void;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ applications, onEdit, onDelete }) => {
  const columns: TableColumnsType<Application> = [
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      width: "20%",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
    },
    {
      title: "Position",
      dataIndex: "position",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      filters: [
        { text: "Applied", value: "Applied" },
        { text: "Screening", value: "Screening" },
        { text: "Interview", value: "Interview" },
        { text: "Offered", value: "Offered" },
        { text: "Hired", value: "Hired" },
        { text: "Rejected", value: "Rejected" },
      ],
      onFilter: (value, record) => record.status.includes(value as string),
    },
    {
      title: "Date Applied",
      dataIndex: "dateApplied",
      width: "15%",
      sorter: (a, b) => new Date(a.dateApplied).getTime() - new Date(b.dateApplied).getTime(),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "10%",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            className="text-primary-1 py-1 px-2 rounded"
            onClick={() => onEdit(record)}
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
          <button
            className="text-red-500 py-1 px-2 rounded"
            onClick={() => onDelete(record.id)}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={applications}
      rowKey="id"
      className="bg-white shadow-md rounded-lg"
    />
  );
};

export default ApplicationTable;
