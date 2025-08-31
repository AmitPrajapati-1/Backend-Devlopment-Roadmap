const express=require('express')
const router=express.Router();
const {insertsampleproduct,getproduct,getproductanalysis}=require('../controllers/product-contorller')
router.post('/add',insertsampleproduct)
router.get('/stats',getproduct)
router.get('/analysis',getproductanalysis)
module.exports=router;