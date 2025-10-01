import React, { useEffect, useState } from "react";
import TeacherHeader from "./header/header";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const CourseSchedule = () => {
  const navigate = useNavigate();

  // ---------------- Sample Data ----------------
  const newCourses = [
    { title: "Geography", description: "Explore the world", color: "bg-orange-200" },
    { title: "JavaScript Course", description: "Learn coding", color: "bg-purple-200" },
    { title: "Photography Course", description: "Capture moments", color: "bg-blue-200" },
  ];

  const homeworkProgress = [
    { task: "Styling with CSS", percent: 70 },
    { task: "Basics of programming", percent: 50 },
    { task: "Learn to Program in Java", percent: 30 },
  ];

  // ---------------- States ----------------
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    teacher: "",
    course: "",
    time: "",
    date: "",
    level: "",
  });
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem("teacher_courses");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ---------------- Persist to localStorage ----------------
  useEffect(() => {
    localStorage.setItem("teacher_courses", JSON.stringify(courses));
  }, [courses]);

  // ---------------- Validation ----------------
  function validate(values) {
    const e = {};
    if (!values.teacher.trim()) e.teacher = "Teacher name is required";
    if (!values.course.trim()) e.course = "Course name is required";
    if (!values.time.trim()) e.time = "Start time is required";
    if (!values.date.trim()) e.date = "Start date is required";
    if (!values.level.trim()) e.level = "Please choose a level";
    return e;
  }

  // ---------------- Handlers ----------------
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length) return setErrors(v);

    const newCourse = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    setCourses((prev) => [newCourse, ...prev]);
    handleReset();
    setShowForm(false);
  }

  function handleReset() {
    setForm({ teacher: "", course: "", time: "", date: "", level: "" });
    setErrors({});
  }

  function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  function handleStartClass(id) {
    const course = courses.find((c) => c.id === id);
    if (!course) return;
    if (!window.confirm(`Start class "${course.course}" by ${course.teacher}?`)) return;
    navigate("/admin/live", { state: { course } });
  }

  // ---------------- Class Schedules ----------------
  const [schedules, setSchedules] = useState(() => {
    try {
      const raw = localStorage.getItem("class_schedules");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("class_schedules", JSON.stringify(schedules));
  }, [schedules]);

  function handleJoinClass(schedule) {
    navigate(`/admin/live/${schedule.id}`, { state: schedule });
  }

  // ---------------- Homework Submissions ----------------
  const [submissions, setSubmissions] = useState(() => {
    try {
      const raw = localStorage.getItem("homework_submissions");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("homework_submissions", JSON.stringify(submissions));
  }, [submissions]);

  function downloadFile(file) {
    const link = document.createElement("a");
    link.href = file.content;
    link.download = file.name;
    link.click();
  }

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <TeacherHeader />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-700 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Welcome back to the Course Schedule</h2>
          <p>Ready to learn something new today?</p>
        </div>

        {/* New Courses */}
        <section>
          <h2 className="text-lg font-semibold mb-4">New Courses</h2>
          <div className="flex gap-4">
            {newCourses.map((course, index) => (
              <div key={index} className={`p-4 rounded-lg shadow-md ${course.color} w-1/3`}>
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-sm">{course.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* My Courses */}
        <section>
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="p-2 border rounded bg-green-100 hover:bg-green-200 flex items-center gap-1"
          >
            <Plus className="w-5 h-5 text-green-700" /> Schedule a New Class
          </button>

          {/* Slide Down Form */}
          <AnimatePresence>
            {showForm && (
              <motion.form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-6 mt-4 border border-slate-200"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-lg font-semibold mb-4 text-indigo-700">🎨 Add New Course</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Teacher */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Teacher</label>
                    <input
                      type="text"
                      name="teacher"
                      value={form.teacher}
                      onChange={handleChange}
                      placeholder="Mr. Smith"
                      className={`w-full border px-3 py-2 rounded-lg text-sm ${
                        errors.teacher ? "border-red-400" : "border-slate-300 focus:ring-indigo-400"
                      }`}
                    />
                    {errors.teacher && <p className="text-xs text-red-600 mt-1">{errors.teacher}</p>}
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
                    <input
                      type="text"
                      name="course"
                      value={form.course}
                      onChange={handleChange}
                      placeholder="Algebra II"
                      className={`w-full border px-3 py-2 rounded-lg text-sm ${
                        errors.course ? "border-red-400" : "border-slate-300 focus:ring-purple-400"
                      }`}
                    />
                    {errors.course && <p className="text-xs text-red-600 mt-1">{errors.course}</p>}
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`w-full border px-3 py-2 rounded-lg text-sm ${
                        errors.time ? "border-red-400" : "border-slate-300 focus:ring-green-400"
                      }`}
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={`w-full border px-3 py-2 rounded-lg text-sm ${
                        errors.date ? "border-red-400" : "border-slate-300 focus:ring-pink-400"
                      }`}
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Level</label>
                    <select
                      name="level"
                      value={form.level}
                      onChange={handleChange}
                      className={`w-full border px-3 py-2 rounded-lg text-sm ${
                        errors.level ? "border-red-400" : "border-slate-300 focus:ring-yellow-400"
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-600"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-white border px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50"
                  >
                    Reset
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </section>

        {/* Scheduled Courses Table */}
        <section className="bg-white shadow rounded-xl p-6 border border-slate-200 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Scheduled Courses</h2>
            <button
              onClick={() => {
                if (!window.confirm("Clear all courses?")) return;
                setCourses([]);
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          {courses.length === 0 ? (
            <p className="text-sm text-slate-500">No courses added yet.</p>
          ) : (
            <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-2 text-left">Teacher</th>
                  <th className="px-4 py-2 text-left">Course</th>
                  <th className="px-4 py-2 text-left">Start Time</th>
                  <th className="px-4 py-2 text-left">Start Date</th>
                  <th className="px-4 py-2 text-left">Level</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c, idx) => (
                  <tr key={c.id} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-4 py-2">{c.teacher}</td>
                    <td className="px-4 py-2">{c.course}</td>
                    <td className="px-4 py-2">{c.time}</td>
                    <td className="px-4 py-2">{c.date}</td>
                    <td className="px-4 py-2">{c.level}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="text-xs text-red-600 border px-2 py-1 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleStartClass(c.id)}
                        className="text-xs text-white bg-green-500 px-3 py-1 rounded hover:from-blue-600 hover:to-cyan-600"
                      >
                        Start Class
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Calendar & Homework Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold mb-4">October 2025</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-bold text-gray-500">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded hover:bg-blue-100 cursor-pointer ${
                    i === new Date().getDate() - 1 ? "bg-blue-200" : ""
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Homework Progress */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold mb-4">Homework Progress</h2>
            {homeworkProgress.map((hw, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{hw.task}</span>
                  <span>{hw.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${hw.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Classes */}
        <div className="max-w-5xl mx-auto space-y-6">
          <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
            <h2 className="text-lg font-medium text-slate-800 mb-4">Scheduled Classes</h2>

            {schedules.length === 0 ? (
              <p className="text-sm text-slate-500">No schedules yet. Fill the form to add one.</p>
            ) : (
              <ul className="space-y-3">
                {schedules.map((s) => (
                  <li
                    key={s.id}
                    className="p-3 border rounded-xl bg-slate-50 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {s.className} • {s.course}
                      </p>
                      <p className="text-sm text-slate-600">
                        {s.subject} — {s.teacher}
                      </p>
                      <p className="text-sm text-slate-500">
                        {s.date} • {s.time}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Added: {new Date(s.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleJoinClass(s)}
                        className="text-xs px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
                      >
                        Join Class
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule;
