// CourseChaptersPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Search,
  CheckCircle,
  PlayCircle,
  FileText,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import TeacherHeader from "./header/header";

export default function CourseChaptersPage() {
  const navigate = useNavigate();

  // 🔹 Form state
  const [form, setForm] = useState({
    courseName: "",
    description: "",
    progress: 0,
    file: null,
  });

  // 🔹 Show/Hide Form modal
  const [showForm, setShowForm] = useState(false);

  // 🔹 Sample Chapters
  const [chapters, setChapters] = useState([
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
  ]);

  const [search, setSearch] = useState("");

  // 🔹 Handle form input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // 🔹 Add new chapter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.courseName) return alert("Please enter a course name");

    const newChapter = {
      id: chapters.length + 1,
      title: form.courseName,
      description: form.description,
      progress: Number(form.progress),
      file: form.file,
    };

    setChapters([...chapters, newChapter]);
    setForm({ courseName: "", description: "", progress: 0, file: null });
    setShowForm(false); // close form
  };

  // 🔹 Filter Chapters
  const filteredChapters = chapters.filter((ch) =>
    ch.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-cyan-50 font-sans">
      {/* Sidebar */}
      <TeacherHeader />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen /> 📚 Course Chapters
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

        {/* Add Chapter Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <Plus size={18} /> Add New Chapter
          </button>
        </div>

        {/* Animated Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 overflow-y-auto"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-6">
                  <h1 className="text-2xl font-bold text-indigo-700">
                    ➕ Add New Chapter
                  </h1>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-600 hover:text-red-600 text-xl font-bold"
                  >
                    ✖
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block font-semibold mb-1">
                      Course Name
                    </label>
                    <input
                      type="text"
                      name="courseName"
                      value={form.courseName}
                      onChange={handleChange}
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      placeholder="Enter course name"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Progress (%)
                    </label>
                    <input
                      type="number"
                      name="progress"
                      value={form.progress}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                      rows="3"
                      placeholder="Enter description..."
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1">
                      Upload File (PDF, DOC, DOCX)
                    </label>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx"
                      className="w-full"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Add Chapter
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chapters List */}
        <section>
          <h3 className="text-xl font-semibold mb-4">📖 Chapters</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredChapters.map((chapter) => (
              <motion.div
                key={chapter.id}
                className="bg-white shadow-md rounded-xl p-5 border hover:shadow-lg transition flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Title */}
                <h3 className="font-semibold text-gray-800 text-lg mb-2">
                  {chapter.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3">
                  {chapter.description}
                </p>

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

                {/* File Link */}
                {chapter.file && (
                  <a
                    href={URL.createObjectURL(chapter.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-indigo-600 text-sm hover:underline mb-3"
                  >
                    <FileText size={18} /> View Resource
                  </a>
                )}

                {/* Buttons */}
                {chapter.progress === 100 ? (
                  <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg w-full justify-center hover:bg-green-600 transition">
                    <CheckCircle size={18} /> Completed
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/teachers/chapter/${chapter.id}`)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full justify-center hover:bg-indigo-700 transition"
                  >
                    <PlayCircle size={18} /> Continue
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
