const express=require('express')
const authmiddleware=require('../middleware/auth-middleware')
const adminmiddleware=require('../middleware/admin-middleware')
const router=express.Router()
router.get('/welcome',authmiddleware,adminmiddleware,(req,res)=>{
    const {role}=req.user;
    res.status(200).json({message:`Welcome to the  page, user with role ${role}`});
})
module.exports=router;