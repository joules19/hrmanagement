import React from "react";
import PageTitle from "../../components/ui/PageTitle";
import EmployeeTable from "../../components/tables/EmployeeListTable";

const EmployeeList: React.FC = () => {
  return (
    <div className="flex flex-col">
      <PageTitle title="Employee List" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex w-full">
          <EmployeeTable />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
