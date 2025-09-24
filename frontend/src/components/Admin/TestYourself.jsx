import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./Admin Header/header";

export default function LMSTestYourself() {
  const [active] = useState("Test Yourself");
  const navigate = useNavigate();

  // State for quizzes
  const [quizzes, setQuizzes] = useState([
    { id: 1, subject: "Mathematics - Algebra Basics", difficulty: "Easy", time: "15 min", file: null },
    { id: 2, subject: "Physics - Laws of Motion", difficulty: "Medium", time: "20 min", file: null },
    { id: 3, subject: "English - Grammar Essentials", difficulty: "Easy", time: "10 min", file: null },
    { id: 4, subject: "Chemistry - Organic Compounds", difficulty: "Hard", time: "30 min", file: null },
  ]);

  // State for creating new test
  const [newTest, setNewTest] = useState({
    subject: "",
    difficulty: "Easy",
    time: "",
    file: null,
  });

  // Handle input change
  const handleChange = (e) => {
    setNewTest({ ...newTest, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setNewTest({ ...newTest, file: e.target.files[0] });
  };

  // Add new quiz
  const handleAddQuiz = () => {
    if (!newTest.subject || !newTest.time || !newTest.file) {
      alert("Please fill all fields and upload a file before creating a test.");
      return;
    }
    const newQuiz = {
      id: quizzes.length + 1,
      subject: newTest.subject,
      difficulty: newTest.difficulty,
      time: `${newTest.time} min`,
      file: newTest.file,
    };
    setQuizzes([...quizzes, newQuiz]);
    setNewTest({ subject: "", difficulty: "Easy", time: "", file: null });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <section className="p-6 flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold text-center text-gray-700 mb-6">
            Welcome Test Yourself
          </h2>

          {/* Featured Test */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow mb-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Featured Test: Algebra Mastery</h3>
              <p className="text-sm text-blue-100 mt-2">
                Improve your math skills with quick quizzes designed to boost your confidence.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/test-yourself/1")}
              className="mt-4 md:mt-0 bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition"
            >
              Start Test
            </button>
          </div>

          {/* Create Test Form */}
          <h3 className="text-lg font-bold text-gray-700 mb-4">Create a New Test</h3>
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <div className="grid gap-4 md:grid-cols-4">
              {/* Subject Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subject"
                  value={newTest.subject}
                  onChange={handleChange}
                  placeholder="Enter subject"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={newTest.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time (Minutes)
                </label>
                <input
                  type="number"
                  name="time"
                  value={newTest.time}
                  onChange={handleChange}
                  placeholder="Enter time"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Test File
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                {newTest.file && (
                  <p className="text-xs text-gray-500 mt-1">
                    Uploaded: {newTest.file.name}
                  </p>
                )}
              </div>
            </div>

            {/* Add Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddQuiz}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Create Test
              </button>
            </div>
          </div>

          {/* Available Quizzes */}
          <h3 className="text-lg font-bold text-gray-700 mb-4">Available Quizzes</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <h4 className="font-semibold text-blue-600">{quiz.subject}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Difficulty:{" "}
                  <span
                    className={`font-medium ${
                      quiz.difficulty === "Easy"
                        ? "text-green-600"
                        : quiz.difficulty === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                </p>
                <p className="text-sm text-gray-500">Time: {quiz.time}</p>
                {quiz.file && (
                  <p className="text-sm text-gray-500 mt-1">
                    File: <span className="text-blue-600">{quiz.file.name}</span>
                  </p>
                )}
                <button
                  onClick={() => navigate(`/admin/test-yourself/${quiz.id}`)}
                  className="mt-3 bg-blue-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
