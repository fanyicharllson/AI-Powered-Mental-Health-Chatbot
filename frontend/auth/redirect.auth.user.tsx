//redirect authenticated users to chat dashboard
import React from "react";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";
import AuthSpinner from "../src/components/loadingAuthSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const RedirectAuthenticatedUser: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  // console.log("isAuthenticated", isAuthenticated);
  // console.log("user", user);
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/chatboard" replace />;
  }
  return <>{children}</>;
};

export const ProtectChatboardRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, isCheckingAuth, user } = useAuthStore();

  if (isCheckingAuth) {
    return <AuthSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};
