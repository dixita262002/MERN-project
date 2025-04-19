/*import axios from 'axios'
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
                
        const res = await axios.post("/signup",data)
        
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
                        <input type='text' placeholder='Full Name' className='form-input'{...register("fullName")} ></input>
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
                <div>
                        <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="admin">Admin</option>
                <option value="project_manager">Project Manager</option>
                <option value="user">User</option>
              </select>
                </div>
                <div className='form-group'>
                        <label>Status</label>
                        <input type='text'placeholder='Status' className='form-input' {...register("status")} ></input>
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
        */

import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/signup.css';

export const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    console.log(data);
    data.roleId = '67befdabe0b969144326973f';

    try {
      const res = await axios.post('/signup', data);

      if (res.status === 201) {
        alert('User created successfully');
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container" style={{ textAlign: 'center' }}>
      <div className="signup-card">
        <h3 className="signup-title">Signup</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="form-input"
              {...register('fullName')}
            />
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input
              type="text"
              placeholder="Contact"
              className="form-input"
              {...register('contact')}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              {...register('email')}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              {...register('password')}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select className="form-input" {...register('role')}>
              <option value="admin">Admin</option>
              <option value="project_manager">Project Manager</option>
              <option value="user">User</option>
              <option value="teamMember">TeamMember</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              placeholder="Status"
              className="form-input"
              {...register('status')}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              SIGNUP
            </button>
          </div>
        </form>

        <div className="signup-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="login-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
