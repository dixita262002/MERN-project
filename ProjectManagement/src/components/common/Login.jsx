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
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
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
