"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function WelcomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-16 md:py-0">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-blue-200 opacity-30 blur-3xl z-0"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/4 w-48 sm:w-80 h-48 sm:h-80 rounded-full bg-blue-300 opacity-20 blur-3xl z-0"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-700 opacity-30 z-0"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 md:p-5 max-w-5xl mx-auto z-10">
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
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
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:flex gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button className="py-2 px-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-md">
            Sign Up
          </button>
          <button className="py-2 px-6 bg-white text-blue-600 rounded-md font-medium hover:bg-blue-50 transition border border-blue-300 shadow-md">
            Login
          </button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <X size={32} className="text-blue-600" />
          ) : (
            <Menu size={32} className="text-blue-600" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="absolute top-16 right-4 left-4 md:left-auto bg-white text-blue-600 rounded-md shadow-lg p-4 z-20 md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <button className="py-2 px-6 w-full text-left hover:bg-blue-100 bg-blue-50 rounded-md mb-2">
            Sign Up
          </button>
          <button className="py-2 px-6 w-full text-left hover:bg-blue-100 bg-blue-50 rounded-md">
            Login
          </button>
        </motion.div>
      )}

      {/* Welcome Message */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center w-full max-w-2xl relative z-10 px-4 md:px-6 mt-16 md:mt-0"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 text-blue-600 drop-shadow-sm"
        >
          Welcome to CalmBot
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm sm:text-base md:text-lg mb-5 md:mb-8 max-w-lg mx-auto text-blue-700/80"
        >
          Your virtual mental health assistant, here to provide support,
          resources, and guidance for a healthier mind.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            className="py-3 px-8 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>

          <motion.button
            className="py-3 px-8 border border-blue-400 text-blue-600 font-semibold rounded-md hover:bg-blue-50 transition shadow-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Get CalmBot App
          </motion.button>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-8 md:mt-12 text-blue-600"
        >
          <div className="bg-white/70 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
              24/7 Support
            </h3>
            <p className="text-xs md:text-sm text-blue-600/80">
              Always available when you need someone to talk to
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
              Personalized Care
            </h3>
            <p className="text-xs md:text-sm text-blue-600/80">
              Tailored guidance based on your unique needs
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
              Professional Resources
            </h3>
            <p className="text-xs md:text-sm text-blue-600/80">
              Connect with licensed therapists when needed
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
