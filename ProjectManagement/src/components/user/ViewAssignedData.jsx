/*
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAssignedData = () => {
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Admin - Task & Project View</h2>

      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setView("tasks")}
          className={`px-6 py-2 rounded ${view === "tasks" ? "bg-blue-600" : "bg-blue-500"} text-white`}
        >
          View Task Table
        </button>
        <button
          onClick={() => setView("projects")}
          className={`px-6 py-2 rounded ${view === "projects" ? "bg-green-600" : "bg-green-500"} text-white`}
        >
          View Project Table
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Tasks Table */
      /*{view === "tasks" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">All Tasks</h3>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border p-2">Task Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Priority</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Start Date</th>
                  <th className="border p-2">End Date</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="border p-2">{task.taskName}</td>
                    <td className="border p-2">{task.description}</td>
                    <td className="border p-2">{task.priority}</td>
                    <td className="border p-2">{task.status}</td>
                    <td className="border p-2">{new Date(task.startDate).toLocaleDateString()}</td>
                    <td className="border p-2">{new Date(task.endDate).toLocaleDateString()}</td>
                    <td className="border p-2 flex gap-2">
                      <button onClick={() => handleEdit(task, "task")} className="text-blue-600 underline">Edit</button>
                      <button onClick={() => handleDelete(task._id, "task")} className="text-red-600 underline">Delete</button>
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
          <h3 className="text-xl font-semibold mb-4">All Projects</h3>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Technology</th>
                  <th className="border p-2">Start Date</th>
                  <th className="border p-2">Completion Date</th>
                  <th className="border p-2">Assigned User</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td className="border p-2">{project.title}</td>
                    <td className="border p-2">{project.description}</td>
                    <td className="border p-2">{project.technology}</td>
                    <td className="border p-2">{new Date(project.startDate).toLocaleDateString()}</td>
                    <td className="border p-2">{new Date(project.completionDate).toLocaleDateString()}</td>
                    <td className="border p-2">{project.assignedUserId}</td>
                    <td className="border p-2 flex gap-2">
                      <button onClick={() => handleEdit(project, "project")} className="text-blue-600 underline">Edit</button>
                      <button onClick={() => handleDelete(project._id, "project")} className="text-red-600 underline">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */
      /*{selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Edit {modalType === "task" ? "Task" : "Project"}</h3>
            <input
              type="text"
              value={selectedItem.taskName || selectedItem.title || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, taskName: modalType === "task" ? e.target.value : undefined, title: modalType === "project" ? e.target.value : undefined })
              }
              className="border p-2 w-full mb-4"
              placeholder={modalType === "task" ? "Task Name" : "Project Title"}
            />
            <textarea
              value={selectedItem.description}
              onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
              className="border p-2 w-full mb-4"
              placeholder="Description"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setSelectedItem(null)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleModalSave} className="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAssignedData;
*/


import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAssignedData = () => {
  const [view, setView] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null); // 'task', 'project'
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
      } else if (type === "project") {
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
      } else if (modalType === "project") {
        await axios.put(`http://localhost:4000/project/updateproject/${selectedItem._id}`, selectedItem);
        fetchProjects();
      }
      setSelectedItem(null);
    } catch {
      alert("Failed to update.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Admin - Task & Project View</h2>

      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setView("tasks")}
          className={`px-6 py-2 rounded ${view === "tasks" ? "bg-blue-600" : "bg-blue-500"} text-white`}
        >
          View Tasks
        </button>
        <button
          onClick={() => setView("projects")}
          className={`px-6 py-2 rounded ${view === "projects" ? "bg-green-600" : "bg-green-500"} text-white`}
        >
          View Projects
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Tasks Table */}
      {view === "tasks" && (
        <div>
          <h3 className="text-xl font-semibold mb-4">All Tasks</h3>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border p-2">Task Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Priority</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Start Date</th>
                  <th className="border p-2">End Date</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="border p-2">{task.taskName}</td>
                    <td className="border p-2">{task.description}</td>
                    <td className="border p-2">{task.priority}</td>
                    <td className="border p-2">{task.status}</td>
                    <td className="border p-2">{new Date(task.startDate).toLocaleDateString()}</td>
                    <td className="border p-2">{new Date(task.endDate).toLocaleDateString()}</td>
                    <td className="border p-2 flex gap-2">
                      <button onClick={() => handleEdit(task, "task")} className="text-blue-600 underline">Edit</button>
                      <button onClick={() => handleDelete(task._id, "task")} className="text-red-600 underline">Delete</button>
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
          <h3 className="text-xl font-semibold mb-4">All Projects</h3>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="border p-2">Title</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Technology</th>
                  <th className="border p-2">Start Date</th>
                  <th className="border p-2">Completion Date</th>
                  <th className="border p-2">Assigned User</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project._id}>
                    <td className="border p-2">{project.title}</td>
                    <td className="border p-2">{project.description}</td>
                    <td className="border p-2">{project.technology}</td>
                    <td className="border p-2">{new Date(project.startDate).toLocaleDateString()}</td>
                    <td className="border p-2">{new Date(project.completionDate).toLocaleDateString()}</td>
                    <td className="border p-2">{project.assignedUserId}</td>
                    <td className="border p-2 flex gap-2">
                      <button onClick={() => handleEdit(project, "project")} className="text-blue-600 underline">Edit</button>
                      <button onClick={() => handleDelete(project._id, "project")} className="text-red-600 underline">Delete</button>
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
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h3 className="text-lg font-bold mb-4">Edit {modalType === "task" ? "Task" : "Project"}</h3>
            <input
              type="text"
              value={selectedItem.taskName || selectedItem.title || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, taskName: modalType === "task" ? e.target.value : undefined, title: modalType === "project" ? e.target.value : undefined })
              }
              className="border p-2 w-full mb-4"
              placeholder={modalType === "task" ? "Task Name" : "Project Title"}
            />
            <textarea
              value={selectedItem.description}
              onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
              className="border p-2 w-full mb-4"
              placeholder="Description"
            />
            <div className="flex justify-end gap-4">
              <button onClick={() => setSelectedItem(null)} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleModalSave} className="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAssignedData;
