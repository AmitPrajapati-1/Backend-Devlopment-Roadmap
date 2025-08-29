const book=require('../models/book');
const getAllbooks=async (req,res)=>{
    try{
        const books=await book.find();
        res.status(200).json(books);
    }catch{
        res.status(500).json({message:'Internal server error'});
    }
}
const getSingleBook=async (req,res)=>{
    try{
        const book=await book.findById(req.params.id);
        if(!book){
            return res.status(404).json({message:'Book not found'});
        }
        res.status(200).json(book);
    }catch(e){
        res.status(500).json({message:'Internal server error'});
    }
}
const addNewBook=async (req,res)=>{
    try{
        const newbook=new book(req.body);
        await newbook.save();
        res.status(201).json(newbook);
    }catch(e){
        res.status(500).json({message:'Internal server error'});
    }
}

const updateBook=async (req,res)=>{
    try {
        const updatedbook=await book.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedbook){
            return res.status(404).json({message:'Book not found'});
        }
        res.status(200).json(updatedbook);
    } catch (error) {
        res.status(500).json({message:'Internal server error'});
    }
}
const deleteBook=async (req,res)=>{
    try {
        const deletedbook=await book.findByIdAndDelete(req.params.id);
        if(!deletedbook){
            return res.status(404).json({message:'Book not found'});
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({message:'Internal server error'});
    }
}
module.exports={getAllbooks,getSingleBook,addNewBook,updateBook,deleteBook}