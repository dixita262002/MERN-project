import React, { useState, useEffect } from "react";
//import "./PMSettings.css";
import '../../assets/PMSettings.css'

export const PMSettings = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    taskReminders: false,
    weeklySummary: true,
  });

  const [theme, setTheme] = useState("light");

  const [teamMembers, setTeamMembers] = useState([
    { name: "Alice", role: "Developer" },
    { name: "Bob", role: "Designer" },
  ]);

  const [profile, setProfile] = useState({
    name: "dixita patel",
    email: "dixita@example.com",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(savedTheme);
  }, []);

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleThemeChange = (e) => {
    const value = e.target.value;
    setTheme(value);
    localStorage.setItem("theme", value);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(value);
  };

  const handleAddMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "" }]);
  };

  const handleMemberChange = (index, key, value) => {
    const updated = [...teamMembers];
    updated[index][key] = value;
    setTeamMembers(updated);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = () => {
    console.log("Saved Settings:", {
      profile,
      notifications,
      theme,
      teamMembers,
    });
    alert("Settings Saved Successfully!");
  };

  return (
    <div className={`pm-settings-container ${theme}`}>
      <div className="section">
        <h2>Profile Settings</h2>
        <div className="grid-2">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
          />
        </div>
      </div>

      <div className="section">
        <h2>Notification Settings</h2>
        <label>
          <input
            type="checkbox"
            name="emailUpdates"
            checked={notifications.emailUpdates}
            onChange={handleNotificationChange}
          />
          Email me when updates occur
        </label>
        <label>
          <input
            type="checkbox"
            name="taskReminders"
            checked={notifications.taskReminders}
            onChange={handleNotificationChange}
          />
          Task deadline reminders
        </label>
        <label>
          <input
            type="checkbox"
            name="weeklySummary"
            checked={notifications.weeklySummary}
            onChange={handleNotificationChange}
          />
          Weekly summary reports
        </label>
      </div>

      <div className="section">
        <h2>Theme Preferences</h2>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      <div className="section">
        <h2>Team Members</h2>
        {teamMembers.map((member, index) => (
          <div key={index} className="grid-2">
            <input
              type="text"
              value={member.name}
              onChange={(e) =>
                handleMemberChange(index, "name", e.target.value)
              }
              placeholder="Name"
            />
            <input
              type="text"
              value={member.role}
              onChange={(e) =>
                handleMemberChange(index, "role", e.target.value)
              }
              placeholder="Role"
            />
          </div>
        ))}
        <button className="add-btn" onClick={handleAddMember}>Add Member</button>
      </div>

      <div className="save-btn-container">
        <button className="save-btn" onClick={handleSave}>
          Save All Settings
        </button>
      </div>
    </div>
  );
};
