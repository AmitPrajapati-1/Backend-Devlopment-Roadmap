const { get } = require('mongoose')
const Product=require('../models/Product')
const getproduct=async(req,res)=>{
    try{
        const products=await Product.aggregate(
            {
                $match: { 
                    inStock: true ,
                    price: { $gte: 20 }
                }
            },
            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: "$price" }
                }
            }
            
        )
        res.status(200).json({message:"Products fetched successfully",data:products})
    }catch(err){
        console.log("Error fetching products:",err)
    }
}
 const getproductanalysis=async(req,res)=>{
    try{
        const products=await Product.aggregate(
            {
                $match: {
                    category: "Electronics"
                }
            },
            {
                $group: {
                    _id: null,
                    totalProducts: { $sum: "$price" },
                    averagePrice: { $avg: "$price" },
                    maxproductprice:{ $max: "$price" },
                    minproductprice:{ $min: "$price" }
                }
            },{
                $project: {
                    _id: 0,
                    totalProducts: 1,
                    averagePrice: 1,
                    maxproductprice: 1,
                    minproductprice: 1,
                    pricerange: { $subtract: ["$maxproductprice", "$minproductprice"] }
                }
            }
        )
        res.status(200).json({message:"Product analysis fetched successfully",data:products})
    }catch(err){
        console.log("Error fetching product analysis:",err)
    }
}
const insertsampleproduct=async(req,res)=>{
    try{
        const sampleProduct=[
            {
                name:"Sample Product 1",
                category:"Electronics",
                price:99.99,
                inStock:true,
                tags:["sample","electronics"]
            },
            {
                name:"Sample Product 2",
                category:"Books",
                price:19.99,
                inStock:true,
                tags:["sample","books"]
            },
            {
                name:"Sample Product 3",
                category:"Clothing",
                price:29.99,
                inStock:true,
                tags:["sample","clothing"]
            }
        ]
    const result=await Product.insertMany(sampleProduct)
    res.status(201).json({message:"Sample products inserted",data:result}) 

    console.log("Sample product inserted")
    }catch(err){
        console.log("Error inserting sample product:",err)
    }
    
}
module.exports={insertsampleproduct,getproduct,getproductanalysis}  