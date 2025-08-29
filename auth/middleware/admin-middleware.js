const express=require('express');
const adminmiddleware=(req,res,next)=>{
    const {role}=req.user;
    if(role!=='admin'){
        return res.status(403).json({message:"Forbidden"});
    }
    next();
}
module.exports=adminmiddleware;
