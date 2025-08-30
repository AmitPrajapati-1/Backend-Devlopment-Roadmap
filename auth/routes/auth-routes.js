const express=require('express');
const {loginuser,registeruser,changepassword}=require('../Controllers/auth-controllers');
const authmiddleware=require('../middleware/auth-middleware')
const router=express.Router();
router.post('/login',loginuser);
router.post('/register',registeruser);
router.post('/change-password',authmiddleware,changepassword);
module.exports=router;