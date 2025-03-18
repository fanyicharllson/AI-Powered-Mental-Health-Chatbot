import { Tooltip } from "@mui/material";
import { Sidebar } from "lucide-react";
import { useState } from "react";
import MobileSideBar from "./MobileSideBar";

function NavBar() {
  const [isMobileSideBarOpen, setIsMobileSideBarOpen] = useState(false);

  return (
    <>
      {/* Open Mobile sidebar */}
      <MobileSideBar
        setIsMobileSideBarOpen={setIsMobileSideBarOpen}
        isMobileSideBarOpen={isMobileSideBarOpen}
      />

      {/* Navbar content */}
      <div className="bg-gray-200 shadow-md p-2 border-b border-b-blue-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo and sidbar icon */}
            <div className="group relative cursor-pointer sm:hidden">
              <Tooltip title="Open Sidebar" arrow placement="bottom">
                <div className="w-10 h-10 flex items-center justify-center rounded-md">
                  <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-100 rounded-md transition duration-300"></div>
                  <Sidebar
                    className="w-6 h-6 relative z-10 text-blue-600"
                    onClick={() => setIsMobileSideBarOpen(true)}
                  />
                  {/* <img
                  src="/sidebar2.svg"
                  alt="sidebar"
                  className="w-6 h-6 relative z-10"
                /> */}
                </div>
              </Tooltip>
            </div>
            <div className="logo">CalmBot</div>
          </div>
          {/* New chat btn and user profile */}
          <div className="flex items-center gap-2">
            <div className="text-sm py-2 px-4 border border-blue-400 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition shadow-sm z-20 cursor-pointer">
              New Chat
            </div>
            <div className="border text-sm bg-blue-500 text-white rounded-full p-3 h-10 w-10 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-blue-600">
              FC
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
