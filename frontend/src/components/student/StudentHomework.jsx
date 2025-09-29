import React, { useEffect, useState } from "react";
import StudentHeader from './header/header';

export default function HomeworkPage() {

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

  function downloadFile(file) {
    const link = document.createElement("a");
    link.href = file.content;
    link.download = file.name;
    link.click();
  }

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
      {/* Sidebar */}
      <StudentHeader />

      {/* Main Content */}
      <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
        <h1 className="text-gray-800 underline text-2xl font-bold ml-24">
          ✍ Write down Student Homework ✍
        </h1>

        {/* Form Card */}
        

        {/* Submissions list */}
        <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-800">
              Recent updating Homework...📝
            </h2>
            
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
