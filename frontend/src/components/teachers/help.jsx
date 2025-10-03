import React, { useState } from "react";
import { ChevronDown, ChevronUp, Mail, MessageCircle } from "lucide-react";
import TeacherHeader from './header/header';

export default function HelpPage({ role = "Teacher" }) {
  const [openIndex, setOpenIndex] = useState(null);

  // 🔹 Sample FAQs for Teacher & Admin
  const faqs = {
    Teacher: [
      {
        q: "How can I create a new course?",
        a: "Go to the 'Courses' tab and click on 'Create Course'. Fill in the details and upload your materials.",
      },
      {
        q: "How do I upload lesson files?",
        a: "Inside your course, open the 'Lessons' section and click 'Upload File'. Supported formats: PDF, Word, Video.",
      },
      {
        q: "How can I track student progress?",
        a: "Navigate to 'Students' → select a student → view detailed progress reports.",
      },
    ],
    Admin: [
      {
        q: "How do I manage user accounts?",
        a: "Go to 'Admin Dashboard' → 'Users'. From there, you can add, edit, or remove accounts.",
      },
      {
        q: "How do I generate reports?",
        a: "Under 'Reports' in the Admin Panel, you can export data in PDF or Excel format.",
      },
      {
        q: "How to assign roles (Teacher/Admin/Student)?",
        a: "Go to 'Users' → select a user → choose role from dropdown and save.",
      },
    ],
  };

  return (
    <div className="flex h-screen font-sans bg-cyan-50">
        {/* Sidebar */}
        <TeacherHeader />

        {/* Main Content */}
        <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
{/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          {role} Help Center
        </h1>
        <p className="text-gray-600 mt-2">
          Find answers to common questions and get support when you need it.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">FAQs</h2>
        {faqs[role].map((faq, index) => (
          <div
            key={index}
            className="border-b pb-3 last:border-b-0 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <div className="flex items-center justify-between">
              <p className="text-gray-800 font-medium">{faq.q}</p>
              {openIndex === index ? (
                <ChevronUp className="text-indigo-600" />
              ) : (
                <ChevronDown className="text-gray-500" />
              )}
            </div>
            {openIndex === index && (
              <p className="text-gray-600 mt-2">{faq.a}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Still need help?
        </h2>
        <p className="text-gray-600 mb-6">
          Our support team is here for you. Contact us via email or start a
          live chat.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="mailto:support@lms.com"
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Mail size={18} /> Email Support
          </a>
          <button className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            <MessageCircle size={18} /> Live Chat
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

