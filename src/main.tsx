import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Dashboard } from "./pages/admin/index.ts";
import AdminLayout from "./pages/layouts/AdminLayout.tsx";
import EmployeeList from "./pages/admin/EmployeeList.tsx";
import AddEmployee from "./pages/admin/AddEmployee.tsx";
import JobPosting from "./pages/admin/onboarding/JobPosting.tsx";
import Applications from "./pages/admin/onboarding/Applications.tsx";
import OnboardingProcess from "./pages/admin/onboarding/OnboardingProcess.tsx";
import ResumeParsing from "./pages/admin/onboarding/ResumeParsing.tsx";
import OnboardingWorkflow from "./pages/admin/onboarding/OnboardingWorkflow.tsx";
import InterviewScheduling from "./pages/admin/onboarding/InterviewScheduling.tsx";
import TimeTracking from "./pages/admin/attendance/TimeTracking.tsx";
import LeaveManagement from "./pages/admin/attendance/LeaveManagement.tsx";
import OvertimeManagement from "./pages/admin/attendance/OvertimeManagement.tsx";
import SalaryCalculations from "./pages/admin/payroll/SalaryCalculations.tsx";
import PayrollCompliance from "./pages/admin/payroll/PayrollCompliance.tsx";
import Login from "./pages/auth/Login.tsx";
import AuthLayout from "./pages/layouts/AuthLayout.tsx";
import store from "./store/index.ts";
import { ReactQueryProvider } from "./providers/ReactQueryProvider.tsx";
import { Provider } from "react-redux";
import { getSession, clearSession } from "./utils/sessionManager.ts";
import AddJobHistory from "./pages/Admin/AddJobHistory.tsx";
import EmployeeDocumentManager from "./pages/Admin/EmployeeDocumentManager.tsx";
// import AddDocument from "./pages/Admin/AddDocument.tsx";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const session = getSession();
  // const token = localStorage.getItem("userSession");
  return session ? children : <Navigate to="/auth/login" />;
};

const router = createBrowserRouter([
  //Auth Section
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
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
      {
        path: "/employees/job-history",
        element: <AddJobHistory />,
        errorElement: <NotFoundPage />,
      },
      // {
      //   path: "/employees/documents",
      //   element: <AddDocument />,
      //   errorElement: <NotFoundPage />,
      // },
      {
        path: "/employees/documents",
        element: <EmployeeDocumentManager />,
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
    <Provider store={store}>
      <ReactQueryProvider>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" expand={false} />
        <App />
      </ReactQueryProvider>
    </Provider>
  </React.StrictMode>
);
