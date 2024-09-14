import React, { useState, useEffect } from "react";
import { Application } from "../../../types/onboarding";
import ApplicationTable from "../../../components/tables/ApplicationTable";
import ApplicationModal from "../../../components/modals/ApplicationModal";
import PageTitle from "../../../components/ui/PageTitle";
import { Button } from "../../../components/ui/Button";

const Applications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentApplication, setCurrentApplication] =
    useState<Application | null>(null);

  useEffect(() => {
    const savedApplications = localStorage.getItem("applications");
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

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
      setApplications([...applications, application]);
    }
    handleCloseModal();
  };

  const handleDeleteApplication = (id: number) => {
    setApplications(applications.filter((app) => app.id !== id));
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Job Applications" />
      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full ">
          <div className="flex  w-[200px] h-[38px] mb-4">
            <Button
              onClick={() => handleShowModal(null)}
              mode={"solid"}
              buttonText=" Add New Application"
              loading={false}
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>
          <ApplicationTable />
          {showModal && (
            <ApplicationModal
              show={showModal}
              handleClose={handleCloseModal}
              currentApplication={currentApplication}
              onSave={handleSaveApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Applications;
