const express=require('express');
const app=express();

const myfirstmiddleware=(req,res,next)=>{
    console.log('Request received');
    next();
}

app.use(myfirstmiddleware);
app.get('/',(req,res)=>{
    res.send('Hello World from Express');
});
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
