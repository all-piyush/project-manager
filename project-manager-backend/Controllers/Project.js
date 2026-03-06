const Project=require('../Models/Project');
exports.createproject=async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}