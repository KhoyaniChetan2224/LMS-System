import React, { useEffect, useState } from "react";
import { FaBook, FaCalendarAlt, FaChartLine } from "react-icons/fa";
import StudentHeader from "./header/header"; 
import { useNavigate } from "react-router-dom";

export default function StudentClass() {
  const navigate = useNavigate();

  // ---------------- My Courses ----------------
  const myCourses = [
    { title: "React Basics", progress: 80 },
    { title: "Advanced Python", progress: 60 },
    { title: "Data Structures", progress: 45 },
  ];

  // ---------------- Assignments ----------------
  const assignments = [
    { title: "React Project", due: "2025-09-20", status: "Pending" },
    { title: "Python Quiz", due: "2025-09-22", status: "Completed" },
    { title: "DS Assignment", due: "2025-09-25", status: "Pending" },
    { title: "SQL Homework", due: "2025-09-28", status: "Pending" },
    { title: "Node.js Mini Project", due: "2025-10-02", status: "Pending" },
  ];

  // ---------------- Recent Activities ----------------
  const recentActivities = [
    { activity: "Completed Module 3", time: "2 hours ago" },
    { activity: "Started React Basics", time: "1 day ago" },
    { activity: "Joined new course: GraphQL", time: "3 days ago" },
  ];

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
      <StudentHeader />

      {/* Main Content */}
      <main className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-700 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Student!</h2>
          <p>Ready to learn something new today?</p>
        </div>

        {/* Dashboard Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaBook /> My Courses
            </h3>
            {myCourses.map((course, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <h4 className="font-medium">{course.title}</h4>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{course.progress}% complete</p>
              </div>
            ))}
          </div>

          {/* Assignments + Submissions */}
          <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaCalendarAlt /> Upcoming Assignments
            </h3>
            {/* ✅ Scrollable Assignments */}
            <ul className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {assignments.map((assignment, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition"
                >
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-gray-500">Due: {assignment.due}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      assignment.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </li>
              ))}
            </ul>

            {/* Homework Submissions */}
            <section className="mt-6">
              <h2 className="text-md font-medium text-slate-800 mb-3">
                Recent Homework 📝
              </h2>
              {submissions.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No submissions yet. Fill the form to add one.
                </p>
              ) : (
                <ul className="space-y-3 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  {submissions.map((s) => (
                    <li key={s.id} className="p-3 border rounded-xl bg-slate-50">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{s.name}</p>
                          <p className="text-sm text-slate-600">
                            {s.subject} • {s.course}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {s.instructions}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {new Date(s.createdAt).toLocaleString()}
                          </p>
                          {s.file && (
                            <p
                              className="text-xs text-indigo-600 mt-1 underline cursor-pointer"
                              onClick={() => downloadFile(s.file)}
                            >
                              {s.file.name} ({(s.file.size / 1024).toFixed(1)} KB)
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaChartLine /> Recent Activities
            </h3>
            <ul className="space-y-3">
              {recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition"
                >
                  <p>{activity.activity}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scheduled Classes */}
        <div className="max-w-5xl mx-auto space-y-6">
          <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
            <h2 className="text-lg font-medium text-slate-800 mb-4">
              Scheduled Classes
            </h2>

            {schedules.length === 0 ? (
              <p className="text-sm text-slate-500">
                No schedules yet. Fill the form to add one.
              </p>
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
      </main>
    </div>
  );
}
