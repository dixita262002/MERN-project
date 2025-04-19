import React from 'react'
import '../../assets/login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'

export const Login = () => {

  const navigate = useNavigate();

  const {register,handleSubmit,formState:{errors}} = useForm()

  const submitHandler = async(data) =>{
    //console.log(data)

    //const res = await axios.post("http://localhost:3000/user/login")
    const res = await axios.post("/user/login",data)
    //console.log(res)
    console.log(res.data)
    if(res.status === 200){
      alert("login success")

      //(tost...console->application)
localStorage.setItem("id",res.data.data._id)
localStorage.setItem("role",res.data.data.roleId.name)

if(res.data.data.roleId.name === "USER"){
     navigate("/user")    //check app.js
       }
        // else 
         if(res.data.data.roleId.name ==="MANAGER"){
            navigate("/projectmanager")
          }
          if(res.data.data.roleId.name ==="ADMIN"){
            navigate("/admin")
          }
          if(res.data.data.roleId.name ==="Team Member"){
            navigate("/tmembers")
          }
        }
  };

  const validationSchima = {
    emailValidator :{
      required :{
        value:true,
        message:"Email is required",
      },
      pattern:{
        value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message:"please provide a valid email",
      },
    },
    
  }

  return (
    
        <div className='login-container' style={{textAlign:"center",}}>
          <div className='login-card'>
    <h3 className="login-title">LogIn</h3>
    <form onSubmit={handleSubmit(submitHandler)} >
    
        
<div  className='form-group'>
        <label >Email</label>
        <input type='email'  className='form-input' {...register("email",validationSchima.emailValidator)} ></input>
        {
          errors.email?.message
        }
</div>
<div  className='form-group'>
        <label >Password</label>
        <input type='current-password'  className='form-input'  {...register("password")}></input>
</div>
<div>
<button type="submit" className="btn btn-primary">
  LogIn</button>
</div>
    
    </form>
    <div className='login-footer'>
      <p>Don't have Account ?</p>
      <div className=" remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label>Remember Me</label>
            </div>
            <Link to="/resetpassword" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
      <Link to='/signup' type='button' className="signup-link">
        Sign Up
      </Link>
         </div>
         <div className='bg-image' style={{backgroundImage:"url('src/assets/Pictures/images 4.jpeg')",backgroundSize:'cover',backgroundPosition:'center'}}>

         </div>
    </div>
    </div>

  
    
    )
};



/*import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // const submitHandler = async (data) => {
  //   try {
  //     const res = await axios.post("/user/login", data);
  //     if (res.status === 200) {
  //       alert("Login Success");
  //       localStorage.setItem("id", res.data.data._id);
  //       localStorage.setItem("role", res.data.data.roleId.name);

  //       if (res.data.data.roleId.name === "USER") {
  //         navigate("/user");
  //       } else if (res.data.data.roleId.name === "Agency") {
  //         navigate("/agency");
  //       }
  //     }
  //   } catch (error) {
  //     alert("Login Failed");
  //   }
  // };

  /***const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res.data.token)
      localStorage.setItem("token",res.data.token)
      
    } catch (error) {
      alert("Login Failed");
    }
  };

  const userApi = async()=>{
    axios.get("url",{headers:{ "Authorization":"Beaer "+localStorage.getItem("token")
      }
    })
  }
  return (
    <div className="login">
      <div className="login-card">
        <div className="brand">
          <div className="brand-logo"></div>
          <h1>LOGIN USER</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text" id="email"  {...register("email")} placeholder="Enter email"  autoComplete="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" {...register("password")} placeholder="Enter password" autoComplete="current-password"
            />
          </div>
          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <Link to="/resetpassword/:token" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="social-login">
          <p>Or login with</p>
          <div className="social-buttons">
            <div className="social-btn">G</div>
            <div className="social-btn">F</div>
          </div>
        </div>
        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
*/