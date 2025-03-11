import { useForm } from "react-hook-form";
import { SignUpSchema } from "../Schema/signUpSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, EyeOff, Eye, User2 } from "lucide-react";
import { useState } from "react";
import Loadingspin from "../Loaders/loader1";
import AppLogo from "./AppLogo";
import { Link } from "react-router-dom";

type SignUpSchemaData = z.infer<typeof SignUpSchema>;

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignUpSchemaData>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpSchemaData) => {
    // Handle form submission
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center w-full bg-gradient-to-br from-white via-blue-50 to-blue-200">
      {/* Header with Title and Subtitle */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center max-w-5xl mx-auto p-3">
        <AppLogo />
      </div>

      {/* Form Container */}
      <div className="bg-white p-6 md:p-8 lg:p-10 w-[98%] max-sm:w-[96%] max-h-[80vh] overflow-y-auto max-w-sm md:max-w-md rounded-lg lg:max-w-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-800">
            Welcome to CalmBot!
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Create your account to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="label">
              Username:
            </label>
            <div className="relative">
              <User2 className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                {...register("username")}
                placeholder="username"
                className="input"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username?.message}
                </p>
              )}
            </div>
          </div>

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
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 px-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:cursor-not-allowed transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Loadingspin />
                <span>Signing Up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="space-y-2 pt-5">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white text-gray-400 px-2">
                or continue with
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
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-bold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 text-center text-sm text-gray-600 p-2">
        &copy; {new Date().getFullYear()} CalmBot. All rights reserved.
      </footer>
    </div>
  );
}

export default SignUp;
