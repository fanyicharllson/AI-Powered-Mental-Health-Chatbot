import ChatArea from "./chatArea";
import NavBar from "./navbar";

interface RightSideBarProps {
  isSidebarOpen: boolean;
}

export default function RightSideBar({ isSidebarOpen }: RightSideBarProps) {
  return (
    <div
      className={`flex-1 flex flex-col bg-gray-100 w-[90%] overflow-hidden  transition-all duration-300 ${
        isSidebarOpen ? "sm:ml-64" : "sm:ml-16"
      }`}
    >
      <NavBar />
      <ChatArea />
    </div>
  );
}
