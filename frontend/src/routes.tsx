import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/not-found";
import SignUpPage from "./pages/sign-up";
import SignInPage from "./pages/sign-in";
import ChatDashboard from "./pages/chatBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/chatboard",
    element: <ChatDashboard/>
  }
]);
