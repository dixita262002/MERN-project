import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from "recharts";
//import "./Reports.css"; // import your CSS file

const AMReport = () => {
    const [taskStats, setTaskStats] = useState([]);
    const [recentReports, setRecentReports] = useState([]);

    useEffect(() => {
        const taskStatusData = [
            { status: "Pending", count: 42 },
            { status: "In Progress", count: 28 },
            { status: "Completed", count: 65 },
        ];
        setTaskStats(taskStatusData);

        const dummyReports = [
            { id: 1, project: "Website Revamp", task: "UI Design", status: "Completed", date: "2025-04-09" },
            { id: 2, project: "App Launch", task: "API Integration", status: "In Progress", date: "2025-04-08" },
            { id: 3, project: "CRM Setup", task: "Database Design", status: "Pending", date: "2025-04-07" },
        ];
        setRecentReports(dummyReports);
    }, []);

    return (
        <div className="reports-container">
            <h1 className="reports-title">Admin Reports</h1>

            {/* Summary Cards */}
            <div className="reports-summary">
                <div className="summary-card">
                    <h2>Total Projects</h2>
                    <p className="summary-number blue">14</p>
                </div>
                <div className="summary-card">
                    <h2>Completed Tasks</h2>
                    <p className="summary-number green">128</p>
                </div>
                <div className="summary-card">
                    <h2>Active Team Members</h2>
                    <p className="summary-number purple">24</p>
                </div>
            </div>

            {/* Graph */}
            <div className="reports-graph">
                <h2 className="graph-title">Task Status Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={taskStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#6366f1" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="reports-table">
                <table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Task</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentReports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.project}</td>
                                <td>{report.task}</td>
                                <td>
                                    <span className={`status-badge ${report.status.replace(" ", "").toLowerCase()}`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td>{report.date}</td>
                            </tr>
                        ))}
                        {recentReports.length === 0 && (
                            <tr>
                                <td colSpan="4" className="no-data">No recent reports.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AMReport;
