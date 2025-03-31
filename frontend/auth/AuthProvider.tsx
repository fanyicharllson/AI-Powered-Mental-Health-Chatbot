import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import AuthSpinner from "../src/components/loadingAuthSpinner";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const { isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);
 

  if (isCheckingAuth) {
    return <AuthSpinner />;
  }

  return children;
};
