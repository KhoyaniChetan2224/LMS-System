import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  LogOut,
  Users,
  MessageSquare,
  Smile,
  BarChart2,
  Send,
} from "lucide-react";

export default function LiveClassRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  const { student, meeting, participants: initialParticipants } =
    location.state || {};

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [participants, setParticipants] = useState(initialParticipants || []);
  const [localStream, setLocalStream] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({ question: "", options: "" });
  const [reaction, setReaction] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const videoRef = useRef(null);
  const screenRef = useRef(null);
  const reactionTimeoutRef = useRef(null);

  useEffect(() => {
    if (!student || !meeting) navigate("/");

    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing media devices:", err);
      }
    };
    startMedia();

    return () => {
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const toggleMic = () => {
    if (localStream)
      localStream.getAudioTracks().forEach((t) => (t.enabled = !t.enabled));
    setMicOn((prev) => !prev);
  };

  const toggleCam = () => {
    if (localStream)
      localStream.getVideoTracks().forEach((t) => (t.enabled = !t.enabled));
    setCamOn((prev) => !prev);
  };

  const toggleShare = async () => {
    if (!sharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (screenRef.current) screenRef.current.srcObject = screenStream;
        setSharing(true);
        screenStream.getVideoTracks()[0].onended = stopShare;
      } catch (err) {
        console.error("Error starting screen share:", err);
      }
    } else stopShare();
  };

  const stopShare = () => {
    if (screenRef.current?.srcObject) {
      screenRef.current.srcObject.getTracks().forEach((t) => t.stop());
      screenRef.current.srcObject = null;
    }
    setSharing(false);
  };

  const leaveMeeting = () => {
    if (localStream) localStream.getTracks().forEach((t) => t.stop());
    stopShare();
    navigate("/admin/live/Additional%20Mathematics");
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const msg = { sender: student.name, text: newMessage };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const showReaction = (emoji) => {
    if (reactionTimeoutRef.current)
      clearTimeout(reactionTimeoutRef.current);

    setReaction({ emoji, sender: student.name });
    reactionTimeoutRef.current = setTimeout(
      () => setReaction(null),
      1600
    );
  };

  const createPoll = () => {
    if (!newPoll.question || !newPoll.options) return;
    const poll = {
      question: newPoll.question,
      options: newPoll.options
        .split(",")
        .map((opt) => ({ text: opt.trim(), votes: 0 })),
    };
    setPolls([...polls, poll]);
    setNewPoll({ question: "", options: "" });
  };

  const votePoll = (pi, oi) => {
    const updated = [...polls];
    updated[pi].options[oi].votes++;
    setPolls(updated);
  };

  if (!student || !meeting) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* HEADER */}
      <header className="bg-gray-800 flex justify-between items-center px-4 py-3 border-b border-gray-700">
        <button
          className="md:hidden flex flex-col gap-1 w-8 h-8 justify-center items-center group"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span
            className={`w-6 h-[3px] bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 rounded transition-all duration-500 ${
              sidebarOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          ></span>
          <span
            className={`w-6 h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded transition-all duration-500 ${
              sidebarOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`w-6 h-[3px] bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded transition-all duration-500 ${
              sidebarOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          ></span>
        </button>

        <h1 className="text-lg font-semibold">🎥 Live Classroom</h1>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-5 h-5 text-gray-300" />
          <span>{participants.length} Participants</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-1 overflow-hidden">
        {/* VIDEO GRID */}
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="relative bg-black rounded-xl overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${
                camOn ? "" : "hidden"
              } rounded-xl`}
            ></video>
            {!camOn && (
              <div className="text-4xl text-gray-500 font-bold">
                {student.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black/60 text-xs px-2 py-1 rounded">
              {student.name} (You)
            </div>
          </div>

          {participants.map((p) => (
            <div
              key={p.id}
              className="relative bg-black rounded-xl overflow-hidden flex items-center justify-center"
            >
              <div className="text-gray-400 text-lg">{p.name}'s Camera</div>
              <div className="absolute bottom-2 left-2 bg-black/60 text-xs px-2 py-1 rounded">
                {p.name}
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR */}
        <aside
          className={`fixed md:static top-0 right-0 w-72 h-full md:h-auto bg-gray-800 border-l border-gray-700 flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          }`}
        >
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            {[
              ["chat", MessageSquare, "Chat"],
              ["reactions", Smile, "Reactions"],
              ["polls", BarChart2, "Polls"],
            ].map(([tab, Icon, label]) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold ${
                  activeTab === tab
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="inline w-4 h-4 mr-1" /> {label}
              </button>
            ))}
          </div>

          {/* CHAT */}
          {activeTab === "chat" && (
            <div className="flex flex-col flex-1">
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                {messages.length === 0 ? (
                  <p className="text-gray-400 text-center mt-10">
                    No messages yet.
                  </p>
                ) : (
                  messages.map((msg, i) => (
                    <div key={i} className="text-sm">
                      <span className="font-semibold text-indigo-400">
                        {msg.sender}:
                      </span>{" "}
                      {msg.text}
                    </div>
                  ))
                )}
              </div>
              <div className="flex items-center border-t border-gray-700 p-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 outline-none text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* REACTIONS */}
          {activeTab === "reactions" && (
            <div className="flex flex-col items-center justify-center flex-1 gap-4 relative">
              <div className="grid grid-cols-3 gap-3">
                {["👍", "❤️", "✋", "👏", "😂", "😎", "😘", "🙏", "🎉"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => showReaction(emoji)}
                    className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-2xl"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              {reaction && (
                <div className="absolute -top-4 left-4 animate-bounce">
                  <div className="bg-white/10 px-3 py-2 rounded-xl text-3xl">
                    {reaction.emoji}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* POLLS */}
          {activeTab === "polls" && (
            <div className="flex flex-col flex-1 p-4 space-y-4 overflow-y-auto">
              <div className="bg-gray-700 p-3 rounded-lg">
                <input
                  value={newPoll.question}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, question: e.target.value })
                  }
                  placeholder="Poll question"
                  className="w-full bg-gray-600 rounded px-2 py-1 mb-2 text-sm"
                />
                <input
                  value={newPoll.options}
                  onChange={(e) =>
                    setNewPoll({ ...newPoll, options: e.target.value })
                  }
                  placeholder="Options (comma separated)"
                  className="w-full bg-gray-600 rounded px-2 py-1 mb-2 text-sm"
                />
                <button
                  onClick={createPoll}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-sm py-1 rounded"
                >
                  Create Poll
                </button>
              </div>

              {polls.length === 0 ? (
                <p className="text-gray-400 text-center mt-6">
                  No polls yet.
                </p>
              ) : (
                polls.map((poll, i) => (
                  <div
                    key={i}
                    className="bg-gray-700 p-3 rounded-lg space-y-2 text-sm"
                  >
                    <p className="font-semibold">{poll.question}</p>
                    {poll.options.map((opt, j) => (
                      <button
                        key={j}
                        onClick={() => votePoll(i, j)}
                        className="w-full bg-gray-600 hover:bg-gray-500 rounded px-2 py-1 flex justify-between"
                      >
                        <span>{opt.text}</span>
                        <span>{opt.votes} votes</span>
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          )}
        </aside>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 py-4 flex justify-center flex-wrap gap-4 border-t border-gray-700">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full ${
            micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600"
          }`}
          title={micOn ? "Mute microphone" : "Unmute microphone"}
        >
          {micOn ? <Mic /> : <MicOff />}
        </button>

        <button
          onClick={toggleCam}
          className={`p-3 rounded-full ${
            camOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600"
          }`}
          title={camOn ? "Turn off camera" : "Turn on camera"}
        >
          {camOn ? <Video /> : <VideoOff />}
        </button>

        <button
          onClick={toggleShare}
          className={`p-3 rounded-full ${
            sharing ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          title="Share screen"
        >
          <Monitor />
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
          title="Open chat"
        >
          <MessageSquare />
        </button>

        <button
          onClick={() => setActiveTab("reactions")}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
          title="Open reactions"
        >
          <Smile />
        </button>

        <button
          onClick={() => setActiveTab("polls")}
          className="p-3 rounded-full bg-gray-700 hover:bg-gray-600"
          title="Open polls"
        >
          <BarChart2 />
        </button>

        <button
          onClick={leaveMeeting}
          className="p-3 rounded-full bg-rose-600 hover:bg-rose-700"
          title="Leave meeting"
        >
          <LogOut />
        </button>
      </footer>
    </div>
  );
}
