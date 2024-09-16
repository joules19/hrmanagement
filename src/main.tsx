import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Dashboard } from "./pages/Admin/index.ts";
import AdminLayout from "./pages/layouts/AdminLayout.tsx";
import EmployeeList from "./pages/Admin/EmployeeList.tsx";
import AddEmployee from "./pages/Admin/AddEmployee.tsx";
import JobPosting from "./pages/Admin/onboarding/JobPosting.tsx";
import Applications from "./pages/Admin/onboarding/Applications.tsx";
import OnboardingProcess from "./pages/Admin/onboarding/OnboardingProcess.tsx";
import ResumeParsing from "./pages/Admin/onboarding/ResumeParsing.tsx";
import OnboardingWorkflow from "./pages/Admin/onboarding/OnboardingWorkflow.tsx";
import InterviewScheduling from "./pages/Admin/onboarding/InterviewScheduling.tsx";
import TimeTracking from "./pages/Admin/attendance/TimeTracking.tsx";
import LeaveManagement from "./pages/Admin/attendance/LeaveManagement.tsx";
import OvertimeManagement from "./pages/Admin/attendance/OvertimeManagement.tsx";
import SalaryCalculations from "./pages/Admin/payroll/SalaryCalculations.tsx";
import PayrollCompliance from "./pages/Admin/payroll/PayrollCompliance.tsx";

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employees/all",
        element: <EmployeeList />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employees/add",
        element: <AddEmployee />,
        errorElement: <NotFoundPage />,
      },

      // Onboarding Routes
      {
        path: "/onboarding/job-postings",
        element: <JobPosting />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/applications",
        element: <Applications />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/applications",
        element: <Applications />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/resume-parsing",
        element: <ResumeParsing />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/onboarding-workflows",
        element: <OnboardingWorkflow />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/interview-scheduling",
        element: <InterviewScheduling />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/onboarding/onboarding-process",
        element: <OnboardingProcess />,
        errorElement: <NotFoundPage />,
      },

      // Attendance Routes
      {
        path: "/attendance/time-tracking",
        element: <TimeTracking />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/attendance/attendance-records",
        element: <TimeTracking />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/attendance/leave-management",
        element: <LeaveManagement />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/attendance/overtime-management",
        element: <OvertimeManagement />,
        errorElement: <NotFoundPage />,
      },

      // Payroll Routes
      {
        path: "/payroll/salary-calculation",
        element: <SalaryCalculations />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/payroll/payroll-compliance",
        element: <PayrollCompliance />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors position="top-right" expand={false} />
    <App />
  </React.StrictMode>
);
