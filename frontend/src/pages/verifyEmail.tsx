import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import AppLogo from "../components/AppLogo";
import { useLocation, useNavigate } from "react-router-dom";
import Message from "../components/PopUpmessage";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import ErrorMessage from "../components/error-message";

export default function EmailVeficationCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [timer, setTimer] = useState(59); // Countdown starts at 50 seconds
  const [canResend, setCanResend] = useState(false);
  const { error, isLoading, verifyEmail, resentVericationCode, email } =
    useAuthStore();
  const navigate = useNavigate();


  useEffect(() => {
    if (location.state?.showPopup) {
      setShowPopup(true);
    }
  }, [location.state]);

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (timer > 0) {
      countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setCanResend(true); // Allow resending the code when the timer reaches 0
    }

    return () => clearTimeout(countdown); // Cleanup the timer
  }, [timer]);

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      if (email) {
        await resentVericationCode(email);
      } else {
        console.error("Email is null or undefined.");
      }
      toast.success("Verification code resent successfully!");
    } catch (error) {
      console.log(error);
    }
    // Reset the timer and disable resending
    setTimer(50);
    setCanResend(false);
  };

  /**
   *
   * @param index number
   * @param value number
   * @returns null
   */
  const handleChange = (index: number, value: string) => {
    const newCode: string[] = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = (() => {
        for (let i = newCode.length - 1; i >= 0; i--) {
          if (newCode[i] !== "") return i;
        }
        return -1;
      })();
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex]?.focus();
      }
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        if (inputRefs.current[index + 1]) {
          inputRefs.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/chatboard");
      toast.success("Email verified successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showPopup && (
        <Message
          message=" Enter the 6-digit code sent to your email address!"
          setShowPopUp={setShowPopup}
        />
      )}
      <div className="min-h-screen flex flex-col items-center justify-center w-full bg-gradient-to-br from-white via-blue-50 to-blue-200">
        {/* Header with Title and Subtitle */}
        {/* <div className="absolute top-0 left-0 right-0 flex justify-between items-center max-w-5xl mx-auto p-3">
          <AppLogo />
        </div> */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 w-[98%] max-sm:w-[96%] max-h-[80vh] max-w-sm md:max-w-md rounded-2xl lg:max-w-md shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-500 text-transparent bg-clip-text">
            Verify Your Email
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Enter the 6-digit code sent to your email address.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={6}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl text-black font-semibold bg-gray-100 border-2 border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              ))}
            </div>
            {error && <ErrorMessage error={error} />}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </motion.button>

            <p className="text-center text-gray-500 text-sm">
              {canResend ? (
                <>
                  Didn&apos;t receive the code?{" "}
                  <span
                    onClick={handleResendCode}
                    className="text-blue-500 cursor-pointer hover:underline"
                  >
                    Resend Code
                  </span>
                </>
              ) : (
                <span className="text-gray-400">
                  Resend available in {timer} seconds
                </span>
              )}
            </p>
          </form>
        </motion.div>
      </div>
    </>
  );
}
