import React, { useEffect, useState } from "react";
import AdminHeader from "./Admin Header/header";

export default function HomeworkPage() {
  const [form, setForm] = useState({
    name: "",
    subject: "",
    course: "",
    instructions: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [submissions, setSubmissions] = useState(() => {
    try {
      const raw = localStorage.getItem("homework_submissions");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("homework_submissions", JSON.stringify(submissions));
  }, [submissions]);

  const courses = [
    "Select course",
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "History",
    "English",
  ];

  function validate(values) {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.subject.trim()) e.subject = "Subject name is required";
    if (!values.course || values.course === "Select course")
      e.course = "Please choose a course";
    if (!values.instructions.trim())
      e.instructions = "Instructions are required";
    if (!values.file) e.file = "Please upload a file";
    return e;
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setForm((s) => ({ ...s, file }));
      setErrors((prev) => ({ ...prev, file: undefined }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length) return setErrors(v);

    const reader = new FileReader();
    reader.onload = () => {
      const newEntry = {
        id: Date.now(),
        name: form.name.trim(),
        subject: form.subject.trim(),
        course: form.course,
        instructions: form.instructions.trim(),
        file: {
          name: form.file.name,
          type: form.file.type,
          size: form.file.size,
          content: reader.result, // base64 data
        },
        createdAt: new Date().toISOString(),
      };

      setSubmissions((s) => [newEntry, ...s]);
      setForm({ name: "", subject: "", course: "", instructions: "", file: null });
      setErrors({});
    };

    reader.readAsDataURL(form.file);
  }

  function handleDelete(id) {
    if (!confirm("Delete this submission?")) return;
    setSubmissions((s) => s.filter((x) => x.id !== id));
  }

  function downloadFile(file) {
    const link = document.createElement("a");
    link.href = file.content;
    link.download = file.name;
    link.click();
  }

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        <h1 className="text-gray-800 text-2xl font-bold ml-24">
          Homework Submission Page
        </h1>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100"
          aria-label="Homework form"
        >
          <div className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Student Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Alice Johnson"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.name ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Subject Name
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="e.g. Algebra II"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.subject ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.subject && (
                <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Course
              </label>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.course ? "border-red-400" : "border-slate-200"
                }`}
              >
                {courses.map((c) => (
                  <option key={c} value={c} disabled={c === "Select course"}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.course && (
                <p className="text-xs text-red-600 mt-1">{errors.course}</p>
              )}
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Instructions
              </label>
              <textarea
                name="instructions"
                value={form.instructions}
                onChange={handleChange}
                placeholder="Write your homework instructions here..."
                rows="4"
                className={`w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                  errors.instructions ? "border-red-400" : "border-slate-200"
                }`}
              />
              {errors.instructions && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.instructions}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Upload File
              </label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="w-full text-sm"
              />
              {form.file && (
                <p className="text-xs text-slate-600 mt-1">
                  Selected: {form.file.name}
                </p>
              )}
              {errors.file && (
                <p className="text-xs text-red-600 mt-1">{errors.file}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm({ name: "", subject: "", course: "", instructions: "", file: null })
                }
                className="inline-flex items-center justify-center rounded-full bg-white border px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>
        </form>

        {/* Submissions list */}
        <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-800">
              Recent Submissions
            </h2>
            <button
              onClick={() => {
                if (!confirm("Clear all submissions?")) return;
                setSubmissions([]);
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Clear
            </button>
          </div>

          {submissions.length === 0 ? (
            <p className="text-sm text-slate-500">
              No submissions yet. Fill the form to add one.
            </p>
          ) : (
            <ul className="space-y-3">
              {submissions.map((s) => (
                <li key={s.id} className="p-3 border rounded-xl bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{s.name}</p>
                      <p className="text-sm text-slate-600">
                        {s.subject} • {s.course}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {s.instructions}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(s.createdAt).toLocaleString()}
                      </p>
                      {s.file && (
                        <p className="text-xs text-indigo-600 mt-1 underline cursor-pointer"
                           onClick={() => downloadFile(s.file)}>
                          {s.file.name} ({(s.file.size / 1024).toFixed(1)} KB)
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigator.clipboard?.writeText(
                            `${s.name} — ${s.subject} — ${s.course} — ${s.instructions}`
                          )
                        }
                        className="text-xs px-2 py-1 rounded-md border bg-white hover:bg-slate-100"
                        title="Copy"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-xs px-2 py-1 rounded-md border text-red-600 bg-white hover:bg-red-50"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
