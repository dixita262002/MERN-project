import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bell } from "lucide-react";

export const Notifications = ({ teamMemberId }) => {

  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/notifications/getNotificationsByTeamMember/${teamMemberId}`
      );
      setNotifications(res.data.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // Mark as read
  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:3000/notifications/readNotification/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notifications/deleteNotification/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    if (teamMemberId) {
      fetchNotifications();
    }
  }, [teamMemberId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        className="relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white shadow-lg border rounded-lg z-50">
          <div className="p-3 font-semibold border-b">Notifications</div>

          {notifications.length === 0 ? (
            <div className="p-3 text-gray-500">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`flex justify-between items-start px-4 py-2 border-b hover:bg-gray-50 ${
                  n.isRead ? "text-gray-600" : "font-semibold text-black"
                }`}
              >
                <div className="flex-1 pr-2">
                  <div>{n.message}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {!n.isRead && (
                    <button
                      onClick={() => markAsRead(n._id)}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(n._id)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};


