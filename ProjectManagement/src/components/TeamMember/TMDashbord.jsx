// src/components/team/TeamMemberDashboard.jsx
/*import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import React from 'react';

export const TMDashboard = ({ teamMemberId }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');
  const [comment, setComment] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [fileUploads, setFileUploads] = useState({});

  // Fetch tasks based on team member ID
  const getTasksByTeamMemberId = async () => {
    if (!teamMemberId) {
      console.error('Error: teamMemberId is undefined.');
      alert('Team Member ID is missing. Please provide a valid ID.');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:3000/task/getTasksByTeamMember/${teamMemberId}`);
      console.log('Fetched tasks:', res.data);
      setTasks(res.data?.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err.message);
      alert('Failed to fetch tasks. Please try again later.');
    }
  };

  useEffect(() => {
    // Fetch tasks when teamMemberId changes
    getTasksByTeamMemberId();
  }, [teamMemberId]);

  // Filter tasks by status
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  // Complete a task and refresh the task list
  const completeTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:3000/task/complete/${taskId}`);
      alert('Task marked as completed!');
      await getTasksByTeamMemberId(); // Refresh task list
    } catch (err) {
      console.error('Error marking task as complete:', err.message);
      alert('Failed to mark task as complete. Please try again.');
    }
  };

  // Submit a comment to a task
  const submitComment = async () => {
    if (!selectedTaskId || !comment.trim()) {
      alert('Please select a task and write a comment.');
      return;
    }

    try {
      await axios.post(`http://localhost:3000/task/comment/${selectedTaskId}`, {
        text: comment.trim(),
        authorId: teamMemberId,
      });
      setComment('');
      alert('Comment added successfully!');
      await getTasksByTeamMemberId(); // Refresh tasks
    } catch (err) {
      console.error('Error adding comment:', err.message);
      alert('Failed to add comment. Please try again.');
    }
  };

  // Upload a file for a specific task
  const uploadFile = async (taskId) => {
    const file = fileUploads[taskId];
    if (!file) {
      alert('No file selected for upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskId);

    try {
      await axios.post(`http://localhost:3000/tasks/upload/${taskId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully!');
    } catch (err) {
      console.error('Upload error:', err.message);
      alert('Failed to upload file. Please try again.');
    }
  };

  // Export tasks to an Excel file
  const exportToExcel = () => {
    const data = tasks.map((t) => ({
      Title: t.title,
      Description: t.description,
      Status: t.status,
    }));
    const sheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Tasks');
    XLSX.writeFile(workbook, 'Task_Report.xlsx');
    alert('Task report downloaded successfully!');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">🧑‍💻 Team Member Dashboard</h1>
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-1 rounded shadow">
          Download Report
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {['All', 'Pending', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <div key={task._id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-lg font-semibold">{task.taskName}</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.status === 'Completed' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'
                }`}
              >
                {task.status}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-3">{task.description}</p>

            <div className="mb-2 flex items-center gap-2">
              <input
                type="file"
                onChange={(e) => setFileUploads({ ...fileUploads, [task._id]: e.target.files[0] })}
              />
              <button
                onClick={() => uploadFile(task._id)}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
              >
                Upload
              </button>
            </div>

            <div className="flex gap-2 mb-2">
              {task.status !== 'Completed' && (
                <button
                  onClick={() => completeTask(task._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  Mark as Completed
                </button>
              )}
              <button
                onClick={() => setSelectedTaskId(selectedTaskId === task._id ? null : task._id)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
              >
                {selectedTaskId === task._id ? 'Hide Comments' : 'View/Add Comments'}
              </button>
            </div>

            {selectedTaskId === task._id && (
              <div className="mt-2">
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  rows={2}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={submitComment}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Submit Comment
                </button>
              </div>
            )}

            {task.comments && task.comments.length > 0 && (
              <div className="mt-3 bg-gray-50 p-2 rounded">
                <h4 className="font-semibold text-sm mb-1">💬 Comments:</h4>
                {task.comments.map((c, idx) => (
                  <p key={idx} className="text-xs text-gray-700 mb-1">- {c.text}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
*/

