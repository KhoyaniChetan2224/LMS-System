// ClassSchedulePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentHeader from './header/header';

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

  // ✅ Redirect to Live Class Page
  function handleJoinClass(schedule) {
    navigate(`/admin/live/${schedule.id}`, { state: schedule });
  }

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
        <StudentHeader />

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
          
          {/* List */}
          <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-slate-800">
                Scheduled Classes
              </h2>
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
