/*import React, { useState } from 'react';
import axios from 'axios';

const UploadWork = () => {
  const [file, setFile] = useState(null);
  const [taskId, setTaskId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !taskId || !userId) {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskId', taskId);
    formData.append('userId', userId);

    try {
      const response = await axios.post('/fileUpload/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Work uploaded successfully!');
    } catch (error) {
      setMessage('Error uploading work.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Your Work</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Task ID</label>
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Task ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Your User ID"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Choose File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {loading ? (
          <p className="text-blue-500">Uploading...</p>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Upload
          </button>
        )}
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default UploadWork;
*/

import React, { useState } from 'react';
import axios from 'axios';

const UploadWork = () => {
  const [file, setFile] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setMessage('File size should not exceed 5MB.');
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !projectId || !userId) {
      setMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId); // updated key
    formData.append('userId', userId);

    try {
      const response = await axios.post('/fileUpload/addwithfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 200) {
        setMessage('Work uploaded successfully!');
      } else {
        setMessage('Unexpected response from server.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error uploading work.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload Your Work</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Project ID</label>
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Project ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter Your User ID"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Choose File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {loading ? (
          <p className="text-blue-500">Uploading...</p>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Upload
          </button>
        )}
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default UploadWork;