/*import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTasks, FaProjectDiagram, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';

export const TMDashboard = ({ teamMemberId }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [comment, setComment] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [fileUploads, setFileUploads] = useState({});

  const getData = async () => {
    try {
      const [tasksRes, projectsRes, teamRes] = await Promise.all([
        axios.get(`http://localhost:3000/task/getTasksByTeamMember/${teamMemberId}`),
        axios.get("http://localhost:3000/project/all"),
        axios.get("http://localhost:3000/teamMember/allteammembers"),
      ]);
      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
      setTeamMembers(teamRes.data.data);
    } catch (err) {
      console.error("Data fetch error:", err);
    }
  };

  useEffect(() => {
    if (teamMemberId) getData();
  }, [teamMemberId]);

  const filteredTasks = tasks.filter(task => (filter === "All" ? true : task.status === filter));

  const completeTask = async (taskId) => {
    await axios.put(`http://localhost:3000/task/complete/${taskId}`);
    getData();
  };

  const submitComment = async () => {
    if (!selectedTaskId || !comment.trim()) return alert('Select a task and add comment.');
    await axios.post(`http://localhost:3000/task/comment/${selectedTaskId}`, {
      text: comment,
      authorId: teamMemberId,
    });
    setComment('');
    getData();
  };

  const uploadFile = async (taskId) => {
    const file = fileUploads[taskId];
    if (!file) return alert('No file selected.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskId);

    await axios.post(`http://localhost:3000/tasks/upload/${taskId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('File uploaded!');
  };

  const exportToExcel = () => {
    const data = tasks.map(t => ({
      Title: t.title,
      Description: t.description,
      Status: t.status,
    }));
    const sheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Tasks');
    XLSX.writeFile(wb, 'TeamMember_Task_Report.xlsx');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🧑‍💻 Team Member Dashboard</h1>
        <button onClick={exportToExcel} className="bg-green-600 text-white px-4 py-2 rounded shadow">
          Download Report
        </button>
      </div>

      {/* Dashboard Cards */
      /*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaTasks size={28} />} title="Tasks" value={`${tasks.length} Active`} bg="bg-blue-500" />
        <Card icon={<FaProjectDiagram size={28} />} title="Projects" value={`${projects.length} Ongoing`} bg="bg-green-500" />
        <Card icon={<FaUsers size={28} />} title="Team Members" value={`${teamMembers.length} Connected`} bg="bg-yellow-500" />
        <Card icon={<FaChartBar size={28} />} title="Reports" value="View Insights" bg="bg-purple-500" />
      </div>

      {/* Filter Buttons */
     /* <div className="flex gap-4 mb-4">
        {['All', 'Pending', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Task List */
      /*<div className="grid gap-4">
        {filteredTasks.map(task => (
          <div key={task._id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">{task.taskName}</h2>
              <span className={`px-3 py-1 rounded-full text-sm ${task.status === 'Completed' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'}`}>
                {task.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>

            {/* Upload Section */
           /* <div className="mb-2 flex items-center gap-2">
              <input
                type="file"
                onChange={(e) => setFileUploads({ ...fileUploads, [task._id]: e.target.files[0] })}
              />
              <button
                onClick={() => uploadFile(task._id)}
                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
              >
                Upload
              </button>
            </div>

            <div className="flex gap-2 mb-2">
              {task.status !== 'Completed' && (
                <button onClick={() => completeTask(task._id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  Mark as Completed
                </button>
              )}
              <button
                onClick={() => setSelectedTaskId(selectedTaskId === task._id ? null : task._id)}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm"
              >
                {selectedTaskId === task._id ? 'Hide Comments' : 'View/Add Comments'}
              </button>
            </div>

            {/* Comment Section */
           /* {selectedTaskId === task._id && (
              <div className="mt-2">
                <textarea
                  className="w-full p-2 border rounded mb-2"
                  rows={2}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={submitComment} className="bg-green-600 text-white px-3 py-1 rounded">
                  Submit Comment
                </button>
              </div>
            )}

            {/* Display Comments */
           /* {task.comments?.length > 0 && (
              <div className="mt-3 bg-gray-50 p-2 rounded">
                <h4 className="font-semibold text-sm mb-1">💬 Comments:</h4>
                {task.comments.map((c, i) => (
                  <p key={i} className="text-xs text-gray-700">- {c.text}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable Card component
const Card = ({ icon, title, value, bg }) => (
  <div className={`${bg} text-white p-4 rounded-lg flex items-center`}>
    {icon}
    <div className="ml-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p>{value}</p>
    </div>
  </div>
);
*/
{/************************************************************** 
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTasks, FaProjectDiagram, FaUsers, FaChartBar } from "react-icons/fa";
import * as XLSX from 'xlsx';

export const TMDashboard = ({ teamMemberId }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [comment, setComment] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [fileUploads, setFileUploads] = useState({});

  const getData = async () => {
    try {
      const [tasksRes, projectsRes, teamRes] = await Promise.all([
        axios.get(`http://localhost:3000/task/getTasksByTeamMember/${teamMemberId}`),
        axios.get("http://localhost:3000/project/all"),
        axios.get("http://localhost:3000/teamMember/allteammembers"),
      ]);
      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
      setTeamMembers(teamRes.data.data);
    } catch (err) {
      console.error("Data fetch error:", err);
    }
  };

  useEffect(() => {
    if (teamMemberId) getData();
  }, [teamMemberId]);

  const filteredTasks = tasks.filter(task => (filter === "All" ? true : task.status === filter));

  const completeTask = async (taskId) => {
    await axios.put(`http://localhost:3000/task/complete/${taskId}`);
    getData();
  };

  const submitComment = async () => {
    if (!selectedTaskId || !comment.trim()) return alert('Select a task and add comment.');
    await axios.post(`http://localhost:3000/task/comment/${selectedTaskId}`, {
      text: comment,
      authorId: teamMemberId,
    });
    setComment('');
    getData();
  };

  const uploadFile = async (taskId) => {
    const file = fileUploads[taskId];
    if (!file) return alert('No file selected.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskId);

    await axios.post(`http://localhost:3000/tasks/upload/${taskId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('File uploaded!');
  };

  const exportToExcel = () => {
    const data = tasks.map(t => ({
      Title: t.title,
      Description: t.description,
      Status: t.status,
    }));
    const sheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Tasks');
    XLSX.writeFile(wb, 'TeamMember_Task_Report.xlsx');
  };

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">🧑‍💻 Team Member Dashboard</h1>
        <button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700 text-dark px-4 py-2 rounded shadow-md">
          ⬇️ Download Report
        </button>
      </div>

      {/* Dashboard Cards */
      /*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaTasks size={28} />} title="Tasks" value={`${tasks.length} Active`} bg="bg-blue-500" />
        <Card icon={<FaProjectDiagram size={28} />} title="Projects" value={`${projects.length} Ongoing`} bg="bg-green-500" />
        <Card icon={<FaUsers size={28} />} title="Team Members" value={`${teamMembers.length} Connected`} bg="bg-yellow-500" />
        <Card icon={<FaChartBar size={28} />} title="Reports" value="View Insights" bg="bg-purple-500" />
      </div>

      {/* Filter Buttons */
      /*<div className="flex gap-3 mb-5">
        {['All', 'Pending', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === status ? 'bg-blue-600 text-dark' : 'bg-white text-gray-700 border'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Task List */
      /*<div className="grid gap-5">
        {filteredTasks.map(task => (
          <div key={task._id} className="bg-white p-5 rounded-xl shadow border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-blue-800">{task.taskName}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.status === 'Completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {task.status}
              </span>
            </div>
            <p className="text-blue-600 mb-4">{task.description}</p>

            <div className="flex items-center gap-3 mb-3">
              <input
                type="file"
                onChange={(e) => setFileUploads({ ...fileUploads, [task._id]: e.target.files[0] })}
                className="text-sm"
              />
              <button
                onClick={() => uploadFile(task._id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-dark px-3 py-1 rounded text-sm"
              >
                📤 Upload
              </button>
            </div>

            <div className="flex gap-3 mb-3">
              {task.status !== 'Completed' && (
                <button onClick={() => completeTask(task._id)} className="bg-blue-600 hover:bg-blue-700 text-dark px-3 py-1 rounded text-sm">
                  ✅ Mark as Completed
                </button>
              )}
              <button
                onClick={() => setSelectedTaskId(selectedTaskId === task._id ? null : task._id)}
                className="bg-gray-600 hover:bg-gray-700 text-dark px-3 py-1 rounded text-sm"
              >
                {selectedTaskId === task._id ? 'Hide Comments' : '💬 View/Add Comments'}
              </button>
            </div>

            {selectedTaskId === task._id && (
              <div className="mt-3">
                <textarea
                  className="w-full p-2 border border-dark-300 rounded mb-2"
                  rows={2}
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button onClick={submitComment} className="bg-green-600 hover:bg-dark-700 text-white px-4 py-1 rounded">
                  Submit Comment
                </button>
              </div>
            )}

            {task.comments?.length > 0 && (
              <div className="mt-4 bg-gray-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-sm mb-2 text-gray-800">💬 Comments:</h4>
                {task.comments.map((c, i) => (
                  <p key={i} className="text-sm text-blue-700">- {c.text}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable Card component
const Card = ({ icon, title, value, bg }) => (
  <div className={`${bg} text-dark p-4 rounded-xl shadow-lg flex items-center`}>
    {icon}
    <div className="ml-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);     
*****************************************/}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTasks, FaProjectDiagram, FaUsers, FaChartBar } from "react-icons/fa";
import * as XLSX from 'xlsx';


