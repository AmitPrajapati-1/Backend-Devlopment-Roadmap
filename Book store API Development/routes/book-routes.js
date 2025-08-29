const express=require('express');
const {getAllbooks,getSingleBook,addNewBook,updateBook,deleteBook}=require('../controllers/book-controller');
const router=express.Router();

//all the routes
router.get('/get',getAllbooks)
router.get('/get/:id',getSingleBook)
router.post('/add',addNewBook)
router.put('/update/:id',updateBook)
router.delete('/delete/:id',deleteBook)


module.exports=router;