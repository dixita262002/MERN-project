import React, { useEffect, useState } from "react";
import {
  FaTasks,
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaPlus,
  FaProjectDiagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../assets/Dashboard.css';

export const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const getAllTask = async () => {
    try {
      const res = await axios.get("http://localhost:4000/task/all");
      setTasks(res.data);
    } catch (err) {
      console.error("Task fetch error:", err);
    }
  };

  const getAllProjects = async () => {
    try {
      const res = await axios.get("http://localhost:4000/project/all");
      setProjects(res.data);
    } catch (err) {
      console.error("Project fetch error:", err);
    }
  };

  useEffect(() => {
    getAllTask();
    getAllProjects();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Project Manager Dashboard</h1>
        <p>Welcome back! Here's an overview of the Smart Parking System project.</p>
      </div>

      <div className="stats-grid">
        <Card icon={<FaTasks />} label="Total Tasks"  value="4" />
        <Card icon={<FaProjectDiagram />} label="Total Projects"  value="5" />
        
      </div>

      <div className="dashboard-grid">
        <div className="timeline-box">
          <h2>Project Timeline</h2>
          <div className="timeline-steps">
            <TimelineStep phase="Planning" status="Completed" />
            <TimelineStep phase="Development" status="In Progress" />
            <TimelineStep phase="Testing" status="Pending" />
            <TimelineStep phase="Deployment" status="Pending" />
          </div>
        </div>

        <div className="quick-actions-box">
          <h2>Quick Actions</h2>
          <ul className="quick-actions-list">
            <Link to="/projectmanager/managetasks">
              <ActionItem icon={<FaPlus />} label="Add New Task" value={tasks.length} />
            </Link>
            <Link to="/projectmanager/myprojects">
              <ActionItem icon={<FaCalendarAlt />} label="Assign Project" value={projects.length} />
            </Link>
            <Link to="/projectmanager/assignTeam">
              <ActionItem icon={<FaUsers />} label="Manage Team" value={3} />
            </Link>
            <Link to="/projectmanager/taskview">
              <ActionItem icon={<FaUsers />} label="Task Review" value={tasks.length} />
            </Link>
            <Link to="/projectmanager/projectscreen">
              <ActionItem icon={<FaUsers />} label="Project Review" value={1} />
            </Link>
            <li>
              <ActionItem icon={<FaCheckCircle />} label="Generate Report" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon, label, value }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <div>
      <p className="card-label">{label}</p>
      <h3 className="card-value">{value}</h3>
    </div>
  </div>
);

const TimelineStep = ({ phase, status }) => {
  const statusClass = {
    Completed: "status-completed",
    "In Progress": "status-progress",
    Pending: "status-pending",
  }[status];

  return (
    <div className="timeline-step">
      <span>{phase}</span>
      <span className={`status-text ${statusClass}`}>{status}</span>
    </div>
  );
};

const ActionItem = ({ icon, label, value }) => (
  <li className="action-item">
    <div className="action-content">
      <span className="action-icon">{icon}</span>
      <span>{label}</span>
    </div>
    {value !== undefined && <span className="action-badge">{value}</span>}
  </li>
);
