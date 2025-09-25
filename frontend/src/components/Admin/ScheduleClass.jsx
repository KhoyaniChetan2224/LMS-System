import React, { useState } from "react";
import { Bell, Mail, Calendar, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./Admin Header/header";

const initialCourses = [
  { title: "Additional Mathematics", hoursTaken: 8, totalHours: 32, live: true },
  { title: "Basic Calculus", hoursTaken: 8, totalHours: 32 },
  { title: "Algebra", hoursTaken: 6, totalHours: 24 },
  { title: "Complex Analysis", hoursTaken: 3, totalHours: 22 },
];

const initialClasses = [
  { title: "Biology Molecular", duration: "50 Minute", lessons: 21, assignments: 5, students: 34 },
  { title: "Physics", duration: "40 Minute", lessons: 32, assignments: 7, students: 28 },
];

export default function Dashboard() {
  const [courses, setCourses] = useState(initialCourses);
  const [classes, setClasses] = useState(initialClasses);

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);

  const [newCourse, setNewCourse] = useState({ title: "", hoursTaken: "", totalHours: "" });
  const [newClass, setNewClass] = useState({ title: "", duration: "", lessons: "", assignments: "", students: "" });

  const navigate = useNavigate();

  // Handlers
  const handleAddCourse = () => {
    setCourses([...courses, { ...newCourse, live: false }]);
    setNewCourse({ title: "", hoursTaken: "", totalHours: "" });
    setShowCourseModal(false);
  };

  const handleAddClass = () => {
    setClasses([...classes, { ...newClass }]);
    setNewClass({ title: "", duration: "", lessons: "", assignments: "", students: "" });
    setShowClassModal(false);
  };

  const handleStartCourse = (course) => {
    navigate(`/admin/course/${encodeURIComponent(course.title)}`, { state: course });
  };

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-gray-800 underline hover:text-slate-700 text-2xl font-bold ml-24">
          Welcome back, Create Class Schedule...!
        </h1>

        {/* Recommended Courses */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg mb-3">Recommended Courses</h2>
            <button
              onClick={() => setShowCourseModal(true)}
              className="flex items-center px-3 py-1 bg-green-500 text-white rounded shadow hover:bg-green-600"
            >
              <Plus className="w-4 h-4 mr-1" /> Create Course
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-green-200 p-4 rounded shadow relative"
              >
                {course.live && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                    LIVE
                  </span>
                )}
                <p className="font-bold">{course.title}</p>
                <p>{course.hoursTaken} Hour Taken / {course.totalHours} Hour</p>
                <button
                  onClick={() => handleStartCourse(course)}
                  className="mt-2 px-3 py-1 bg-orange-400 text-white rounded hover:bg-orange-500"
                >
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Classes and Learning Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classes */}
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <h2 className="font-bold mb-3">Your Classes</h2>
              <button
                onClick={() => setShowClassModal(true)}
                className="flex items-center px-3 py-1 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-1" /> Create Class
              </button>
            </div>
            {classes.map((cls, idx) => (
              <div key={idx} className="mb-3 border-b pb-2">
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

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="font-bold mb-4">Create Course</h2>
            <input
              type="text"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Hours Taken"
              value={newCourse.hoursTaken}
              onChange={(e) => setNewCourse({ ...newCourse, hoursTaken: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Total Hours"
              value={newCourse.totalHours}
              onChange={(e) => setNewCourse({ ...newCourse, totalHours: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowCourseModal(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAddCourse} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Class Modal */}
      {showClassModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="font-bold mb-4">Create Class</h2>
            <input
              type="text"
              placeholder="Class Title"
              value={newClass.title}
              onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Duration (e.g., 40 Minute)"
              value={newClass.duration}
              onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Lessons"
              value={newClass.lessons}
              onChange={(e) => setNewClass({ ...newClass, lessons: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Assignments"
              value={newClass.assignments}
              onChange={(e) => setNewClass({ ...newClass, assignments: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="number"
              placeholder="Students"
              value={newClass.students}
              onChange={(e) => setNewClass({ ...newClass, students: e.target.value })}
              className="w-full border p-2 mb-2 rounded"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowClassModal(false)} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleAddClass} className="px-3 py-1 bg-blue-500 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
