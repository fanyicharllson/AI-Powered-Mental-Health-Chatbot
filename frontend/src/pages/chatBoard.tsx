import { useState } from "react";
import LeftSideBar from "../components/leftSideBar";
import RightSideBar from "../components/rightSideBar";
// import { useAuthStore } from "../../store/authStore";

const ChatDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore()

  // useEffect(() => {
  //   checkAuth()
  // }, [checkAuth])

  // console.log("isAuthenticated", isAuthenticated)
  // console.log("user", user)


  return (
    <>
      <div className="sm:flex max-sm:flex h-screen">
        {/* LeftSideBar */}
        <LeftSideBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* RightSideBar */}
        <RightSideBar isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};

export default ChatDashboard;
