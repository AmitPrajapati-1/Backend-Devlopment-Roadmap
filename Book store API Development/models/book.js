const mongoose=require('mongoose');
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Book title is required"],
        trim:true,
        maxlength:[100,"Book title cannot exceed 100 characters"]
    },
    author:{
        type:String,
        required:[true,"Book author is required"],
        trim:true,
        maxlength:[100,"Book author cannot exceed 100 characters"]
    },
    year:{
        type:Number,
        required:[true,"Book year is required"],
        min:[1000,"Book year must be at least 1000"],
        max:[new Date().getFullYear(),"Book year cannot exceed 9999"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const book=mongoose.model('Book',bookSchema);
module.exports=book;