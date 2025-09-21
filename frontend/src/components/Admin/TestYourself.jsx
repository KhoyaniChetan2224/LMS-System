// import React from 'react'
// import AdminHeader from './Admin Header/header'
// import { color } from 'framer-motion';

//     const yourselfClasses = [
//         {
//             id: 1,
//             title: "Class 1: Introduction to React",
//             date: "2025-09-22",
//             description: "An introductory class on React.js covering components, state, and props.",
//         },
//         {
//             id: 2,
//             title: "Class 2: Advanced React Patterns",
//             date: "2025-09-22",
//             description: "A deep dive into advanced patterns in React.js, including hooks and context.",
//         },
//         {
//             id: 3,
//             title: "Class 3: State Management with Redux",
//             date: "2025-09-22",
//             description: "Learn how to manage state in your React applications using Redux.",
//         },
//         {
//             id: 4,
//             title: "Class 4: Building RESTful APIs",
//             date: "2025-09-22",
//             description: "An introduction to building RESTful APIs with Node.js and Express.",
//         },
//         {
//             id: 5,
//             title: "Class 5: Database Integration",
//             date: "2025-09-22",
//             description: "Learn how to integrate databases like MongoDB with your Node.js applications.",
//         }
//     ];

// const TestYourself = () => {
//   return (
//     <div className="flex h-screen font-sans bg-cyan-50">
//             {/* Sidebar */}
//             <AdminHeader />

//             {/* Main Content */}
//             <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
//                 <h1 className="text-2xl font-bold mb-4">Test Yourself</h1>

//                 <ul className="space-y-2">
//                     {yourselfClasses.map((classItem) => (
//                         <li key={classItem.id} className="bg-red-50 p-4 rounded shadow">
//                             <h2 className="text-xl font-semibold">{classItem.title}</h2>
//                             <p className="text-gray-600">Date: {classItem.date}</p>
//                             <p className="mt-2">Description: {classItem.description}</p>
//                             <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">    
//                                 Start Test
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
                
//     </div>
//   )
// }

// export default TestYourself

import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Calendar,
  BarChart,
  HelpCircle,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import AdminHeader from "./Admin Header/header";

export default function LMSTestYourself() {
  const [active, setActive] = useState("Test Yourself");

  // Mock quiz categories
  const categories = [
    { name: "Mathematics", color: "bg-blue-100 text-blue-600" },
    { name: "Science", color: "bg-green-100 text-green-600" },
    { name: "English", color: "bg-yellow-100 text-yellow-600" },
    { name: "History", color: "bg-purple-100 text-purple-600" },
    { name: "General Knowledge", color: "bg-pink-100 text-pink-600" },
  ];

  // Mock quiz list
  const quizzes = [
    {
      id: 1,
      subject: "Mathematics - Algebra Basics",
      difficulty: "Easy",
      time: "15 min",
    },
    {
      id: 2,
      subject: "Physics - Laws of Motion",
      difficulty: "Medium",
      time: "20 min",
    },
    {
      id: 3,
      subject: "English - Grammar Essentials",
      difficulty: "Easy",
      time: "10 min",
    },
    {
      id: 4,
      subject: "Chemistry - Organic Compounds",
      difficulty: "Hard",
      time: "30 min",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Test Yourself Section */}
        <section className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
            Wellcom Test Yourself
          </h2>

          {/* Featured Test */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow mb-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Featured Test: Algebra Mastery</h3>
              <p className="text-sm text-blue-100 mt-2">
                Improve your math skills with quick quizzes designed to boost your
                confidence.
              </p>
            </div>
            <button className="mt-4 md:mt-0 bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition">
              Start Test
            </button>
          </div>

          {/* Quiz Categories */}
          <h3 className="text-lg font-bold text-gray-700 mb-4">Categories</h3>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5 mb-8">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition text-center ${cat.color}`}
              >
                <h4 className="font-semibold">{cat.name}</h4>
              </div>
            ))}
          </div>

          {/* Available Quizzes */}
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Available Quizzes
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="font-semibold text-blue-600">{quiz.subject}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Difficulty:{" "}
                  <span
                    className={`font-medium ${
                      quiz.difficulty === "Easy"
                        ? "text-green-600"
                        : quiz.difficulty === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                </p>
                <p className="text-sm text-gray-500">Time: {quiz.time}</p>
                <button className="mt-3 bg-blue-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-blue-700 transition">
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
