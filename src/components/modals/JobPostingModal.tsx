import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { Button } from "../ui/Button";
import { JobPosting } from "../../types/onboarding";
import TextAreaField from "../ui/TextAreaField";

interface JobPostingModalProps {
  show: boolean;
  handleClose: () => void;
  currentPosting: JobPosting | null;
  onSave: (posting: JobPosting) => void;
}

const JobPostingModal: React.FC<JobPostingModalProps> = ({
  show,
  handleClose,
  currentPosting,
  onSave,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik<JobPosting>({
    initialValues: {
      title: currentPosting?.title || "",
      department: currentPosting?.department || "",
      location: currentPosting?.location || "",
      description: currentPosting?.description || "",
      requirements: currentPosting?.requirements || "",
      status: currentPosting?.status || "Open",
      postedDate:
        currentPosting?.postedDate || new Date().toISOString().split("T")[0],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Job Title is required"),
      department: Yup.string().required("Department is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Description is required"),
      requirements: Yup.string().required("Requirements are required"),
      status: Yup.string().required("Status is required"),
    }),
    onSubmit: (values) => {
      const newPosting: JobPosting = {
        ...values,
        id: currentPosting?.id || Date.now(),
      };
      onSave(newPosting);
    },
  });

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
            <h3 className="text-xl font-bold mb-4">
              {currentPosting ? "Edit Job Posting" : "Add New Job Posting"}
            </h3>
            <form onSubmit={formik.handleSubmit}>
              <InputField
                label="Job Title"
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.title && formik.errors.title}
              />
              <InputField
                label="Department"
                id="department"
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.department && formik.errors.department}
              />
              <InputField
                label="Location"
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.location && formik.errors.location}
              />
              <TextAreaField
                label="Description"
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.description && formik.errors.description}
              />
              <TextAreaField
                label="Requirements"
                id="requirements"
                name="requirements"
                value={formik.values.requirements}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={
                  formik.touched.requirements && formik.errors.requirements
                }
              />
              <SelectField
                label="Status"
                id="status"
                name="status"
                value={formik.values.status}
                options={["Open", "Closed", "On Hold"]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.status && formik.errors.status}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <div className="flex gap-2 w-[408px] h-[38px]">
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
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default JobPostingModal;
