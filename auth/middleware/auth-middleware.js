const express=require('express');
require('dotenv').config();
const authmiddleware=(req,res,next)=>{
    const authheader=req.headers['authorization'];
    const token=authheader && authheader.split(' ')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err){
            return res.status(403).json({message:"Forbidden"});
        }
        req.user=decoded;
        next();
    });
}
module.exports=authmiddleware;