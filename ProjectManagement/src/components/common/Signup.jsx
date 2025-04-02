import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import {  Link, useNavigate } from 'react-router-dom'
import '../../assets/signup.css';

export const Signup = () => {

        const {register,handleSubmit} = useForm()

        const navigate = useNavigate();

        const submitHandler = async(data) => {
                console.log(data);
                data.roleId = "67befdabe0b969144326973f"
                
        const res = await axios.post("/user",data)
        
        if(res.status === 201){
                alert("user created successfully")
                navigate("/login")
        }
}               
  return (
    <div className='signup-container' style={{textAlign:"center"}}>
        <div className='signup-card'>
        <h3 className="signup-title">Signup</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
                
                <div className='form-group'>
                        <label>FullName</label>
                        <input type='text' placeholder='Full Name' className='form-input'{...register("fullname")} ></input>
                </div>
                <div className='form-group'>
                        <label>Contact</label>
                        <input type='text' placeholder='contect' className='form-input'{...register("contact")} ></input>
                </div>
                <div className='form-group'>
                        <label>Email</label>
                        <input type='email' placeholder='Email' className='form-input'{...register("email")} ></input>
                </div>
                <div className='form-group'>
                        <label>Password</label>
                        <input type='password' placeholder='Password' className='form-input' {...register("password")} ></input>
                </div>
                <div className='form-group'>
                        <label>Status</label>
                        <input type='text'placeholder='Statuss' className='form-input' {...register("status")} ></input>
                </div>
               
                <div>
                <button type='submit' className='btn btn-primary'>SIGNUP</button>
                </div>
        </form>
        <div className='signup-footer'>
        <p>Don't have Account ?</p>
      <Link to='/login' type='button' className="login-link">
        Login
      </Link>
        
        </div>
    </div>
    </div>
  )
}
        