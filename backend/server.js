const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoos=require('mongoose');
const connectDB = require('./config/db');

const userModel=require('./models/userModel');
const products=require("./config/product")
const users=require('./config/userdata');
// console.log(users)


const {errorHandler}=require("./Middleware/errorMiddleware")

const app=express();

app.use(cors());

dotenv.config();

app.use(express.json());
const PORT=process.env.PORT||8080
connectDB();

// console.log(process.env.PORT)

app.get("/" , (req,res)=>{
     res.status(200).json({
        message:"Hi server ,This is Redux Project"
     })
})


app.use("/api/v1/productroute",require("./Routes/productRoute"))
app.use("/api/v1/auth",require("./Routes/userRoute"));
app.use("/api/v1/order",require("./Routes/orderRoute"));


//for paypal 
    app.get("/api/config/paypal" ,(req,res)=>{ 
          res.send(process.env.PAYPAL_CLIENT_ID)
        
    })
      

app.use(errorHandler);
// app.get("/products",(req,res)=>{
//     res.status(200).json({
//          products
//     })
// })

// app.get("/product/:id",(req,res)=>{
//     console.log(req.params)
//      const product=products.find((p)=>p._id===req.params.id);
//      res.status(200).json({
//         product 
//      })
// })

app.listen(PORT,()=>{
    console.log(  `Server is Running on port ${PORT}`)
})


