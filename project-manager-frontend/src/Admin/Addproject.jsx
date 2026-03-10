import React, { useState } from 'react'
import './Addproject.css'
const Addproject = () => {
    const api=import.meta.env.VITE_API_URL;
    const[name,setname]=useState('');
    const[description,setdescription]=useState('');
    const handlesubmit=async()=>{
        try{
          const req=await fetch(`${api}/admindashboard/createproject`,{
            method:"POST",
            body:JSON.stringify({name:name,description:description}),
            credentials:'include'
          })
        }catch(error){
          console.log(error);
        }
      }
    
  return (
    <div id="addprojects">
      <h1>Add Project</h1>
      <form onSubmit={handlesubmit} className='addproject'>
        <div>
        <label>Project Title</label><br/>
        <input type="text" value={name} placeholder='Enter Title of Project' onChange={(e)=>{setname(e.target.value)}}></input>
        </div>
        <div>
        <label>Project Description</label><br/>
        <textarea type="text" value={description} placeholder='Enter Descripton about project' onChange={(e)=>{setdescription(e.target.value)}}></textarea>
        </div>
        <button >Add Project</button>
      </form>
    </div>
  )
}

export default Addproject