export const TMDashboard = ({ teamMemberId }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [filter, setFilter] = useState('All');
  const [comment, setComment] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [fileUploads, setFileUploads] = useState({});

  const getData = async () => {
    try {
      const [tasksRes, projectsRes, teamRes] = await Promise.all([
        axios.get(`http://localhost:3000/task/getTasksByTeamMember/${teamMemberId}`),
        axios.get("http://localhost:3000/project/all"),
        axios.get("http://localhost:3000/teamMember/allteammembers"),
      ]);
      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
      setTeamMembers(teamRes.data.data);
    } catch (err) {
      console.error("Data fetch error:", err);
    }
  };

  useEffect(() => {
    if (teamMemberId) getData();
  }, [teamMemberId]);

  const filteredTasks = tasks.filter(task => (filter === "All" ? true : task.status === filter));

  const completeTask = async (taskId) => {
    await axios.put(`http://localhost:3000/task/complete/${taskId}`);
    getData();
  };

  const submitComment = async () => {
    if (!selectedTaskId || !comment.trim()) return alert('Select a task and add comment.');
    await axios.post(`http://localhost:3000/task/comment/${selectedTaskId}`, {
      text: comment,
      authorId: teamMemberId,
    });
    setComment('');
    getData();
  };

  const uploadFile = async (taskId) => {
    const file = fileUploads[taskId];
    if (!file) return alert('No file selected.');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskId);

    await axios.post(`http://localhost:3000/tasks/upload/${taskId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    alert('File uploaded!');
  };

  const exportToExcel = () => {
    const data = tasks.map(t => ({
      Title: t.title,
      Description: t.description,
      Status: t.status,
    }));
    const sheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Tasks');
    XLSX.writeFile(wb, 'TeamMember_Task_Report.xlsx');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">🧑‍💻 Team Member Dashboard</h1>
        <button onClick={exportToExcel} className="download-btn">⬇️ Download Report</button>
      </div>

      {/* Cards */}
      <div className="cards-grid">
        <Card icon={<FaTasks size={28} />} title="Tasks" value={`${tasks.length} Active`} bg="card-blue" />
        <Card icon={<FaProjectDiagram size={28} />} title="Projects" value={`${projects.length} Ongoing`} bg="card-green" />
        <Card icon={<FaUsers size={28} />} title="Team Members" value={`${teamMembers.length} Connected`} bg="card-yellow" />
        <Card icon={<FaChartBar size={28} />} title="Reports" value="View Insights" bg="card-purple" />
      </div>

      {/* Filters */}
      <div className="filter-buttons">
        {['All', 'Pending', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tasks */}
      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task._id} className="task-card">
            <div className="task-header">
              <h2>{task.taskName}</h2>
              <span className={`status-badge ${task.status.toLowerCase()}`}>{task.status}</span>
            </div>
            <p className="task-desc">{task.description}</p>

            <div className="task-actions">
              <input
                type="file"
                onChange={(e) => setFileUploads({ ...fileUploads, [task._id]: e.target.files[0] })}
              />
              <button onClick={() => uploadFile(task._id)}>📤 Upload</button>
            </div>

            <div className="task-buttons">
              {task.status !== 'Completed' && (
                <button onClick={() => completeTask(task._id)}>✅ Mark as Completed</button>
              )}
              <button onClick={() => setSelectedTaskId(selectedTaskId === task._id ? null : task._id)}>
                {selectedTaskId === task._id ? 'Hide Comments' : '💬 View/Add Comments'}
              </button>
            </div>

            {selectedTaskId === task._id && (
              <div className="comment-box">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button onClick={submitComment}>Submit Comment</button>
              </div>
            )}

            {task.comments?.length > 0 && (
              <div className="comment-list">
                <h4>💬 Comments:</h4>
                {task.comments.map((c, i) => (
                  <p key={i}>- {c.text}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Card = ({ icon, title, value, bg }) => (
  <div className={`card ${bg}`}>
    {icon}
    <div>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  </div>
);


