import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const AddProject = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const SubmitHandler = async (data) => {
    console.log(data);
    console.log(data.image[0]);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("technology", data.technology);
    formData.append("startDate", data.startDate);
    formData.append("completionDate", data.completionDate);
    formData.append("image", data.image[0]);

    try {
      const res = await axios.post("'http://localhost:4000/project/addwithfile", formData);
      console.log(res);
      console.log(res.data);
      navigate("/user/projectscreen");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
    }
  };

  return (
    <div className="project-container">
      <div className="project-form-card">
        <h2 className="project-title">Add New Project</h2>
        <form onSubmit={handleSubmit(SubmitHandler)} encType="multipart/form-data" className="project-form">
          <div className="form-group">
            <label>Title</label>
            <input type="text" {...register("title")} placeholder="Enter project title" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input type="text" {...register("description")} placeholder="Enter description" required />
          </div>
          <div className="form-group">
            <label>Technology</label>
            <input type="text" {...register("technology")} placeholder="e.g. MERN, Python" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" {...register("startDate")} required />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" {...register("completionDate")} required />
            </div>
          </div>
          <div className="form-group">
            <label>Project Image</label>
            <input type="file" accept="image/*" {...register("image")} required />
          </div>
          <div className="form-submit-group">
            <button type="submit">Submit Project</button>
          </div>
        </form>
      </div>
    </div>
  );
};
