// ChapterDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  FileText,
} from "lucide-react";

export default function ChapterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);

  // 🔹 Simulated Data (Replace with API call later)
  const allChapters = [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the basics of coding and problem-solving.",
      progress: 100,
      file: "/files/intro.pdf", // Example: public/files/intro.pdf
    },
    {
      id: 2,
      title: "Variables & Data Types",
      description: "Understand how data is represented in programming.",
      progress: 60,
      file: "/files/variables.docx",
    },
    {
      id: 3,
      title: "Control Structures",
      description: "Master if-else statements and loops with exercises.",
      progress: 20,
      file: "/files/control-structures.doc",
    },
  ];

  // Load Chapter by ID
  useEffect(() => {
    const found = allChapters.find((c) => c.id === Number(id));
    setChapter(found || null);
  }, [id]);

  // File type detector
  const getFileType = (filePath) => {
    if (!filePath) return "";
    if (filePath.endsWith(".pdf")) return "PDF";
    if (filePath.endsWith(".docx")) return "Word (DOCX)";
    if (filePath.endsWith(".doc")) return "Word (DOC)";
    return "Resource File";
  };

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg">⚠️ Chapter not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-indigo-700 font-medium hover:underline"
      >
        <ArrowLeft size={20} /> Back to Chapters
      </button>

      {/* Chapter Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          {chapter.title}
        </h1>
        <p className="text-gray-600 mb-6">{chapter.description}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              chapter.progress === 100 ? "bg-green-500" : "bg-indigo-500"
            }`}
            style={{ width: `${chapter.progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          Progress:{" "}
          <span className="font-semibold">{chapter.progress}%</span>
        </p>

        {/* File Section */}
        {chapter.file && (
          <div className="mb-6">
            <a
              href={chapter.file}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-indigo-600 hover:underline"
            >
              <FileText size={18} /> View {getFileType(chapter.file)}
            </a>

            {/* PDF Inline Preview */}
            {chapter.file.endsWith(".pdf") && (
              <iframe
                src={chapter.file}
                title="PDF Preview"
                className="mt-4 w-full h-96 border rounded-lg"
              ></iframe>
            )}
          </div>
        )}

        {/* Buttons */}
        {chapter.progress === 100 ? (
          <button className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition w-full justify-center">
            <CheckCircle size={22} /> Completed
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition w-full justify-center">
            <PlayCircle size={22} /> {chapter.progress === 0 ? "Start Lesson" : "Continue Learning"}
          </button>
        )}
      </div>
    </div>
  );
}
