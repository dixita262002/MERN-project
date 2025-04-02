import React from 'react'

export const SystemSetting = () => {
  
    return (
      <div className="system-settings">
        <h1>System Settings</h1>
        <form>
          <div className="form-group">
            <label>Site Name</label>
            <input type="text" placeholder="Enter Site Name" />
          </div>
          <div className="form-group">
            <label>Admin Email</label>
            <input type="email" placeholder="Enter Admin Email" />
          </div>
          <div className="form-group">
            <label>Default User Role</label>
            <select>
              <option>Admin</option>
              <option>Project Manager</option>
              <option>Team Member</option>
              <option>Client</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notification Settings</label>
            <input type="checkbox" /> Enable Email Notifications
          </div>
          <button type="submit">Save Settings</button>
        </form>
      </div>
    );
  };
  