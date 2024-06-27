const express=require('express');
const { getAllProduct, getSingleproductController } = require('../controllers/productController');

const router=express.Router();


router.get("/products",getAllProduct);
//  or router.route("/products").get(getAllProduct);

router.get("/product/:id",getSingleproductController);




module.exports=router;