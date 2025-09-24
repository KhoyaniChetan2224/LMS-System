import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TestPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock quiz data
  const quizData = {
    1: {
      title: "Mathematics - Algebra Basics",
      questions: [
        { q: "What is 2x + 3 when x = 2?", options: ["5", "7", "9", "11"], answer: "7" },
        { q: "Solve: 5x = 20", options: ["2", "3", "4", "5"], answer: "4" },
        { q: "Expand: (x+2)(x+3)", options: ["x²+5x+6", "x²+6", "x²+3x+2", "x²+2x+3"], answer: "x²+5x+6" },
      ],
      duration: 15, // minutes
    },
    2: {
      title: "Physics - Laws of Motion",
      questions: [
        { q: "Who proposed the three laws of motion?", options: ["Einstein", "Newton", "Tesla", "Galileo"], answer: "Newton" },
        { q: "Force = ?", options: ["m/a", "a/m", "m*a", "m+a"], answer: "m*a" },
      ],
      duration: 20,
    },
    3: {
      title: "English - Grammar Essentials",
      questions: [
        { q: "Choose the correct sentence:", options: ["He go to school.", "He goes to school.", "He going school.", "He goed school."], answer: "He goes to school." },
        { q: "Identify the verb: 'She sings beautifully.'", options: ["She", "sings", "beautifully", "None"], answer: "sings" },
      ],
      duration: 10,
    },
    4: {
      title: "Chemistry - Organic Compounds",
      questions: [
        { q: "What is the formula of Methane?", options: ["CH2", "CH3", "CH4", "C2H6"], answer: "CH4" },
        { q: "Ethanol belongs to which group?", options: ["Alkane", "Alkene", "Alcohol", "Ketone"], answer: "Alcohol" },
      ],
      duration: 30,
    },
    5: {
      title: "Chemistry - Organic Compounds",
      questions: [
        { q: "What is the formula of Methane?", options: ["CH2", "CH3", "CH4", "C2H6"], answer: "CH4" },
        { q: "Ethanol belongs to which group?", options: ["Alkane", "Alkene", "Alcohol", "Ketone"], answer: "Alcohol" },
      ],
      duration: 30,
    },
  };

  const quiz = quizData[id];

  // State
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);
  const [submitted, setSubmitted] = useState(false);

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const handleOptionClick = (option) => {
    setAnswers({ ...answers, [currentQ]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const score = Object.keys(answers).reduce((acc, qIndex) => {
    if (answers[qIndex] === quiz.questions[qIndex].answer) acc++;
    return acc;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">{quiz.title}</h2>
        <div className="text-lg font-semibold text-red-600">
          ⏱ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>

      {!submitted ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">
            Question {currentQ + 1} of {quiz.questions.length}
          </h3>
          <p className="mb-4">{quiz.questions[currentQ].q}</p>
          <div className="space-y-2">
            {quiz.questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                className={`block w-full text-left px-4 py-2 rounded-lg border ${
                  answers[currentQ] === opt
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
              disabled={currentQ === 0}
              className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {currentQ < quiz.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ((q) => Math.min(quiz.questions.length - 1, q + 1))}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-2xl font-bold text-green-600 mb-4">Test Completed!</h3>
          <p className="text-lg">
            Your Score: {score} / {quiz.questions.length}
          </p>
          <button
            onClick={() => navigate("/admin/test-yourself")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Quizzes
          </button>
        </div>
      )}
    </div>
  );
}
