import React, { useEffect, useState } from "react";
import AdminHeader from "./Admin Header/header";

export default function HomeworkPage() {
  const [form, setForm] = useState({ name: "", subject: "", course: "" });
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
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length) return setErrors(v);

    const newEntry = {
      id: Date.now(),
      name: form.name.trim(),
      subject: form.subject.trim(),
      course: form.course,
      createdAt: new Date().toISOString(),
    };

    setSubmissions((s) => [newEntry, ...s]);
    setForm({ name: "", subject: "", course: "" });
    setErrors({});
  }

  function handleDelete(id) {
    if (!confirm("Delete this submission?")) return;
    setSubmissions((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        <h1 className="text-gray-800 text-2xl font-bold ml-24">Welcome back, Homework...!</h1>
        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100"
          aria-label="Homework form"
        >
          <div className="space-y-4">
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

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={() => setForm({ name: "", subject: "", course: "" })}
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
                    <div>
                      <p className="font-semibold text-slate-800">{s.name}</p>
                      <p className="text-sm text-slate-600">
                        {s.subject} • {s.course}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(s.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigator.clipboard?.writeText(
                            `${s.name} — ${s.subject} — ${s.course}`
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
