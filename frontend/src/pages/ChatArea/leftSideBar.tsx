interface LeftSideBarProps {
  onClick: () => void;
}

function LeftSideBar({ onClick }: LeftSideBarProps) {
  return (
    <>
      <div
        className={`h-screen bg-blue-100 w-[300px] overflow-y-auto fixed left-0 top-0 sm:block ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b bg-gray-200">
          <span className="text-lg font-bold">Sidebar</span>
          <button
            onClick={onClick}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

export default LeftSideBar;
