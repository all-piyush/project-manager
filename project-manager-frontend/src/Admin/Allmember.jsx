import React from 'react'
import { useOutletContext } from 'react-router-dom'
import './Allmember.css'
const Allmember = () => {
    const {members}=useOutletContext();
  return (
    <div id="members">
        <h1>All Members</h1>
        <div id="memberbox">
        {members.map((member)=>{
            return <div className='member-card'>
                <h3><span className='member-keys'>Name: </span>{member.name}</h3>
                <h4><span className='member-keys'>Role: </span>{member.role}</h4>
                <h4><span className='member-keys'>Developer: </span>{member.position}</h4>
            </div>
        })}
        </div>
        <div></div>
    </div>
  )
}

export default Allmember
