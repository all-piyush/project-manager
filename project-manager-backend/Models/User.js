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
    position:{
        type:String,
        enum:['developer','designer','analyst','tester'],
        required:true,
    }
},{timestamps:true})
module.exports=mongoose.model('User',userschema);