const express=require('express')
const router=express.Router();
const {createAuthor,createBook,getbookwithauthors}=require('../controllers/book-controller')
router.post('/authors',createAuthor)
router.post('/books',createBook)
router.get('/books/:id',getbookwithauthors)
module.exports=router;