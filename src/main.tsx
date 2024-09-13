import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { Dashboard } from "./pages/Admin/index.ts";
import AdminLayout from "./pages/layouts/AdminLayout.tsx";
import EmployeeList from "./pages/Admin/EmployeeList.tsx";
import AddEmployee from "./pages/Admin/AddEmployee.tsx";
import JobPosting from "./pages/Admin/onboarding/JobPosting.tsx";

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
      {
        path: "/onboarding/job-postings",
        element: <JobPosting />,
        errorElement: <NotFoundPage />,
      },
      {
        path: "/employees/add",
        element: <AddEmployee />,
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

    <App />
  </React.StrictMode>
);
