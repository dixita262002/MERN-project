/*
import React from 'react'

export const UserProfile = () => {

  return (
    <div className="team-profile">
      <h2 className="section-title">Team Profile</h2>

      {/* Project Details */
      /*<div className="section">
        <h3>Project Details</h3>
        <table className="details-table">
          <tbody>
            <tr><td>College Name:</td><td>MERCHANT ENGINEERING COLLEGE, BASNA, VISNAGAR</td></tr>
            <tr><td>Discipline Code:</td><td>BE</td></tr>
            <tr><td>Semester:</td><td>8</td></tr>
            <tr><td>Department:</td><td>Computer Engineering</td></tr>
            <tr><td>Project Title:</td><td>Project Management</td></tr>
            <tr><td>Domain:</td><td>Web Development</td></tr>
            <tr><td>Organization:</td><td>GrowthLead Private Limited</td></tr>
            <tr><td>Project Keywords:</td><td>Node.js, Express.js, React.js, MongoDB</td></tr>
            <tr><td>Year:</td><td>2025</td></tr>
          </tbody>
        </table>
      </div>

      {/* External Guide Details */
      /*<div className="section">
        <h3>External Guide Details</h3>
        <table className="details-table">
          <tbody>
            <tr><td>Name:</td><td>Rahul Kiplekar</td></tr>
            <tr><td>Organization:</td><td>GrowthLead Private Limited</td></tr>
            <tr><td>Email:</td><td>rk@growthlead.com</td></tr>
            <tr><td>Address:</td><td>Surthi Complex, Ahmedabad, Gujarat</td></tr>
          </tbody>
        </table>
      </div>

      {/* Team Details */
      /*<div className="section">
        <h3>Team Details</h3>
        <table className="team-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Enrollment No.</th>
              <th>Name</th>
              <th>College</th>
              <th>Department</th>
              <th>Mobile No.</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>22063107015</td>
              <td>Patel Dixitaben Champaklal</td>
              <td>MERCHANT ENGINEERING COLLEGE</td>
              <td>Computer Engineering</td>
              <td>7908333744</td>
              <td>dixitapatel2020@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
*/
/*import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const UserTable = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [selectedUser, setSelectedUser] = useState(null); // Manage selected user

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users"); // API call to fetch users
      setUsers(res.data.data || []); // Store the fetched users
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Fetch users on component load
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">All Users</h2>

      {/* Check if a specific user is selected */
      /*{selectedUser ? (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 text-center">
          <FaUserCircle className="text-6xl text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold">{selectedUser.fullName}</h3>
          <p className="text-gray-700 mt-2">
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p className="text-gray-700">
            <strong>Contact:</strong> {selectedUser.contact}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {selectedUser.role}
          </p>
          <p className="text-gray-700">
            <strong>Role Name:</strong> {selectedUser.roleId?.name || "N/A"}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white text-sm ${
                selectedUser.status === "true" || selectedUser.status === "active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {selectedUser.status === "true" ? "Active" : "Inactive"}
            </span>
          </p>
          <button
            onClick={() => setSelectedUser(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to All Users
          </button>
        </div>
      ) : (
        // Show the user table if no user is selected
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Full Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Role</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className="cursor-pointer hover:bg-gray-100 transition"
                >
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{user.fullName}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.contact}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        user.status === "true" || user.status === "active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {user.status === "true" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserTable;
*/

