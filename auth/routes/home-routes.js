const express=require('express')
const authmiddleware=require('../middleware/auth-middleware')
const router=express.Router()
router.get('/welcome',  authmiddleware,(req,res)=>{
    const {userId}=req.user;
    res.status(200).json({message:`Welcome to the home page, user ${userId}`});
})
module.exports=router;