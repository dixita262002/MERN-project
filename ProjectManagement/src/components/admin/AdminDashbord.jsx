import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaTasks,
  FaProjectDiagram,
  FaUsers,
  FaChartBar,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/AdminDashBord.css";

export const AdminDashbord = () => {
  const [user, setUser] = useState([]);
  const [task, setTask] = useState([]);
  const [projects, setProjects] = useState([]);

  const allUser = async () => {
    const res = await axios.get("http://localhost:4000/users");
    setUser(res.data);
  };

  const allTask = async () => {
    const res = await axios.get("http://localhost:4000/task/all");
    setTask(res.data);
  };

  const allProject = async () => {
    const res = await axios.get("http://localhost:4000/project/allprojects");
    setProjects(res.data);
  };

  useEffect(() => {
    allUser();
    allTask();
    allProject();
  }, []);

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="dashboard-stats">
        <div className="dashboard-card blue-card">
          <FaTasks size={40} className="icon" />
          <div>
            <h2>Tasks</h2>
            <p>{task.length} Active</p>
          </div>
        </div>

        <div className="dashboard-card green-card">
          <FaProjectDiagram size={40} className="icon" />
          <div>
            <h2>Projects</h2>
            <p>{projects.length} Ongoing</p>
          </div>
        </div>

        <div className="dashboard-card yellow-card">
          <FaUsers size={40} className="icon" />
          <div>
            <h2>Users</h2>
            <p>{user.length} Connected</p>
          </div>
        </div>

        <div className="dashboard-card purple-card">
          <FaChartBar size={40} className="icon" />
          <div>
            <h2>Reports</h2>
            <p>View Insights</p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <h2 className="section-title">Quick Links</h2>
        <div className="link-grid">
          <Link to="/admin/manageUsers" className="link-card">Manage Users</Link>
          <Link to="/admin/ManageTasks" className="link-card">Manage Tasks</Link>
          <Link to="/admin/manageProject" className="link-card">Manage Projects</Link>
          <Link to="/admin/AdminSettings" className="link-card">Admin Settings</Link>
          <Link to="/admin/TaskProjectView" className="link-card">TaskProjectView</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashbord;
