import React, { useState } from "react";
import {
  Download,
  RotateCcw,
  Eye,
  Filter,
} from "lucide-react";
import StudentHeader from './header/header';

// Mock student progress data
const initialProgressData = [
  { subject: "Mathematics", completion: 85, grade: "A", attendance: "92%" },
  { subject: "Physics", completion: 70, grade: "B+", attendance: "88%" },
  { subject: "Chemistry", completion: 65, grade: "B", attendance: "80%" },
  { subject: "English Literature", completion: 90, grade: "A+", attendance: "95%" },
  { subject: "History", completion: 60, grade: "C+", attendance: "75%" },
];

export default function ProgressReport() {
  const [progressData, setProgressData] = useState(initialProgressData);
  const [filterAbove80, setFilterAbove80] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // View details of a subject
  const handleViewDetails = (subject) => {
    setSelectedSubject(subject);
  };

  // Apply filter
  const handleFilter = () => {
    setFilterAbove80(true);
  };

  // Reset filter
  const handleReset = () => {
    setFilterAbove80(false);
    setProgressData(initialProgressData);
  };

  // Download report (JSON file for demo)
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(progressData, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "progress-report.json";
    link.click();
  };

  // Filtered data
  const filteredData = filterAbove80
    ? progressData.filter((row) => row.completion >= 80)
    : progressData;

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <StudentHeader />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <section className="p-6 flex-1 overflow-y-auto">
          {/* Header & Actions */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-700">
              Student Progress Overview
            </h2>
            <div className="flex gap-3">
              <button
                onClick={handleFilter}
                className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 cursor-pointer transition transform hover:scale-105"
              >
                <Filter className="w-4 h-4 mr-2" /> Filter Above 80%
              </button>
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 cursor-pointer transition transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 cursor-pointer transition transform hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition cursor-pointer transform hover:scale-105">
              <h3 className="text-gray-600 font-medium">Attendance</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">88%</p>
              <div className="h-2 bg-gray-200 rounded mt-3">
                <div className="h-2 bg-blue-500 rounded w-[88%]"></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition cursor-pointer transform hover:scale-105">
              <h3 className="text-gray-600 font-medium">Assignments</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">76%</p>
              <div className="h-2 bg-gray-200 rounded mt-3">
                <div className="h-2 bg-green-500 rounded w-[76%]"></div>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition cursor-pointer transform hover:scale-105">
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
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t text-sm hover:bg-gray-50 transition cursor-pointer"
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
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleViewDetails(row)}
                        className="flex items-center px-3 py-1 bg-indigo-500 text-white rounded text-xs hover:bg-indigo-600 transition transform hover:scale-105 cursor-pointer"
                      >
                        <Eye className="w-3 h-3 mr-1" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for subject details */}
          {selectedSubject && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition">
              <div className="bg-white p-6 rounded-lg shadow max-w-md w-full transform transition-all scale-100 hover:scale-105 cursor-default">
                <h2 className="text-xl font-bold mb-3 text-gray-700">
                  {selectedSubject.subject} - Details
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Completion:</span>{" "}
                  {selectedSubject.completion}%
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Grade:</span>{" "}
                  {selectedSubject.grade}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Attendance:</span>{" "}
                  {selectedSubject.attendance}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer transition transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
