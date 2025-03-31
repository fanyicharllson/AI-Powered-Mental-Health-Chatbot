import { motion } from "framer-motion";

const AuthSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-200 z-0 flex items-center justify-center relative overflow-hidden">
      {/* Simple Loading Spinner */}
      <div>
        <motion.div
          className="w-16 h-16 border-4 border-t-4 border-t-blue-200 border-blue-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-center text-blue-500 font-semibold mt-4 animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default AuthSpinner;
