import React, { useEffect, useState } from "react";
import { RiLiveLine } from "react-icons/ri";
import { LuSmilePlus } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminHeader from "../Admin/Admin Header/header"; // check your path

// ========== Upcoming Class Card ==========
function UpcomingClassCard({ cls }) {
  return (
    <div className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition">
      <h3 className="font-semibold text-lg text-cyan-700">{cls.className}</h3>
      <p className="text-sm text-slate-600">👨‍🏫 {cls.teacher}</p>
      <p className="text-sm text-slate-600">📘 {cls.subject}</p>
      <p className="text-sm text-slate-600">📅 {cls.date}</p>
      <p className="text-sm text-slate-600">⏰ {cls.time}</p>
    </div>
  );
}

// ========== Admin Home ==========
export default function AdminHome() {
  const [classes, setClasses] = useState([]);

  // Load upcoming classes from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("classes")) || [];
    setClasses(stored);
  }, []);

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader active="Home" />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        {/* Welcome + Stats */}
        <div className="bg-orange-300 p-4 rounded-lg shadow-md">
          <h1 className="text-gray-800 text-2xl font-bold text-center">
            Welcome back, Admin...!
          </h1>

          <div className="bg-yellow-50 rounded-lg p-5 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Points */}
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <img
                  src="https://atlas-content-cdn.pixelsquid.com/assets_v2/333/3338697575397070639/previews/G03-200x200.jpg"
                  alt="Star"
                  className="w-10 h-10"
                />
                My Points
              </div>
              <div className="text-orange-500 text-xl font-bold">158.3</div>
              <div className="flex justify-end">
                <FaChevronRight className="text-orange-500" />
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <img
                  src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEpzPCAbldNOChdX1S1AB0yGTKUw2j8OaeViaCkksuOypv1XJ8"
                  alt="Star"
                  className="w-10 h-10"
                />
                Leaderboard Rank
              </div>
              <div className="text-orange-500 text-xl font-bold">400</div>
              <div className="flex justify-end">
                <FaChevronRight className="text-orange-500" />
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="flex justify-center items-center gap-2 mb-2">
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTnc4v_sM-c2wGsdwTuX2vEIM1Qbj3uDuztB2KEJxjap4VmpVRc"
                  alt="Star"
                  className="w-9 h-9"
                />
                My Progress
              </div>
              <div className="flex justify-end">
                <FaChevronRight className="text-orange-500 mt-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes Section */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-cyan-800">
            Upcoming Classes
          </h2>

          {classes.length === 0 ? (
            <p className="text-slate-600">
              No upcoming classes yet. Go to <b>Schedule</b> and add one.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((cls, i) => (
                <UpcomingClassCard key={i} cls={cls} />
              ))}
            </div>
          )}
        </div>

        {/* Homework + Activity */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Static Upcoming Class (example live class) */}
          {/* <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-2">Featured Class</h3>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="bg-rose-500 text-white px-2 py-1 rounded text-sm">
                  Vedic Maths
                </span>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="ml-2 text-red-600 text-sm font-semibold">
                    LIVE
                  </span>
                </div>
              </div>
              <h4 className="mt-2 font-semibold">High Speed Addition - 1</h4>
              <p className="text-gray-600 text-sm mt-1">
                ⏰ Today, 1 PM - 1:55 PM
              </p>
              <p className="text-gray-500 text-xs mt-1">by: Teacher Swiflearn</p>
              <div className="mt-4 bg-rose-500 rounded-md text-center">
                <Link
                  to="/admin/live"
                  className="block bg-white hover:bg-slate-100 text-black px-6 py-1 rounded-3xl group"
                >
                  <span className="block group-hover:hidden">
                    Enroll now <LuSmilePlus className="inline" />
                  </span>
                  <span className="hidden group-hover:block">
                    Join now <RiLiveLine className="inline" />
                  </span>
                </Link>
              </div>
            </div>
          </div> */}

          {/* Homework */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-2">My Homework</h3>
            <div className="border border-gray-300 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">
                  Maths Olympiad
                </span>
                <span className="ml-2 text-red-600 text-sm font-semibold">
                  Overdue
                </span>
              </div>
              <h4 className="mt-2 font-semibold">Clock and Calendar</h4>
              <p className="text-gray-600 text-sm mt-1">
                ⏰ 30 Min · 10 Questions
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Submit by: 9th Aug, 6:30 PM
              </p>
              <div className="mt-4 bg-purple-500 rounded-md text-center">
                <button className="bg-white hover:bg-slate-100 text-black px-6 py-2 rounded-3xl">
                  Attempted
                </button>
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-4">This Week's Activity</h3>
            <div className="flex items-center mb-4">
              <div className="bg-orange-200 p-2 rounded-full mr-2">⏱️</div>
              <div>
                <div className="font-bold">Learning Time</div>
                <div className="text-gray-600">0 Min</div>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-orange-200 p-2 rounded-full mr-2">📋</div>
              <div>
                <div className="font-bold">Tests Attempted</div>
                <div className="text-gray-600">0</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-orange-200 p-2 rounded-full mr-2">❓</div>
              <div>
                <div className="font-bold">Questions Attempted</div>
                <div className="text-gray-600">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
