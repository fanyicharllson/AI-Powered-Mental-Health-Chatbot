import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";

interface LeftSideBarProps {
  onClick?: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

function LeftSideBar({ isSidebarOpen, setIsSidebarOpen }: LeftSideBarProps) {
  return (
    <>
      {/* Collapsible Sidebar for Desktop */}
      <motion.div
        // Animate the width between full and collapsed (256px vs 64px)
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 64 }}
        transition={{ duration: 0.3 }}
        className="max-sm:hidden flex flex-col fixed inset-y-0 left-0 bg-blue-100 shadow-lg z-20 overflow-hidden"
      >
        {/* Top elements */}
        <div className="p-2 flex items-center justify-between border-b">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="">
            {isSidebarOpen ? (
              <div className="group relative cursor-pointer">
                <Tooltip title="Close Sidebar" arrow placement="right">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md">
                    <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-100 rounded-md transition duration-300"></div>
                    <img
                      src="/sidebar2.svg"
                      alt="sidebar"
                      className="w-6 h-6 relative z-10"
                    />
                  </div>
                </Tooltip>
              </div>
            ) : (
              <div className="group relative cursor-pointer">
                <Tooltip title="Open Sidebar" arrow placement="bottom-start">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md">
                    <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-100 rounded-md transition duration-300"></div>
                    <img
                      src="/sidebar2.svg"
                      alt="sidebar"
                      className="w-6 h-6 relative z-10"
                    />
                  </div>
                </Tooltip>
              </div>
            )}
          </button>
          <div>
            {isSidebarOpen && (
              <div className="group relative cursor-pointer">
                <Tooltip title="New Chat" arrow>
                  <div className="w-10 h-10 flex items-center justify-center rounded-md">
                    <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-100 rounded-md transition duration-300"></div>
                    <img
                      src="/pencil2.svg"
                      alt="pencil"
                      className="w-6 h-6 relative z-10"
                    />
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
        {/* Sidebar Content */}
        <div className="flex-1 p-4">
          <ul>
            <li className="flex items-center mb-4">
              <img src="/home-icon.png" alt="Home" className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-2">Home</span>}
            </li>
            <li className="flex items-center mb-4">
              <img src="/chat-icon.png" alt="Chat" className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-2">Chat</span>}
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </div>
      </motion.div>
    </>
  );
}

export default LeftSideBar;
