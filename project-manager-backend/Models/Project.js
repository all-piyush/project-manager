const mongoose=require('mongoose');
const User=require('./User');
const Task=require('./Task');
const projectschema=new mongoose.Schema({
    title:{
        type:String,
    },
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task',
    }],
    manager:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    description:{
        type:String,
        required:true,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    status:{
    type:String,
    enum:['active','completed','pending'],
    default:'pending'
  }
    
},{timestamps:true})
module.exports=mongoose.model('Project',projectschema);