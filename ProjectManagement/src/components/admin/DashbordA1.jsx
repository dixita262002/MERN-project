import React from 'react'

export const DashbordA1 = () => {

  return (
    <div className="admin-dashboard">
      <h1>Welcome to Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>120</p>
        </div>
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p>45</p>
        </div>
        <div className="stat-card">
          <h3>Ongoing Tasks</h3>
          <p>78</p>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>150</p>
        </div>
      </div>
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          <li>Project "Website Redesign" created by John Doe</li>
          <li>Task "Backend API Development" assigned to Alice</li>
          <li>User "David" added to project "Mobile App"</li>
          <li>Project "E-commerce Platform" marked as completed</li>
        </ul>
      </div>
    </div>
  );
};


