const Project=require('../Models/Project');
exports.createproject=async(req,res)=>{
    try{
        const id=req.user.id;
        const {title,description}=req.body;
        await Project.create({title:title,description:description,manager:id});
        return res.status(200).json({
            message:"Project Created Successfully",
            success:true,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.fetchprojects=async(req,res)=>{
    try{
        const allprojects=await Project.find({});
        return res.status(200).json({
            message:"projects fetched successfully",
            success:true,
            projects:allprojects
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error",
            projects:allprojects,
        })
    }
}
exports.addmember=async(req,res)=>{
    try{
        const id=req.params.id;
        console.log(id);
        const {memberid}=req.body;
        console.log(memberid);
        const updation=await Project.findByIdAndUpdate(id,{$addToSet:{"members":memberid}},{new:true});
        return res.status(200).json({
            message:"Members Added Successfully",
            success:true,
            project:updation,
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
