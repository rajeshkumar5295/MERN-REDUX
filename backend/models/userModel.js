const mongoose=require("mongoose");

const {ObjectId}= mongoose.Schema.Types

const userSchema=new mongoose.Schema({
       username:{
           type:String,
           required:true
       },
     
       email:{
            type:String,
            required:true,
            // unique:true,
       },
       password:{
        type:String,
        required:true,
       },
       mobile:{
        type:String,
        required:true,
       },
       isAdmin:{
        type:String,
        required:true,
        default:false
       }
   


} ,{timestamps:true} );

  // const userModel= mongoose.model("user",userSchema);
  // module.exports=userModel;
  module.exports=mongoose.model('USER',userSchema);

