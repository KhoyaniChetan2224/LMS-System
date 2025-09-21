import React from 'react'
import AdminHeader from './Admin Header/header'

    const pastClasses = [
        {
            id: 1,
            title: "Class 1: Introduction to React",
            date: "2025-09-22",
            description: "An introductory class on React.js covering components, state, and props.",
        },
        {
            id: 2,
            title: "Class 2: Advanced React Patterns",
            date: "2025-09-22",
            description: "A deep dive into advanced patterns in React.js, including hooks and context.",
        },
        {
            id: 3,
            title: "Class 3: State Management with Redux",
            date: "2025-09-22",
            description: "Learn how to manage state in your React applications using Redux.",
        },
        {
            id: 4,
            title: "Class 4: Building RESTful APIs",
            date: "2025-09-22",
            description: "An introduction to building RESTful APIs with Node.js and Express.",
        },
        {
            id: 5,
            title: "Class 5: Database Integration",
            date: "2025-09-22",
            description: "Learn how to integrate databases like MongoDB with your Node.js applications.",
        }
    ];

const PastClasses = () => {
  return (
    <div className="flex h-screen font-sans bg-cyan-50">
            {/* Sidebar */}
            <AdminHeader />

            {/* Main Content */}
            <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">student Past Classes</h1>

                <ul className="space-y-2">
                    {pastClasses.map((classItem) => (
                        <li key={classItem.id} className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{classItem.title}</h2>
                            <p className="text-gray-600">Date: {classItem.date}</p>
                            <p className="mt-2">Description: {classItem.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
                
      
    </div>
  )
}

export default PastClasses
