import React from 'react'
import { useOutletContext } from 'react-router-dom';
import './AdminOverview.css'
const Adminoverview = () => {
  const{members,projects,tasks}=useOutletContext();
  const active=tasks.filter((task)=>task.status==='active');
  const completed=tasks.filter((task)=>task.status==='completed');
  const pending=tasks.filter((task)=>task.status==='pending');
  const project_size=projects.length;
  const active_size=active.length;
  const completed_size=completed.length;
  const pending_size=pending.length;
  return (
    <div id="admindashboard-content">
             <h2 id="content-heading">Welcome!</h2> 
              <div id="admindashboard-progress">
                <div>
                  <div className="admindashboard-progress-innera">Total Projects</div><br/>
                  <div className="admindashboard-progress-innerb">{project_size}</div>
                </div>
                <div>
                  <div className='admindashboard-progress-innera'>Active Tasks</div><br/>
                  <div className='admindashboard-progress-innerb'>{active_size}</div>
                </div>
                <div>
                  <div className='admindashboard-progress-innera'>Completed Taks</div><br/>
                  <div className='admindashboard-progress-innerb'>{completed_size}</div>
                </div>
                <div>
                  <div className='admindashboard-progress-innera'>Pending Tasks</div><br/>
                  <div className='admindashboard-progress-innerb'>{pending_size}</div>
                </div>
              </div>
              <div id="task-status">
                <h2>Members Activity</h2>
                <br/>
                <h3>Active Tasks</h3>
                {members.map((member)=>{
                  const taskin=tasks.filter((task)=>task.assignedto===member._id);
                  return<div className='task-completed'><div>{member.name} </div> <div> {taskin.length}</div></div>
                })}
              </div>
          </div>
  )
}

export default Adminoverview
