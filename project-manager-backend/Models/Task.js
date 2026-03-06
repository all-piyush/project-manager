const mongoose=require('mongoose');
const User=require('./User');
const Project=require('./Project');
const taskschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    assignedto:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active','pending','completed'],
        required:true,
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
    }
    
},{timestamps:true})
module.exports=mongoose.model('Task',taskschema);