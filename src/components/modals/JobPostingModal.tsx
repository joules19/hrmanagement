import React, { useState } from "react";
import * as Yup from "yup";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { Button } from "../ui/Button";
import { JobPosting } from "../../types/onboarding";
import TextAreaField from "../ui/TextAreaField";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

interface JobPostingModalProps {
  show: boolean;
  handleClose: () => void;
  currentPosting: JobPosting | null;
  onSave: (posting: JobPosting) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Job Title is required"),
  department: Yup.string().required("Department is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
});

const JobPostingModal: React.FC<JobPostingModalProps> = ({
  show,
  handleClose,
  currentPosting,
  onSave,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState<JobPosting>({
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
  });

  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAddField = (
    field: "qualifications" | "requirements" | "benefits"
  ) => {
    setFormValues({
      ...formValues,
      [field]: [...formValues[field], ""],
    });
  };

  const handleRemoveField = (
    field: "qualifications" | "requirements" | "benefits",
    index: number
  ) => {
    const updatedValues = formValues[field].filter((_, i) => i !== index);
    setFormValues({
      ...formValues,
      [field]: updatedValues,
    });
  };

  const handleDynamicFieldChange = (
    field: "qualifications" | "requirements" | "benefits",
    index: number,
    value: string
  ) => {
    const updatedValues = [...formValues[field]];
    updatedValues[index] = value;
    setFormValues({
      ...formValues,
      [field]: updatedValues,
    });
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const formErrors: any = {};
        error.inner.forEach((err) => {
          if (err.path) formErrors[err.path] = err.message;
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    setIsLoading(true);
    console.log(formValues);

    onSave({
      ...formValues,
      id: currentPosting?.id || Date.now(),
    });
    setIsLoading(false);
    handleClose();
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
            name={`${field}-${index}`}
            value={value}
            onChange={(e) =>
              handleDynamicFieldChange(field, index, e.target.value)
            }
            className="flex-grow mr-2 p-2 border-[.8px] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-1"
          />
          {errors[`${field}[${index}]`] && (
            <div className="text-red-500 text-sm">
              {errors[`${field}[${index}]`]}
            </div>
          )}
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
    </div>
  );

  return (
    <>
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {currentPosting ? "Edit Job Posting" : "Add New Job Posting"}
            </h3>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Job Title"
                id="title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                required
                error={errors.title}
              />
              <InputField
                label="Department"
                id="department"
                name="department"
                value={formValues.department}
                onChange={handleInputChange}
                required
                error={errors.department}
              />
              <InputField
                label="Location"
                id="location"
                name="location"
                value={formValues.location}
                onChange={handleInputChange}
                required
                error={errors.location}
              />
              <TextAreaField
                label="Description"
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                rows={4}
                required
                error={errors.description}
              />

              {renderDynamicFields(
                "qualifications",
                formValues.qualifications,
                "Qualifications"
              )}
              {renderDynamicFields(
                "requirements",
                formValues.requirements,
                "Requirements"
              )}
              {renderDynamicFields("benefits", formValues.benefits, "Benefits")}

              <SelectField
                label="Status"
                id="status"
                name="status"
                value={formValues.status}
                options={["Open", "Closed", "On Hold"]}
                onChange={handleInputChange}
                required
                error={errors.status}
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
