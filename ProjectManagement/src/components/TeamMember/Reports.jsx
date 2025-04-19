/*import React, { useState, useEffect } from "react";
import { FaFileAlt, FaEye, FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Mock API call to fetch team member reports
        setReports([
            { id: 1, title: "Project Progress Report", date: "2025-03-28", status: "Completed" },
            { id: 2, title: "Bug Tracking Report", date: "2025-03-25", status: "In Progress" },
            { id: 3, title: "Sprint Review Report", date: "2025-03-22", status: "Pending" },
            { id: 4, title: "Team Performance Report", date: "2025-03-18", status: "Completed" },
            { id: 5, title: "Task Completion Summary", date: "2025-03-15", status: "In Progress" },
        ]);
    }, []);

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-5xl">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    📄 Team Member Reports
                </h1>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                    {reports.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {reports.map((report) => (
                                    <tr key={report.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {report.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {report.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center space-x-2 text-gray-700">
                                            {getStatus(report.status)}
                                            <span>{report.status}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-blue-600 hover:text-blue-800 transition duration-150">
                                                <FaEye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="p-6 text-gray-500 text-center">No reports found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
*/

import React, { useState, useEffect } from "react";
import { FaFileAlt, FaEye, FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        setReports([
            { id: 1, title: "Project Progress Report", date: "2025-03-28", status: "Completed" },
            { id: 2, title: "Bug Tracking Report", date: "2025-03-25", status: "In Progress" },
            { id: 3, title: "Sprint Review Report", date: "2025-03-22", status: "Pending" },
            { id: 4, title: "Team Performance Report", date: "2025-03-18", status: "Completed" },
            { id: 5, title: "Task Completion Summary", date: "2025-03-15", status: "In Progress" },
        ]);
    }, []);

    const getStatus = (status) => {
        switch (status) {
            case "Completed":
                return <FaCheckCircle className="status-icon green" size={18} />;
            case "In Progress":
                return <FaSpinner className="status-icon blue spin" size={18} />;
            case "Pending":
                return <FaTimesCircle className="status-icon red" size={18} />;
            default:
                return <FaFileAlt className="status-icon gray" size={18} />;
        }
    };

    return (
        <div className="reports-container">
            <div className="reports-wrapper">
                <h1 className="reports-heading">📄 Team Member Reports</h1>

                <div className="reports-table-container">
                    {reports.length > 0 ? (
                        <table className="reports-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.map((report) => (
                                    <tr key={report.id}>
                                        <td>{report.title}</td>
                                        <td>{report.date}</td>
                                        <td className="status-cell">
                                            {getStatus(report.status)}
                                            <span>{report.status}</span>
                                        </td>
                                        <td className="action-cell">
                                            <button className="view-btn">
                                                <FaEye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="no-reports">No reports found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
