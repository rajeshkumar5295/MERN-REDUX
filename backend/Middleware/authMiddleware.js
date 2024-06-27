const JWT=require("jsonwebtoken");
const protectMiddleware=(req,res,next)=>{
         try {  
            //    const token=req.headers.authorization
                 const token=req.headers.authorization.split(" ")[1];
               console.log("checking token in authmiddleware",  token);

               JWT.verify(token,process.env.SECRET_KEY,async(err,payload)=>{
                    if(err){
                        return res.status(401).json({
                             message:"Unauthorize access ! You have to login first"
                        })
                    }
                     //  console.log("checking auth payload",payload);
                     req.userId=payload.userId;
                     console.log( 'checking payload userid',  payload.userId);
                     

                     next();
                   })
                     
                  
               
          
            
         } catch (error) {
            console.log("error in authMiddleware",error);
            
         }


       
}

module.exports=protectMiddleware;


// const {authorization}=req.headers;
//     //  console.log(authorization)
//      if(!authorization){
//         return res.status(401).json({
//             error:"Authorization failed ,You must have to first login"
//         })
//      }

//      const token=authorization.replace("Bearer ","");
//      jwt.verify(token,process.env.JWT_SECRET_KEY,async(err,payload)=>{
//            if(err){
//             return res.status(401).json({
//                 error:"you must have to login first"
//             })
//            }
    
//               req.userId=payload.userId;
        