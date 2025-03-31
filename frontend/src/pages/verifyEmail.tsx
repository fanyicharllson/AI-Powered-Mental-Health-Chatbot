import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import AppLogo from "../components/AppLogo";
import { useLocation } from "react-router-dom";
import Message from "../components/PopUpmessage";

export default function EmailVeficationCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (location.state?.showPopup) {
      setShowPopup(true);
    }
  }, [location.state]);

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
    console.log(`Verifying code: ${verificationCode}`);
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit({
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  return (
    <>
      {showPopup && (
        <Message
          message="Check your email, a verification code has sent for you to verify your account!"
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
            {/* {error && <p className="text-red-500 font-semibold mt-2">{error}</p>} */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              // disabled={isLoading || code.some((digit) => !digit)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
            >
              Verify Email
              {/* {isLoading ? "Verifying..." : "Verify Email"} */}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
