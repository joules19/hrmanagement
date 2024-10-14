import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getSession } from '../utils/sessionManager';
import { ApplicationRoles } from '../enums/ApplicationRoles';

// Combined middleware
const AuthMiddleware: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const user = getSession();

  // If the user is not authenticated, redirect to the login page
  // if (!user) {
  //   return <Navigate to="/auth/login" replace />;
  // }
  // If the user hasn't completed the initial setup, redirect to the setup page
  if (!user.initialSetup && user.role === ApplicationRoles.Administrator) {
    return <Navigate to="/setup" replace />;
  }

  // if (user.role === ApplicationRoles.Employee) {
  //   return <Navigate to="/employee/dashboard" />;
  // }

  // If the user is authenticated and the initial setup is done, allow access
  return children;
};

export default AuthMiddleware;
