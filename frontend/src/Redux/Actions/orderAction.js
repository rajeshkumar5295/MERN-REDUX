import axios from "axios";
import { MY_ORDER_FAIL, MY_ORDER_REQUSET, MY_ORDER_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../Constants/orderConstant"


export const orderRequest=(order)=>async(dispatch,getState)=>{
      
      console.log( "checking order",order   )


    try {  
          dispatch({
            type:ORDER_CREATE_REQUEST
          })

          // console.log("checking getState",getState());
          // console.log("checking token ",getState().userLogin.userInfo.token);
          const{userLogin:{userInfo}}=getState();
          // console.log(userInfo.token)
           
          const config={
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${userInfo.token}`
            }
          }
    

          
          const {data}=await axios.post(`${process.env.REACT_APP_BACKENDURL}/api/v1/order`,order,config);
          console.log("checking data",data);
          dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
          })
        
    } catch (error) { 

           console.log(error)
      dispatch({
         type:ORDER_CREATE_FAIL,
         payload:error.response && error.response.data.message ?
         error.response.data.message:error.message,
      })
        
    }
}

export const getOrderDetailById=(id)=>async(dispatch,getState)=>{  
    try {   

           dispatch({
             type:ORDER_DETAIL_REQUEST
           })

      const {userLogin:{userInfo}}=getState();
      const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${userInfo.token}`
        }
      }

      const {data}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/order/yourorder/${id}`,config)

          // console.log("Checking orderdetails by Id",data);
      dispatch({
          type:ORDER_DETAIL_SUCCESS,
          payload:data
      })
            
      
    } catch (error) { 
      dispatch({
        type:ORDER_DETAIL_FAIL,
        payload:error.response && error.response.data.message ?
        error.response.data.message:error.message,
     })

            
      
    }

}

export const payOrder=(orderId,paymentResult)=>(dispatch,getState)=>{ 
  try {
            dispatch({
              type:ORDER_PAY_REQUEST
            });
            const {userLogin:{userInfo}}=getState();
            const config={
              headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${userInfo.token}`
              }
            }

           const {data}=axios.put(`${process.env.REACT_APP_BACKENDURL}/api/v1/order/${orderId}/pay`,paymentResult,config)
            
           dispatch({
             type:ORDER_PAY_SUCCESS,
             payload:data
           }) 
  } catch (error) {

     dispatch({
        type:ORDER_PAY_FAIL,
        payload:error.response && error.response.data.message  ? error.response.data.message :error.message
     })
    
  }
}

export const myOrder=()=>async(dispatch,getState)=>{
             
  try {  
         dispatch({
            type:MY_ORDER_REQUSET,

         })

         const {userLogin:{userInfo}}=getState();
               
         const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${userInfo.token}`
          }
         }
         const {data}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/order/myorder`,config);
                 
         console.log("Checking myOrder data",data);
           
          dispatch({
            type:MY_ORDER_SUCCESS,
            payload:data

          })
    
  } catch (error) {
    dispatch({
      type:MY_ORDER_FAIL,
       payload:error.response && error.response.data.message  ? error.response.data.message :error.message
    })
    
  }
}