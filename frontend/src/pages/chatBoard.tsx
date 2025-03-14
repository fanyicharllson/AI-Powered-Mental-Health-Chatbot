import { useState } from "react";
import LeftSideBar from "../components/leftSideBar";
import RightSideBar from "../components/rightSideBar";

const ChatDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
