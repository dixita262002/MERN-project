import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateMyProject = () => {
    const id = useParams().id;
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`/project/getprojectbyId/${id}`);
                reset(res.data.data); // Setting default values
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        fetchProject();
    }, [id, reset]);

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
};
