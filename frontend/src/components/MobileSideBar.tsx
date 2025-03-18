import { Tooltip } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

interface MobileSideProps {
  setIsMobileSideBarOpen: (isOpen: boolean) => void;
  isMobileSideBarOpen: boolean;
}

function MobileSideBar({
  setIsMobileSideBarOpen,
  isMobileSideBarOpen,
}: MobileSideProps) {
  return (
    <>
      <AnimatePresence>
        {isMobileSideBarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsMobileSideBarOpen(false)}
          />
        )}

        {/* Mobile SideBar */}
        {isMobileSideBarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-64 h-screen bg-white shadow-lg z-50 p-4"
          >
            {/* Sidebar top btns */}
            <Tooltip title="New Chat" arrow placement="bottom">
              <button
                className="absolute top-4 right-4 text-gray-600"
                onClick={() => setIsMobileSideBarOpen(false)}
              >
                <img src="/pencil2.svg" alt="new chat" className="w-6 h-6" />
              </button>
            </Tooltip>
            <Tooltip title="Close Sidebar" arrow placement="bottom">
              <button
                className="absolute top-4 left-4 text-gray-600"
                onClick={() => setIsMobileSideBarOpen(false)}
              >
                <img src="/sidebar2.svg" alt="sidebar" className="w-6 h-6" />
              </button>
            </Tooltip>
            {/* Sidbar contents goes here */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileSideBar;
