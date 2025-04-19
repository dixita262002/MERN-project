import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserPlus, FileText, CalendarDays, Upload, LayoutDashboard } from 'lucide-react';
//import './ManageProjects.css'; // Import the CSS file
//import '../../assets/ManageProjects.css'

export const ManageProjects = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users');
        if (Array.isArray(res.data.data)) {
          setUsers(res.data.data);
        } else {
          console.error("Expected an array for users", res.data);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (!selectedUserId) {
        alert("Please select a user before submitting");
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("technology", data.technology);
      formData.append("startDate", data.startDate);
      formData.append("completionDate", data.completionDate);
      formData.append("image", data.image[0]);
      formData.append("assignedUserId", selectedUserId);

      const res = await axios.post('/project/addwithfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("✅ Project Added Successfully:", res.data);
      alert("Project assigned and saved!");
      reset();
      setSelectedUserId("");
      navigate('/projectmanager/projectscreen');
    } catch (err) {
      console.error("❌ Error saving project:", err.response?.data || err);
      alert("Failed to save project. Check console for details.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Assign Project to User</h2>

        {!selectedUserId && (
          <div className="select-user">
            <label className="label">Select a User</label>
            <select
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="select"
              value={selectedUserId}
            >
              <option value="" disabled>Select user...</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.fullName} ({user.email})
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedUserId && (
          <>
            <div className="selected-user">
              <UserPlus className="icon" size={20} />
              Selected User: {users.find(u => u._id === selectedUserId)?.fullName}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="form">
              <div className="input-group">
                <label className="label">
                  <LayoutDashboard className="icon" size={18} />
                  Project Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="Enter project title"
                  className="input"
                />
                {errors.title && <p className="error">{errors.title.message}</p>}
              </div>

              <div className="input-group">
                <label className="label">
                  <FileText className="icon" size={18} />
                  Description
                </label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  placeholder="Enter project description"
                  className="input"
                />
                {errors.description && <p className="error">{errors.description.message}</p>}
              </div>

              <div className="input-group">
                <label className="label">Technology</label>
                <input
                  type="text"
                  {...register("technology", { required: "Technology is required" })}
                  placeholder="e.g. MERN, Django"
                  className="input"
                />
                {errors.technology && <p className="error">{errors.technology.message}</p>}
              </div>

              <div className="date-inputs">
                <div className="input-group">
                  <label className="label">
                    <CalendarDays className="icon" size={18} />
                    Start Date
                  </label>
                  <input
                    type="date"
                    {...register("startDate", { required: "Start Date is required" })}
                    className="input"
                  />
                  {errors.startDate && <p className="error">{errors.startDate.message}</p>}
                </div>

                <div className="input-group">
                  <label className="label">Completion Date</label>
                  <input
                    type="date"
                    {...register("completionDate", { required: "Completion Date is required" })}
                    className="input"
                  />
                  {errors.completionDate && <p className="error">{errors.completionDate.message}</p>}
                </div>
              </div>

              <div className="input-group">
                <label className="label">
                  <Upload className="icon" size={18} />
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Project image is required" })}
                  className="file-input"
                />
                {errors.image && <p className="error">{errors.image.message}</p>}
              </div>

              <button
                type="submit"
                className="submit-btn"
              >
                Submit Project
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
