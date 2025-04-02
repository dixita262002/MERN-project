import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const ViewMyProject = () => {

    const [screens,setscreens] = useState([])
    const getAllMyProjectScreens = async()=>{
     const res = await axios.get("/project/all")
       //const res = await axios.get("/project/getprojectsbyuserid"+localStorage.getItem("id"))
        console.log(res.data)
        setscreens(res.data.data)
    }
    useEffect(()=>{
        getAllMyProjectScreens()
       
    },[screens])
  return (
    <div style={{textAlign:"center"}}>
        view myproject screen
        <table className='table table-white'>
            <thead>
                <tr>
                    <th>TITLES</th>
                    <th>Desciption</th>
                    <th>IMAGE</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                      screens?.map((sc)=>{
                        return<tr>
                            <td>{sc.title}</td>
                            <td>{sc.description}</td>
                            <td>
                                <img style={{height:200,width:200}} src={sc?.imageURL}></img>
                            </td>
                            <td>
                                <Link to={'/projectmanager/updatemyproject/${sc._id}'} className='btn btn-info'>UPDATE</Link>
                            </td>
                        </tr>
                      })
                }
            </tbody>

        </table>

    </div>
  )
}
