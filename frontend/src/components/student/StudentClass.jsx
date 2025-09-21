import React from "react";
import { FaBook, FaCalendarAlt, FaChartLine, FaBell } from "react-icons/fa";
import StudentHeader from "./header/header"; // Corrected spelling of component name

const StudentClass = () => {
  const myCourses = [
    { title: "React Basics", progress: 80 },
    { title: "Advanced Python", progress: 60 },
    { title: "Data Structures", progress: 45 },
  ];

  const assignments = [
    { title: "React Project", due: "2025-09-20", status: "Pending" },
    { title: "Python Quiz", due: "2025-09-22", status: "Completed" },
    { title: "DS Assignment", due: "2025-09-25", status: "Pending" },
  ];

  const recentActivities = [
    { activity: "Completed Module 3", time: "2 hours ago" },
    { activity: "Started React Basics", time: "1 day ago" },
    { activity: "Joined new course: GraphQL", time: "3 days ago" },
  ];

  return (
    <div className="flex h-screen font-sans bg-cyan-50">

      {/* Sidebar */}
      <StudentHeader />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-700 text-white rounded-lg p-6 mb-6 shadow-md">
          <h2 className="text-2xl font-bold mb-2">Welcome back, Student classes</h2>
          <p>Ready to learn something new today?</p>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* My Courses Section */}
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

          {/* Upcoming Assignments Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaCalendarAlt /> Upcoming Assignments
            </h3>
            <ul className="space-y-3">
              {assignments.map((assignment, index) => (
                <li key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition">
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
          </div>

          {/* Recent Activities Section */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaChartLine /> Recent Activities
            </h3>
            <ul className="space-y-3">
              {recentActivities.map((activity, index) => (
                <li key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                  <p>{activity.activity}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentClass;
