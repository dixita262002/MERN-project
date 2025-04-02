
import React from 'react'

export const ManageUser = () => {
 
  return (
    <div className="manage-users">
      <h1>Manage Users</h1>
      <button>Add New User</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
            <td>Admin</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Alice Smith</td>
            <td>alice@example.com</td>
            <td>Project Manager</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
          <tr>
            <td>3</td>
            <td>David Johnson</td>
            <td>david@example.com</td>
            <td>Team Member</td>
            <td><button>Edit</button> <button>Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

