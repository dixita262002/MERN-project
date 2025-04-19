import React, { useState, useEffect } from "react";
import { FaFileAlt, FaEye, FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const MyReports = () => {
 
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Mock API call to fetch user reports
        setReports([
            { id: 1, title: "Project Progress Report", date: "2025-03-28", status: "Completed" },
            { id: 2, title: "Bug Tracking Report", date: "2025-03-25", status: "In Progress" },
            { id: 3, title: "Sprint Review Report", date: "2025-03-22", status: "Pending" },
            { id: 4, title: "Team Performance Report", date: "2025-03-18", status: "Completed" },
            { id: 5, title: "Task Completion Summary", date: "2025-03-15", status: "In Progress" },
        ]);
    }, []);

    // Function to get status icon and color
    const getStatus = (status) => {
        switch (status) {
            case "Completed":
                return <FaCheckCircle className="text-green-500" size={18} />;
            case "In Progress":
                return <FaSpinner className="text-blue-500 animate-spin" size={18} />;
            case "Pending":
                return <FaTimesCircle className="text-red-500" size={18} />;
            default:
                return <FaFileAlt className="text-gray-500" size={18} />;
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Reports</h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {reports.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3">Title</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report) => (
                                <tr key={report.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{report.title}</td>
                                    <td className="p-3">{report.date}</td>
                                    <td className="p-3 flex items-center space-x-2">
                                        {getStatus(report.status)}
                                        <span>{report.status}</span>
                                    </td>
                                    <td className="p-3 text-center">
                                        <button className="text-blue-500 hover:text-blue-700">
                                            <FaEye size={18} /> {/* View Report */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="p-4 text-gray-500">No reports found.</p>
                )}
            </div>
        </div>
    );
};

export default MyReports;