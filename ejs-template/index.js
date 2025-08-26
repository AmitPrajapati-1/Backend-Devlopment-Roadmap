const express=require('express');
const path  =require('path');
const app=express();
//set the view engine
app.set('view engine','ejs');
//set the directory for view
app.set('views',path.join(__dirname,'views'));
const products=[
    {id:1,name:'product1',price:100},
    {id:2,name:'product2',price:200},
    {id:3,name:'product3',price:300}
]
app.get('/',(req,res)=>{
    res.render('home',{products});
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})