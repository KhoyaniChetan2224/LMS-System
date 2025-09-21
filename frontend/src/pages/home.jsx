import React, { useState } from "react";
import Headers from "../heaser and footer bar/header";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
    if (value.length < 3) {
      setUsernameMsg("❌ Username too short");
    } else if (value.length > 10) {
      setUsernameMsg("❌ Username too long");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setUsernameMsg("❌ Only letters, numbers, and underscores allowed");
    } else {
      setUsernameMsg("✅ Strong Username");
    }
  };

  // ✅ Password validation
  const validatePassword = (value) => {
    setPassword(value);
    if (value.length < 6) {
      setPasswordMsg("❌ Too short");
    } else if (
      !/[A-Z]/.test(value) ||
      !/[0-9]/.test(value) ||
      !/[!@#$%^&*]/.test(value)
    ) {
      setPasswordMsg("❌ Include uppercase, number, and symbol");
    } else {
      setPasswordMsg("✅ Strong Password");
    }
  };

  // ✅ Password checklist
  const passwordValidations = [
    { label: "A minimum of 8 characters", valid: password.length >= 8 },
    { label: "At least 1 number", valid: /\d/.test(password) },
    { label: "At least 1 special character", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: "At least one uppercase letter", valid: /[A-Z]/.test(password) },
  ];

  // ✅ Handle login
 // ✅ Handle login
// ✅ Handle login
const handleLogin = (e) => {
  e.preventDefault();

  if (usernameMsg.includes("✅") && passwordMsg.includes("✅")) {
    if (role === "Admin") {
      if (username === "Admin" && password === "Admin@123") {
        toast.success("Admin logged in successfully!", {
          position: "top-right",
          autoClose: 1500, // toast shows briefly
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
        });

        // ✅ Redirect quickly while toast is still visible
        setTimeout(() => {
          navigate("/admin/home");
        }, 800);
      } else {
        toast.error("Invalid Admin username or password!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: true,
        });
      }
    }

    // ✅ Other roles
    else if (role === "Teacher") {
      navigate("/teachers/home");
    } else if (role === "Student") {
      navigate("/student/home");
    }
  } else {
    toast.error("Please fix the errors before logging in", {
      position: "top-right",
      autoClose: 1500,
    });
  }
};



  return (
    <div className="scroll-smooth min-h-screen">
      <Headers />

      {/* ✅ Login Section */}
      <section className="flex mt-16 items-center justify-center px-4 py-10 bg-stone-100">
        <div className="flex flex-col md:flex-row max-w-6xl w-full rounded-lg shadow-lg overflow-hidden bg-white">
          {/* Left Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://i.pinimg.com/736x/c9/4b/ac/c94baca4fb37c608199448a5ceac439d.jpg"
              alt="Student studying"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 bg-[url('https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg')] bg-cover bg-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center underline">
              Login to Your Account
            </h2>

            <form onSubmit={handleLogin} className="space-y-3">
              {/* Role Selection */}
              <div className="flex justify-center flex-wrap gap-4">
                {["Admin", "Teacher", "Student"].map((r) => (
                  <label key={r} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={(e) => setRole(e.target.value)}
                      className="form-radio text-blue-600"
                    />
                    <span className="text-gray-700">{r}</span>
                  </label>
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
                  placeholder="admin"
                  value={username}
                  onChange={(e) => validateUsername(e.target.value)}
                  required
                />
                {username && (
                  <p
                    className={`text-sm mt-1 ${usernameMsg.includes("✅")
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
                  placeholder="Admin@123"
                  value={password}
                  maxLength={12}
                  minLength={8}
                  onChange={(e) => validatePassword(e.target.value)}
                  required
                />
                {password && (
                  <p
                    className={`text-sm mt-1 ${passwordMsg.includes("✅")
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
                      className={`mr-2 ${item.valid ? "text-green-500" : "text-red-500"
                        }`}
                    >
                      {item.valid ? "✓" : "✗"}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-md
          transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-lg"
              >
                Login →
              </button>
            </form>

            {/* Signup Options */}
            <div className="text-center mt-4 space-y-2">
              <p className="text-gray-700">Don't have an account?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 hover:underline"
                >
                  Signup Teacher and Student
                </button>
              </div>
            </div>

            <ToastContainer />
          </div>
        </div>
      </section>

      {/* ✅ Courses Section */}
      <section
        id="courses"
        className="max-w-7xl mx-auto px-4 py-12 bg-[url('https://t4.ftcdn.net/jpg/05/88/11/91/360_F_588119127_ai0xZYPNgiPvEebGlR19I0O90qF2SILQ.jpg')] bg-cover bg-center"
      >
        <h2 className="text-3xl font-bold text-center underline text-stone-900 mb-8">Explore Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Web Development", desc: "Learn HTML, CSS, React.js, and more to build responsive web applications." },
            { title: "Data Science", desc: "Master data analysis, visualization, and machine learning techniques." },
            { title: "UI/UX Design", desc: "Design engaging interfaces and improve user experience." },
            { title: "Full Stack Development", desc: "Build complete web apps with front-end & back-end." },
            { title: "Machine Learning", desc: "Explore algorithms & intelligent systems." },
            { title: "Cloud Computing", desc: "Learn to design and manage scalable cloud infrastructure." },
          ].map((course, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.desc}</p>
              <button className="text-blue-600 hover:underline">View Course</button>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Community Section */}
      <section
        id="community"
        className="max-w-7xl mx-auto px-4 py-12 bg-[url('https://t3.ftcdn.net/jpg/05/88/24/10/360_F_588241010_cdQJ2QTsyDtt36jZsAFR45aAXICnPAzR.jpg')] bg-cover bg-center"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Collaborate & Learn</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Left Image */}
          <div className="md:w-1/2">
            <img
              src="https://lsme.ac.uk/wp-content/uploads/2024/04/blog-collaborative-learning-jpg.webp"
              alt="Collaborative Learning"
              className="w-full rounded-lg shadow"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 grid grid-cols-1 gap-6">
            {[
              { title: "Discussion Forums", desc: "Engage with peers, ask questions, and share knowledge." },
              { title: "Live Sessions", desc: "Participate in real-time webinars, workshops, and group activities." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <button className="text-blue-600 hover:underline">Join Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          &copy; 2025 LMS Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
