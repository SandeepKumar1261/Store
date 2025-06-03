const Product = require('../Models/Product');

const addProduct=async(req,res)=>{
    const {name,price,category}=req.body;
    const newProduct=new Product({name,price,category});
    const response=await newProduct.save();
    return res.status(201).json(response);
};
const deleteProduct=async(req,res)=>{
    const {id}=req.params;
    const pro=await Product.deleteOne({_id:id});
    return res.status(201).json({message:"Item deleted successfully"});
};
module.exports={addProduct,deleteProduct};