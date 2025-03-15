function NavBar() {
  return (
    <div className="bg-gray-200 shadow-md p-2 border-b border-b-blue-300">
      <div className="flex justify-between items-center">
        <div className="logo">CalmBot</div>
        <div className="text-sm bg-blue-500 py-2 px-4 rounded-full text-white cursor-pointer hover:bg-blue-600 transition-all duration-300">New Chat</div>
      </div>
    </div>
  );
}

export default NavBar;
