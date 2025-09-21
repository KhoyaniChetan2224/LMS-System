import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [activeForm, setActiveForm] = useState("teacher"); // default: teacher
  const navigate = useNavigate();

  // Animation Variants
  const formVariants = {
    hiddenLeft: { x: -120, opacity: 0 },
    hiddenRight: { x: 120, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exitLeft: { x: -120, opacity: 0 },
    exitRight: { x: 120, opacity: 0 },
  };

    // Validation Functions
    const validateName = (name) => {
      const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(name)) {
            alert("Name should contain only letters and spaces.");
            return false;
        }
        return true;
    }
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }
        return true;
    }

  // Submit Handler
  const handleSubmit = (e, role) => {
    e.preventDefault();
    if (role === "student") {
      navigate("/student/home"); // redirect student
    } else if (role === "teacher") {
      navigate("/teachers/home"); // redirect teacher
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen font-sans relative overflow-hidden">
      {/* Student Signup (Left Side) */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-green-200 to-green-400 p-6 md:p-10 transition-all duration-500 
        ${activeForm === "student" ? "opacity-100" : "opacity-40"}`}
      >
        <AnimatePresence>
          {activeForm === "student" && (
            <motion.div
              key="studentForm"
              variants={formVariants}
              initial="hiddenLeft"
              animate="visible"
              exit="exitLeft"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-6 underline">
                Student Signup
              </h2>

              <form
                className="space-y-4"
                onSubmit={(e) => handleSubmit(e, "student")}
              >
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={(e) => validateName(e.target.value)}
                    maxLength={50}
                    minLength={3}
                    readOnly={false}
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-green-500"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    onChange={(e) => validateEmail(e.target.value)}
                    maxLength={50}
                    minLength={5}
                    readOnly={false}
                    placeholder="student@example.com"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-green-500"
                  />
                </div>
                {/* Mobile */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    minLength={10}
                    readOnly={false}
                    placeholder="1234567890"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-green-500"
                  />
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-300"
                >
                  Signup →
                </button>
              </form>
              {/* Signup Options */}
            <div className="text-center mt-4 space-y-2">
              <p className="text-gray-700">Don't have an account?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="text-blue-600 hover:underline"
                >
                  ← Login
                </button>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Teacher Signup (Right Side) */}
      <div
        className={`w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 p-6 md:p-10 transition-all duration-500 
        ${activeForm === "teacher" ? "opacity-100" : "opacity-40"}`}
      >
        <AnimatePresence>
          {activeForm === "teacher" && (
            <motion.div
              key="teacherForm"
              variants={formVariants}
              initial="hiddenRight"
              animate="visible"
              exit="exitRight"
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-700 mb-6 underline">
                Teacher Signup
              </h2>

              <form
                className="space-y-4"
                onSubmit={(e) => handleSubmit(e, "teacher")}
              >
                {/* Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    onChange={(e) => validateName(e.target.value)}
                    maxLength={50}
                    minLength={3}
                    readOnly={false}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    onChange={(e) => validateEmail(e.target.value)}
                    maxLength={50}
                    minLength={5}
                    readOnly={false}
                    placeholder="teacher@example.com"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Mobile */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    minLength={10}
                    readOnly={false}
                    placeholder="1234567890"
                    className="w-full px-4 py-2 rounded-md border focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
                >
                  Signup →
                </button>
              </form>
              <div className="text-center mt-4 space-y-2">
              <p className="text-gray-700">Don't have an account?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/")}
                  className="text-blue-600 hover:underline"
                >
                  ← Login
                </button>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Switch Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 sm:gap-6">
        <button
          onClick={() => setActiveForm("student")}
          className={`px-3 sm:px-5 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
            activeForm === "student"
              ? "bg-green-600 text-white"
              : "bg-white text-green-600 border border-green-600"
          }`}
        >
          Student Form
        </button>
        <button
          onClick={() => setActiveForm("teacher")}
          className={`px-3 sm:px-5 py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
            activeForm === "teacher"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600 border border-blue-600"
          }`}
        >
          Teacher Form
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
