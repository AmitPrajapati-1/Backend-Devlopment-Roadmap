const cloudinary=require('../config/cloudinary');

const uploadtocloudinary=async(filepath)=>{
    try{
        const res=await cloudinary.uploader.upload(filepath);
        return {
            url:res.secure_url,
            publicId:res.public_id
        };
    }catch(error){
        console.error("Error uploading to Cloudinary:", error);
        throw new Error('Cloudinary upload failed');
    }
}
module.exports={uploadtocloudinary};