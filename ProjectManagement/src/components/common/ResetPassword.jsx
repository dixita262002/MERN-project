import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { data, useParams } from 'react-router-dom'

export const ResetPassword = () => {
    const token = useParams().token
    const {register,handleSubmit} = useForm()
    const submitHandler = async(data) =>{
        //resetpassword api..
        const obj = {
            token:token,
            password:data.password
        }
        const res = await axios.post("/user/resetpassword",obj)
        console.log(res.data)
    }
  return (
    <div>
        <h3>ReastPassword</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
            <div>
                <label>NEW PASSWORD</label>
                <input type="text" {...register("password")}></input>
            </div>
            <input type="submit" ></input>
        </form>
    </div>
  )
}
