import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { Application } from "../../types/onboarding";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const columns: TableColumnsType<Application> = [
  {
    title: "Applicant Name",
    dataIndex: "applicantName",
    width: "25%",
    filterSearch: true,
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

const data: Application[] = [
  {
    id: 1,
    applicantName: "Lara Weah",
    position: "Senior Engineer",
    status: "Hired",
  },
  {
    id: 2,
    applicantName: "Lara Weah",
    position: "Senior Engineer",
    status: "Offered",
  },
  {
    id: 3,
    applicantName: "Lara Weah",
    position: "Senior Engineer",
    status: "Rejected",
  },
];

const onChange: TableProps<Application>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("Table parameters", pagination, filters, sorter, extra);
};

const ApplicantTable: React.FC = () => (
  <div className="w-full">
    <Table
      scroll={{ x: 500 }}
      columns={columns}
      dataSource={data}
      onChange={onChange}
      rowKey="id"
      className="bg-white shadow-md rounded-lg"
    />
  </div>
);

export default ApplicantTable;
