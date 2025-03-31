import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/not-found";
import SignUpPage from "./pages/sign-up";
import SignInPage from "./pages/sign-in";
import ChatDashboard from "./pages/chatBoard";
import EmailVeficationCode from "./pages/verifyEmail";
import {
  ProtectChatboardRoute,
  RedirectAuthenticatedUser,
} from "../auth/redirect.auth.user";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/sign-up",
    element: (
      <RedirectAuthenticatedUser>
        <SignUpPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <RedirectAuthenticatedUser>
        <EmailVeficationCode />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <RedirectAuthenticatedUser>
        <SignInPage />
      </RedirectAuthenticatedUser>
    ),
  },
  {
    path: "/chatboard",
    element: (
      <ProtectChatboardRoute>
        <ChatDashboard />
      </ProtectChatboardRoute>
    ),
  },
 
]);
