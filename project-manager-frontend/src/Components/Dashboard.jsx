import React, { useEffect } from 'react'
import './Dashboard.css'
import { IoHomeSharp } from "react-icons/io5";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdAssignment } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import { FaRegStar  } from "react-icons/fa";
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const Dashboard = () => {
      
      
  const [clicked,setclicked]=useState('overview');
  const navigate=useNavigate();
  return (
    <div id="student-dashboard">
      <div className={`dashboard-sidebar`}>
        <div id="dashboard-heading"><FaGraduationCap></FaGraduationCap>Dashboard </div>
        <div id="sidebar-options">
          <div className={clicked==='overview'?'Active':''} onClick={()=>{setclicked('overview') ;navigate('overview')}}><IoHomeSharp></IoHomeSharp>Overview</div>
          <div className={clicked==='pending'?'Active':''}  onClick={()=>{setclicked('enrolled-courses');navigate('enrolled-courses')}}><RiGraduationCapFill></RiGraduationCapFill>Pending Tasks</div>
          <div className={clicked==='completed'?'Active':''} onClick={()=>{setclicked('all-courses');navigate('all-courses')}}><FaRegStar></FaRegStar>Completed Tasks</div>
          <div className={clicked==='assesments'?'Active':''} onClick={()=>setclicked('assesments')}><MdAssignment></MdAssignment>Assesments</div>
          
        </div>
      </div>
      <br/>
      
      <Outlet context={{usertasks,setusertasks,userprojects,setuserprojects}}></Outlet>
    </div>

  )
}

export default Dashboard
