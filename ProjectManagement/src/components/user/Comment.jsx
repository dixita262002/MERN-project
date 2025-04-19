import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Comment = () => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [taskId, setTaskId] = useState('');
  const [userId, setUserId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);

  // Fetch tasks and users when the component mounts
  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // Fetch comments when a task is selected
  useEffect(() => {
    if (taskId) {
      fetchComments();
    }
  }, [taskId]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:4000/task/all'); // Adjust endpoint accordingly
      setTasks(Array.isArray(res.data) ? res.data : []); // Ensure response is an array
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setTasks([]); // Fallback to an empty array
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:4000/users'); // Adjust endpoint accordingly
      setUsers(Array.isArray(res.data) ? res.data : []); // Ensure response is an array
    } catch (err) {
      console.error('Error fetching users:', err);
      setUsers([]); // Fallback to an empty array
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/comments/task/${taskId}`);
      setAllComments(Array.isArray(res.data) ? res.data : []); // Ensure response is an array
    } catch (err) {
      console.error('Error fetching comments:', err);
      setAllComments([]); // Fallback to an empty array
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Comment cannot be empty.');
      return;
    }
    if (!taskId || !userId) {
      setError('Please select a task and user.');
      return;
    }

    setLoading(true);

    try {
      if (editCommentId) {
        // Edit existing comment
        await axios.put(`http://localhost:4000/comments/edit/${editCommentId}`, { comment });
        setEditCommentId(null);
      } else {
        // Add a new comment
        await axios.post('http://localhost:4000/comments/add', { taskId, userId, comment });
      }
      setComment('');
      fetchComments();
    } catch (err) {
      console.error('Error submitting comment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (commentId, currentComment) => {
    setEditCommentId(commentId);
    setComment(currentComment);
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`http://localhost:4000/comments/delete/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-md w-full max-w-4xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Task Comments</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display errors */}

      {/* Dropdown for selecting task */}
      <label className="block mb-2 text-gray-700">Select Task:</label>
      <select
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
      >
        <option value="" disabled>Select a task</option>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <option key={task._id} value={task._id}>
              {task.taskName}
            </option>
          ))
        ) : (
          <option disabled>No tasks available</option>
        )}
      </select>

      {/* Dropdown for selecting user */}
      <label className="block mb-2 text-gray-700">Select User:</label>
      <select
        className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="" disabled>Select a user</option>
        {users.length > 0 ? (
          users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.fullName}
            </option>
          ))
        ) : (
          <option disabled>No users available</option>
        )}
      </select>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
          rows="3"
          placeholder="Write your comment or update..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 py-2 px-4 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white'}`}
        >
          {loading ? 'Saving...' : editCommentId ? 'Update Comment' : 'Send Comment'}
        </button>
      </form>

      {/* Comments table */}
      <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Comment</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allComments.length > 0 ? (
            allComments.map((c) => (
              <tr key={c._id}>
                <td className="border border-gray-300 px-4 py-2">{c.fullName || 'User'}</td>
                <td className="border border-gray-300 px-4 py-2">{c.comment}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(c._id, c.comment)}
                    className="mr-2 text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-gray-300 px-4 py-2 text-center" colSpan="4">
                No comments available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Comment;
