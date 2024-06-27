const express=require("express");

const router=express.Router();

const authMiddleWare=require("../Middleware/authMiddleware");
const { addOrederItem, getOrderById, updateOrderToPaid, myOrders } = require("../controllers/orderController");

router.post("/",authMiddleWare, addOrederItem)
router.get("/yourorder/:id",authMiddleWare,getOrderById);
router.put("/:id/pay",authMiddleWare,updateOrderToPaid);

router.get("/myorder",authMiddleWare,myOrders)


module.exports=router;