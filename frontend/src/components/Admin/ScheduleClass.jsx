// Dashboard.jsx
import React from "react";
import { Bell, Mail, Calendar } from "lucide-react";
import AdminHeader from "./Admin Header/header";

const courses = [
  { title: "Additional Mathematics", hoursTaken: 8, totalHours: 32, live: true },
  { title: "Basic Calculus", hoursTaken: 8, totalHours: 32 },
  { title: "Algebra", hoursTaken: 6, totalHours: 24 },
  { title: "Complex Analysis", hoursTaken: 3, totalHours: 22 },
];

const classes = [
  { title: "Biology Molecular", duration: "50 Minute", lessons: 21, assignments: 5, students: 34 },
  { title: "Physics", duration: "40 Minute", lessons: 32, assignments: 7, students: 28 },
];

export default function Dashboard() {
  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <button className="bg-orange-500 text-white px-4 py-2 rounded">Get Subscription</button>
            <span className="ml-4 text-gray-700">Current Plan: 6 Month Advance</span>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="w-6 h-6 text-gray-700" />
            <Mail className="w-6 h-6 text-gray-700" />
            <Calendar className="w-6 h-6 text-gray-700" />
            <div className="text-gray-700">0 $ | 5 PTS</div>
            <div className="flex items-center space-x-2">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Brad"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Subjects */}
        <div className="flex space-x-2 mb-6">
          {["All", "Information Technology", "Additional Mathematics", "Physics", "Chemistry", "English Language"].map((subj) => (
            <button
              key={subj}
              className="px-3 py-1 bg-white rounded shadow hover:bg-gray-100"
            >
              {subj}
            </button>
          ))}
          <button className="px-3 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600">
            Add Subject +
          </button>
        </div>

        {/* Experience */}
        <div className="flex justify-between bg-white p-4 rounded shadow mb-6">
          <div>
            <p>Experience Dollar</p>
            <p className="font-bold text-green-600">240 XD</p>
            <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded">Redeem</button>
          </div>
          <div>
            <p>Experience Points</p>
            <p className="font-bold text-yellow-500">5 PTS</p>
            <button className="mt-2 px-3 py-1 bg-yellow-400 text-white rounded">Collect Points</button>
          </div>
          <div className="text-center">
            <p>Schedule a call with an academic advisor</p>
            <button className="mt-2 px-4 py-2 bg-gray-800 text-white rounded">Schedule Now</button>
          </div>
          <div className="text-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Brad"
              className="w-12 h-12 rounded-full mx-auto"
            />
            <p className="font-bold">Brad Pit</p>
            <p>Total Course: 24</p>
            <p>Total Certificates: 18</p>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mb-6">
          <h2 className="font-bold text-lg mb-3">Recommended Courses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course) => (
              <div
                key={course.title}
                className="bg-green-200 p-4 rounded shadow relative"
              >
                {course.live && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    LIVE
                  </span>
                )}
                <p className="font-bold">{course.title}</p>
                <p>{course.hoursTaken} Hour Taken / {course.totalHours} Hour</p>
                <button className="mt-2 px-3 py-1 bg-orange-400 text-white rounded">Start</button>
              </div>
            ))}
          </div>
        </div>

        {/* Classes and Learning Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classes */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-3">Your Classes</h2>
            {classes.map((cls) => (
              <div key={cls.title} className="mb-3 border-b pb-2">
                <p className="font-semibold">{cls.title}</p>
                <p>Duration: {cls.duration}</p>
                <p>Lessons: {cls.lessons} | Assignments: {cls.assignments} | Students: {cls.students}</p>
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
    </div>
  );
}
