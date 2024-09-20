import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import TextAreaField from "../ui/TextAreaField";
import { Button } from "../ui/Button";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface JobPosting {
  title: string;
  department: string;
  location: string;
  description: string;
  qualifications: string[];
  requirements: string[];
  benefits: string[];
  status: string;
  postedDate: string;
  salaryMin: string;
  salaryMax: string;
  jobType: string;
  workLocationType: string;
}

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

  // Formik setup
  const formik = useFormik<JobPosting>({
    initialValues: {
      title: currentPosting?.title || "",
      department: currentPosting?.department || "",
      location: currentPosting?.location || "",
      description: currentPosting?.description || "",
      qualifications: currentPosting?.qualifications || [""],
      requirements: currentPosting?.requirements || [""],
      benefits: currentPosting?.benefits || [""],
      status: currentPosting?.status || "Open",
      postedDate:
        currentPosting?.postedDate || new Date().toISOString().split("T")[0],
      salaryMin: currentPosting?.salaryMin || "",
      salaryMax: currentPosting?.salaryMax || "",
      jobType: currentPosting?.jobType || "",
      workLocationType: currentPosting?.workLocationType || "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Job Title is required"),
      department: Yup.string().required("Department is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Description is required"),
      qualifications: Yup.array()
        .of(Yup.string().required("Qualification is required"))
        .min(1, "At least one qualification is required"),
      requirements: Yup.array()
        .of(Yup.string().required("Requirement is required"))
        .min(1, "At least one requirement is required"),
      benefits: Yup.array()
        .of(Yup.string().required("Benefit is required"))
        .min(1, "At least one benefit is required"),
      status: Yup.string().required("Status is required"),
      salaryMin: Yup.number()
        .min(0, "Salary must be positive")
        .required("Minimum salary is required"),
      salaryMax: Yup.number()
        .min(
          Yup.ref("salaryMin"),
          "Maximum salary must be greater than minimum salary"
        )
        .required("Maximum salary is required"),
      jobType: Yup.string().required("Job type is required"),
      workLocationType: Yup.string().required("Work location type is required"),
    }),
    onSubmit: (values) => {
      const newPosting: JobPosting = {
        ...values,
        qualifications: values.qualifications.filter((q) => q.trim() !== ""),
        requirements: values.requirements.filter((r) => r.trim() !== ""),
        benefits: values.benefits.filter((b) => b.trim() !== ""),
      };
      console.log(newPosting);

      //onSave(newPosting);
    },
  });

  const handleAddField = (
    field: "qualifications" | "requirements" | "benefits"
  ) => {
    formik.setFieldValue(field, [...formik.values[field], ""]);
  };

  const handleRemoveField = (
    field: "qualifications" | "requirements" | "benefits",
    index: number
  ) => {
    const newFieldValues = formik.values[field].filter((_, i) => i !== index);
    formik.setFieldValue(field, newFieldValues);
  };

  const renderDynamicFields = (
    field: "qualifications" | "requirements" | "benefits",
    values: string[],
    label: string
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {values.map((value, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            id={`${field}-${index}`}
            name={`${field}[${index}]`}
            value={value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="flex-grow mr-2 p-2 border-[.8px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-1"
            required
          />
          <button
            type="button"
            onClick={() => handleAddField(field)}
            className="text-green-500 py-1 px-2 rounded"
          >
            <PlusCircleIcon className="w-4 h-4" />
          </button>
          {values.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveField(field, index)}
              className="text-red-500 py-1 px-2 rounded"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
      {formik.touched[field] && formik.errors[field] && (
        <p className="mt-1 text-xs text-red-500">{formik.errors[field]}</p>
      )}
    </div>
  );

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
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
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Salary Range
                </label>
                <div className="flex space-x-2">
                  <InputField
                    id="salaryMin"
                    name="salaryMin"
                    value={formik.values.salaryMin}
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.salaryMin && formik.errors.salaryMin}
                  />
                  <InputField
                    id="salaryMax"
                    name="salaryMax"
                    value={formik.values.salaryMax}
                    type="number"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    error={formik.touched.salaryMax && formik.errors.salaryMax}
                  />
                </div>
              </div>
              <SelectField
                label="Job Type"
                id="jobType"
                name="jobType"
                value={formik.values.jobType}
                options={["Full-time", "Part-time", "Internship"]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.jobType && formik.errors.jobType}
              />
              <SelectField
                label="Work Location Type"
                id="workLocationType"
                name="workLocationType"
                value={formik.values.workLocationType}
                options={["Onsite", "Remote", "Hybrid"]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={
                  formik.touched.workLocationType &&
                  formik.errors.workLocationType
                }
              />
              {renderDynamicFields(
                "qualifications",
                formik.values.qualifications,
                "Qualifications"
              )}
              {renderDynamicFields(
                "requirements",
                formik.values.requirements,
                "Requirements"
              )}
              {renderDynamicFields(
                "benefits",
                formik.values.benefits,
                "Benefits"
              )}
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
              {/* <InputField
                label="Posted Date"
                id="postedDate"
                name="postedDate"
                type="date"
                value={formik.values.postedDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={formik.touched.postedDate && formik.errors.postedDate}
              /> */}
              <div className="flex justify-end space-x-2 mt-4">
                <div className="flex gap-2 w-[308px] h-[38px]">
                  <div className="flex flex-1">
                    <Button
                      onClick={handleClose}
                      mode="outline"
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
