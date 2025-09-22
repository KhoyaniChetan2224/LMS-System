// LiveClassJoin.jsx
import React, { useState } from "react";
import { Copy, Share2, Link as LinkIcon, Video } from "lucide-react";

export default function LiveClassJoin() {
  const [meetingLink, setMeetingLink] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  // Generate random Google Meet-like link (demo only)
  const generateLink = () => {
    const id = Math.random().toString(36).substring(2, 12);
    const newLink = `https://meet.google.com/${id}`;
    setGeneratedLink(newLink);
    setMeetingLink(newLink);
  };

  // Copy link to clipboard
  const copyToClipboard = () => {
    if (meetingLink) {
      navigator.clipboard.writeText(meetingLink);
      alert("Meeting link copied!");
    }
  };

  // Share link via Web Share API
  const shareLink = async () => {
    if (navigator.share && meetingLink) {
      await navigator.share({
        title: "Join Live Class",
        text: "Click to join the live class",
        url: meetingLink,
      });
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  // Join Google Meet
  const joinMeeting = () => {
    if (meetingLink) {
      window.open(meetingLink, "_blank"); // open Google Meet in new tab
    } else {
      alert("Please enter or generate a meeting link.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <Video className="w-12 h-12 text-indigo-600 mb-2" />
          <h1 className="text-2xl font-bold text-indigo-700">
            🎓 Join Live Class
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Enter or generate a Google Meet link to join your class.
          </p>
        </div>

        {/* Meeting Input */}
        <input
          type="text"
          placeholder="Paste Google Meet link..."
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={joinMeeting}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Join Class
          </button>

          <button
            onClick={generateLink}
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition flex items-center justify-center gap-2"
          >
            <LinkIcon size={18} /> Generate Meeting Link
          </button>
        </div>

        {/* Share Section */}
        {generatedLink && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Share this meeting link:
            </p>
            <input
              type="text"
              readOnly
              value={generatedLink}
              className="w-full px-3 py-2 border rounded mb-3"
            />
            <div className="flex justify-center gap-3">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                <Copy size={16} /> Copy
              </button>
              <button
                onClick={shareLink}
                className="flex items-center gap-1 px-3 py-2 bg-blue-200 rounded-lg hover:bg-blue-300"
              >
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
