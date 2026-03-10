const Users=require('../Models/User');
exports.getmembers=async(req,res)=>{
    try{
        const members=await Users.find({},'name role position ');
        return res.status(200).json({
            message:"Members Fetched Successfully",
            success:true,
            members:members
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
