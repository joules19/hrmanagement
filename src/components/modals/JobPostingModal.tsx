import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { Button } from "../ui/Button";
import { JobPosting } from "../../types/onboarding";
import TextAreaField from "../ui/TextAreaField";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  const [qualifications, setQualifications] = useState<string[]>(currentPosting?.qualifications || [""]);
  const [requirements, setRequirements] = useState<string[]>(currentPosting?.requirements || [""]);
  const [benefits, setBenefits] = useState<string[]>(currentPosting?.benefits || [""]);

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
      qualifications: Yup.array().of(Yup.string().required("Qualification is required")),
      requirements: Yup.array().of(Yup.string().required("Requirement is required")),
      benefits: Yup.array().of(Yup.string().required("Benefit is required")),
      status: Yup.string().required("Status is required"),
      salaryMin: Yup.number().min(0, "Salary must be positive").required("Minimum salary is required"),
      salaryMax: Yup.number().min(Yup.ref('salaryMin'), "Maximum salary must be greater than minimum salary").required("Maximum salary is required"),
      jobType: Yup.string().required("Job type is required"),
      workLocationType: Yup.string().required("Work location type is required"),
    }),
    onSubmit: (values) => {
      const newPosting: JobPosting = {
        ...values,
        id: currentPosting?.id || Date.now(),
        qualifications: qualifications.filter(q => q.trim() !== ""),
        requirements: requirements.filter(r => r.trim() !== ""),
        benefits: benefits.filter(b => b.trim() !== ""),
      };
      onSave(newPosting);
    },
  });

  const handleAddField = (field: 'qualifications' | 'requirements' | 'benefits') => {
    if (field === 'qualifications') {
      setQualifications([...qualifications, ""]);
    } else if (field === 'requirements') {
      setRequirements([...requirements, ""]);
    } else {
      setBenefits([...benefits, ""]);
    }
  };

  const handleRemoveField = (field: 'qualifications' | 'requirements' | 'benefits', index: number) => {
    if (field === 'qualifications') {
      setQualifications(qualifications.filter((_, i) => i !== index));
    } else if (field === 'requirements') {
      setRequirements(requirements.filter((_, i) => i !== index));
    } else {
      setBenefits(benefits.filter((_, i) => i !== index));
    }
  };

  const handleFieldChange = (field: 'qualifications' | 'requirements' | 'benefits', index: number, value: string) => {
    if (field === 'qualifications') {
      const newQualifications = [...qualifications];
      newQualifications[index] = value;
      setQualifications(newQualifications);
    } else if (field === 'requirements') {
      const newRequirements = [...requirements];
      newRequirements[index] = value;
      setRequirements(newRequirements);
    } else {
      const newBenefits = [...benefits];
      newBenefits[index] = value;
      setBenefits(newBenefits);
    }
  };

  const renderDynamicFields = (field: 'qualifications' | 'requirements' | 'benefits', values: string[], label: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {values.map((value, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            id={`${field}-${index}`}
            name={`${field}-${index}`}
            value={value}
            onChange={(e) => handleFieldChange(field, index, e.target.value)}
            className="flex-grow mr-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button onClick={() => handleAddField(field)} className="text-green-500 py-1 px-2 rounded">
            <PlusCircleIcon className="w-4 h-4" />
          </button>

          {values.length > 1 && (
            <button
              onClick={() => handleRemoveField(field, index)}
              className="text-red-500 py-1 px-2 rounded"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      ))}
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
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <InputField
                      label="Min"
                      type="number"
                      id="salaryMin"
                      name="salaryMin"
                      value={formik.values.salaryMin}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      error={formik.touched.salaryMin && formik.errors.salaryMin}
                    />
                  </div>
                  <span className="self-center">to</span>
                  <div className="flex-1">
                    <InputField
                      label="Max"
                      type="number"
                      id="salaryMax"
                      name="salaryMax"
                      value={formik.values.salaryMax}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      error={formik.touched.salaryMax && formik.errors.salaryMax}
                    />
                  </div>
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
                error={formik.touched.workLocationType && formik.errors.workLocationType}
              />

              {renderDynamicFields('qualifications', qualifications, 'Qualifications')}
              {renderDynamicFields('requirements', requirements, 'Requirements')}
              {renderDynamicFields('benefits', benefits, 'Benefits')}

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
                      type="submit"
                      mode="solid"
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
