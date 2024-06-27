import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {getOrderDetailById, payOrder} from "../Redux/Actions/orderAction"
import { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux' 
import { Row,Col,ListGroup,ListGroupItem,Image } from 'react-bootstrap'
import Spin from '../componants/Spin'
import ErrorMessage from '../componants/ErrorMessage'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { PayPalButton } from "react-paypal-button-v2";

const OrderDetail = () => {
     
    const {id}=useParams(); 
        console.log("Checking id in orderDetail",id)
        const dispatch=useDispatch();

        const[sdkReady,setSdkReady]=useState(false)

        const orderDetailReducer=useSelector((state)=>state.orderDetailReducer);
         
         const {loading,order,error}=orderDetailReducer
         
         const shippingAddress=order?.yourOrder?.shippingAddress 
         const orderItems=order?.yourOrder?.orderItems 
         const user=order?.yourOrder?.User
         const isPaid=order?.yourOrder?.isPaid 
         const taxPrice=order?.yourOrder?.taxPrice
         const totalPrice=order?.yourOrder?.totalPrice 
         const isDelevired=order?.yourOrder?.isDelevired
         const paymentMethod=order?.yourOrder?.paymentMethod

         console.log("checking prices" , isPaid,taxPrice,totalPrice,isDelevired,orderDetailReducer?.order?.yourOrder)


         //orderpay
          const orderPayReducer=useSelector((state)=>state.orderPayReducer)
               const{loading:loadingPay,success:successPay}=orderPayReducer
               console.log("checking loadingPay, successPay",orderPayReducer,loadingPay,successPay)

        //  console.log(shippingAddress,orderItems,user,isPaid,taxPrice);

             console.log("id" ,order?.yourOrder?._id,loading)

 useEffect(()=>{
            /**************************payPal Integration */
                // const addPaypalScript=async()=>{
                //      const{data:clientId}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/config/paypal`)
                //      const script=document.createElement('script')
                //      script.type='text/javascript'
                //      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
                //      script.async=true

                //      script.onload=()=>{
                //       setSdkReady(true)
                //      }
                     
                         
                //     document.body.appendChild(script) 
                // }
                 
          dispatch(getOrderDetailById(id));
    },[dispatch,id])  



// useEffect(()=>{
//   /**************************payPal Integration */
//       const addPaypalScript=async()=>{
//          const{data:clientId}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/config/paypal`)
            
//             console.log("checking client id",clientId)

//            const script=document.createElement('script')
//            script.type='text/javascript'
//            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
//            script.async=true

//            script.onload=()=>{
//             setSdkReady(true)
//            }
           
               
//           document.body.appendChild(script) 

//           if(!orderPayReducer || successPay)
//           {
//             dispatch(getOrderDetailById(id));

//           }else if(isPaid){
//             if(!window.paypal){
//               addPaypalScript()
//             }else{
//               setSdkReady(true)
//             }
//           }

          
//       }
       
// dispatch(getOrderDetailById(id));
// },[dispatch,id]) 



// const paymentHandler=(paymentResult)=>{ 

//     console.log(paymentResult)
//    dispatch(payOrder(id,paymentResult))
   
// }

          
  return (
           
       <>
      {
           loading ? <Spin/>:<>
          
              
            <Row>
            <Col md={8} >
          <h2> Yor Order Id:{order?.yourOrder?._id} </h2>

       <ListGroup  variant='flush' >
      <ListGroupItem>
         <h2>Shipping Details </h2>
         <p> Your Name: {user.username} </p>
         <p> Your Email:{user.email}  </p>
          <p>
            <strong> Address:</strong>
            {shippingAddress.address} &nbsp;
            {shippingAddress.city} &nbsp;
            {shippingAddress.postalcode} &nbsp;
            {shippingAddress.country} &nbsp;
          </p>
         
        </ListGroupItem> 

   <ListGroup>
   <ListGroupItem>
                <h5>Payment Method :  <h7> { paymentMethod  } </h7> </h5>
          <h3>  Payment Status: { isDelevired? "Paid" : "NOt Paid"} </h3>
       </ListGroupItem>
   </ListGroup>
  
      <ListGroupItem>
         <h2>Order Items</h2> 
         {
          orderItems.length===0? <> <h2> Your cart is Empty ! Add Products</h2> </>:
          <ListGroup>
              {
                   orderItems.map((item,index)=>(

                   <ListGroupItem  key={index} >
                      
                           <Row>  
                              <Col md={2} >
                               <Image src={item.image} fluid /> 
                               </Col>
                               <Col> <Link to={`/product/${item.product}`} > {item.name} </Link>  </Col>
                               <Col md={4} > ${item.price} X {item.qty}=${item.price*item.qty}  </Col>
                           </Row>
                    </ListGroupItem>
                   ))
              }
          </ListGroup>
         }
      </ListGroupItem>

</ListGroup>
    
</Col> 
                <Col md={4} >
                  <ListGroupItem>
                  <PayPalButton
                 createOrder={(data, actions) => {
                 return actions.order.create({
             purchase_units: [{
              amount: {
                currency_code: "USD",
                value: "0.01"
              }
            }],
            // application_context: {
            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
            // }
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then(function(details) {
            // Show a success message to your buyer
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            });
          });
        }}
      />
                       
                  </ListGroupItem>
                </Col>
            </Row>
             
       </>  
      }
    </>       
     
  )
}

export default OrderDetail
