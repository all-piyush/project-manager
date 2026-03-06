const mongoose=require('mongoose');
const User=require('./User');
const Task=require('./Task');
const projectschema=new mongoose.Schema({
    name:{
        type:String,
    },
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task',
    }],
    manager:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    description:{
        type:String,
        required:true,
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
    
},{timestamps:true})
module.exports=mongoose.model('Project',projectschema);