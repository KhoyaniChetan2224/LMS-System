import React, { useState, useEffect } from "react";
import StudentHeader from "./header/header"; // Corrected spelling of component name

export default function ClassSchedulePage() {
 
  const [schedules, setSchedules] = useState(() => {
    try {
      const raw = localStorage.getItem("class_schedules");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Persist schedules to localStorage
  useEffect(() => {
    localStorage.setItem("class_schedules", JSON.stringify(schedules));
  }, [schedules]);

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
              Create Class Schedule
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Fill in the details below to create a class schedule.
            </p>
          </header>
          
          {/* Schedule List */}
          <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
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
                      <p className="text-xs text-slate-400 mt-1">
                        Added: {new Date(s.createdAt).toLocaleString()}
                      </p>
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
