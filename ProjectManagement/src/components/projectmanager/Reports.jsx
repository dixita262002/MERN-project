import React from 'react'

export const Reports = () => {
  return (
    <div className="view-reports-form">
      <h1>View Reports</h1>
      <table>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>001</td>
            <td>Project Progress</td>
            <td>2025-04-01</td>
            <td>Completed</td>
            <td><button>View</button> <button>Download</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

