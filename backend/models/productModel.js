const mongoose=require('mongoose');


//review Schema
 const reviewSchema=new mongoose.Schema({
     name:{
        type:String,
        required:true,
     },
     rating:{
        type:String,
        requied:true,
     },
     comment:{
        type:String,
        default:""
     }
 } ,{timestamps:true} )




const productSchema=new mongoose.Schema({
        User:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'users',
           },

        ],
        name:{
            type:String,
            default:"",
        },
        image:{
            type:String,
            required:true,
            default:"",
        },
        brand:{
            type:String,
            required:true,
            default:"",
        },
        category:{
            type:String,
            required:true,
            defalult:""
        },
        description:{
            type:String,
            required:true,
            default:"",
        },
        reviews:[ reviewSchema ],  //i will implement this later
        rating:{
            type:String,
            required:true,
        },
        numReviews:{
            type:String,
            defalult:"",
            required:true
        },
        price:{
            type:String,
            requied:true,
        },
        countInStock:{
            type:String,
            required:true,
        }

} ,{timestamps:true} ) ;

module.exports=mongoose.model("products",productSchema);

// const product=mongoose.model('product',productSchema)
// export default product;          here we have to use module.exports 


