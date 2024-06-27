const mongoose=require('mongoose');


// I was facing the issue like required is not defined and 0 is not valied declaration becase of spelling error tyope  (type)

const orderSchema=new mongoose.Schema({
      User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"USER",
        required:true,
      },
      orderItems:[
        {
             name:{
                type:String,
                required:true,
             },
             qty:{
                type:String,
              
             },
             image:{
                type:String,
                required:true,
             },
             price:{
                type:String,
                required:true,
             },
             product:{ 
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'products'
            }
            
        }
      ],

      shippingAddress:{
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        postalcode:{
            type:Number,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        
      },
      paymentMethod:{
        type:String,
        required:true,
      },
      paymentResult:{
        id:{type:String},
        status:{type:String},
        update_time:{type:String},
        email_address:{type:String}
      },
      taxPrice:{
        type:Number,
        required:true,
        defalult:0.0
      },
      shippingPrice:{
        type:Number,
        required:true,
        defalult:0.0
      },
      totalPrice:{
        type:Number,
        required:true,
        default:0.0
      },
      isPaid:{
        type:Boolean,
        required:true,
        default:false,
      },
      paidAt:{
        type:Date 
      },
      isDelevired:{
        type:Boolean,
        required:true,
        default:false 
      },
      DelleviredAt:{
        type:Date 
      }


} ,{timestamps:true} ) 

module.exports=mongoose.model("orders",orderSchema);