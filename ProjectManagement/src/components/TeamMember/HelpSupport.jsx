// 📁 HelpSupport.jsx
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const HelpSupport = () => {
 
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  const teamMemberId = localStorage.getItem('id');

  const fetchHelpRequests = async () => {
    try {
      const res = await axios.get('http://localhost:3000/helprequest/all');
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching help requests:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // 1. Send help request
  const res = await axios.post('http://localhost:3000/helprequest/sendhelprequest', {
        teamMemberId,
        message,
      });
      console.log(res.data)

      // 2. Send notification
      await axios.post('http://localhost:3000/notifications/createNotification', {
        teamMemberId,
        message: `📩 Help Request Submitted: "${message.substring(0, 50)}..."`,
      });

      setSuccessMsg('Help request submitted and notification sent!');
      setMessage('');
      fetchHelpRequests();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Error sending help request or notification:', error);
    }
  };

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Help & Support</h2>

      {successMsg && (
        <div className="mb-4 text-green-600 font-semibold">{successMsg}</div>
      )}

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg mb-2"
          rows="4"
          placeholder="Describe your issue or question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          Submit Request
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Your Previous Requests</h3>

      {loading ? (
        <p>Loading help requests...</p>
      ) : (
        <div className="space-y-4">
          {requests
            .filter((req) => req.sender?._id === teamMemberId)
            .map((req) => (
              <div
                key={req._id}
                className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="mb-2"><strong>Message:</strong> {req.message}</p>
                <p className="text-sm text-gray-500">
                  Submitted on {new Date(req.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const HelpSupport = () => {
  const [message, setMessage] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  const teamMemberId = localStorage.getItem('id');

  const fetchHelpRequests = async () => {
    try {
      const res = await axios.get('http://localhost:3000/helprequest/all');
      setRequests(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching help requests:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const res = await axios.post('http://localhost:3000/helprequest/sendhelprequest', {
        teamMemberId,
        message,
      });

      await axios.post('http://localhost:3000/notifications/createNotification', {
        teamMemberId,
        message: `📩 Help Request Submitted: "${message.substring(0, 50)}..."`,
      });

      setSuccessMsg('Help request submitted and notification sent!');
      setMessage('');
      fetchHelpRequests();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (error) {
      console.error('Error sending help request or notification:', error);
    }
  };

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  return (
    <div className="help-container">
      <h2 className="help-title">Help & Support</h2>

      {successMsg && <div className="success-message">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="help-form">
        <textarea
          className="help-textarea"
          rows="4"
          placeholder="Describe your issue or question..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="help-button">Submit Request</button>
      </form>

      <h3 className="help-subtitle">Your Previous Requests</h3>

      {loading ? (
        <p>Loading help requests...</p>
      ) : (
        <div className="help-requests-list">
          {requests
            .filter((req) => req.sender?._id === teamMemberId)
            .map((req) => (
              <div key={req._id} className="help-request-card">
                <p><strong>Message:</strong> {req.message}</p>
                <p className="help-date">Submitted on {new Date(req.createdAt).toLocaleString()}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
