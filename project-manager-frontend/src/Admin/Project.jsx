import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { useOutletContext, useParams } from 'react-router-dom'
import './Project.css'
const Project = () => {
    const api=import.meta.env.VITE_API_URL;
    const [selectedmember, setselectedmember] = useState('');
    const[taskform,settaskform]=useState(false);
    const[newtask,setnewtask]=useState({title:"",description:"",assignedto:""});
    function onchange(e){
        setnewtask((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    console.log(newtask);
    const{members,projects,setprojects,settasks,tasks}=useOutletContext();
    const{id}=useParams();
    const sid=id.toString();
    const project=projects.filter((prod)=>prod._id===sid);
    const addmember=async(name,memberid)=>{
        try{
            const req=await fetch(`${api}/admindashboard/project/${id}/addmember`,{
            method:"POST",
            headers: {"Content-Type": "application/json" },
            body:JSON.stringify({memberid:memberid}),
            credentials:'include'
          })
          if(req.ok){
            setprojects((projects)=>{return projects.map((project)=>{
                if (project._id === sid) {
                    const currentmembers = project.members || [];
                        if (currentmembers.includes(memberid)) {
                            console.log("Member already exists in this project!");
                            return project; 
                        }
                        return {...project,members: [...currentmembers, memberid]};
                    }
                    return project;
            })})}
            setselectedmember('');
        }
            catch(error){
            console.log(error);
        }
    }
    const addtask=async(e)=>{
        e.preventDefault();
        try{
            const req=await fetch(`${api}/admindashboard/project/${id}/addtask`,{
            method:"POST",
            headers: {"Content-Type": "application/json" },
            body:JSON.stringify({title:newtask.title,description:newtask.description,assignedto:newtask.assignedto}),
            credentials:'include'
          })
          const data= await req.json();
          if(req.ok){
            settasks((prevtasks) => [...prevtasks,data.task]);
            setprojects((projects)=>{return projects.map((project)=>{
                if (project._id === sid) {
                    const currenttasks = project.tasks || [];
                        if (currenttasks.includes(data.task._id)) {
                            console.log("Task already exists in this project!");
                            return project; 
                        }
                        return {...project,tasks: [...currenttasks, data.task._id]};
                    }
                    return project;
            })})}
        setnewtask({title:"",description:"",assignedto:""})
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div id="project">
      <div className="project-title"><span className='heading-keys'>Project Title: </span>{project[0].title}</div>
      <div className="project-description"><span className='heading-keys'>Project Description: </span>{project[0].description}</div>
      <div id="project-members">
        <h3>Project Members:</h3><br/>
        {project[0].members.map((memberid) => {const member = members.find(m => m._id === memberid)

        return (
            <div>
                <div className='profile-head'><CgProfile></CgProfile>{member?.name} </div>
                <div>({member?.role} , {member?.position})</div>
                <hr className='hr'/>
                <br/>
            </div>
        )})}
         <select value={selectedmember} className='select' onChange={(e)=>{addmember(e.target.options[e.target.selectedIndex].text,e.target.value);}}>
            <option value="" disabled hidden > + Add Member</option>
            {members.map((member)=>{
                return <option value={member._id} >{member.name}</option>
            })}
        </select>
      </div>
       
        
        <div id="project-members">
        <h3>Project Tasks:</h3><br/>
        {project[0].tasks.map((taskid) => {const task = tasks.find(m => m._id === taskid); const assignedto=members.find(member=>member._id===task.assignedto);

        return (
            <div>
                <div className='profile-head'><CgProfile></CgProfile>{assignedto?.name} </div>
                <div>title: {task?.title} </div>
                <div>description: {task?.description}</div>
                <hr className='hr'/>
                <br/>
            </div>
        )})}
        <button onClick={()=>{settaskform((prev)=>!prev)}} id="create-task">{taskform?"X":"Create Task"}</button>
        <form  className={`task-form ${taskform?'active':''}`} onSubmit={addtask}>
            <input type="text" placeholder="Enter Title" value={newtask.title} onChange={onchange} name="title"></input>
            <textarea placeholder='Enter Description' value={newtask.description} onChange={onchange} name="description"></textarea>
            
            <select value={newtask.assignedto} className='select' onChange={onchange} name="assignedto">
            <option value="" disabled hidden > + Add Member</option>
            {project[0].members.map((member)=>{ const onemember=members.find((mem)=>mem._id===member);
                return <option value={member} >{onemember.name}</option>
            })}
        </select>
            <button type='submit' className='submit'>Add task</button>
        </form>
        </div>

    </div>
  )
}

export default Project
