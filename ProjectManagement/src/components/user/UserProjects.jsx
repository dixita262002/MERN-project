import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
//import "./UserProjects.css";
import '../../assets/UserProjects.css'

const UserProjects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const allProject = async () => {
    try {
      const res = await axios.get("http://localhost:4000/project/allprojects");
      if (Array.isArray(res.data)) {
        setProjects(res.data);
        setError("");
      } else if (res.data && Array.isArray(res.data.data)) {
        setProjects(res.data.data);
        setError("");
      } else {
        throw new Error("Unexpected data format.");
      }
    } catch (err) {
      console.error("Error fetching projects:", err.message);
      setProjects([]);
      setError("Failed to fetch projects. Please try again later.");
    }
  };

  useEffect(() => {
    allProject();
  }, []);

  const filteredProjects =
    filter === "All" ? projects : projects.filter((proj) => proj.status === filter);

  const renderStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <FaCheckCircle className="icon green" />;
      case "In Progress":
        return <FaClock className="icon yellow" />;
      case "Pending":
        return <FaTimesCircle className="icon red" />;
      default:
        return null;
    }
  };

  return (
    <div className="user-projects-container">
      <h1 className="title">My Projects</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="filter-container">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="dropdown"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="project-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-info">
                <h2>{project.title}</h2>
                <p>Description: {project.description || "N/A"}</p>
                <p>Technology: {project.technology || "N/A"}</p>
                <p>Start Date: {new Date(project.startDate).toLocaleDateString()}</p>
                <p>Completion Date: {new Date(project.completionDate).toLocaleDateString()}</p>
                {project.imageURL && (
                  <img
                    src={project.imageURL}
                    alt={project.title}
                    className="project-image"
                  />
                )}
              </div>
              <div className={`status-badge ${project.status.toLowerCase().replace(" ", "-")}`}>
                {renderStatusIcon(project.status)}
                <span>{project.status}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProjects;
