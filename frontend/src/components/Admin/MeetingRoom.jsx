// MeetingRoom.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  LogOut,
  Users,
} from "lucide-react";

export default function MeetingRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract meeting data + participants from state
  const { student, meeting, participants: initialParticipants } =
    location.state || {};

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [participants, setParticipants] = useState(initialParticipants || []);

  useEffect(() => {
    if (!student || !meeting) {
      navigate("/"); // if no data, redirect back
    }
  }, [student, meeting, navigate]);

  const toggleMic = () => setMicOn((prev) => !prev);
  const toggleCam = () => setCamOn((prev) => !prev);
  const toggleShare = () => setSharing((prev) => !prev);
  const leaveMeeting = () => navigate("/");

  if (!student || !meeting) return null;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white flex justify-between items-center px-6 py-3">
        <h1 className="text-lg font-semibold">Live Class Meeting</h1>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-300">{meeting.link}</span>
          <Users className="w-5 h-5" />
          <span>{participants.length}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Video Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {participants.map((p) => (
            <div
              key={p.id}
              className="relative bg-black rounded-xl overflow-hidden shadow-lg flex items-center justify-center"
            >
              {camOn ? (
                <div className="text-gray-400 text-xl">📹 {p.name}'s Camera</div>
              ) : (
                <div className="text-gray-500 text-lg">{p.name.charAt(0)}</div>
              )}
              <div className="absolute bottom-2 left-2 text-white text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                {p.name}
              </div>
            </div>
          ))}
        </div>

        {/* Participants Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4 border-l border-gray-700">
          <h2 className="font-semibold mb-3">Participants</h2>
          <ul className="space-y-2">
            {participants.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-2 bg-gray-700 rounded-lg px-3 py-2"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-400 flex items-center justify-center text-sm font-bold">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <span>{p.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-gray-800 py-4 flex justify-center gap-6">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full ${
            micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600"
          }`}
        >
          {micOn ? <Mic className="text-white" /> : <MicOff className="text-white" />}
        </button>

        <button
          onClick={toggleCam}
          className={`p-3 rounded-full ${
            camOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600"
          }`}
        >
          {camOn ? <Video className="text-white" /> : <VideoOff className="text-white" />}
        </button>

        <button
          onClick={toggleShare}
          className={`p-3 rounded-full ${
            sharing ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <Monitor className="text-white" />
        </button>

        <button
          onClick={leaveMeeting}
          className="p-3 rounded-full bg-rose-600 hover:bg-rose-700"
        >
          <LogOut className="text-white" />
        </button>
      </div>
    </div>
  );
}
