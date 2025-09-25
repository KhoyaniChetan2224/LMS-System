import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function CoursePage() {
  const { title } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const course = state || { title, hoursTaken: 0, totalHours: 0 };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        {course.live && (
          <span className="inline-block mb-3 bg-red-500 text-white px-3 py-1 rounded text-sm">
            LIVE SESSION
          </span>
        )}
        <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
        <p className="text-gray-600 mb-2">
          {course.hoursTaken} / {course.totalHours} Hours Completed
        </p>
        <div className="space-x-3 mt-4">
          <button
            onClick={() =>
              navigate(`/admin/live${course.title}`, { state: course })
            }
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Join Live Class
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
