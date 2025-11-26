import React, { useState } from "react";
import Headers from "../heaser and footer bar/header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

const Home = () => {
  const [role, setRole] = useState("Admin");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Username validation
  const validateUsername = (value) => {
    setUsername(value);
    if (value.length < 3) setUsernameMsg("❌ Username too short");
    else if (value.length > 10) setUsernameMsg("❌ Username too long");
    else if (!/^[a-zA-Z0-9_]+$/.test(value))
      setUsernameMsg("❌ Only letters, numbers, and underscores allowed");
    else setUsernameMsg("✅ Strong Username");
  };

  // ✅ Password validation
  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) setPasswordMsg("❌ Too short");
    else if (
      !/[A-Z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&*]/.test(value)
    )
      setPasswordMsg("❌ Include uppercase, number, and symbol");
    else setPasswordMsg("✅ Strong Password");
  };

  // ✅ Password checklist
  const passwordValidations = [
    { label: "A minimum of 8 characters", valid: password.length >= 8 },
    { label: "At least 1 number", valid: /\d/.test(password) },
    {
      label: "At least 1 special character",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    { label: "At least one uppercase letter", valid: /[A-Z]/.test(password) },
  ];

  // ✅ Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (usernameMsg.includes("✅") && passwordMsg.includes("✅")) {
      if (role === "Admin") {
        if (username === "Admin" && password === "Admin@123") {
          toast.success("Admin logged in successfully!", { autoClose: 1500 });
          setTimeout(() => navigate("/admin/home"), 800);
        } else {
          toast.error("Invalid Admin username or password!", { autoClose: 1500 });
        }
      } else if (role === "Teacher") {
        navigate("/teachers/home");
      } else if (role === "Student") {
        navigate("/student/home");
      }
    } else {
      toast.error("Please fix the errors before logging in", { autoClose: 1500 });
    }
  };

  // ✅ Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      className="scroll-smooth min-h-screen bg-stone-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Headers />

      {/* ✅ Login Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex mt-16 items-center justify-center px-4 py-10 bg-stone-100"
      >
        <div className="flex flex-col md:flex-row max-w-6xl w-full rounded-lg shadow-lg overflow-hidden bg-white">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden md:block md:w-1/2"
          >
            <img
              src="https://i.pinimg.com/736x/c9/4b/ac/c94baca4fb37c608199448a5ceac439d.jpg"
              alt="Student studying"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[url('https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg')] bg-cover bg-center">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center underline"
            >
              Login to Your Account
            </motion.h2>

            <motion.form
              onSubmit={handleLogin}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="space-y-3"
            >
              {/* Role Selection */}
              <div className="flex justify-center flex-wrap gap-4">
                {["Admin", "Teacher", "Student"].map((r) => (
                  <motion.label
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={r}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-700">{r}</span>
                  </motion.label>
                ))}
              </div>

              {/* Username */}
              <div>
                <label className="block text-gray-800 font-semibold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={username}
                  onChange={(e) => validateUsername(e.target.value)}
                  required
                />
                {username && (
                  <p
                    className={`text-sm mt-1 ${
                      usernameMsg.includes("✅")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {usernameMsg}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-800 font-semibold mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  maxLength={12}
                  minLength={8}
                  onChange={(e) => validatePassword(e.target.value)}
                  required
                />
                {password && (
                  <p
                    className={`text-sm mt-1 ${
                      passwordMsg.includes("✅")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {passwordMsg}
                  </p>
                )}
              </div>

              {/* Password Checklist */}
              <div className="text-xs text-gray-800 space-y-1 pl-1">
                {passwordValidations.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <span
                      className={`mr-2 ${
                        item.valid ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.valid ? "✓" : "✗"}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-md shadow-lg"
              >
                Login →
              </motion.button>
            </motion.form>

            {/* Signup Options */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              className="text-center mt-4 space-y-2"
            >
              <p className="text-gray-700">Don't have an account?</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline font-semibold"
              >
                Signup Teacher and Student
              </motion.button>
            </motion.div>

            <ToastContainer />
          </div>
        </div>
      </motion.section>

      {/* ✅ Courses Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        id="courses"
        className="max-w-7xl mx-auto px-4 py-12 bg-[url('https://t4.ftcdn.net/jpg/05/88/11/91/360_F_588119127_ai0xZYPNgiPvEebGlR19I0O90qF2SILQ.jpg')] bg-cover bg-center"
      >
        <h2 className="text-3xl font-bold text-center underline text-stone-900 mb-8">
          Explore Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Web Development",
              desc: "Learn HTML, CSS, React.js, and more to build responsive web apps.",
            },
            {
              title: "Data Science",
              desc: "Master data analysis, visualization, and machine learning.",
            },
            {
              title: "UI/UX Design",
              desc: "Design engaging interfaces and improve user experience.",
            },
            {
              title: "Full Stack Development",
              desc: "Build complete web apps with frontend & backend.",
            },
            {
              title: "Machine Learning",
              desc: "Explore algorithms & intelligent systems.",
            },
            {
              title: "Cloud Computing",
              desc: "Design and manage scalable cloud systems.",
            },
          ].map((course, i) => (
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(0,0,0,0.2)" }}
              key={i}
              className="bg-white p-6 rounded-lg shadow-md transition"
            >
              <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.desc}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="text-blue-600 hover:underline font-semibold"
              >
                View Course
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ✅ Community Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        id="community"
        className="max-w-7xl mx-auto px-4 py-12 bg-[url('https://t3.ftcdn.net/jpg/05/88/24/10/360_F_588241010_cdQJ2QTsyDtt36jZsAFR45aAXICnPAzR.jpg')] bg-cover bg-center"
      >
        <h2 className="text-3xl font-bold text-center mb-8 underline">
          Collaborate & Learn
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <img
              src="https://lsme.ac.uk/wp-content/uploads/2024/04/blog-collaborative-learning-jpg.webp"
              alt="Collaborative Learning"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Right Content */}
          <div className="md:w-1/2 grid grid-cols-1 gap-6">
            {[
              {
                title: "Discussion Forums",
                desc: "Engage with peers, ask questions, and share knowledge.",
              },
              {
                title: "Live Sessions",
                desc: "Join real-time webinars and group activities.",
              },
            ].map((item, i) => (
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                key={i}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Join Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ✅ Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          © 2025 SKILL SHARP 365 INNOVATIONS. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
};

export default Home;
