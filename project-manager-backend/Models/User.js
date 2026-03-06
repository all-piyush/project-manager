const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['manager','member']
    },
    
},{timestamps:true})
module.exports=mongoose.model('User',userschema);