/*import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../assets/myprojects.css'
import { useNavigate } from 'react-router-dom'

export const MyProjects = () => {
  const {register,handleSubmit} = useForm()
   const navigate = useNavigate()

  const SubmitHandler = async(data) =>{
 //data.userId = localStorage.getItem("id")
  console.log(data)
  console.log(data.image[0])              //array --->0 index access

  const formData = new FormData();
  formData.append("title",data.title);
  formData.append("description",data.description);
  formData.append("technology",data.technology);
  formData.append("startDate",data.startDate);
  formData.append("completionDate",data.completionDate);
  formData.append("image",data.image[0]);
    
    //const res = await axios.post("/project/addproject",data)
    const res = await axios.post("/project/addwithfile",formData)
  
  
    console.log(res);            //axios
    console.log(res.data) 
          //api respons
    //if(res.status === 201){
    //  alert("project created successfully")
      navigate("/projectmanager/projectscreen")
///}        
//else{
  //    alert("user not created")
//}
}
    return (
    <div style={{textAlign:"center"}} className="form-container">

      <h3 className="form-header">PROJECT</h3>
      <form onSubmit={handleSubmit(SubmitHandler)} encType='multipart/form-data'>
        
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" type='text' {...register("title")}></input>
        </div>
        <div className="form-group">
          <lable  className="form-label">Desciption</lable>
          <input className="form-input"  type='text' {...register("description")}></input>
        </div>
        <div className="form-group">
          <label  className="form-label">Technology</label>
          <input className="form-input" type='text' {...register("technology")}></input>
        </div>
        <div  className="form-group">
          <label className="form-label">startDate</label>
          <input className="form-input" type='date' {...register("startDate")}></input>
        </div>
        <div className="form-group">
          <label className="form-label">EndDate</label>
          <input className="form-input" type='date' {...register("completionDate")}></input>
        </div>    
      <div className="form-group">
        <label className="form-label">select image URL </label>
        <input className="form-input"  type='file' {...register("image")}></input>
       </div>
          <input  className="form-submit"  type='submit' value="submit"></input>
      </form>
        
    </div>
  )
}
  */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
//import './MyProjects.css'; // Make sure to create this file for your custom styles
import '../../assets/MyProjects.css'

export const MyProjects = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [role, setRole] = useState(""); // Role: Admin or Project Manager

  // Fetch all users
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
      if (!role) {
        alert("Please select a role before submitting");
        return;
      }

      if (role === "Project Manager" && !selectedUserId) {
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
      if (role === "Project Manager") {
        formData.append("assignedUserId", selectedUserId);
      }

      const endpoint = role === "Admin" ? '/admin/addproject' : '/project/addwithfile';

      const res = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("✅ Project Added Successfully:", res.data);
      alert("Project assigned and saved!");

      reset();
      setSelectedUserId("");
      setRole("");
      navigate('/projectmanager/projectscreen');
    } catch (err) {
      console.error("❌ Error saving project:", err.response?.data || err);
      alert("Failed to save project. Check console for details.");
    }
  };

  return (
    <div className="project-form-container">
      <h2 className="form-title">Assign Project to User</h2>

      {/* Select Role */}
      <div className="form-group">
        <label>Select Role</label>
        <select
          onChange={(e) => setRole(e.target.value)}
          className="form-select"
          value={role}
        >
          <option value="" disabled>Select role...</option>
          <option value="Admin">Admin</option>
          <option value="Project Manager">Project Manager</option>
        </select>
      </div>

      {/* Show User Selection for Project Manager */}
      {role === "Project Manager" && (
        <div className="form-group">
          <label>Select a User</label>
          <select
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="form-select"
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

      {/* Show Form */}
      {role && (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="form-space">
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter project title"
              className="form-input"
            />
            {errors.title && <p className="error-message">{errors.title.message}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              placeholder="Enter project description"
              className="form-input"
            />
            {errors.description && <p className="error-message">{errors.description.message}</p>}
          </div>

          <div className="form-group">
            <label>Technology</label>
            <input
              type="text"
              {...register("technology", { required: "Technology is required" })}
              placeholder="e.g. MERN, Django"
              className="form-input"
            />
            {errors.technology && <p className="error-message">{errors.technology.message}</p>}
          </div>

          <div className="form-flex">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                {...register("startDate", { required: "Start Date is required" })}
                className="form-input"
              />
              {errors.startDate && <p className="error-message">{errors.startDate.message}</p>}
            </div>

            <div className="form-group">
              <label>Completion Date</label>
              <input
                type="date"
                {...register("completionDate", { required: "Completion Date is required" })}
                className="form-input"
              />
              {errors.completionDate && <p className="error-message">{errors.completionDate.message}</p>}
            </div>
          </div>

          <div className="form-group">
            <label>Project Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Project image is required" })}
              className="form-input"
            />
            {errors.image && <p className="error-message">{errors.image.message}</p>}
          </div>

          <button
            type="submit"
            className="submit-button"
          >
            Submit Project
          </button>
        </form>
      )}
    </div>
  );
};

export default MyProjects;
