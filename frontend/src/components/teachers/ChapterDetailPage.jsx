// ChapterDetailPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  FileText,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";

// Setup PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function ChapterDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [chapter, setChapter] = useState(null);
  const [docxContent, setDocxContent] = useState("");
  const [numPages, setNumPages] = useState(null);

  // Example data (replace with API later)
  const allChapters = [
    {
      id: 1,
      title: "Introduction to Programming",
      description: "Learn the basics of coding",
      progress: 100,
      file: { name: "intro.pdf", type: "application/pdf", url: "/sample.pdf" },
    },
    {
      id: 2,
      title: "Variables & Data Types",
      description: "Understand data representation",
      progress: 80,
      file: { name: "variables.docx", type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", url: "/sample.docx" },
    },
    {
      id: 3,
      title: "Control Structures",
      description: "Master if-else and loops",
      progress: 40,
      file: { name: "control.doc", type: "application/msword", url: "/sample.doc" },
    },
  ];

  useEffect(() => {
    const found = allChapters.find((c) => c.id === Number(id));
    setChapter(found || null);

    if (found && found.file && found.file.type.includes("wordprocessingml")) {
      // Load mammoth dynamically for docx
      import("mammoth/mammoth.browser")
        .then((mammoth) => {
          fetch(found.file.url)
            .then((res) => res.arrayBuffer())
            .then((arrayBuffer) =>
              mammoth.extractRawText({ arrayBuffer }).then((result) => {
                setDocxContent(result.value);
              })
            );
        })
        .catch(() => {
          setDocxContent("⚠️ Could not load Word document.");
        });
    }
  }, [id]);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Chapter not found</p>
      </div>
    );
  }

  // 📌 Render attached file
  const renderFile = () => {
    if (!chapter.file) return null;

    if (chapter.file.type === "application/pdf") {
      return (
        <div className="my-4">
          <h2 className="font-semibold mb-2">📄 PDF Preview</h2>
          <Document
            file={chapter.file.url}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      );
    }

    if (
      chapter.file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      return (
        <div className="my-4">
          <h2 className="font-semibold mb-2">📄 Word (.docx) Preview</h2>
          <div className="p-4 border rounded bg-gray-50 text-sm whitespace-pre-wrap">
            {docxContent || "Loading..."}
          </div>
        </div>
      );
    }

    if (chapter.file.type === "application/msword") {
      return (
        <div className="my-4">
          <h2 className="font-semibold mb-2">📄 Word (.doc) File</h2>
          <a
            href={chapter.file.url}
            download={chapter.file.name}
            className="flex items-center gap-2 text-indigo-600 hover:underline"
          >
            <FileText size={18} /> Download {chapter.file.name}
          </a>
        </div>
      );
    }

    return (
      <div className="my-4">
        <h2 className="font-semibold mb-2">📎 Resource File</h2>
        <a
          href={chapter.file.url}
          download={chapter.file.name}
          className="flex items-center gap-2 text-indigo-600 hover:underline"
        >
          <FileText size={18} /> Download {chapter.file.name}
        </a>
      </div>
    );
  };

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

        {/* File Preview */}
        {renderFile()}

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
