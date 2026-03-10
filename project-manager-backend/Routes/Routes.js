const express=require('express');
const router=express.Router();

const{getmembers}=require('../Controllers/Users');
const{login,signup}=require('../Controllers/Login')
const{createproject,fetchprojects,addmember}=require('../Controllers/Project');
const{checkmanager,verify,checkauth}=require('../Controllers/Middleware');
const{fetchtasks,addtasks}=require('../Controllers/Task');
router.get('/admindashboard/fetchmembers',getmembers);
router.post('/login',login);
router.post('/signup',signup);
router.get('/check-auth',verify,checkauth);
router.post('/admindashboard/createproject',verify,checkmanager,createproject);
router.get('/admindashboard/fetchprojects',fetchprojects);
router.post("/admindashboard/project/:id/addmember", addmember);
router.post('/admindashboard/project/:id/addtask',addtasks);
router.get('/admindashboard/fetchtasks',fetchtasks);
module.exports=router;