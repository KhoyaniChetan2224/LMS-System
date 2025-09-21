import React from "react";
import AdminHeader from "./Admin Header/header";

    const homeworkList = [
        {
            id: 1,
            title: "Math Assignment 1",
            dueDate: "2023-10-15",
            description: "Complete the exercises on page 42-45.",
        },
        {
            id: 2,
            title: "Science Project",
            dueDate: "2023-10-20",
            description: "Prepare a presentation on renewable energy sources.",
        },
        {
            id: 3,
            title: "History Essay",
            dueDate: "2023-10-18",
            description: "Write an essay on the causes of World War II.",
        },
        {
            id: 4,
            title: "English Literature Review",
            dueDate: "2023-10-22",
            description: "Review the novel 'To Kill a Mockingbird' and summarize its themes.",
        },
        {
            id: 5,
            title: "Mathematics Quiz",
            dueDate: "2023-10-25",
            description: "Prepare for the upcoming quiz on calculus.",
        }
    ];

const Homework = () => {

    return (
        <div className="flex h-screen font-sans bg-cyan-50">
            {/* Sidebar */}
            <AdminHeader />

            {/* Main Content */}
            <div className="ml-2 mr-2 mt-2 flex-1 space-y-6 p-4 sm:p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">Student Homework</h1>

                <ul className="space-y-2">
                    {homeworkList.map((hw) => (
                        <li key={hw.id} className="bg-white p-4 rounded shadow">
                            <h2 className="text-xl font-semibold">{hw.title}</h2>
                            <p className="text-gray-600">Due Date: {hw.dueDate}</p>
                            <p className="mt-2">{hw.description}</p>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Submit
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Homework;
