import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MessageCircle,
  Bell,
  Settings,
  User,
  Lock,
  Send,
  HelpCircle
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './HelpAndSupport.css';
import '../../assets/HelpAndSupport.css'


export const HelpAndSupport = () => {

  
  const [activeTab, setActiveTab] = useState('comments');
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    contact: '9876543210',
  });
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirmPass: '',
  });
  const [comments, setComments] = useState([
    { id: 1, from: 'PM John', message: 'Great job!', reply: '' },
    { id: 2, from: 'PM Sarah', message: 'Please revise Task #4.', reply: '' },
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'New task assigned: Design Review',
      type: 'info',
      read: false,
      time: '2025-04-16 09:30 AM',
    },
    {
      id: 2,
      message: 'Deadline tomorrow: API Integration',
      type: 'warning',
      read: false,
      time: '2025-04-16 10:00 AM',
    }
  ]);
  const [helpMessage, setHelpMessage] = useState('');
  const [helpRequests, setHelpRequests] = useState([]);
  const userId = localStorage.getItem('id');

  const fetchHelpRequests = async () => {
    try {
      const res = await axios.get('http://localhost:4000/helprequest/all');
      setHelpRequests(res.data);
    } catch (error) {
      console.error('Error fetching help requests:', error);
    }
  };

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const updateProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const updatePassword = () => {
    if (passwords.newPass !== passwords.confirmPass) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password updated!');
  };

  const handleReplyChange = (id, value) => {
    setComments(prev =>
      prev.map(c => c.id === id ? { ...c, reply: value } : c)
    );
  };

  const sendReply = (id) => {
    const comment = comments.find(c => c.id === id);
    if (!comment.reply.trim()) return toast.warning('Reply is empty');
    toast.success(`Reply sent to ${comment.from}`);
    handleReplyChange(id, '');
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
    toast.info('All notifications cleared');
  };

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    if (!helpMessage.trim()) return toast.warning('Message cannot be empty');

    try {
      await axios.post('http://localhost:4000/helprequest/sendhelprequest', {
        userId,
        message: helpMessage,
      });

      await axios.post('http://localhost:4000/notifications/createNotification', {
        userId,
        message: `📩 Help Request Submitted: "${helpMessage}"`,
      });

      toast.success('Help request submitted!');
      setHelpMessage('');
      fetchHelpRequests();
    } catch (error) {
      console.error('Error submitting help request:', error);
      toast.error('Failed to submit help request');
    }
  };

  return (
    <div className="container">
      <ToastContainer />

      <div className="tab-buttons">
        <button onClick={() => setActiveTab('comments')} className={`tab-button ${activeTab === 'comments' ? 'active' : ''}`}>
          <MessageCircle className="w-4 h-4 mr-2" /> Comments
        </button>
        <button onClick={() => setActiveTab('notifications')} className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}>
          <Bell className="w-4 h-4 mr-2" /> Notifications
        </button>
        <button onClick={() => setActiveTab('help')} className={`tab-button ${activeTab === 'help' ? 'active' : ''}`}>
          <HelpCircle className="w-4 h-4 mr-2" /> Help & Support
        </button>
        <button onClick={() => setActiveTab('settings')} className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}>
          <Settings className="w-4 h-4 mr-2" /> Settings
        </button>
      </div>

      {activeTab === 'comments' && (
        <div className="comments-section">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-box">
              <p className="comment-text"><strong>{comment.from}:</strong> {comment.message}</p>
              <div className="comment-reply">
                <input
                  type="text"
                  className="reply-input"
                  placeholder="Reply to this comment..."
                  value={comment.reply}
                  onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                />
                <button onClick={() => sendReply(comment.id)} className="reply-button">
                  <Send size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="notifications-section">
          <h2 className="font-semibold">Notifications</h2>
          <button onClick={clearNotifications} className="text-sm text-red-500 hover:underline">Clear All</button>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map(n => (
              <div key={n.id} className={`notification-item ${n.type === 'info' ? 'notification-info' : n.type === 'warning' ? 'notification-warning' : n.type === 'success' ? 'notification-success' : 'notification-error'}`}>
                <div>
                  <p className="notification-message">{n.message}</p>
                  <p className="notification-time">{new Date(n.time).toLocaleString()}</p>
                </div>
                {!n.read && <button onClick={() => markAsRead(n.id)} className="mark-as-read">Mark as Read</button>}
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'help' && (
        <div className="help-section">
          <h2>Help & Support</h2>
          <form onSubmit={handleHelpSubmit} className="help-form">
            <textarea
              rows="4"
              placeholder="Describe your issue or request..."
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
            />
            <button type="submit" className="help-submit-button">Submit Help Request</button>
          </form>
          <h3>Previous Help Requests</h3>
          <ul className="help-requests-list">
            {helpRequests.map((request) => (
              <li key={request._id}>
                <p>{request.message}</p>
                <p>{new Date(request.date).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="settings-section">
          <h2>Settings</h2>
          <div>
            <label htmlFor="profileName">Name</label>
            <input
              id="profileName"
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
            />
          </div>
          <div>
            <label htmlFor="profileEmail">Email</label>
            <input
              id="profileEmail"
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
            />
          </div>
          <button onClick={updateProfile} className="settings-button">Update Profile</button>

          <div>
            <label htmlFor="currentPassword">Current Password</label>
            <input
              id="currentPassword"
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              name="newPass"
              value={passwords.newPass}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPass"
              value={passwords.confirmPass}
              onChange={handlePasswordChange}
            />
          </div>
          <button onClick={updatePassword} className="settings-button">Update Password</button>
        </div>
      )}
    </div>
  );
};
