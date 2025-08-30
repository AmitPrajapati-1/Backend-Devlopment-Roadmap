const Image=require('../models/image');
const {uploadtocloudinary}=require('../helpers/cloudinaryHelper');
const fs=require('fs');
const uploadImage=async (req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'No file uploaded'
            });
        }

        const  {url,publicId}=await uploadtocloudinary(req.file.path);

        const newuploadimage=new Image({
            url,
            publicId,
            uploadedBy:req.user.userId
        })
        await newuploadimage.save();
        fs.unlinkSync(req.file.path);
        res.status(201).json({
            success:true,
            message:'Image uploaded successfully',
            image:newuploadimage
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            sucess:false,
            message:'somthing went wrong'

        })
    }
}

const fetchImages=async (req,res)=>{
    try{
        const images=await Image.find({uploadedBy:req.user.userId});
        res.status(200).json({
            success:true,
            images
        });
    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'something went wrong'
        });
    }
}

module.exports={uploadImage,fetchImages};