import { useForm } from "react-hook-form";
import { SignInSchema } from "../Schema/signInScema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import AppLogo from "./AppLogo";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/authStore";
import AuthButton from "./authButton";
import ErrorMessage from "./error-message";
import toast from "react-hot-toast";

type SignUpSchemaData = z.infer<typeof SignInSchema>;

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { signin, error } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignUpSchemaData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpSchemaData) => {
    try {
      await signin(data.email, data.password);
      reset();
      navigate("/chatboard");
      toast.success("Successfully signed in!");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full bg-gradient-to-br from-white via-blue-50 to-blue-200">
      {/* Header with Title and Subtitle */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center max-w-5xl mx-auto p-3">
        <AppLogo />
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 md:p-8 lg:p-10 w-[98%] max-sm:w-[96%] max-h-[80vh] overflow-y-auto max-w-sm md:max-w-md rounded-lg lg:max-w-lg shadow-lg"
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            Welcome back buddy!
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Sign in to access your account now!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" id="email" className="label">
              Email:
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                {...register("email")}
                placeholder="email address"
                className="input"
                id="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" id="password" className="label">
              Password:
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input pr-10"
                id="password"
              />
              <button
                type="button"
                className="absolute right-3 top-3 h-5 w-5 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {/* Show error message to user from the backend */}
              {error && <ErrorMessage error={error} />}
            </div>
          </div>

          {/* Submit Button */}
          <AuthButton
            isSubmitting={isSubmitting}
            stateText="Signing in"
            text="Sign in"
          />
        </form>
        <div className="space-y-2 pt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white text-gray-400 px-2">
                or sign in with
              </span>
            </div>
          </div>

          <div className="text-center flex items-center justify-center pt-3">
            <button className="w-full flex gap-4 items-center border justify-center py-2 rounded-md hover:bg-blue-100 transition-colors duration-300">
              <img src="/google.svg" alt="Google Logo" className="w-6 h-6" />
              <p className="text-sm text-gray-700">Google</p>
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="pt-6">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="font-bold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-600 p-2">
        &copy; {new Date().getFullYear()} CalmBot. All rights reserved.
      </footer>
    </div>
  );
}

export default SignIn;
