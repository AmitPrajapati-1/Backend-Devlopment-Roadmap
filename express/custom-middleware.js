const express=require('express');
const app=express();

const requesttimelogger=(req,res,next)=>{
    const timestamp=new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.url}`);
    next();
}

app.use(requesttimelogger);
app.get('/',(req,res)=>{
    res.send('Hello World from Express');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
