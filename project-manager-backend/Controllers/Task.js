const Task = require('../Models/Task');
const Project=require('../Models/Project');

exports.fetchtasks=async(req,res)=>{
    try{
        const tasks=await Task.find({});
        return res.status(200).json({
            message:"Tasks fetched successfully",
            success:true,
            tasks:tasks
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.addtasks=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const{title,description,assignedto}=req.body;
        console.log(title,description,assignedto);
        const task=await Task.create({title:title,description:description,project:id,assignedto:assignedto});
        const updation=await Project.findByIdAndUpdate(id,{$addToSet:{"tasks":task._id}});
        return res.status(200).json({
            message:"task created successfully",
            success:true,
            task:task
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}