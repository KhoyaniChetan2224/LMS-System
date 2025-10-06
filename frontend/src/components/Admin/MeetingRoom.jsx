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
  Share2,
} from "lucide-react";

export default function LiveClassRoom() {
  const location = useLocation();
  const navigate = useNavigate();

  // Receive student, meeting, participants
  const { student, meeting, participants: initialParticipants } =
    location.state || {};

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [participants, setParticipants] = useState(initialParticipants || []);
  const [localStream, setLocalStream] = useState(null);

  const videoRef = useRef(null);
  const screenRef = useRef(null);

  // ✅ Redirect if data missing
  useEffect(() => {
    if (!student || !meeting) navigate("/");
  }, [student, meeting, navigate]);

  // ✅ Initialize local camera + mic
  useEffect(() => {
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
      // Cleanup on leave
      if (localStream) {
        localStream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // ✅ Mic toggle
  const toggleMic = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setMicOn((prev) => !prev);
  };

  // ✅ Camera toggle
  const toggleCam = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
    }
    setCamOn((prev) => !prev);
  };

  // ✅ Screen share
  const toggleShare = async () => {
    if (!sharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (screenRef.current) {
          screenRef.current.srcObject = screenStream;
        }
        setSharing(true);

        screenStream.getVideoTracks()[0].onended = () => {
          stopShare();
        };
      } catch (err) {
        console.error("Error starting screen share:", err);
      }
    } else {
      stopShare();
    }
  };

  const stopShare = () => {
    if (screenRef.current && screenRef.current.srcObject) {
      const tracks = screenRef.current.srcObject.getTracks();
      tracks.forEach((t) => t.stop());
      screenRef.current.srcObject = null;
    }
    setSharing(false);
  };

  // ✅ Leave meeting
  const leaveMeeting = () => {
    if (localStream) {
      localStream.getTracks().forEach((t) => t.stop());
    }
    stopShare();
    navigate("/");
  };

  if (!student || !meeting) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 flex justify-between items-center px-6 py-3 border-b border-gray-700">
        <div>
          <h1 className="text-lg font-semibold">🎥 Google Meeting</h1>
        </div>
        <div className="flex items-center gap-4">
          <Users className="w-5 h-5 text-gray-300" />
          <span className="text-sm">{participants.length} Participants</span>
        </div>
      </header>

      {/* Main Video Section */}
      <main className="flex flex-1 overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Your own camera */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-md flex items-center justify-center">
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
              <div className="text-gray-500 text-4xl font-bold">
                {student.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 text-xs rounded">
              {student.name} (You)
            </div>
          </div>

          {/* Other participants */}
          {participants.map((p) => (
            <div
              key={p.id}
              className="relative bg-black rounded-xl overflow-hidden shadow-md flex items-center justify-center"
            >
              <div className="text-gray-400 text-lg">{p.name}'s camera</div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 text-xs rounded">
                {p.name}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: Screen share preview + participants */}
        <aside className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Screen Share
            </h2>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            {sharing ? (
              <video
                ref={screenRef}
                autoPlay
                playsInline
                muted
                className="rounded-xl w-full"
              ></video>
            ) : (
              <div className="text-gray-500 text-center py-10 text-sm">
                No one is sharing screen
              </div>
            )}
          </div>

          <div className="border-t border-gray-700 p-4">
            <h3 className="text-md font-semibold mb-2">Participants</h3>
            <ul className="space-y-2">
              {[student, ...participants].map((p, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg"
                >
                  <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-sm">
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{p.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>

      {/* Footer Controls */}
      <footer className="bg-gray-800 py-4 flex justify-center gap-6 border-t border-gray-700">
        <button
          onClick={toggleMic}
          className={`p-3 rounded-full transition ${
            micOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600"
          }`}
        >
          {micOn ? <Mic className="text-white" /> : <MicOff className="text-white" />}
        </button>

        <button
          onClick={toggleCam}
          className={`p-3 rounded-full transition ${
            camOn ? "bg-gray-700 hover:bg-gray-600" : "bg-red-600"
          }`}
        >
          {camOn ? (
            <Video className="text-white" />
          ) : (
            <VideoOff className="text-white" />
          )}
        </button>

        <button
          onClick={toggleShare}
          className={`p-3 rounded-full transition ${
            sharing ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <Monitor className="text-white" />
        </button>

        <button
          onClick={leaveMeeting}
          className="p-3 rounded-full bg-rose-600 hover:bg-rose-700 transition"
        >
          <LogOut className="text-white" />
        </button>
      </footer>
    </div>
  );
}
