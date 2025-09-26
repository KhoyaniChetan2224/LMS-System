import React, { useState, useEffect } from "react";
import { Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AdminHeader from "./Admin Header/header";

const initialCourses = [
  { title: "Additional Mathematics", hoursTaken: 8, totalHours: 32, live: true },
  { title: "Basic Calculus", hoursTaken: 8, totalHours: 32 },
  { title: "Algebra", hoursTaken: 6, totalHours: 24 },
  { title: "Complex Analysis", hoursTaken: 3, totalHours: 22 },
];

const initialClasses = [
  { title: "Biology Molecular", duration: "50 Minute", lessons: 21, assignments: 5, students: 34 },
  { title: "Physics", duration: "40 Minute", lessons: 32, assignments: 7, students: 28 },
];

export default function Dashboard() {
  const [courses, setCourses] = useState(initialCourses);
  const [classes, setClasses] = useState(initialClasses);

  const [showScheduleClass, setShowScheduleClass] = useState(false);
  const [form, setForm] = useState({
    className: "",
    teacher: "",
    subject: "",
    date: "",
    time: "",
  });
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  const navigate = useNavigate();

  // Load classes from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("classes")) || [];
    setUpcomingClasses(stored);
  }, []);

  // Save helper
  const saveToLocal = (updated) => {
    setUpcomingClasses(updated);
    localStorage.setItem("classes", JSON.stringify(updated));
  };



  // ✅ Delete Class
  const handleDeleteClass = (idx) => {
    const updated = upcomingClasses.filter((_, i) => i !== idx);
    saveToLocal(updated);
    alert("Class deleted ❌");
  };

  // Form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add new class
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.className && form.teacher && form.subject && form.date && form.time) {
      const updated = [...upcomingClasses, form];
      saveToLocal(updated);
      alert("Class scheduled ✅");
      setForm({ className: "", teacher: "", subject: "", date: "", time: "" });
      setShowScheduleClass(false);
    } else {
      alert("Please fill all fields ❌");
    }
  };

  // Start course navigation
  const handleStartCourse = (course) => {
    navigate(`/admin/course/${encodeURIComponent(course.title)}`, { state: course });
  };

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-gray-800 underline hover:text-slate-700 text-2xl font-bold ml-24">
          Welcome back, Create Class Schedule...!
        </h1>

        {/* Button to open modal */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg mb-3">Recommended Courses</h2>
            <button
              onClick={() => setShowScheduleClass(true)}
              className="p-2 border rounded bg-green-100 hover:bg-green-200"
            >
              <Plus className="w-5 h-5 text-green-700" />
            </button>
          </div>

          {/* Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {courses.map((course, idx) => (
              <div key={idx} className="bg-green-200 p-4 rounded shadow relative">
                {course.live && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    LIVE
                  </span>
                )}
                <p className="font-bold">{course.title}</p>
                <p>
                  {course.hoursTaken} Hour Taken / {course.totalHours} Hour
                </p>
                <button
                  onClick={() => handleStartCourse(course)}
                  className="mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white p-6 rounded shadow mb-10">
          <h2 className="font-bold text-lg mb-4 text-cyan-800">Upcoming Classes</h2>
          {upcomingClasses.length === 0 ? (
            <p className="text-gray-500">No upcoming classes scheduled yet.</p>
          ) : (
            <ul className="space-y-3">
              {upcomingClasses.map((cls, idx) => (
                <li
                  key={idx}
                  className="p-4 border rounded-lg bg-slate-50 flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold">{cls.className}</p>
                    <p className="text-sm text-gray-600">
                      Teacher: {cls.teacher} | Subject: {cls.subject}
                    </p>
                    <p className="text-sm">
                      Date: {cls.date} | Time: {cls.time}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDeleteClass(idx)}
                      className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded"
                    >
                      Delete
                    </button>
                    <Calendar className="text-cyan-600" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Classes and Learning Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classes */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-3">Your Classes</h2>
            {classes.map((cls, idx) => (
              <div key={idx} className="mb-3 border-b pb-2">
                <p className="font-semibold">{cls.title}</p>
                <p>Duration: {cls.duration}</p>
                <p>
                  Lessons: {cls.lessons} | Assignments: {cls.assignments} | Students:{" "}
                  {cls.students}
                </p>
              </div>
            ))}
          </div>

          {/* Learning Activities */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-3">Learning Activities</h2>
            <div className="h-48 bg-gradient-to-b from-blue-100 via-green-100 to-blue-200 rounded flex items-center justify-center">
              <p className="text-gray-600">Graph / Chart placeholder</p>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen Animated Schedule Modal */}
      <AnimatePresence>
        {showScheduleClass && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full h-full md:w-3/4 md:h-5/6 rounded-xl shadow-lg p-8 overflow-y-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b pb-3 mb-6">
                <h1 className="text-3xl font-bold text-cyan-800">Schedule a New Class</h1>
                <button
                  onClick={() => setShowScheduleClass(false)}
                  className="text-gray-600 hover:text-red-600 text-xl font-bold"
                >
                  ✖
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-1">Class Name</label>
                  <input
                    type="text"
                    name="className"
                    placeholder="Enter class name"
                    value={form.className}
                    onChange={handleChange}
                    className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Teacher</label>
                  <input
                    type="text"
                    name="teacher"
                    placeholder="Enter teacher name"
                    value={form.teacher}
                    onChange={handleChange}
                    className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-semibold mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full border px-4 py-3 rounded-lg focus:ring-2 focus:ring-cyan-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowScheduleClass(false)}
                    className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800"
                  >
                    Add Class
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
