import React, { useEffect, useState } from 'react';
import { BellRing, CalendarClock, ClipboardCheck, User, Lock, Settings2 } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserNotificationsSettings = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('notifications');

  useEffect(() => {
    // Fetch notifications (replace with real API)
    const mockNotifications = [
      { id: 1, type: 'assigned', message: 'You have been assigned a new task: "UI Update"' },
      { id: 2, type: 'submitted', message: 'Task "API Integration" has been submitted for review.' },
      { id: 3, type: 'deadline', message: 'Upcoming Deadline: "Bug Fixes" due in 2 days.' }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleChangePassword = () => {
    toast.info('Change password functionality coming soon...');
  };

  const handleUpdateProfile = () => {
    toast.success('Profile updated!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow">
      <div className="flex space-x-4 mb-6 border-b pb-2">
        <button
          onClick={() => setActiveTab('notifications')}
          className={`text-sm font-medium flex items-center ${activeTab === 'notifications' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <BellRing className="w-4 h-4 mr-2" /> Notifications
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`text-sm font-medium flex items-center ${activeTab === 'settings' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <Settings2 className="w-4 h-4 mr-2" /> Settings
        </button>
      </div>

      {activeTab === 'notifications' && (
        <div className="space-y-4">
          {notifications.map((note) => (
            <div key={note.id} className="bg-gray-50 border rounded p-3 flex items-center shadow-sm">
              {note.type === 'assigned' && <ClipboardCheck className="w-5 h-5 text-green-500 mr-3" />}
              {note.type === 'submitted' && <User className="w-5 h-5 text-purple-500 mr-3" />}
              {note.type === 'deadline' && <CalendarClock className="w-5 h-5 text-red-500 mr-3" />}
              <span className="text-gray-700">{note.message}</span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="p-4 bg-gray-50 rounded shadow">
            <h3 className="font-semibold mb-2 flex items-center"><User className="w-4 h-4 mr-2" /> Profile</h3>
            <p className="text-sm text-gray-600 mb-2">Update your personal information.</p>
            <button
              onClick={handleUpdateProfile}
              className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded shadow">
            <h3 className="font-semibold mb-2 flex items-center"><Lock className="w-4 h-4 mr-2" /> Change Password</h3>
            <p className="text-sm text-gray-600 mb-2">Secure your account by updating your password.</p>
            <button
              onClick={handleChangePassword}
              className="text-white bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded"
            >
              Change Password
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded shadow">
            <h3 className="font-semibold mb-2 flex items-center"><BellRing className="w-4 h-4 mr-2" /> Notification Preferences</h3>
            <p className="text-sm text-gray-600">Control which notifications you receive.</p>
            {/* You can add toggle switches here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNotificationsSettings;
