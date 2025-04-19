/* import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
 
 export const ManageTask = () => {

  const [roles,setRoles] = useState([])
 // const [users,setUsers] = useState([])
 const [teamMembers, setTeamMembers] = useState([])
  const [projects,setProjects] = useState([])
  const {register, handleSubmit, reset, formState: {errors},} = useForm();

  const getAllRoles = async()=>{
    const res = await axios.get("/roles")
    console.log(res.data)
    setRoles(res.data.data)
  }
/*const getUserByRoleId = async(id)=>{
    alert(id)
    //alert(id) //api
    const res = await axios.get(`getuserbyrole/${id}`);
    console.log("user response...",res.data)
   setUsers(res.data.data)

  }*/
 /*const getTeamMemberByRoleId = async(id)=>{
  alert(id)
  const res = await axios.get('/teammember/getTeamMemberByRole/${id}')
  console.log("teamMember respons...",res.data)
  setTeamMembers(res.data.data)
 }
  const getAllProjectes = async()=>{
    const res = await axios.get("/project/all")
    console.log(res.data)
    setProjects(res.data.data)
  }
  
  
 /* const onSubmit = async(data) =>{
    try{
      const res = await axios.post("/task/addtask",data);
      alert("taask create successfully");
      reset();   //reset after successful submission
  }catch(err){
    console.err("error creating task:",err)
    alert("failed to create task")
  }
};*/
/*const submitHandler = async (data) => {
  try {
  
    const res = await axios.post("/task/addtask", data);
    console.log("Submitted data:", data);

    alert("Task created successfully");
    reset(); // Clear the form after submission
  } catch (err) {
    console.error("Error creating task:", err); // Log the error
    alert("Failed to create task");
  }
};


useEffect(()=>{
  getAllRoles();
  getAllProjectes();
},[])

   return (
     <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h2  className="text-2xl font-bold mb-4 text-center">CREATE TASK</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">

      {/*task name */
      /*<div>
        <label  className="block text-gray-700">Task Name</label>
        <input {...register("taskName", {required:"task name is required"})}
         className='w-full p-2 border round'
          placeholder='Enater task name' />
        {
          errors.name && <p className='text-red-500'>{errors.name.message}</p>
        }
      </div>
        {/*description */
       /* <div>
          <label className="block text-gray-700">Description</label>
          <textarea {...register("description", {required:"description is required"})}
           className="w-full p-2 border rounded"
            placeholder="Enter task description" />
          {
            errors.description && <p className='text-red-3000'>{errors.description.message}</p>
          }
        </div>
        {/*assigned to */
        {/*<div>
          <label className="block text-gray-700">Assigned to (userId):</label>
          <input {...register("userId", {required:"user ID is required"})} 
           className="w-full p-2 border rounded"
           placeholder="Enter assigned user ID" />
          {
            errors.assignedTo && <p className='text-red-3000'>{errors.assignedTo.message}</p>
          }
        </div>*/}
        /*<div>
          <label>Assigned To</label>
          <select {...register("roleId")} onChange={(event)=>{getTeamMemberByRoleId(event.target.value)}}>
          <option>SELECT ROLE</option>
            {
              roles?.map((role)=>{
                return <option key={role._id} value={role._id} >{role.name}</option>
              })
            }
        </select>
        </div>
        <div>
           <label> TeamMember</label>
           <select {...register("teamMemberId")} >
           <option>SELECT MEMBER</option>
               {
                teamMembers?.map((teamMember)=>{
                return <option key={teamMember._id} value={teamMember._id}>{teamMember.name}</option>
                })}
</select>
</div>
<div>
          <label>PROJECTS</label>
          <select {...register("projectId")} >
            <option>SELECT PROJECT</option>
            {
              projects?.map((project)=>{
                return <option key={project._id} value={project._id} >{project.title}</option>
              })
            }
          </select>
        </div>
        {/*status */
        /*<div>
          <label  className="block text-gray-700">Status:</label>
          <select {...register("status")} className="w-full p-2 border rounded">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {/*priority */
        /*<div>
          <label  className="block text-gray-700">Priority</label>
          <select {...register("priority")} className="w-full p-2 border rounded">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        {/*start date */
       /* <div>
          <label className="block text-gray-700">Start Date</label>
          <input type="date" {...register("startDate", {required:"start date is required"})}
           className='w-full p-2 border rounded'/>
        </div>
        {/*submit button */     
      /*<button type='submit' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>Create task</button>
      </form>
     </div>
     
   )
 }
 */
 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import { useForm } from 'react-hook-form';
 import { useNavigate } from 'react-router-dom';
 //import './ManageTask.css'; // Import your CSS file
 import '../../assets/ManageTask.css'
 
 const ManageTask = () => {
   const { register, handleSubmit, reset, formState: { errors } } = useForm();
   const navigate = useNavigate();
 
   const [users, setUsers] = useState([]);
   const [selectedUserId, setSelectedUserId] = useState('');
   const [projects, setProjects] = useState([]);
   const [selectedProjectId, setSelectedProjectId] = useState('');
 
   useEffect(() => {
     const fetchUsers = async () => {
       try {
         const res = await axios.get('/users');
         setUsers(res.data.data || []);
       } catch (err) {
         console.error('❌ Error fetching users:', err);
       }
     };
     fetchUsers();
   }, []);
 
   useEffect(() => {
     const fetchProjects = async () => {
       if (!selectedUserId) return;
       try {
         const res = await axios.get(`/project/projectbyuser/${selectedUserId}`);
         setProjects(res.data.data || []);
       } catch (err) {
         console.error('❌ Error fetching projects:', err);
       }
     };
     fetchProjects();
   }, [selectedUserId]);
 
   const onSubmit = async (data) => {
     if (!selectedUserId || !selectedProjectId) {
       alert('Please select user and project first.');
       return;
     }
 
     const taskData = {
       taskName: data.taskName,
       description: data.description,
       status: 'Pending',
       assignedTo: selectedUserId,
       projectId: selectedProjectId,
       startDate: data.startDate,
       dueDate: data.dueDate,
     };
 
     try {
       const res = await axios.post('/task/addtask', taskData);
       alert('✅ Task successfully added!');
       reset();
       setSelectedProjectId('');
     } catch (err) {
       console.error('❌ Error adding task:', err);
       alert('Error while adding task. Check console.');
     }
   };
 
   return (
     <div className="manage-task-container">
       <h2 className="form-title">Assign Task to User</h2>
 
       <div className="form-group">
         <label>Select User</label>
         <select
           value={selectedUserId}
           onChange={(e) => setSelectedUserId(e.target.value)}
           className="form-input"
         >
           <option value="">-- Select User --</option>
           {users.map((user) => (
             <option key={user._id} value={user._id}>
               {user.fullName} ({user.email})
             </option>
           ))}
         </select>
       </div>
 
       {selectedUserId && (
         <div className="form-group">
           <label>Select Project</label>
           <select
             value={selectedProjectId}
             onChange={(e) => setSelectedProjectId(e.target.value)}
             className="form-input"
           >
             <option value="">-- Select Project --</option>
             {projects.map((project) => (
               <option key={project._id} value={project._id}>
                 {project.title}
               </option>
             ))}
           </select>
         </div>
       )}
 
       {selectedProjectId && (
         <form onSubmit={handleSubmit(onSubmit)} className="task-form">
           <div className="form-group">
             <label>Task Title</label>
             <input
               type="text"
               {...register('taskName', { required: 'Task Title is required' })}
               className="form-input"
               placeholder="Enter task title"
             />
             {errors.taskName && <p className="error-text">{errors.taskName.message}</p>}
           </div>
 
           <div className="form-group">
             <label>Description</label>
             <textarea
               {...register('description', { required: 'Description is required' })}
               className="form-input"
               placeholder="Enter task description"
             />
             {errors.description && <p className="error-text">{errors.description.message}</p>}
           </div>
 
           <div className="form-row">
             <div className="form-group">
               <label>Start Date</label>
               <input
                 type="date"
                 {...register('startDate', { required: 'Start Date is required' })}
                 className="form-input"
               />
               {errors.startDate && <p className="error-text">{errors.startDate.message}</p>}
             </div>
 
             <div className="form-group">
               <label>Due Date</label>
               <input
                 type="date"
                 {...register('dueDate', { required: 'Due Date is required' })}
                 className="form-input"
               />
               {errors.dueDate && <p className="error-text">{errors.dueDate.message}</p>}
             </div>
           </div>
 
           <button type="submit" className="submit-btn">
             Assign Task
           </button>
         </form>
       )}
     </div>
   );
 };
 
 export default ManageTask;
 