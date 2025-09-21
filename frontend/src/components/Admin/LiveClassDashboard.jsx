import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentJoinPage() {
  const [meetingId, setMeetingId] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (meetingId.trim() !== "") {
      navigate(`/student/${meetingId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Student Join Class
        </h1>
        <input
          type="text"
          placeholder="Enter Meeting ID"
          value={meetingId}
          onChange={(e) => setMeetingId(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleJoin}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Join Meeting
        </button>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Example link: <code>/student/m-12345</code>
        </p>
      </div>
    </div>
  );
}
