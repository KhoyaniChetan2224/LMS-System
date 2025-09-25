import React, { useState, useEffect } from "react";
import AdminHeader from "./Admin Header/header";

export default function ClassSchedulePage() {
  const [form, setForm] = useState({
    className: "",
    teacher: "",
    subject: "",
    time: "",
    date: "",
    course: "",
    description: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [schedules, setSchedules] = useState(() => {
    try {
      const raw = localStorage.getItem("class_schedules");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist schedules
  useEffect(() => {
    localStorage.setItem("class_schedules", JSON.stringify(schedules));
  }, [schedules]);

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

  // Validate form
  function validate(values) {
    const e = {};
    if (!values.className.trim()) e.className = "Class name is required";
    if (!values.teacher.trim()) e.teacher = "Teacher name is required";
    if (!values.subject.trim()) e.subject = "Subject is required";
    if (!values.time.trim()) e.time = "Time is required";
    if (!values.date.trim()) e.date = "Date is required";
    if (!values.course || values.course === "Select course")
      e.course = "Please choose a course";
    if (!values.description.trim())
      e.description = "Class description is required";
    if (!values.file) e.file = "Please upload a file";
    return e;
  }

  // Input handler
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (files) {
      setForm((s) => ({ ...s, file: files[0] }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  // Submit
  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length) return setErrors(v);

    const newSchedule = {
      id: Date.now(),
      ...form,
      file: form.file ? form.file.name : null,
      createdAt: new Date().toISOString(),
    };

    setSchedules((s) => [newSchedule, ...s]);
    handleReset();
  }

  // Reset
  function handleReset() {
    setForm({
      className: "",
      teacher: "",
      subject: "",
      time: "",
      date: "",
      course: "",
      description: "",
      file: null,
    });
    setErrors({});
  }

  // Delete
  function handleDelete(id) {
    if (!confirm("Delete this schedule?")) return;
    setSchedules((s) => s.filter((x) => x.id !== id));
  }

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main */}
      <main className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <header>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
              Student Past Classes
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Fill the details below to create a new class schedule.
            </p>
          </header>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Class Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Class Name
                </label>
                <input
                  name="className"
                  value={form.className}
                  onChange={handleChange}
                  placeholder="e.g. Class A"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.className ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.className && (
                  <p className="text-xs text-red-600 mt-1">{errors.className}</p>
                )}
              </div>

              {/* Teacher */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Teacher Name
                </label>
                <input
                  name="teacher"
                  value={form.teacher}
                  onChange={handleChange}
                  placeholder="e.g. Mr. Smith"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.teacher ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.teacher && (
                  <p className="text-xs text-red-600 mt-1">{errors.teacher}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="e.g. Algebra II"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.subject ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-600 mt-1">{errors.subject}</p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.date ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.date && (
                  <p className="text-xs text-red-600 mt-1">{errors.date}</p>
                )}
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.time ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.time && (
                  <p className="text-xs text-red-600 mt-1">{errors.time}</p>
                )}
              </div>

              {/* Course */}
              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
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

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief description of class"
                  rows="3"
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.description ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* File Upload */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Upload File
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-3 py-2 text-sm ${
                    errors.file ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {errors.file && (
                  <p className="text-xs text-red-600 mt-1">{errors.file}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                type="submit"
                className="rounded-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-indigo-700"
              >
                Create Schedule
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full bg-white border px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </form>

          {/* List */}
          <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-slate-800">
                Scheduled Classes
              </h2>
              {schedules.length > 0 && (
                <button
                  onClick={() => {
                    if (!confirm("Clear all schedules?")) return;
                    setSchedules([]);
                  }}
                  className="text-sm text-red-600 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {schedules.length === 0 ? (
              <p className="text-sm text-slate-500">
                No schedules yet. Fill the form to add one.
              </p>
            ) : (
              <ul className="space-y-3">
                {schedules.map((s) => (
                  <li
                    key={s.id}
                    className="p-3 border rounded-xl bg-slate-50 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {s.className} • {s.course}
                      </p>
                      <p className="text-sm text-slate-600">
                        {s.subject} — {s.teacher}
                      </p>
                      <p className="text-sm text-slate-500">
                        {s.date} • {s.time}
                      </p>
                      <p className="text-xs text-slate-500">
                        {s.description}
                      </p>
                      {s.file && (
                        <p className="text-xs text-slate-400">
                          File: {s.file}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        Added: {new Date(s.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigator.clipboard?.writeText(
                            `${s.className} | ${s.teacher} | ${s.subject} | ${s.date} ${s.time} | ${s.course}`
                          )
                        }
                        className="text-xs px-2 py-1 rounded-md border bg-white hover:bg-slate-100"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="text-xs px-2 py-1 rounded-md border text-red-600 bg-white hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
