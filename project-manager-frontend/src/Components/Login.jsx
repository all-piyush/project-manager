import React, { useState } from 'react'
import './Login.css'
import Illustration from '../assets/login.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  
  const navigate=useNavigate();
  const [login,setlogin]=useState(false);
  const[role,setrole]=useState('member');
  const[form,setform]=useState({name:"",email:"",password:""})
  function handlechange(e){
    setform((prev)=>({...prev,[e.target.name]:e.target.value}));
  }
  const handlelogin=async(e)=>{
    e.preventDefault();
    try{
      const api= import.meta.env.VITE_API_URL;
      const method=login?"login":"signup";
      const req=await fetch(`${api}/${method}`,{
        method:"POST",
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({name:form.name,password:form.password,role:role,email:form.email}),
            credentials:'include'
      })
      if(req.ok){
        const result=await req.json();
        if(result.user.role==='member'){
          navigate('/dashboard');
        }
        else{
          navigate('/admindashboard/adminoverview')
        }
      }
      setform({name:'',email:'',password:''});
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div id='login'>
      <img src={Illustration} alt='login-img' className='illustration'></img>
      <form id='login-form'>
        {login?<h2>Log In To Your Account</h2>:<h2>Sign Up To Create Account</h2>}
        {!login?(
          <div className='wrapper'>
            <label>Name</label><br/>
            <input type="text" placeholder=  'Enter Your Email' value={form.name} onChange={handlechange} name="name"></input>
          </div>
        ):''}
        <div className='wrapper'>
        <label>Email</label><br/>
        <input type="text" placeholder='Enter Your Email' value={form.email} onChange={handlechange} name="email"></input>
        </div>
        <div className='wrapper'>
        <label>Password</label><br/>
        <input type="text" placeholder='Enter Your Password' value={form.password} onChange={handlechange} name="password"></input>
        </div>
        {!login?<div className='button-wrapper'>
          <div id="role-label">Role: </div>
          <button type='submit' className={`role-button ${role==='member'?"active-button":""}`} onClick={(e)=>{e.preventDefault();setrole('member')}}>Member</button>
          <button  type='submit' className={`role-button ${role==='manager'?"active-button":""}` } onClick={(e)=>{e.preventDefault();setrole('manager')}}>Manager</button>
        </div>:''}
        
        <button type='submit' className='login-button' onClick={handlelogin}>{login?"Login":"Signup"}</button>
        <button className='switch' type='button' onClick={()=>{setlogin((prev)=>!prev);setform({name:'',email:'',password:''})}}>{login?"Don't Have Account?Create One":"Already Have An Account"}</button>
      </form>
    </div>
  )
}

export default Login
