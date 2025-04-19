/*import React, { useState, useEffect } from "react";
import axios from "axios";
//import "./AdminTaskProjectView.css"; // Import the CSS file
import '../../assets/AdminTaskProjectView.css'

export const AdminTaskProjectView = () => {
  
  const [view, setView] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'task' or 'project'
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/task/all");
      setTasks(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch {
      setError("Failed to fetch tasks.");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:4000/project/allprojects");
      setProjects(Array.isArray(res.data.data) ? res.data.data : []);
      setError(null);
    } catch {
      setError("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    if (view === "tasks") fetchTasks();
    if (view === "projects") fetchProjects();
  }, [view]);

  const handleEdit = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "task") {
        await axios.delete(`http://localhost:4000/task/taskdelete/${id}`);
        fetchTasks();
      } else {
        await axios.delete(`http://localhost:4000/project/deleteproject/${id}`);
        fetchProjects();
      }
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const handleModalSave = async () => {
    try {
      if (modalType === "task") {
        await axios.put(`http://localhost:4000/task/updatetask/${selectedItem._id}`, selectedItem);
        fetchTasks();
      } else {
        await axios.put(`http://localhost:4000/project/updateproject/${selectedItem._id}`, selectedItem);
        fetchProjects();
      }
      setSelectedItem(null);
    } catch {
      alert("Failed to update.");
    }
  };

  return (
    <div className="container">
      {/* Hide header and buttons if a table view is selected */
     /* {view === null && (
        <>
          <h2 className="header">Admin - Task & Project View</h2>
          <div className="button-group">
            <button
              onClick={() => setView("tasks")}
              className={`btn ${view === "tasks" ? "btn-active" : "btn-inactive"}`}
            >
              View Task Table
            </button>
            <button
              onClick={() => setView("projects")}
              className={`btn ${view === "projects" ? "btn-active" : "btn-inactive"}`}
            >
              View Project Table
            </button>
          </div>
        </>
      )}

      {error && <p className="error">{error}</p>}

      {/* Tasks Table */
      /*{view === "tasks" && (
        <div>
          <h3 className="sub-header">All Tasks</h3>
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-cell">Task Name</th>
                  <th className="table-cell">Description</th>
                  <th className="table-cell">Priority</th>
                  <th className="table-cell">Status</th>
                  <th className="table-cell">Start Date</th>
                  <th className="table-cell">End Date</th>
                  <th className="table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="table-cell">{task.taskName}</td>
                    <td className="table-cell">{task.description}</td>
                    <td className="table-cell">{task.priority}</td>
                    <td className="table-cell">{task.status}</td>
                    <td className="table-cell">{new Date(task.startDate).toLocaleDateString()}</td>
                    <td className="table-cell">{new Date(task.endDate).toLocaleDateString()}</td>
                    <td className="table-cell actions">
                      <button onClick={() => handleEdit(task, "task")} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(task._id, "task")} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects Table */
      /*{view === "projects" && (
        <div>
          <h3 className="sub-header">All Projects</h3>
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-cell">Title</th>
                  <th className="table-cell">Description</th>
                  <th className="table-cell">Technology</th>
                  <th className="table-cell">Start Date</th>
                  <th className="table-cell">Completion Date</th>
                  <th className="table-cell">Assigned User</th>
                  <th className="table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td className="table-cell">{project.title}</td>
                    <td className="table-cell">{project.description}</td>
                    <td className="table-cell">{project.technology}</td>
                    <td className="table-cell">{new Date(project.startDate).toLocaleDateString()}</td>
                    <td className="table-cell">{new Date(project.completionDate).toLocaleDateString()}</td>
                    <td className="table-cell">{project.assignedUserId}</td>
                    <td className="table-cell actions">
                      <button onClick={() => handleEdit(project, "project")} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(project._id, "project")} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */
     /* {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-header">Edit {modalType === "task" ? "Task" : "Project"}</h3>
            <input
              type="text"
              value={selectedItem.taskName || selectedItem.title || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, taskName: modalType === "task" ? e.target.value : undefined, title: modalType === "project" ? e.target.value : undefined })
              }
              className="modal-input"
              placeholder={modalType === "task" ? "Task Name" : "Project Title"}
            />
            <textarea
              value={selectedItem.description}
              onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
              className="modal-input"
              placeholder="Description"
            />
            <div className="modal-buttons">
              <button onClick={() => setSelectedItem(null)} className="cancel-btn">Cancel</button>
              <button onClick={handleModalSave} className="save-btn">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTaskProjectView;
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../assets/AdminTaskProjectView.css';

export const AdminTaskProjectView = () => {
  const [view, setView] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:4000/task/all");
      setTasks(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch {
      setError("Failed to fetch tasks.");
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:4000/project/allprojects");
      setProjects(Array.isArray(res.data.data) ? res.data.data : []);
      setError(null);
    } catch {
      setError("Failed to fetch projects.");
    }
  };

  useEffect(() => {
    if (view === "tasks") fetchTasks();
    if (view === "projects") fetchProjects();
  }, [view]);

  const handleEdit = (item, type) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "task") {
        await axios.delete(`http://localhost:4000/task/taskdelete/${id}`);
        fetchTasks();
      } else {
        await axios.delete(`http://localhost:4000/project/deleteproject/${id}`);
        fetchProjects();
      }
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const handleModalSave = async () => {
    try {
      if (modalType === "task") {
        await axios.put(`http://localhost:4000/task/updatetask/${selectedItem._id}`, selectedItem);
        fetchTasks();
      } else {
        await axios.put(`http://localhost:4000/project/updateproject/${selectedItem._id}`, selectedItem);
        fetchProjects();
      }
      setSelectedItem(null);
    } catch {
      alert("Failed to update.");
    }
  };

  return (
    <div className="container">
      {view === null && (
        <>
          <h2 className="header">Admin - Task & Project View</h2>
          <div className="button-group">
            <button
              onClick={() => setView("tasks")}
              className={`btn ${view === "tasks" ? "btn-active" : "btn-inactive"}`}
            >
              View Task Table
            </button>
            <button
              onClick={() => setView("projects")}
              className={`btn ${view === "projects" ? "btn-active" : "btn-inactive"}`}
            >
              View Project Table
            </button>
          </div>
        </>
      )}

      {error && <p className="error">{error}</p>}

      {/* Tasks Table */}
      {view === "tasks" && (
        <div>
          <button onClick={() => setView(null)} className="back-btn">← Back</button>
          <h3 className="sub-header">All Tasks</h3>
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-cell">Task Name</th>
                  <th className="table-cell">Description</th>
                  <th className="table-cell">Priority</th>
                  <th className="table-cell">Status</th>
                  <th className="table-cell">Start Date</th>
                  <th className="table-cell">End Date</th>
                  <th className="table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="table-cell">{task.taskName}</td>
                    <td className="table-cell">{task.description}</td>
                    <td className="table-cell">{task.priority}</td>
                    <td className="table-cell">{task.status}</td>
                    <td className="table-cell">{new Date(task.startDate).toLocaleDateString()}</td>
                    <td className="table-cell">{new Date(task.endDate).toLocaleDateString()}</td>
                    <td className="table-cell actions">
                      <button onClick={() => handleEdit(task, "task")} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(task._id, "task")} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projects Table */}
      {view === "projects" && (
        <div>
          <button onClick={() => setView(null)} className="back-btn">← Back</button>
          <h3 className="sub-header">All Projects</h3>
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th className="table-cell">Title</th>
                  <th className="table-cell">Description</th>
                  <th className="table-cell">Technology</th>
                  <th className="table-cell">Start Date</th>
                  <th className="table-cell">Completion Date</th>
                  <th className="table-cell">Assigned User</th>
                  <th className="table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td className="table-cell">{project.title}</td>
                    <td className="table-cell">{project.description}</td>
                    <td className="table-cell">{project.technology}</td>
                    <td className="table-cell">{new Date(project.startDate).toLocaleDateString()}</td>
                    <td className="table-cell">{new Date(project.completionDate).toLocaleDateString()}</td>
                    <td className="table-cell">{project.assignedUserId}</td>
                    <td className="table-cell actions">
                      <button onClick={() => handleEdit(project, "project")} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(project._id, "project")} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-header">Edit {modalType === "task" ? "Task" : "Project"}</h3>
            <input
              type="text"
              value={selectedItem.taskName || selectedItem.title || ""}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  taskName: modalType === "task" ? e.target.value : undefined,
                  title: modalType === "project" ? e.target.value : undefined
                })
              }
              className="modal-input"
              placeholder={modalType === "task" ? "Task Name" : "Project Title"}
            />
            <textarea
              value={selectedItem.description}
              onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
              className="modal-input"
              placeholder="Description"
            />
            <div className="modal-buttons">
              <button onClick={() => setSelectedItem(null)} className="cancel-btn">Cancel</button>
              <button onClick={handleModalSave} className="save-btn">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTaskProjectView;
