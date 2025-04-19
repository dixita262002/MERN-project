/*import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { data } from 'react-router-dom'
import '../../assets/mymodules.css'

export const MyModules = () => {
  
  const {register,handleSubmit} = useForm()
  const submitHandler = async(data) => {
    console.log(data)

    const res = await axios.post("/module/add",data)
    console.log(res.data)
    if(res.status === 201){
      alert("module created successfully")
      //navigate("/login")
}        
else{
      alert("module not created")
}
  }
  return (
    <div style={{textAlign:"center"}}  className="form-container" >
      <h3 className="form-header" >Add Module</h3>
      <form onSubmit={handleSubmit(submitHandler)} >
        <div className="form-group">
          <label className="form-label">ModuleName</label>
          <input className="form-input" type='text' {...register("moduleName")} ></input>
        </div>
        <div className="form-group">
          <label className="form-label">description</label>
          <input className="form-input" type='type' {...register("description")} ></input>
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <input className="form-input" type='text' {...register("status")} ></input>
        </div>
        <div  className="form-group">
          <label className="form-label">StartDate</label>
          <input className="form-input" type='date' {...register("startdate")}></input>
        </div>
        
        <div className="form-group">
          <input type='submit' ></input>
        </div>

      </form>
        
    </div>
  )
}
*/
