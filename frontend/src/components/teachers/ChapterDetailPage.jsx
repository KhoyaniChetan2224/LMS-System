// ChapterDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, PlayCircle, FileText } from "lucide-react";

export default function ChapterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example: Fetch chapter from backend or from local data
  const [chapter, setChapter] = useState(null);

  // 🔹 Simulated data (later replace with API call)
  const allChapters = [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the basics of coding",
      progress: 100,
      file: null,
    },
    {
      id: 2,
      title: "Variables & Data Types",
      description: "Understand data representation",
      progress: 80,
      file: null,
    },
    {
      id: 3,
      title: "Control Structures",
      description: "Master if-else and loops",
      progress: 40,
      file: null,
    },
  ];

  useEffect(() => {
    const found = allChapters.find((c) => c.id === Number(id));
    setChapter(found || null);
  }, [id]);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Chapter not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-cyan-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-indigo-600 hover:underline"
      >
        <ArrowLeft size={20} /> Back to Chapters
      </button>

      {/* Chapter Details */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          {chapter.title}
        </h1>
        <p className="text-gray-600 mb-4">{chapter.description}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div
            className={`h-3 rounded-full ${
              chapter.progress === 100 ? "bg-green-500" : "bg-indigo-500"
            }`}
            style={{ width: `${chapter.progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Progress: {chapter.progress}%
        </p>

        {/* File */}
        {chapter.file && (
          <a
            href={URL.createObjectURL(chapter.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-indigo-600 hover:underline mb-4"
          >
            <FileText size={18} /> View Resource
          </a>
        )}

        {/* Buttons */}
        {chapter.progress === 100 ? (
          <button className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition">
            <CheckCircle size={20} /> Completed
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
            <PlayCircle size={20} /> Continue Lesson
          </button>
        )}
      </div>
    </div>
  );
}
