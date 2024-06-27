const mongoose=require('mongoose')

const dotenv=require('dotenv')

const users=require('./config/userdata');
const products=require('./config/product');

const UserModel=require('./models/userModel');
const ProductModel=require('./models/productModel');
// const OrderModel=require('./models/orderModel');

// const connectDb=require('./config/db');
const connectDB = require('./config/db');
dotenv.config();

connectDB();

const importDat=async()=>{
    try { 
        // await OrderModel.deleteMany();
        // await ProductModel.deleteMany();

        console.log("users are ",users);
        // await UserModel.deleteMany();

        // const createUser=await UserModel.insertMany(users);
        // const adminUser=createUser[0]._id
        
        // const sampleData=products.map(product=>{
        //     return[...product,User:adminUser]
        // })
         console.log(products)
        await ProductModel.insertMany(products);
        // console.log("Data imported ")
        // process.exit(1);
          
        
    } catch (error) {  
        console.log(error)
   process.exit(1);       
    }
}

const dataDestory=async()=>{
          try {
              // await OrderModel.deleteMany();
              await ProductModel.deleteMany();
              await UserModel.deleteMany();
              
              process.exit();
          } catch (error) {
            console.log(error)
          }
}

if(process.argv[2]==="-d"){
     dataDestory();
}else{
    importDat();
}