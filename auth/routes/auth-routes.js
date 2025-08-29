const express=require('express');
const {loginuser,registeruser}=require('../Controllers/auth-controllers');
const router=express.Router();
router.post('/login',loginuser);
router.post('/register',registeruser);
module.exports=router;