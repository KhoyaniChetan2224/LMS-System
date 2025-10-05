import React, { useState, useEffect } from "react";
import {
  Copy,
  Share2,
  Video,
  Users,
  Lock,
  Unlock,
  XCircle,
  Link as LinkIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Utility: Generate a random Meet-like link
const generateMeetLink = () => {
  const id = Math.random().toString(36).substring(2, 10);
  return `https://meet.google.com/${id}`;
};

export default function MeetPage() {
  const [meeting, setMeeting] = useState(null); // meeting object
  const [students, setStudents] = useState([]); // student list
  const [joinInput, setJoinInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

  // Generate meeting link
  const createMeeting = () => {
    const newMeeting = {
      link: generateMeetLink(),
      locked: false,
      ended: false,
    };
    setMeeting(newMeeting);
    setMessage("✅ Meeting created successfully!");
  };

  // Copy to clipboard
  const copyLink = () => {
    if (!meeting) return setMessage("⚠️ No meeting to copy.");
    navigator.clipboard.writeText(meeting.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share link
  const shareLink = async () => {
    if (!meeting) return setMessage("⚠️ No meeting to share.");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my Live Class",
          text: "Click to join:",
          url: meeting.link,
        });
      } catch {
        setMessage("❌ Share cancelled or failed.");
      }
    } else {
      copyLink();
      setMessage("📋 Link copied instead (share not supported).");
    }
  };

  // Student joins meeting
  // Student joins meeting
const joinMeeting = (fromButton = false) => {
  if (!meeting) return setMessage("⚠️ Please create a meeting first.");
  if (!nameInput.trim()) return setMessage("⚠️ Enter your name to join.");
  if (meeting.locked) return setMessage("🔒 Meeting is locked.");
  if (meeting.ended) return setMessage("❌ Meeting has ended.");

  const newStudent = {
    id: Date.now(),
    name: nameInput,
    joinedAt: new Date().toLocaleTimeString(),
  };

  // Add student to list
  const updatedStudents = [newStudent, ...students];
  setStudents(updatedStudents);
  setJoinInput(meeting.link);
  setMessage(`🎉 ${nameInput} joined the class.`);

  if (fromButton) {
    // navigate to a "meeting room" page and send all students
    navigate("/admin/meeting-room", {
      state: { student: newStudent, meeting, participants: updatedStudents },
    });
  }
};


  // Lock / Unlock meeting
  const toggleLock = () => {
    if (!meeting) return;
    setMeeting((prev) => ({ ...prev, locked: !prev.locked }));
  };

  // End meeting
  const endMeeting = () => {
    if (!meeting) return;
    setMeeting((prev) => ({ ...prev, ended: true }));
    setMessage("❌ Meeting ended.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Video className="w-10 h-10 text-indigo-600" />
            <h1 className="text-2xl font-bold text-indigo-700">
              Google Meet – Live Class
            </h1>
          </div>
          <Users className="w-6 h-6 text-gray-500" />
        </div>

        {/* Meeting controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Teacher section */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Teacher Controls</h2>

            <button
              onClick={createMeeting}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition mb-3"
            >
              🎓 Create New Meeting
            </button>

            {meeting && (
              <>
                <div className="mb-3">
                  <label className="text-sm text-gray-600">
                    Meeting Link:
                  </label>
                  <input
                    type="text"
                    value={meeting.link}
                    readOnly
                    className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100"
                  />
                </div>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={copyLink}
                    className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded hover:bg-gray-300"
                  >
                    <Copy size={16} /> {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={shareLink}
                    className="flex items-center gap-2 bg-blue-200 px-3 py-2 rounded hover:bg-blue-300"
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={toggleLock}
                    className={`flex items-center gap-2 px-3 py-2 rounded ${
                      meeting.locked
                        ? "bg-red-200 hover:bg-red-300"
                        : "bg-green-200 hover:bg-green-300"
                    }`}
                  >
                    {meeting.locked ? (
                      <>
                        <Lock size={16} /> Locked
                      </>
                    ) : (
                      <>
                        <Unlock size={16} /> Unlock
                      </>
                    )}
                  </button>
                  <button
                    onClick={endMeeting}
                    className="flex items-center gap-2 bg-rose-500 text-white px-3 py-2 rounded hover:bg-rose-600"
                  >
                    <XCircle size={16} /> End
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Student join section */}
          <div className="bg-gray-50 p-5 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Join Meeting</h2>

            <input
              type="text"
              placeholder="Enter your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
            />

            <input
              type="text"
              placeholder="Paste or generate meeting link..."
              value={joinInput}
              onChange={(e) => setJoinInput(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
            />

            <button
              onClick={() => joinMeeting(true)}
              className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 transition"
            >
              🚀 Join Class
            </button>
          </div>
        </div>

        {/* Participants */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Participants</h2>
          <div className="bg-gray-50 rounded-xl p-5 max-h-64 overflow-y-auto">
            {students.length === 0 ? (
              <p className="text-sm text-gray-500">No students joined yet.</p>
            ) : (
              students.map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center font-semibold text-indigo-700">
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-gray-500">
                        Joined at {s.joinedAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Messages */}
        {message && (
          <div className="mt-6 p-3 bg-yellow-100 text-yellow-700 rounded-lg text-sm">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
