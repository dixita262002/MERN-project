import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { data } from 'react-router-dom'
//import '../../assets/dashboard.css'

export const Dashboard = () => {

  const [projects, setProjects] = useState([]);
  const [modules, setModules] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getAllProjectes = async()=>{
    const res = await axios.get("/project/all")
    console.log(res.data)
      setProjects(res.data.data)
   }
   const getAllModules = async()=>{
    const res = await axios.get("/module/allmodules")
    console.log(res.data)
    setModules(res.data.data)
   }
  const getAllTasks = async()=>{
    const res = await axios.get("/task/alltasks")
    console.log(res.data)
    setTasks(res.data.data)
  }

    useEffect(()=>{
     getAllProjectes()
     getAllModules()
     getAllTasks()
      },[reset])

  const {register,handleSubmit, reset} = useForm()
  const submitHandler = (data)=> {
   console.log(data)
  }
  return (
    <div style={{textAlign:"center"}} className="dashboard-container">
      <h3 className="dashboard-title">Dashboard Overview</h3>
      <form onSubmit={handleSubmit(submitHandler)} className="dashboard-form">     
     <div  className="form-group">
      <label>Project Titles</label>
      <select {...register("projectId")}>
        <option>lists project </option>
        {
          projects?.map((project)=>{
            return <option  key={project.id} value={project.id}>{project.title}</option> 
          })
        }
      </select>
     </div>
     <div className="form-group">
      <label>Module Name</label>
      <select {...register("moduleId")}>
        <option>list module</option>
        {
          modules?.map((module)=>{
            return <option  key={module.id} value={module.id}>{module.moduleName}</option>
          })
        }
      </select>
      </div>
      <div className="form-group">
       <label>Task Name</label>
        <select {...register("taskId")}>
          <option>list tasks</option>
          {
            tasks?.map((task)=>{
              return <option  key={task.id} value={task.id}>{task.taskName}</option>
            })
          }
        </select>
      </div>
     <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
        
    </div>
  )

}