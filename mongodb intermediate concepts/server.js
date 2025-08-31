require('dotenv').config();
const express=require('express')
const app=express();
const productroutes=require('./routes/product-routes')
const mongoose=require('mongoose')
const bookroutes=require('./routes/book-routes')
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log("Error connecting to MongoDB:",err))
app.use(express.json())
app.use('/api/products',productroutes)
app.use('/api/reference',bookroutes)
app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`))