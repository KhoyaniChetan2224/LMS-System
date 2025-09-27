// ClassSchedulePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./Admin Header/header";

// ================== Reusable Input Component ==================
function InputField({ label, name, value, onChange, error, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full rounded-lg border px-3 py-2 text-sm ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

// ================== Reusable Textarea Component ==================
function TextAreaField({ label, name, value, onChange, error, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full rounded-lg border px-3 py-2 text-sm ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

// ================== Main Page ==================
export default function ClassSchedulePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    className: "",
    teacher: "",
    subject: "",
    time: "",
    date: "",
    course: "",
    description: "",
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

  // ✅ Validation function
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
    return e;
  }

  // ✅ Handle input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  // ✅ Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length) return setErrors(v);

    const newSchedule = {
      id: Date.now(),
      ...form,
      createdAt: new Date().toISOString(),
    };

    setSchedules((s) => [newSchedule, ...s]);
    handleReset();
  }

  // ✅ Reset form
  function handleReset() {
    setForm({
      className: "",
      teacher: "",
      subject: "",
      time: "",
      date: "",
      course: "",
      description: "",
    });
    setErrors({});
  }

  // ✅ Delete a class
  function handleDelete(id) {
    if (!confirm("Delete this schedule?")) return;
    setSchedules((s) => s.filter((x) => x.id !== id));
  }

  // ✅ Redirect to Live Class Page
  function handleJoinClass(schedule) {
    navigate(`/admin/live/${schedule.id}`, { state: schedule });
  }

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
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
              <InputField
                label="Class Name"
                name="className"
                value={form.className}
                onChange={handleChange}
                error={errors.className}
                placeholder="e.g. Class A"
              />
              <InputField
                label="Teacher Name"
                name="teacher"
                value={form.teacher}
                onChange={handleChange}
                error={errors.teacher}
                placeholder="e.g. Mr. Smith"
              />
              <InputField
                label="Subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="e.g. Algebra II"
              />
              <InputField
                label="Date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                error={errors.date}
              />
              <InputField
                label="Time"
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                error={errors.time}
              />
              {/* Course Select */}
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
              <div className="sm:col-span-2">
                <TextAreaField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  error={errors.description}
                  placeholder="Brief description of class"
                  rows="3"
                />
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
                      <p className="text-xs text-slate-500">{s.description}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Added: {new Date(s.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleJoinClass(s)}
                        className="text-xs px-2 py-1 rounded-md border bg-green-500 text-white hover:bg-green-600"
                      >
                        Join Class
                      </button>
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
