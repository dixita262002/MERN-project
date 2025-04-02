import React from 'react'

export const ManageTask = () => {
  
    return (
      <div className="manage-tasks-form">
        <h1>Manage Modules & Tasks</h1>
        <form>
          <div className="form-group">
            <label>Task Name</label>
            <input type="text" placeholder="Enter Task Name" />
          </div>
          <div className="form-group">
            <label>Assigned To</label>
            <input type="text" placeholder="Assign Team Member" />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select>
              <option>Ongoing</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
          <button type="submit">Save Task</button>
        </form>
      </div>
    );
  };
  
  
