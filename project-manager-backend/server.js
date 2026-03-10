const express=require('express');
const cors=require('cors');
const cookieparser=require('cookie-parser');
const app=express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(cookieparser());
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send('Welcome To Backend Server');
})
const routes=require('./Routes/Routes');
app.use('/api/v1',routes);
const dbconnect=require('./Config/database');
dbconnect();