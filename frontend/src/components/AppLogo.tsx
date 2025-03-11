import { useNavigate } from "react-router-dom";
function AppLogo() {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center cursor-pointer z-20"
      onClick={() => navigate("/")}
    >
      <img
        src="/logo2.svg"
        alt="CalmBot logo"
        className="w-11 h-11"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.svg?height=48&width=48";
          e.currentTarget.onerror = null;
        }}
      />
      <p className="text-xl font-semibold text-blue-600">CalmBot</p>
    </div>
  );
}

export default AppLogo;
