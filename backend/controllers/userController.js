const bcrypt=require('bcrypt')
const userModel=require("../models/userModel");
const JWT=require("jsonwebtoken");

exports.RegiterController=async(req,res)=>{
     try {    
            
           const {email,password,username,mobile}=req.body;
           console.log("from register route",username,email,password,mobile)
           const existUser=await userModel.findOne({email});
           if(existUser){
            return res.status(200).json({
                success:false,
                message:"User Already Exist",
            })
           }
           const hashPassword=await bcrypt.hash(password,10);
            
           const user=await userModel({username,email,password:hashPassword,mobile}).save();

           return res.status(201).json({
            success:true,
            message:"User Registered Successfully !",
            user,
           })

 
        
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Opps! Something went wrong",
            error:error.message
        })
        
     }
}

exports.LoginController=async(req,res)=>{
    try { 
            const { email,password }=req.body; 
              const userFound=await userModel.findOne({email});
              
              if(!userFound){
                 return res.status(200).json({
                    message:"Email does't exist",
                    success:false,
                 })
              }
            //   console.log( "checking database password", userFound.password)
           const comparePassword=await bcrypt.compare(password,userFound.password)
            
             if(!comparePassword){
                return res.status(200).json({
                    success:false,
                    message:"password does not matched "
                   })
             }
    
            
            const token= await JWT.sign({userId:userFound._id},process.env.SECRET_KEY,{expiresIn:'7days'});
            // const token=JWT.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1days'} )

            console.log("token is " ,token);


        return res.status(200).json({
              success:true,
                username:userFound.username,
                email:userFound.email,
                
              token
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Login failed ,Something went wrong',
        })
        
    }
}

exports.myporfileController=async(req,res)=>{  
    try {     

            console.log("user id from authmiddlware",req.userId);

            const user=await userModel.findById(req.userId).select("-password");
                console.log(user);
                    
        res.status(200).json({
        
            user
        })
        
    } catch (error) {
        
    }
}

exports.updateController=async(req,res)=>{
    try {  
           const user=await userModel.findById(req.userId)

           console.log("user found",user)
           if(user){
            user.username=req.body.username || user.username
            user.email=req.body.email || user.email
            // user.password=await bcrypt.hash(req.body.password,10)  || user.password 
            user.mobile=req.body.mobile || user.mobile
            user.isAdmin=req.body.isAdmin || user.isAdmin

           }else{
            return res.status(404).josn({
                 success:false,
                 message:'user not found'
            })
           }
           const updateUser=await user.save();

           console.log("updated user in userController js is" , updateUser)

         res.status(200).json({
            success:true,
            message:"user updated successfully !",
            updateUser,

           })
        
    } catch (error) { 
              res.status(500).json({
                 success:false,
                 message:"something went wrong",
                 error:error.message,
              })
         
    }
}