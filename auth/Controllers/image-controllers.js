const Image=require('../models/image');
const {uploadtocloudinary}=require('../helpers/cloudinaryHelper');
const fs=require('fs');
const cloudinary=require('../config/cloudinary');
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
        const page=parseInt(req.query.page)||1;
        const limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit;
        const sortby=req.query.sortby||'createdAt';
        const sortOrder=req.query.sortOrder==='desc'?-1:1;
        const totalimages=await Image.countDocuments();
        const totalpages=Math.ceil(totalimages/limit);
        const sortobj={}
        sortobj[sortby]=sortOrder;
        const images=await Image.find({}).skip(skip).limit(limit).sort(sortobj);
        res.status(200).json({
            success:true,
            totalpages,
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
const deleteimage=async(req,res)=>{
    try {
        const image=await Image.findById(req.params.id);
        const userId=req.user.userId;
        if(!image){
            return res.status(404).json({
                success:false,
                message:'Image not found'
            });
        }

        if(image.uploadedBy.toString()!==userId){
            return res.status(403).json({
                success:false,
                message:'Unauthorized'
            });
        }

        await cloudinary.uploader.destroy(image.publicId);
        await Image.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:'Image deleted successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:'something went wrong'
        });
    }
}
module.exports={uploadImage,fetchImages,deleteimage};