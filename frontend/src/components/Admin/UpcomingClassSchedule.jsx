// import React from 'react'
// import AdminHeader from './Admin Header/header'

// const UpcomingClassSchedule = () => {

    

//   return (
//     <div className="flex h-screen font-sans bg-cyan-50">
//             {/* Sidebar */}
//             <AdminHeader />

//             {/* Main Content */}
//             <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
                
//             </div>


//     </div>
//   )
// }

// export default UpcomingClassSchedule

import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Calendar,
  Users,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import AdminHeader from "./Admin Header/header";

export default function LMSUpcomingClasses() {
  const [active, setActive] = useState("Schedule");

  // Mock class data
  const upcomingClasses = [
    {
      id: 1,
      course: "Mathematics - Algebra",
      instructor: "Dr. Smith",
      date: "Mon, Sep 22",
      time: "10:00 AM - 11:30 AM",
      mode: "Online",
    },
    {
      id: 2,
      course: "Science - Physics",
      instructor: "Prof. Johnson",
      date: "Tue, Sep 23",
      time: "2:00 PM - 3:30 PM",
      mode: "Classroom",
    },
    {
      id: 3,
      course: "English Literature",
      instructor: "Ms. Taylor",
      date: "Wed, Sep 24",
      time: "9:00 AM - 10:30 AM",
      mode: "Online",
    },
  ];

  // Weekly schedule mock
  const weeklySchedule = {
    Monday: ["Mathematics (10:00 AM)", "Biology (3:00 PM)"],
    Tuesday: ["Physics (2:00 PM)"],
    Wednesday: ["English (9:00 AM)"],
    Thursday: [],
    Friday: ["Chemistry (1:00 PM)"],
    Saturday: ["History (11:00 AM)"],
    Sunday: [],
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <AdminHeader />

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        

        {/* Upcoming Classes */}
        <section className="p-6 overflow-y-auto flex-1">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Upcoming Classes
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-600">{cls.course}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Instructor: {cls.instructor}
                </p>
                <p className="text-sm text-gray-500 mt-1">{cls.date}</p>
                <p className="text-sm text-gray-500">{cls.time}</p>
                <span className="text-xs px-2 py-1 mt-2 inline-block rounded bg-blue-100 text-blue-600">
                  {cls.mode}
                </span>
              </div>
            ))}
          </div>

          {/* Weekly Schedule */}
          <h2 className="text-xl font-bold text-gray-700 mt-8 mb-4">
            Weekly Schedule
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Object.entries(weeklySchedule).map(([day, classes]) => (
              <div
                key={day}
                className="bg-white rounded-lg p-3 shadow hover:shadow-md transition"
              >
                <h4 className="font-semibold text-blue-600 mb-2">{day}</h4>
                {classes.length > 0 ? (
                  classes.map((c, i) => (
                    <p
                      key={i}
                      className="text-sm text-gray-600 border-l-2 border-blue-500 pl-2 mb-1"
                    >
                      {c}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">No Classes</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
