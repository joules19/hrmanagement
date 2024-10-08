import React from "react";
import { dashboardData } from "./../../data/mockData";
import { AppstoreAddOutlined, TeamOutlined } from "@ant-design/icons";
import { SiExpensify } from "react-icons/si";
import DashboardCard from "../../components/cards/DashboardCard";
import DepartmentDistribution from "../../components/charts/DepartmentDistribution";
import AdminMetrics from "../../components/charts/AdminMetrics";
import PageTitle from "../../components/ui/PageTitle";

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Dashboard" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          <DashboardCard
            count={dashboardData.employeeCount}
            title="Total Employees"
            icon={TeamOutlined}
            color="#1890ff"
            isMoney={false}
          />
          <DashboardCard
            count={dashboardData.departmentCount}
            title="Total Departments"
            icon={AppstoreAddOutlined}
            color="#FFC106"
            isMoney={false}
          />
          <DashboardCard
            count={dashboardData.totalExpenses}
            title="Total Expenses"
            icon={SiExpensify}
            color="#87CEEB"
            isMoney={true}
          />
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-4">
          <DepartmentDistribution />
          <AdminMetrics />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
