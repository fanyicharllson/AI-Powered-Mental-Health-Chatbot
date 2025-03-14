import { motion } from "framer-motion";

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
        <div className="p-4 flex items-center border-b bg-gray-200">
          {isSidebarOpen && (
            <span className="text-lg font-bold flex-1">CalmBot</span>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            {isSidebarOpen ? "<" : ">"}
          </button>
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
