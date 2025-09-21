import React from "react";
import TeacherHeader from "./header/header";

const CourseSchedule = () => {
  const newCourses = [
    { title: "Geography", description: "Explore the world", color: "bg-orange-200" },
    { title: "JavaScript Course", description: "Learn coding", color: "bg-purple-200" },
    { title: "Photography Course", description: "Capture moments", color: "bg-blue-200" },
  ];

  const myCourses = [
    { title: "Development Basics", start: "May 10", level: "Beginner" },
    { title: "Data with Python", start: "May 12", level: "Intermediate" },
    { title: "Math Basics", start: "May 14", level: "Elementary" },
    { title: "Machine Learning", start: "May 30", level: "Advanced" },
  ];

  const homeworkProgress = [
    { task: "Styling with CSS", percent: 70 },
    { task: "Basics of programming", percent: 50 },
    { task: "Learn to Program in Java", percent: 30 },
  ];

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      
       {/* Sidebar */}
      <TeacherHeader />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold"> Welcome to the Course ScheduleClass</h1>
        </div>

        {/* New Courses */}
        <div>
          <h2 className="text-lg font-semibold mb-4">New Courses</h2>
          <div className="flex gap-4">
            {newCourses.map((course, index) => (
              <div key={index} className={`p-4 rounded-lg shadow-md ${course.color} w-1/3`}>
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-sm">{course.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* My Courses */}
        <div>
          <h2 className="text-lg font-semibold mb-4">My Courses</h2>
          <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Course</th>
                <th className="px-4 py-2 text-left">Start Date</th>
                <th className="px-4 py-2 text-left">Level</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.map((course, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="px-4 py-2">{course.title}</td>
                  <td className="px-4 py-2">{course.start}</td>
                  <td className="px-4 py-2">{course.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Calendar and Homework */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Calendar */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="font-semibold mb-4">May 2022</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="font-bold text-gray-500">{day}</div>
              ))}
              {/* Placeholder for dates */}
              {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className={`p-2 rounded hover:bg-blue-100 cursor-pointer ${i === 14 ? "bg-blue-200" : ""}`}>
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
      </div>
    </div>
  );
};

export default CourseSchedule;
