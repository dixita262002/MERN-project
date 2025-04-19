import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";


export const ManageUsers = () => {
 
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const fetchData = async () => {
    try {
      const [usersRes, projectsRes, tasksRes] = await Promise.all([
        axios.get("/users"),
        axios.get("/project/allprojects"),
        axios.get("/task/all"),
      ]);
      setUsers(usersRes.data.data || []);
      setProjects(projectsRes.data.data || []);
      setTasks(tasksRes.data || []);
    } catch (err) {
      console.error("Error fetching data:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userId, name) => {
    if (window.confirm(`Delete user "${name}"?`)) {
      await axios.delete(`/user/${userId}`);
      fetchData();
    }
  };

  const handleEditSubmit = async () => {
    await axios.put(`/user/${editUser._id}`, editUser);
    setEditUser(null);
    fetchData();
  };

  return (
    <div style={{ padding: "24px" }}>
      <Typography variant="h4" style={{ marginBottom: "16px", fontWeight: "bold" }}>
        👥 Manage Users
      </Typography>

      {loading ? (
        <Typography>Loading data...</Typography>
      ) : (
        <Paper elevation={3} style={{ padding: "16px", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Role</b></TableCell>
                <TableCell><b>Projects</b></TableCell>
                <TableCell><b>Tasks</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => {
                  const userProjects = projects.filter((p) =>
                    p.assignedUsers?.includes(user._id)
                  );
                  const userTasks = tasks.filter((t) => t.assignedTo === user._id);

                  return (
                    <TableRow key={user._id}>
                      <TableCell
                        style={{ cursor: "pointer", color: "#1976d2", fontWeight: "bold" }}
                        onClick={() => setSelectedUser(user)}
                      >
                        {user.fullName || "N/A"}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {userProjects.length > 0
                          ? userProjects.map((p) => (
                              <Typography key={p._id}>{p.projectName}</Typography>
                            ))
                          : "No projects"}
                      </TableCell>
                      <TableCell>
                        {userTasks.length > 0
                          ? userTasks.map((t) => (
                              <Typography key={t._id}>{t.taskName}</Typography>
                            ))
                          : "No tasks"}
                      </TableCell>
                      <TableCell>
                        <span
                          style={{
                            color: user.status === "true" ? "green" : "red",
                            fontWeight: "bold",
                          }}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => setEditUser(user)}
                          style={{ marginRight: 8 }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(user._id, user.fullName)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* View User Modal */}
      {selectedUser && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}>
          <Paper style={{ padding: "24px", width: "400px", position: "relative" }}>
            <Typography variant="h6" style={{ marginBottom: "16px" }}>User Details</Typography>
            <Typography><strong>Name:</strong> {selectedUser.fullName}</Typography>
            <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
            <Typography><strong>Role:</strong> {selectedUser.role}</Typography>
            <Typography><strong>Status:</strong> {selectedUser.status}</Typography>
            <Typography><strong>Contact:</strong> {selectedUser.contact || "N/A"}</Typography>
            <Button
              variant="contained"
              style={{ marginTop: "16px" }}
              onClick={() => setSelectedUser(null)}
            >
              Close
            </Button>
          </Paper>
        </div>
      )}

      {/* Edit User Modal */}
      {editUser && (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
        }}>
          <Paper style={{ padding: "24px", width: "400px", position: "relative" }}>
            <Typography variant="h6" style={{ marginBottom: "16px" }}>Edit User</Typography>
            <TextField
              fullWidth
              label="Full Name"
              value={editUser.fullName}
              onChange={(e) => setEditUser({ ...editUser, fullName: e.target.value })}
              style={{ marginBottom: "12px" }}
            />
            <TextField
              fullWidth
              label="Email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              style={{ marginBottom: "12px" }}
            />
            <Select
              fullWidth
              value={editUser.status}
              onChange={(e) => setEditUser({ ...editUser, status: e.target.value })}
              style={{ marginBottom: "20px" }}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <Button variant="contained" onClick={handleEditSubmit}>
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditUser(null)}>
                Cancel
              </Button>
            </div>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
