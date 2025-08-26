const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let books=[
    {id:1,title:'book1',author:'author1'},
    {id:2,title:'book2',author:'author2'},
    {id:3,title:'book3',author:'author3'}
];
app.get('/',(req,res)=>{
    res.json({message:'welcome to book store'});
})

app.get('/books',(req,res)=>{
    res.json(books);
})
app.get('/books/:id',(req,res)=>{
    const book=books.find(b=>b.id===parseInt(req.params.id));
    if(!book)return res.status(404).json({message:'book not found'});
    res.status(200).json(book);
})
app.post('/add-book',(req,res)=>{
    const {title,author}=req.body;
    const newBook={
        id:books.length+1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
})
app.put('/update-book/:id',(req,res)=>{
    const book=books.find(b=>b.id===parseInt(req.params.id));
    if(!book)return res.status(404).json({message:'book not found'});
    const {title,author}=req.body;
    book.title=title;
    book.author=author;
    res.status(200).json(book);
})
app.delete('/delete-book/:id',(req,res)=>{
    const bookIndex=books.findIndex(b=>b.id===parseInt(req.params.id));
    if(bookIndex===-1)return res.status(404).json({message:'book not found'});
    books.splice(bookIndex,1);
    res.status(200).send("sucessfully deleted");
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000');
}) 
