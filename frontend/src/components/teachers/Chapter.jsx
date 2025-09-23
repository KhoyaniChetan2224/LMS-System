// ChapterHomePage.jsx
import React, { useState } from "react";
import { BookOpen, Search, CheckCircle, PlayCircle } from "lucide-react";
import TeacherHeader from "./header/header";

export default function ChapterHomePage() {
  const [search, setSearch] = useState("");

  const chapters = [
    { id: 1, title: "Introduction to Programming", progress: 100 },
    { id: 2, title: "Variables & Data Types", progress: 80 },
    { id: 3, title: "Control Structures", progress: 40 },
    { id: 4, title: "Functions & Scope", progress: 0 },
    { id: 5, title: "Objects & Arrays", progress: 0 },
    { id: 6, title: "Project: Mini Calculator", progress: 0 },
  ];

  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      
       {/* Sidebar */}
      <TeacherHeader />

      {/* Main Content */}
      <main className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            📚 Course Chapters
          </h2>
          {/* Search */}
          <div className="relative mt-3 sm:mt-0">
            <input
              type="text"
              placeholder="Search chapters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 w-full sm:w-72"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Chapters List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-gray-800 text-lg mb-3">
                {chapter.title}
              </h3>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full ${
                    chapter.progress === 100
                      ? "bg-green-500"
                      : "bg-indigo-500"
                  }`}
                  style={{ width: `${chapter.progress}%` }}
                ></div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Progress: {chapter.progress}%
              </p>

              {/* Buttons */}
              {chapter.progress === 100 ? (
                <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg w-full justify-center hover:bg-green-600 transition">
                  <CheckCircle size={18} /> Completed
                </button>
              ) : (
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full justify-center hover:bg-indigo-700 transition">
                  <PlayCircle size={18} /> Continue
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
