const Author=require('../models/Author')
const Book=require('../models/Book')
const createAuthor=async(req,res)=>{
    try{
        const newAuthor=new Author(req.body)
        await newAuthor.save()
        res.status(201).json({message:"Author created successfully",data:newAuthor})
    }catch(err){
        console.log("Error creating author:",err)
    }
}

const createBook=async(req,res)=>{
    try{ 
        const newBook=new Book(req.body)
        await newBook.save()
        res.status(201).json({message:"Book created successfully",data:newBook})
    }catch(err){
        console.log("Error creating book:",err)
    }
}
const getbookwithauthors=async(req,res)=>{
    try{
        const books=await Book.find({author:req.params.id}).populate('author')
        if(!books){
            return res.status(404).json({message:"No books found for this author"})
        }
        res.status(200).json({message:"Books retrieved successfully",data:books})
    }catch(err){
        console.log("Error retrieving books:",err)
    }
}
module.exports={createAuthor,createBook,getbookwithauthors}
