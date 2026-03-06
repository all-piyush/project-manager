const mongoose=require('mongoose');
require('dotenv').config();
const dbconnect=async()=>{
        mongoose.connect(process.env.DATABASE_URL).
        then(()=>console.log("DB Connected Successfully")).
        catch((error)=>{
            console.log(error);
            process.exit(1);
        })
    
}
module.exports=dbconnect;