import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTasks, FaProjectDiagram, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import '../../assets/UserDashboard.css'

export const UserDashboard = () => {
    const [user, setUser] = useState([]);
    const [task, setTask] = useState([]);
    const [projects, setProjects] = useState([]);

    const allUser = async () => {
        try {
            const res = await axios.get("http://localhost:4000/users");
            setUser(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const allTask = async () => {
        try {
            const res = await axios.get("http://localhost:4000/task/all");
            setTask(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const allProject = async () => {
        try {
            const res = await axios.get("http://localhost:4000/project/allprojects");
            setProjects(res.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        allUser();
        allTask();
        allProject();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-heading">User Dashboard</h1>

            {/* Stats Cards */}
            <div className="dashboard-stats">
                <div className="stat-card card-blue">
                    <FaTasks size={30} />
                    <div className="stat-info">
                        <h2>Tasks</h2>
                        <p>{task.length} Active</p>
                    </div>
                </div>

                <div className="stat-card card-green">
                    <FaProjectDiagram size={30} />
                    <div className="stat-info">
                        <h2>Projects</h2>
                        <p>{projects.length} Ongoing</p>
                    </div>
                </div>

                <div className="stat-card card-yellow">
                    <FaUsers size={30} />
                    <div className="stat-info">
                        <h2>Team Members</h2>
                        <p>{user.length} Connected</p>
                    </div>
                </div>

                <div className="stat-card card-purple">
                    <FaChartBar size={30} />
                    <div className="stat-info">
                        <h2>Reports</h2>
                        <p>View Insights</p>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
                <Link to="/user/myTasks" className="quick-link">Manage Tasks</Link>
                <Link to="/user/userProject" className="quick-link">View Projects</Link>
                <Link to="/user/helpandSupport" className="quick-link">Help & Support</Link>
                <Link to="/user/userteam" className="quick-link">User Team</Link>
            </div>
        </div>
    );
};

export default UserDashboard;
