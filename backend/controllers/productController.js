// const products=require("../config/product")
const mongoose = require("mongoose");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

exports.getAllProduct = async (req, res) => {
  try {
    // const allproduct= await  productModel.insertMany(products)
    const products = await productModel.find({});
    console.log("All product here", products);
      
    res.status(200).json({
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getSingleproductController = async (req, res) => {
  try {
    console.log(req.params);
    // const product=products.find((p)=>p._id===req.params.id);
    console.log("id comeing from frontend is", req.params.id);
    //   const id=req.params.id

    // const findCriteria = {
    //   _id: new mongoose.Types.ObjectId(req.params.id),
    // };
    // console.log("checking findCriteria", findCriteria);

       const product=await productModel.findById(req.params.id)  // This will also work (don't forgot  for async await , if you not write this error like converting circular obj ... come)

    // const product = await productModel.findById(findCriteria);
    console.log(product);

    res.status(200).json({
      product,
    });
  } catch (error) {
          res.status(500).json({
              success:false,
              error:error.message
          })
  }
};
