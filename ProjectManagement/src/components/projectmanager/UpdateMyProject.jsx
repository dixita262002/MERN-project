/*import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateMyProject = () => {
  
    const id = useParams().id;
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

   
       /* const fetchProject = async () => {
       
                const res = await axios.get(`/project/getprojectbyId/${sc._id}`);
                reset(res.data.data); // Setting default values
                console.log(res.data.data)
           
        };*/
            
        
                /*const fetchProject = async () => {
                    if (!sc || !sc._id) {
                        console.error("sc is null or undefined, or _id is missing");
                        return;
                    }
            
                    try {
                        const res = await axios.get(`/project//${id}`);
                        reset(res.data.data); // Set form default values
                        console.log(res.data.data);
                    } catch (error) {
                        console.error("Error fetching project:", error.message);
                        alert("Failed to fetch project details");
                    }
                };
            
                useEffect(() => {
              fetchProject();
                }, []);     
           
            
    const SubmitHandler = async (data) => {
        data.userId = localStorage.getItem("id");
        delete data._id;

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("technology", data.technology);
        formData.append("startDate", data.startDate);
        formData.append("completionDate", data.completionDate);

        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }

        try {
            const res = await axios.put(`/project/updateproject/${id}`, formData);
            if (res.status === 200) {
                navigate("/projectmanager/projectscreen");
            } else {
                alert("Project update failed");
            }
        } catch (error) {
            console.error("Error updating project:", error);
            alert("Something went wrong");
        }
    };

    return (
        <div style={{ textAlign: "center" }} className="form-container">
            <h3 className="form-header">PROJECT</h3>
            <form onSubmit={handleSubmit(SubmitHandler)} encType='multipart/form-data'>

                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="form-input" type='text' {...register("title")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <input className="form-input" type='text' {...register("description")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Technology</label>
                    <input className="form-input" type='text' {...register("technology")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input className="form-input" type='date' {...register("startDate")} />
                </div>
                <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input className="form-input" type='date' {...register("completionDate")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Select Image</label>
                    <input className="form-input" type='file' {...register("image")} />
                </div>
                <input className="form-submit" type='submit' value="Submit" />
            </form>
        </div>
    );
};  */

/*import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateMyProject = () => {
   // const { id } = useParams(); // Extract project ID from the URL
    const { register, handleSubmit } = useForm(); // Initialize react-hook-form
   // const navigate = useNavigate();

   /* const fetchProject = async () => {
        try {
            // Make an API call to fetch project details
            const res = await axios.get(`/project/getprojectbyId/${id}`);
            reset(res.data.data); // Set default values in the form
            console.log("Fetched project data:", res.data.data);
        } catch (error) {
            console.error("Error fetching project:", error.response?.data || error.message);
            alert("Failed to fetch project details");
        }
    };

    useEffect(() => {
        fetchProject(); // Call fetchProject on component mount
    }, [id, reset]); // Depend on `id` and `reset`*/

   /* const SubmitHandler = async (data) => {
        //data.userId = localStorage.getItem("id"); // Attach user ID from local storage
        //delete data._id; // Remove `_id` from the data 

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("technology", data.technology);
        formData.append("startDate", data.startDate);
        formData.append("completionDate", data.completionDate);

        if (data.image && data.image.length > 0) {
            formData.append("image", data.image[0]);
        }

       // try {
            // Make an API call to update the project
            const res = await axios.put(`/project/updateproject/${id}`, formData);
            console.log(res);            //axios
    console.log(res.data)
          //  if (res.status === 200) {
           //     navigate("/projectmanager/projectscreen"); // Navigate to project screen
           // } else {
           //     alert("Project update failed");
          //  }
       // } catch (error) {
         //   console.error("Error updating project:", error.response?.data || error.message);
        //    alert("Something went wrong");
      //  }
    };

    return (
        <div style={{ textAlign: "center" }} className="form-container">
            <h3 className="form-header">PROJECT</h3>
            <form onSubmit={handleSubmit(SubmitHandler)} encType="multipart/form-data">
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="form-input" type="text" {...register("title")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <input className="form-input" type="text" {...register("description")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Technology</label>
                    <input className="form-input" type="text" {...register("technology")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input className="form-input" type="date" {...register("startDate")} />
                </div>
                <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input className="form-input" type="date" {...register("completionDate")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Select Image</label>
                    <input className="form-input" type="file" {...register("image")} />
                </div>
                <input className="form-submit" type="submit" value="Submit" />
            </form>
        </div>
    );
};
*/


import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateMyProject = () => {
    const { id } = useParams(); // Extract project ID from URL
    const { register, handleSubmit, reset } = useForm(); // Initialize react-hook-form
    const navigate = useNavigate();

    // Function to fetch project details
    const fetchProject = async () => {
        try {
            const res = await axios.get(`/project/getprojectbyId/${id}`); // API call
            reset(res.data.data); // Set default values in the form
            console.log("Fetched project data:", res.data.data);
        } catch (error) {
            console.error("Error fetching project:", error.response?.data || error.message);
            alert("Failed to fetch project details");
        }
    };

    useEffect(() => {
        fetchProject(); // Fetch project details on mount
    }, [id, reset]); // Depend on `id` and `reset`

    const SubmitHandler = async (data) => {
        try {
            // Prepare data for submission
            data.userId = localStorage.getItem("id"); // Attach user ID
            delete data._id; // Remove `_id` from form data

            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("technology", data.technology);
            formData.append("startDate", data.startDate);
            formData.append("completionDate", data.completionDate);

            if (data.image && data.image.length > 0) {
                formData.append("image", data.image[0]);
            }

            // API call to update the project
            const res = await axios.put(`/project/updateproject/${id}`, formData);

            if (res.status === 200) {
                navigate("/projectmanager/projectscreen"); // Redirect on success
            } else {
                alert("Project update failed");
            }
        } catch (error) {
            console.error("Error updating project:", error.response?.data || error.message);
            alert("Something went wrong");
        }
    };

    return (
        <div style={{ textAlign: "center" }} className="form-container">
            <h3 className="form-header">UPDATE PROJECT</h3>
            <form onSubmit={handleSubmit(SubmitHandler)} encType="multipart/form-data">
                <div className="form-group">
                    <label className="form-label">Title</label>
                    <input className="form-input" type="text" {...register("title")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <input className="form-input" type="text" {...register("description")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Technology</label>
                    <input className="form-input" type="text" {...register("technology")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input className="form-input" type="date" {...register("startDate")} />
                </div>
                <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input className="form-input" type="date" {...register("completionDate")} />
                </div>
                <div className="form-group">
                    <label className="form-label">Select Image</label>
                    <input className="form-input" type="file" {...register("image")} />
                </div>
                <input className="form-submit" type="submit" value="Update Project" />
            </form>
        </div>
    );
};
