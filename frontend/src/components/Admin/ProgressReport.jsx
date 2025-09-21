import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Calendar,
  BarChart,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import AdminHeader from "./Admin Header/header";

export default function LMSProgressReport() {
  const [active, setActive] = useState("Progress");

  // Mock student progress data
  const progressData = [
    {
      subject: "Mathematics",
      completion: 85,
      grade: "A",
      attendance: "92%",
    },
    {
      subject: "Physics",
      completion: 70,
      grade: "B+",
      attendance: "88%",
    },
    {
      subject: "Chemistry",
      completion: 65,
      grade: "B",
      attendance: "80%",
    },
    {
      subject: "English Literature",
      completion: 90,
      grade: "A+",
      attendance: "95%",
    },
    {
      subject: "History",
      completion: 60,
      grade: "C+",
      attendance: "75%",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
       {/* Progress Overview */}
        <section className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-6">
            Student Progress Overview
          </h2>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-gray-600 font-medium">Attendance</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">88%</p>
              <div className="h-2 bg-gray-200 rounded mt-3">
                <div className="h-2 bg-blue-500 rounded w-[88%]"></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-gray-600 font-medium">Assignments</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">76%</p>
              <div className="h-2 bg-gray-200 rounded mt-3">
                <div className="h-2 bg-green-500 rounded w-[76%]"></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-gray-600 font-medium">Exams</h3>
              <p className="text-3xl font-bold text-purple-600 mt-2">82%</p>
              <div className="h-2 bg-gray-200 rounded mt-3">
                <div className="h-2 bg-purple-500 rounded w-[82%]"></div>
              </div>
            </div>
          </div>

          {/* Subject Progress Table */}
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Subject-wise Report
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm">
                  <th className="px-4 py-3 text-left">Subject</th>
                  <th className="px-4 py-3 text-left">Completion</th>
                  <th className="px-4 py-3 text-left">Grade</th>
                  <th className="px-4 py-3 text-left">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t text-sm hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-700">
                      {row.subject}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded h-2 mr-2">
                          <div
                            className="h-2 bg-blue-500 rounded"
                            style={{ width: `${row.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {row.completion}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">{row.grade}</td>
                    <td className="px-4 py-3 text-gray-600">{row.attendance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
