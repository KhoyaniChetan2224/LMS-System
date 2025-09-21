import React from "react";
import { RiLiveLine } from "react-icons/ri";
import { LuSmilePlus } from "react-icons/lu";
import StudebtHeader from "./header/header";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="flex h-screen font-sans bg-cyan-50">

      {/* Sidebar */}
      <StudebtHeader />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">

        {/* Welcome Message */}
        <div className="bg-orange-300 p-4 rounded-lg shadow-md">
          <h1 className="text-gray-800 text-2xl font-bold ml-24">Welcome back, Student...!</h1>

          {/* Dashboard Stats */}
          <div className="bg-yellow-50 rounded-lg p-5 mt-6 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="flex justify-center items-center mb-2">
                <img src="https://atlas-content-cdn.pixelsquid.com/assets_v2/333/3338697575397070639/previews/G03-200x200.jpg" alt="Star" className="w-10 h-10" />My Points
              </div>
              <div className="text-orange-500 text-xl font-bold">158.3</div>
              <div className="flex justify-end">
                <FaChevronRight className="text-orange-500" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="flex justify-center items-center mb-2">
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTEpzPCAbldNOChdX1S1AB0yGTKUw2j8OaeViaCkksuOypv1XJ8" alt="Star" className="w-10 h-10" />Leaderboard Rank (Overall)
              </div>
              <div className="text-orange-500 text-xl font-bold">400</div>
              <div className="flex justify-end">
                <FaChevronRight className="text-orange-500" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow text-center">
              <div className="flex justify-center items-center mb-2">
                <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTnc4v_sM-c2wGsdwTuX2vEIM1Qbj3uDuztB2KEJxjap4VmpVRc" alt="Star" className="w-9 h-9 gap-1" /> My Progress
              </div>
              <div className="flex justify-end">
                <FaChevronRight className="text-orange-500 mt-8" />
              </div>
            </div>
          </div>
        </div>

        {/* My Schedule */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">My Schedule</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Monday</h3>
                <p className="text-gray-600">Mathematics - 10:00 AM</p>
              </div>
              <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Wednesday</h3>
                <p className="text-gray-600">Science - 11:30 AM</p>
              </div>
              <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">Upcoming</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Friday</h3>
                <p className="text-gray-600">English - 2:00 PM</p>
              </div>
              <span className="bg-gray-500 text-white px-2 py-1 rounded text-sm">Upcoming</span>
            </div>
          </div>
        </div>

        {/* My Schedule & Homework Section */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Upcoming Class */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-2">Upcoming Class</h3>
            <div className="border border-gray-300 rounded-lg p-4 rounded-s-none">
              <div className="flex items-center justify-between">
                <span className="bg-rose-500 text-white px-2 py-1 rounded text-sm">Vedic Maths</span>
                <div className="flex items-center mt-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="ml-2 text-red-600 text-sm font-semibold">LIVE</span>
                </div>
              </div>
              <h4 className="mt-2 font-semibold">High Speed Addition - 1</h4>
              <p className="text-gray-600 text-sm mt-1">⏰ Today, 1 PM to 1:55 PM | IST +05:30</p>
              <p className="text-gray-500 text-xs mt-1">by: Teacher Swiflearn</p>
              <div className="mt-4 bg-rose-500 rounded-md mb-1">
                <button className="mt-2 bg-white hover:bg-slate-100 ml-[5rem] mb-2 text-black hover:text-black px-6 py-1 rounded-3xl group">
                  <Link to="/admin/live"><span className="block group-hover:hidden">Enroll now <LuSmilePlus className="inline" /></span>
                    <span className="hidden group-hover:block">Join now <RiLiveLine className="inline" /></span></Link>
                </button>
              </div>
              <div className="flex items-center text-red-600 justify-center mt-2">
                View My Class <span className="ml-1">&gt;</span>
              </div>
            </div>
          </div>


          {/* My Homework */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold mb-2">My Homework</h3>
            <div className="border border-gray-300 rounded-lg p-4 rounded-s-none">
              <div className="flex items-center justify-between">
                <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">Maths Olympiad</span>
                <div className="flex items-center mt-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span className="ml-2 text-red-600 text-sm font-semibold mb-2">Overdue</span>
                </div>
              </div>
              <h4 className="mt-2 font-semibold">Clock and Calendar</h4>
              <p className="text-gray-600 text-sm mt-1">⏰ 30 Min · 10 Questions</p>
              <p className="text-gray-500 text-xs mt-1">Submit by: 9th Aug, 6:30 PM | IST +05:30</p>
              <div className="mt-4 bg-purple-500 rounded-md mb-1">
                <button className="mt-2 bg-white hover:bg-slate-100 ml-[6.5rem] mb-2 text-black hover:text-black px-5 py-2 rounded-3xl">Attempted</button>
              </div>
              <div className="flex items-center text-red-600 justify-center mt-2">
                View My Class <span className="ml-1">&gt;</span>
              </div>
            </div>
          </div>

          {/* This Week's Activity */}
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

    </div >
  );
}