/*
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserProfile = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [users, setUsers] = useState([]); // now supports multiple users
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    getAllUsers();
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

  // Get all users to show in table
  const getAllUsers = async () => {
    try {
      const res = await axios.get("/users"); // Adjust if backend sends { users: [] }
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else if (Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else {
        console.error("Unexpected response:", res.data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  const getUserProfile = async () => {
    try {
      const res = await axios.get(`/user/${userId}`);
      setUser(res.data);
      setFormValues(res.data);
      if (res.data.profileImage) {
        setPreviewImage(res.data.profileImage);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const setFormValues = (userData) => {
    setValue("fullName", userData.fullName || "");
    setValue("email", userData.email || "");
    setValue("contact", userData.contact || "");
    setValue("role", userData.role || "");
    setValue("status", userData.status || "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async () => {
    if (!profileImageFile) return null;

    const formData = new FormData();
    formData.append("file", profileImageFile);
    formData.append("upload_preset", "your_upload_preset"); // replace with your Cloudinary preset
    formData.append("cloud_name", "your_cloud_name");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error", err);
      return null;
    }
  };

  const submitHandler = async (data) => {
    try {
      let imageUrl = await uploadToCloudinary();
      if (imageUrl) {
        data.profileImage = imageUrl;
      }

      if (user) {
        await axios.put(`/user/${userId}/updateUserById`, data);
        alert("Profile updated successfully!");
      } else {
        await axios.post("/user", { ...data });
        alert("Profile created successfully!");
      }

      setProfileImageFile(null);
      getAllUsers();
      getUserProfile();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const deleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.delete(`/user/${userId}`);
        alert("Profile deleted!");
        setUser(null);
        reset();
        getAllUsers();
      } catch (error) {
        console.error("Error deleting profile:", error);
      }
    }
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="col-lg-8 mx-auto mb-5">
        <div className="card p-4 shadow" style={{ borderRadius: "20px" }}>
          <h2 className="text-center mb-4" style={{ color: "#4A90E2" }}>
            {user ? "Update Profile" : "Create Profile"}
          </h2>

          <div className="text-center mb-3">
            <img
              src={previewImage || "https://via.placeholder.com/150"}
              alt="Preview"
              className="rounded-circle shadow"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "3px solid #4A90E2",
              }}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("fullName")}
                  placeholder="Enter Full Name"
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                {...register("contact")}
                placeholder="Enter contact number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-select" {...register("role")}>
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="project_manager">Project Manager</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select className="form-select" {...register("status")}>
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="text-center">
              <button className="btn btn-primary px-4 me-2" type="submit">
                {user ? "Update Profile" : "Create Profile"}
              </button>
              {user && (
                <button
                  type="button"
                  className="btn btn-danger px-4"
                  onClick={deleteProfile}
                >
                  Delete Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* User List Table */
      /*<div className="table-responsive">
        <h4 className="text-center mt-5 mb-3">All Users</h4>
        <table className="table table-bordered text-center bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th>Profile Image</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((usr) => (
                <tr key={usr._id}>
                  <td>
                    <img
                      src={usr.profileImage || "https://via.placeholder.com/50"}
                      alt="User"
                      className="rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{usr.fullName}</td>
                  <td>{usr.email}</td>
                  <td>{usr.contact}</td>
                  <td>{usr.role}</td>
                  <td>{usr.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
*/
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserProfile = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [localUsers, setLocalUsers] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  // Function to handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Function to upload image to Cloudinary
  const uploadToCloudinary = async () => {
    if (!profileImageFile) {
      console.warn("No image file selected for upload.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", profileImageFile);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "your_cloud_name"); // Replace with your Cloudinary cloud name

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };

  // Form submission handler
  const submitHandler = async (data) => {
    try {
      let imageUrl = await uploadToCloudinary();
      if (imageUrl) {
        data.profileImage = imageUrl;
      }

      // Add new user data to local state
      setLocalUsers((prevUsers) => [...prevUsers, data]);

      alert("Profile added to the table!");
      reset(); // Clear the form
      setPreviewImage(null); // Reset image preview
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="col-lg-8 mx-auto mb-5">
        <div className="card p-4 shadow" style={{ borderRadius: "20px" }}>
          <h2 className="text-center mb-4" style={{ color: "#4A90E2" }}>
            Create Profile
          </h2>

          {/* Image Preview Section */}
          <div className="text-center mb-3">
            <img
              src={previewImage || "https://via.placeholder.com/150"}
              alt="Preview"
              className="rounded-circle shadow"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "3px solid #4A90E2",
              }}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("fullName")}
                  placeholder="Enter Full Name"
                />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email")}
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Contact</label>
              <input
                type="text"
                className="form-control"
                {...register("contact")}
                placeholder="Enter contact number"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-select" {...register("role")}>
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="project_manager">Project Manager</option>
                <option value="user">User</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <select className="form-select" {...register("status")}>
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="text-center">
              <button className="btn btn-primary px-4 me-2" type="submit">
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* User List Table */}
      <div className="table-responsive">
        <h4 className="text-center mt-5 mb-3">All Users</h4>
        <table className="table table-bordered text-center bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th>Profile Image</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {localUsers.map((usr, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={usr.profileImage || "https://via.placeholder.com/50"}
                    alt="User"
                    className="rounded-circle"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{usr.fullName}</td>
                <td>{usr.email}</td>
                <td>{usr.contact}</td>
                <td>{usr.role}</td>
                <td>{usr.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;

/*
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [localUsers, setLocalUsers] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/teammember/allteammembers");
      if (Array.isArray(response.data)) {
        setLocalUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async () => {
    if (!profileImageFile || !CLOUD_NAME || !UPLOAD_PRESET) {
      console.warn("Missing image or Cloudinary config.");
      return null;
    }

    const formData = new FormData();
    formData.append("file", profileImageFile);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
      return res.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };

  // Form submit
  const submitHandler = async (data) => {
    try {
      const imageUrl = await uploadToCloudinary();
      if (imageUrl) {
        data.profileImage = imageUrl;
      }

      // API request
      await axios.post("http://localhost:4000/teammember/addwithfile", data);

      fetchUsers(); // Refresh user list

      reset();
      setPreviewImage(null);
      setProfileImageFile(null);

      alert("Profile created successfully!");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="col-lg-8 mx-auto mb-5">
        <div className="card p-4 shadow" style={{ borderRadius: "20px" }}>
          <h2 className="text-center mb-4" style={{ color: "#4A90E2" }}>Create Profile</h2>

          {/* Image preview */
          /*<div className="text-center mb-3">
            <img
              src={previewImage || "https://dummyimage.com/150x150"}
              alt="Preview"
              className="rounded-circle shadow"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                border: "3px solid #4A90E2",
              }}
            />
            <input type="file" accept="image/*" onChange={handleImageChange} className="form-control mt-2" />
          </div>

          {/* Form */
          /*<form onSubmit={handleSubmit(submitHandler)}>
            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" {...register("name")} placeholder="Enter Full Name" required />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" {...register("email")} placeholder="Enter Email" required />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Contact Number</label>
                <input type="text" className="form-control" {...register("contactNumber")} placeholder="Enter Contact Number" />
              </div>
              <div className="mb-3 col-md-6">
                <label className="form-label">Joining Date</label>
                <input type="date" className="form-control" {...register("joiningDate")} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input type="text" className="form-control" {...register("department")} placeholder="Enter Department" />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select className="form-select" {...register("role")}>
                <option value="team_member">Team Member</option>
                <option value="project_manager">Project Manager</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Skills</label>
              <input type="text" className="form-control" {...register("skills")} placeholder="Enter Skills (comma-separated)" />
            </div>

            <div className="text-center">
              <button className="btn btn-primary px-4 me-2" type="submit">Create Profile</button>
            </div>
          </form>
        </div>
      </div>

      {/* Users Table */
      /*<div className="table-responsive">
        <h4 className="text-center mt-5 mb-3">All Users</h4>
        <table className="table table-bordered text-center bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th>Profile Image</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Joining Date</th>
              <th>Department</th>
              <th>Role</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {localUsers.map((usr, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={usr.profileImage || "https://dummyimage.com/50x50"}
                    alt="User"
                    className="rounded-circle"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                  />
                </td>
                <td>{usr.fullName}</td>
                <td>{usr.email}</td>
                <td>{usr.contactNumber}</td>
                <td>{usr.joiningDate ? new Date(usr.joiningDate).toDateString() : "N/A"}</td>
                <td>{usr.department}</td>
                <td>{usr.role}</td>
                <td>{Array.isArray(usr.skills) ? usr.skills.join(", ") : usr.skills}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProfile;
*/