import React from 'react'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import './Allproject.css'
const Allprojects = () => {
    const navigate=useNavigate();
    const {projects,members}=useOutletContext();
    
  return (
      <div id="allprojects">
        <h1>All Projects</h1>
        <div id="projectbox">
        {projects.map((project)=>{
            return <div className='project-card' onClick={()=>{navigate(`/admindashboard/project/${project._id}`)}}>
                <h3><span className='project-keys'>Title: </span>{project.title}</h3>
                <h4><span className='project-keys'>Description: </span>{project.description}</h4>
            </div>
        })}
        </div>
        <div></div>
    </div>
  )
}

export default Allprojects
