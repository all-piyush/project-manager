const express=require('express');
const cors=require('cors');
const app=express();

app.use(express.json());
app.use(cors({
    origin:" http://localhost:5173/"
}))
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send('Welcome To Backend Server');
})
const dbconnect=require('./Config/database');
dbconnect();