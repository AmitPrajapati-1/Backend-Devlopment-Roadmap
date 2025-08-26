const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.send('Hello World from Express');
})
//get all product
app.get('/products',(req,res)=>{
    res.json({
        products: [
            { id: 1, name: 'Product 1', price: 100 },
            { id: 2, name: 'Product 2', price: 200 },
            { id: 3, name: 'Product 3', price: 300 }
        ]
    })
})

//get a single product
app.get('/products/:id',(req,res)=>{
    const productId=parseInt(req.params.id);
    const products=[
            { id: 1, name: 'Product 1', price: 100 },
            { id: 2, name: 'Product 2', price: 200 },
            { id: 3, name: 'Product 3', price: 300 }
        ]
    const product=products.find(p=>p.id===productId);

    if(product){
        res.json({
            product
        });
    }else{
        res.status(404).json({
            error: 'Product not found'
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 