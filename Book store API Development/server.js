const express=require('express');
const connectDB=require('./database/db');
require('dotenv').config();
const app=express();
const port=process.env.PORT||3000;
const bookRoutes=require('./routes/book-routes');
//connect to db
connectDB();

//middlerware
app.use(express.json());
//routes
app.use('/api/books', bookRoutes);

//start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
