const User = require('../models/User');
const registeruser=async(req,res)=>{
    try{
        const {username,email,password,role}=req.body;
        const checkexisting=await User.findOne({
            $or:[{email},{username}]
        })
        if(checkexisting){
            return res.status(409).json({message:"User already exists"});
        }
        const passwordHash=await bcrypt.hash(password,HASH_SALT_ROUNDS);
        const user=await User.create({username,email,password:passwordHash,role});
        res.status(201).json({message:"User registered successfully",user});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const loginuser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token=jwt.sign({
            userId:user._id,
            username:user.username,
            role:user.role
        },
            JWT_SECRET,
            {expiresIn:'1h'}
            );
        res.status(200).json({message:"User logged in successfully",user,token});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const changepassword=async (req,res)=>{
    try{
        const userid=req.user.userId;
        const {oldpass,newpass}=req.body;
        const user=await User.findById(userid);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch=await bcrypt.compare(oldpass,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        user.password=await bcrypt.hash(newpass,process.env.HASH_SALT_ROUNDS);
        await  user.save();
        res.status(200).json({message:"Password changed successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
module.exports={registeruser,loginuser,changepassword};