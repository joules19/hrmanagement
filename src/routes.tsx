// routes.tsx
import {
    createBrowserRouter,
    Navigate,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminLayout from "./pages/layouts/AdminLayout.tsx";
import EmployeeLayout from "./pages/layouts/EmployeeLayout.tsx";
import AddEmployee from "./pages/admin/employee/AddEmployee.tsx";
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
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard.tsx";
import EmployeeProfile from "./pages/Employee/EmployeeProfile.tsx";
import PayslipPage from "./pages/Employee/PayslipPage.tsx";
import LeaveRequestPage from "./pages/Employee/LeaveRequestPage.tsx";
import PerformanceReviewPage from "./pages/Employee/PerformanceReviewPage.tsx";
import DocumentManagementPage from "./pages/Employee/DocumentManagementPage.tsx";
import Dashboard from "./pages/Admin/Dashboard.tsx";
import Interviews from "./pages/Admin/onboarding/Interviews.tsx";
import AddJobHistory from "./pages/admin/employee/AddJobHistory.tsx";
import EmployeeDocumentManager from "./pages/admin/employee/EmployeeDocumentManager.tsx";
import WebsiteLayout from "./pages/layouts/WebsiteLayout.tsx";
import JobListings from "./pages/website/JobListings.tsx";
import JobDetails from "./pages/website/JobDetails.tsx";
import AuthMiddleware from "./hooks/AuthMiddleware.tsx";
import Setup from "./pages/Admin/Setup.tsx";
import { getSession } from "./utils/sessionManager.ts";
import EmployeeList from "./pages/Admin/employee/EmployeeList.tsx";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const session = getSession();
    return session ? children : <Navigate to="/auth/login" />;
};

export const router = createBrowserRouter([
    //Website Section
    {
        element: <WebsiteLayout />,
        children: [
            {
                path: "/auth/login",
                element: <Login />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/",
                element: <JobListings />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/job-listing/:id",
                element: <JobDetails />,
                errorElement: <NotFoundPage />,
            },
        ],
    },
    //Auth Section

    {
        element: <AdminLayout />,
        children: [
            {
                path: "/dashboard",
                element: (

                    <PrivateRoute><AuthMiddleware>
                        <Dashboard />
                    </AuthMiddleware>
                    </PrivateRoute>

                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: "/setup",
                element: (
                    <PrivateRoute>
                        <Setup />
                    </PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },

            // Onboarding Routes
            {
                path: "/onboarding/job-postings",
                element: <PrivateRoute><AuthMiddleware><JobPosting /></AuthMiddleware></PrivateRoute>,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/onboarding/applications",
                element: <PrivateRoute><AuthMiddleware><Applications /></AuthMiddleware></PrivateRoute>,
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
                path: "/onboarding/interviews",
                element: <PrivateRoute><AuthMiddleware><Interviews /></AuthMiddleware></PrivateRoute>,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/onboarding/onboarding-process",
                element: <OnboardingProcess />,
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
            {
                path: "/employees/documents",
                element: <EmployeeDocumentManager />,
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
        element: <EmployeeLayout />,
        children: [
            {
                path: "/employee-dashboard",
                element: (
                    <PrivateRoute><AuthMiddleware>
                        <EmployeeDashboard />
                    </AuthMiddleware></PrivateRoute>
                ),
                errorElement: <NotFoundPage />,
            },
            {
                path: "/employee-profile",
                element: <EmployeeProfile />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/employee-payslips",
                element: <PayslipPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/employee-leave-requests",
                element: <LeaveRequestPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/employee-performance",
                element: <PerformanceReviewPage />,
                errorElement: <NotFoundPage />,
            },
            {
                path: "/employee-document-management",
                element: <DocumentManagementPage />,
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

