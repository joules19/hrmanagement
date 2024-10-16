import React from "react";
import { AppstoreAddOutlined, TeamOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Card, Spin, Alert } from "antd";
import DashboardCard from "../../components/cards/DashboardCard";
import PageTitle from "../../components/ui/PageTitle";
import { useGetEmployeeQuery } from "../../store/services/employeeApi";
import TaskDistribution from "../../components/charts/TaskDistribution";
import EmployeeMetrics from "../../components/charts/EmployeeMetrics";

const EmployeeDashboard: React.FC = () => {
  // Use the query API to fetch employee data
  const { data: employeeData, error, isLoading } = useGetEmployeeQuery(undefined);

  return (
    <div className="flex flex-col">
      <PageTitle title="Employee Dashboard" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          <DashboardCard
            count={`${0}%`}
            title="Attendance Rate"
            icon={TeamOutlined}
            color="#B7EB8F"
            isMoney={false}
          />
          <DashboardCard
            count={0}
            title="Leave Balance"
            icon={CalendarOutlined}
            color="#FFC106"
            isMoney={false}
          />
          <DashboardCard
            count={0}
            title="Upcoming Reviews"
            icon={ClockCircleOutlined}
            color="#36A2EB"
            isMoney={false}
          />
          <DashboardCard
            count={0}
            title="Completed Trainings"
            icon={AppstoreAddOutlined}
            color="#FF6384"
            isMoney={false}
          />
        </div>

        <Card title="Personal Information" bordered={true} className="mb-4">
          {isLoading ? (
            <div className="flex justify-center">
              <Spin />
            </div>
          ) : error ? (
            <Alert message="Failed to load employee data." type="error" />
          ) : (
            <div className="space-y-2">
              <p><strong>Name:</strong> {`${employeeData?.firstName + " " + employeeData?.lastName}` || "N/A"}</p>
              <p><strong>Position:</strong> {employeeData?.position || "N/A"}</p>
              <p><strong>Department:</strong> {employeeData?.department || "N/A"}</p>
            </div>
          )}
        </Card>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
          <TaskDistribution />
          <EmployeeMetrics />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
