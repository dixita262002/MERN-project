import React from 'react'

export const TeamManagement = () => {
    return (
        <div className="team-management-form">
          <h1>Team Management</h1>
          <form>
            <div className="form-group">
              <label>Team Member Name</label>
              <input type="text" placeholder="Enter Name" />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select>
                <option>Developer</option>
                <option>Designer</option>
                <option>QA Tester</option>
              </select>
            </div>
            <button type="submit">Add Member</button>
          </form>
        </div>
      );
    };
    
