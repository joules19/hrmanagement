import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../ui/Button";
import { Application } from "../../types/onboarding";

interface ApplicationModalProps {
  show: boolean;
  handleClose: () => void;
  currentApplication: Application | null;
  onSave: (application: Application) => void;
}

const validationSchema = Yup.object({
  applicantName: Yup.string().required("Applicant Name is required"),
  position: Yup.string().required("Position is required"),
  status: Yup.string().required("Status is required"),
});

const ApplicationModal: React.FC<ApplicationModalProps> = ({
  show,
  handleClose,
  currentApplication,
  onSave,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    applicantName: currentApplication?.applicantName || "",
    position: currentApplication?.position || "",
    status: currentApplication?.status || "Applied",
  };

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {currentApplication ? "Edit Application" : "Add New Application"}
            </h3>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                onSave({
                  id: currentApplication?.id || Date.now(),
                  ...values,
                });
              }}
            >
              {() => (
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="applicantName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Applicant Name
                    </label>
                    <Field
                      id="applicantName"
                      name="applicantName"
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="applicantName"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Position
                    </label>
                    <Field
                      id="position"
                      name="position"
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <ErrorMessage
                      name="position"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <Field
                      as="select"
                      id="status"
                      name="status"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offered">Offered</option>
                      <option value="Hired">Hired</option>
                      <option value="Rejected">Rejected</option>
                    </Field>
                    <ErrorMessage
                      name="status"
                      component="p"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <div className="flex gap-2 w-[308px] h-[38px]">
                      <div className="flex flex-1">
                        <Button
                          onClick={handleClose}
                          mode={"outline"}
                          buttonText="Close"
                          defaultColor="primary-1"
                          hoverColor="primary-2"
                        />
                      </div>
                      <div className="flex flex-1">
                        <Button
                          mode={"solid"}
                          buttonText="Save"
                          loading={isLoading}
                          defaultColor="primary-1"
                          hoverColor="primary-2"
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationModal;
