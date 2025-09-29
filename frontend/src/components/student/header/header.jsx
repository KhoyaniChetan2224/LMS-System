import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../img/logo.jpeg';
import { IoHome } from 'react-icons/io5';
import { MdMonetizationOn, MdUpcoming, MdAssignment, MdHistory, MdQuiz, MdReport } from 'react-icons/md';
import { IoCalendar } from 'react-icons/io5';

const AdminHeader = () => {
    const [image, setImage] = useState(
        "https://static.vecteezy.com/system/resources/previews/029/921/980/non_2x/flat-web-template-with-lms-for-concept-design-concept-of-learning-management-system-vector.jpg"
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative flex flex-col h-screen">

            {/* Mobile Menu Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-all duration-300"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-label="Toggle sidebar"
            >
                <div className="w-6 h-5 flex flex-col justify-between">
                    <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isSidebarOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isSidebarOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
            </button>

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          md:relative md:transform-none
          w-64 text-gray-900 shadow-lg p-6 flex flex-col h-full rounded-r-2xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          bg-stone-50 text-black
        `}
            >
                <div className="flex w-full h-20 items-center justify-center mb-8">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-full h-full rounded-full object-cover border-4 animate-bounce border-slate-700"
                    />
                </div>
                <nav className="flex-1 space-y-2">
                    {[
                        { icon: <IoHome />, name: "Home", path: "/student/home" },
                        { icon: <IoCalendar />, name: "Schedule a Trial Class", path: "/student/schedule-class" },
                        { icon: <MdUpcoming />, name: "Upcoming Live Classes", path: "/student/upcoming-live-class" },
                        { icon: <MdAssignment />, name: "My Homework", path: "/student/student-homework" },
                        { icon: <MdAssignment />, name: "Past Classes", path: "/student/student-past-classes" },
                        { icon: <MdQuiz />, name: "Test Yourself", path: "/student/test-yourself" },
                        { icon: <MdReport />, name: "Progress Report", path: "/student/progress-report" }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-300 hover:text-slate-950 transition font-medium text-sm md:text-base"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <div className="text-lg">{item.icon}</div>
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => {
                        localStorage.removeItem('adminToken');
                        window.location.href = '/';
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition text-sm md:text-base mt-4"
                >
                    Logout for Student...!
                </button>
            </aside>
        </div>
    );
};

export default AdminHeader;
