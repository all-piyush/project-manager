const User=require("../Models/User");
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require("dotenv").config();
exports.login=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Enter all required details "
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        const match=await bcrypt.compare(password,user.password);
        if(!match ){
            return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            })
        }
        const payload={email:user.email,role:user.role,position:user.position,userid:user._id};
        let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        return res.cookie('token',token,options).status(200).json({
            success:true,
            message:"User logged in successfully",
            user:user,
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Internal Servr Error"
        })
    }
}
exports.signup=async(req,res)=>{
    try{
        const{name,email,password,role,position}=req.body;
        const exist=await User.findOne({email});
        if(exist){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            })
        }

        let hashedpass=await bcrypt.hash(password,10);
        const newuser=await User.create({name:name,email:email,password:hashedpass,position:position,role:role});
        const options={expires:new Date(Date.now()+24*60*60*1000),httpOnly:true,
        sameSite:process.env.NODE_ENV==='production'?"None":"Lax",secure:process.env.NODE_ENV==='production'};
        const payload={email:newuser.email,userid:newuser._id,position:newuser.position,role:newuser.role};
        let token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1d"});
        return res.cookie("token",token,options).status(201).json({
                success:true,
                message:"Signed up successfully",
                user:newuser
            })
}
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}