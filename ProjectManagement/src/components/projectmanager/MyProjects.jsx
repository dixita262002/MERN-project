import axios from 'axios'
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
  