/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const statusColors = {
  Pending: 'bg-yellow-200 text-yellow-800',
  InProgress: 'bg-blue-200 text-blue-800',
  Completed: 'bg-green-200 text-green-800',
  Overdue: 'bg-red-200 text-red-800',
};

const AssignedTasks = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllTeamMembers = async () => {
    try {
      const res = await axios.get('/teammember/allteammembers');
      setTeamMembers(res.data.teamMembers || res.data.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const fetchTasksByMember = async (teamMemberId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/task/getTasksByTeamMember/${teamMemberId}`);
      setTasks(res.data.data || res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTeamMembers();
  }, []);

  const handleTeamMemberChange = (e) => {
    const memberId = e.target.value;
    setSelectedTeamMemberId(memberId);
    if (memberId) fetchTasksByMember(memberId);
    else setTasks([]);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/task/delete/${taskId}`);
        fetchTasksByMember(selectedTeamMemberId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleFileUpload = async (e, taskId) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`/task/uploadFile/${taskId}`, formData);
      alert('File uploaded!');
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const selectedMember = teamMembers.find((m) => m._id === selectedTeamMemberId);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-6">Assigned Tasks by Team Member</h2>

      <div className="flex justify-center mb-6">
        <select
          value={selectedTeamMemberId}
          onChange={handleTeamMemberChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-80"
        >
          <option value="">Select a Team Member</option>
          {teamMembers.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name} ({member.email})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-blue-500">Loading tasks...</p>
      ) : tasks.length === 0 && selectedTeamMemberId ? (
        <p className="text-center text-gray-600">No tasks assigned to this team member.</p>
      ) : (
        <div className="overflow-x-auto">
          <h3 className="text-xl font-semibold text-center mb-4">
            Assigned Tasks for {selectedMember?.name}
          </h3>
          <table className="min-w-full table-auto border border-gray-300 rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Task Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Deadline</th>
                <th className="px-4 py-2 border">Upload File</th>
                <th className="px-4 py-2 border">Comments</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{task.taskName}</td>
                  <td className="border px-4 py-2">{task.description}</td>
                  <td className="border px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${statusColors[task.status] || 'bg-gray-200 text-gray-700'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
                  <td className="border px-4 py-2">
                    <input type="file" onChange={(e) => handleFileUpload(e, task._id)} />
                  </td>
                  <td className="border px-4 py-2 text-sm text-gray-700">
                    {task.comments?.length > 0 ? (
                      <ul className="list-disc ml-4">
                        {task.comments.map((comment, i) => (
                          <li key={i}>{comment}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>No comments</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      className="bg-yellow-400 text-white px-3 py-1 rounded"
                      onClick={() => alert('Edit functionality can go here')}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';


const statusColors = {
  Pending: 'status-pending',
  InProgress: 'status-inprogress',
  Completed: 'status-completed',
  Overdue: 'status-overdue',
};

const AssignedTasks = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllTeamMembers = async () => {
    try {
      const res = await axios.get('/teammember/allteammembers');
      setTeamMembers(res.data.teamMembers || res.data.data);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const fetchTasksByMember = async (teamMemberId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/task/getTasksByTeamMember/${teamMemberId}`);
      setTasks(res.data.data || res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTeamMembers();
  }, []);

  const handleTeamMemberChange = (e) => {
    const memberId = e.target.value;
    setSelectedTeamMemberId(memberId);
    if (memberId) fetchTasksByMember(memberId);
    else setTasks([]);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/task/delete/${taskId}`);
        fetchTasksByMember(selectedTeamMemberId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleFileUpload = async (e, taskId) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`/task/uploadFile/${taskId}`, formData);
      alert('File uploaded!');
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const selectedMember = teamMembers.find((m) => m._id === selectedTeamMemberId);

  return (
    <div className="assigned-tasks-container">
      <h2 className="title">Assigned Tasks by Team Member</h2>

      <div className="dropdown-container">
        <select value={selectedTeamMemberId} onChange={handleTeamMemberChange} className="dropdown">
          <option value="">Select a Team Member</option>
          {teamMembers.map((member) => (
            <option key={member._id} value={member._id}>
              {member.name} ({member.email})
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading-text">Loading tasks...</p>
      ) : tasks.length === 0 && selectedTeamMemberId ? (
        <p className="no-tasks-text">No tasks assigned to this team member.</p>
      ) : (
        <div className="table-container">
          <h3 className="subtitle">Assigned Tasks for {selectedMember?.name}</h3>
          <table className="task-table">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Upload File</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.taskName}</td>
                  <td>{task.description}</td>
                  <td>
                    <span className={`status-badge ${statusColors[task.status] || 'status-default'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <input type="file" onChange={(e) => handleFileUpload(e, task._id)} />
                  </td>
                  <td>
                    {task.comments?.length > 0 ? (
                      <ul>
                        {task.comments.map((comment, i) => (
                          <li key={i}>{comment}</li>
                        ))}
                      </ul>
                    ) : (
                      <span>No comments</span>
                    )}
                  </td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => alert('Edit functionality can go here')}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignedTasks;














