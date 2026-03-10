import React, { useEffect } from 'react'
import './Admindashboard.css'
import { IoHomeSharp } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdAssignment } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaRegStar  } from "react-icons/fa";
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const Admindashboard = () => {
  const api=import.meta.env.VITE_API_URL;
  const [projects,setprojects]=useState([]);
  const[members,setmembers]=useState([]);
  const[tasks,settasks]=useState([]);
      const fetchprojects=async()=>{
        try{
          const req=await fetch(`${api}/admindashboard/fetchprojects`,{
            method:"GET",
            credentials:'include'
          })
          const data=await req.json();
          setprojects(data.projects);
          console.log("pr",data.projects);
        }catch(error){
          console.log(error);
        }
      }
      const fetchmembers=async()=>{
        try{
          const req=await fetch(`${api}/admindashboard/fetchmembers`,{
            method:"GET",
            credentials:'include'
          })
          const data=await req.json();
          setmembers(data.members);
          console.log(data.members);
        }catch(error){
          console.log(error);
        }
      }
      const fetchtasks=async()=>{
        try{
          const req=await fetch(`${api}/admindashboard/fetchtasks`,{
            method:"GET",
            credentials:'include'
          })
          const data=await req.json();
          settasks(data.tasks);
          console.log(data.tasks);
        }catch(error){
          console.log(error);
        }
      }
      useEffect(()=>{
        fetchmembers();
        fetchprojects();
        fetchtasks();
      },[])
  const [clicked,setclicked]=useState('overview');
  const navigate=useNavigate();
  return (
    <div id="student-dashboard">
      <div className={`dashboard-sidebar`}>
        <div id="dashboard-heading"><FaGraduationCap></FaGraduationCap>Admin Dashboard </div>
        <div id="sidebar-options">
          <div className={clicked==='overview'?'Active':''} onClick={()=>{setclicked('overview') ;navigate('adminoverview')}}><IoHomeSharp></IoHomeSharp>Overview</div>
          <div className={clicked==='all-projects'?'Active':''} onClick={()=>{setclicked('all-projects');navigate('all-projects')}}><FaRegStar></FaRegStar>All Projects</div>
          <div className={clicked==='assesments'?'Active':''} onClick={()=>{setclicked('assesments');navigate('addmember')}}><MdAssignment></MdAssignment>All Members</div>
          <div className={clicked==='project'?'Active':''} onClick={()=>{setclicked('project');navigate('addproject')}}><MdAssignment></MdAssignment>Add Project</div>
          
        </div>
      </div>
      <br/>
      
      <Outlet context={{members , projects,setmembers,setprojects,tasks,settasks}}></Outlet>
    </div>

  )
}

export default Admindashboard
