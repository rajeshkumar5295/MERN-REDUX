const OrderModel=require("../models/orderModel");

exports.addOrederItem=async(req,res)=>{  
      try {  

            console.log(  "checking req.body in addorderItem", req.body);

            console.log("Checking req.UserId",req.userId)
                
            const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body

            if(orderItems && orderItems.length===0){
                return res.status(400).json({ 
                    message:"No Order Found"
                })

                
            }else{
                const order=new OrderModel({
                    orderItems ,
                    User:req.userId,
                    shippingAddress,
                    paymentMethod,
                    itemsPrice,
                    taxPrice,
                    shippingPrice,
                    totalPrice
                })

                // console.log("Checking order after inserting in model",order);

                const createOrder=await order.save();
                res.status(201).json({
                    success:true,
                    createOrder,
                    message:"ordered successfully",
                })

            }
        
      } catch (error) {
              return res.status(500).json({
                success:false,
                message:"Something went wrong",
                error:error.message
              })

      }

}

exports.getOrderById=async(req,res)=>{
     try {   
             const id=req.params.id;
            const yourOrder=await OrderModel.findById(id).populate("User",'username email');
            // const yourOrder=await OrderModel.findById(id).populate("User").populate("orderItems.product");
              res.status(200).json({
                  yourOrder,
                  success:true,
                  message:"Your order fetched successfully"
              })
        
     } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Order Not found",
            error:error.message
        })
        
     }
}

exports.updateOrderToPaid=async(req,res)=>{
    try {  
          const order= await OrderModel.findById(req.params.id);
            if(order){
                order.isPaid=true,
                order.paidAt=Date.now(),
                order.paymentResult={
                     id:req.body.id,
                     status:req.body.status,
                     update_time:req.body.update_time,
                     email_address:req.body.payer.email_address
                }
            }

        const updateOrder=await order.save()
          res.json(200).josn({
            success:true,
            updateOrder 
          })
            
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message 
        })
        
    }
}

exports.myOrders=async(req,res)=>{
    try {  

        console.log("myOrder token id",req.userId)

        const myOrder=await OrderModel.find({User:req.userId})
          res.status(200).json({
            myOrder,
            success:true, 
          })
        
    } catch (error) {
        res.status(500).json({
            error:error.message,
            success:false,
        })
    }
}