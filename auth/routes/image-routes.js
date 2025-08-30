const express=require('express')
const router=express.Router();
const {uploadImage,fetchImages,deleteimage}=require('../Controllers/image-controller');
const adminmiddleware=require('../middleware/admin-middleware')
const authmiddleware=require('../middleware/auth-middleware')
const uploadmiddlerware=require('../middleware/upload-middleware')
router.post('/upload',authmiddleware,adminmiddleware,uploadmiddlerware.single('image'),uploadImage)
router.get('/get',authmiddleware,fetchImages)
router.delete('/delete/:id',authmiddleware,adminmiddleware,deleteimage)
module.exports=router;