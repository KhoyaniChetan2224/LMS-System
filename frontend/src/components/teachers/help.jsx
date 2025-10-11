import React, { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    Mail,
    MessageCircle,
    Send,
    X,
    CheckCheck,
} from "lucide-react";
import TeacherHeader from "./header/header";

export default function HelpPage({ role = "Teacher" }) {
    const [openIndex, setOpenIndex] = useState(null);
    const [chatOpen, setChatOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    // 🎓 FAQs for Teacher and Admin
    const faqs = {
        Teacher: [
            {
                q: "How can I create a new course?",
                a: "Go to the 'Courses' tab and click on 'Create Course'. Fill in the details and upload your materials.",
            },
            {
                q: "How do I upload lesson files?",
                a: "Inside your course, open the 'Lessons' section and click 'Upload File'. Supported formats: PDF, Word, and Video.",
            },
            {
                q: "How can I track student progress?",
                a: "Navigate to 'Students' → select a student → view their progress reports and performance analytics.",
            },
        ],
        Admin: [
            {
                q: "How do I manage user accounts?",
                a: "Go to 'Admin Dashboard' → 'Users'. From there, you can add, edit, or remove user accounts.",
            },
            {
                q: "How do I generate reports?",
                a: "Under the 'Reports' section in the Admin Panel, you can export reports in PDF or Excel format.",
            },
            {
                q: "How to assign roles (Teacher/Admin/Student)?",
                a: "Go to 'Users' → select a user → choose a role from the dropdown and click 'Save'.",
            },
        ],
    };

    // 🧭 Auto-scroll messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 💬 Send message with time & tick updates
    const handleSend = () => {
        if (message.trim() === "") return;

        const newMsg = {
            id: Date.now(),
            from: "user",
            text: message,
            status: "sent", // will change to seen
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, newMsg]);
        setMessage("");

        // 🤖 Simulate bot response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    from: "bot",
                    text: "Thanks for reaching out! Our support team will get back to you shortly.",
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
            ]);
        }, 2000);

        // ✅ Change tick to "seen" after 2s
        setTimeout(() => {
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === newMsg.id ? { ...m, status: "seen" } : m
                )
            );
        }, 1000);
    };

    // 🟦 Mark all as seen when chat opens
    useEffect(() => {
        if (chatOpen) {
            setMessages((prev) =>
                prev.map((m) =>
                    m.from === "user" ? { ...m, status: "seen" } : m
                )
            );
        }
    }, [chatOpen]);

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
                        Find answers to common questions and get support anytime.
                    </p>
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">FAQs</h2>
                    {faqs[role].map((faq, i) => (
                        <div
                            key={i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="border-b pb-3 last:border-b-0 cursor-pointer transition-all duration-300"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-gray-800 font-medium">{faq.q}</p>
                                {openIndex === i ? (
                                    <ChevronUp className="text-indigo-600" />
                                ) : (
                                    <ChevronDown className="text-gray-500" />
                                )}
                            </div>
                            {openIndex === i && (
                                <p className="text-gray-600 mt-2">{faq.a}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Support Section */}
                <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-6 text-center">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Still need help?
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Our support team is here for you. Contact us via email or start a live chat below.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="mailto:support@skillsharp365innovation.elementfx.com"
                            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                        >
                            <Mail size={18} /> Email Support
                        </a>
                        <button
                            onClick={() => setChatOpen(true)}
                            className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            <MessageCircle size={18} /> Live Chat
                        </button>
                    </div>
                </div>
            </div>

            {/* 💬 Floating Live Chat Popup */}
            {/* 💬 Floating Live Chat Popup */}
            {chatOpen && (
                <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden z-50 animate-fadeIn">
                    {/* Header */}
                    <div className="flex items-center justify-between bg-green-600 text-white px-4 py-2">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={18} />
                            <span className="font-semibold">Live Chat Support</span>
                        </div>
                        <button
                            onClick={() => setChatOpen(false)}
                            className="hover:text-gray-200 transition"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2 
      scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 
      max-h-[400px] scroll-smooth"
                    >
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 text-sm mt-20">
                                👋 Hi there! How can we assist you today?
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`relative max-w-[80%] p-2 rounded-lg text-sm break-words ${msg.from === "user"
                                        ? "bg-emerald-200 text-black ml-auto"
                                        : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <div className="text-[10px] mt-1 flex items-center justify-end gap-1">
                                    <span>{msg.time}</span>
                                    {msg.from === "user" && (
                                        <CheckCheck
                                            size={14}
                                            className={`${msg.status === "seen" ? "text-blue-500" : "text-gray-300"
                                                }`}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Section */}
                    <div className="flex items-center gap-2 border-t p-2 bg-white">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={handleSend}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
