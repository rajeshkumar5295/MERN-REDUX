import React from 'react'
import { useEffect } from 'react'

import {orderRequest} from "../Redux/Actions/orderAction"
import { useSelector,useDispatch } from 'react-redux'
import CheckoutStep from './CheckoutStep'

import { Col,Row,Image,Card,ListGroup,Button, ListGroupItem  } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
          
             const cart=useSelector((state)=>state.cart);
             const {shippingAddress,cartItems,paymentMethod}=cart;
          
             const orderReducer=useSelector((state)=>state.orderReducer )
                const {loading,error,success,}=orderReducer;
                // console.log("checing order in reducer",orderReducer.order.createOrder._id,success)

              
               
            const dispatch=useDispatch();
          const navigate=useNavigate();

      
            
      // const itemsPrice=cartItems.reduce((acc,item)=>{  
      //                  console.log("checking acc and item ",acc,item)
      //                 console.log("cheking acc" ,acc+item.price*item.qty,0)
      // })
           

      // itemsPrice=cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0)
      const addDecimal=(num)=>{
        return (Math.round(num*100)/100).toFixed(2);
      }
      cart.itemsPrice=addDecimal(cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0))
       
      cart.shippingPrice=addDecimal(cart.cartItems.length>10?0:50);
      cart.taxPrice=addDecimal(Number(0.015*cart.itemsPrice).toFixed(2)) 
             
      

    cart.totalPrice=Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice) 
          

    const placeOrderHandler=()=>{
           dispatch(orderRequest({
                 orderItems:cartItems,
                 shippingAddress:shippingAddress,
                 paymentMethod:paymentMethod,
                 itemsPrice:cart.itemsPrice,
                taxPrice:cart.taxPrice,
                shippingPrice:cart.shippingPrice ,
                totalPrice:cart.totalPrice,

           }))
        
      }

      useEffect(()=>{
           if(success){
               navigate(`/order/${orderReducer?.order?.createOrder?._id}`)
           }
      },[success,navigate])
        
  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />

      <Row>
          <Col md={8} >

            <ListGroup  variant='flush' >
                  <ListGroupItem>
                     <h2>Shipping</h2>
                      <p>
                        <strong> Address:</strong>
                        {shippingAddress.address} &nbsp;
                        {shippingAddress.city} &nbsp;
                        {shippingAddress.postalcode} &nbsp;
                        {shippingAddress.country} &nbsp;
                      </p>
                    </ListGroupItem> 
                  <ListGroupItem>
                     <h2>Payment Method</h2>
                     <p>
                       <strong> {cart.paymentMethod}  </strong>
                     </p>
                  </ListGroupItem>
                  <ListGroupItem>
                     <h2>Order Items</h2> 
                     {
                      cartItems.length===0? <> <h2> Your cart is Empty ! Add Products</h2> </>:
                      <ListGroup>
                          {
                               cartItems.map((item,index)=>(

                               <ListGroupItem  key={index} >
                                  
                                       <Row>  
                                          <Col md={2} >
                                           <Image src={item.image} fluid /> 
                                           </Col>
                                           <Col> <Link to={`/product/${item.product}`} > {item.name} </Link>  </Col>
                                           <Col md={4} > ${item.price} X {item.qty}=  ${item.price*item.qty}  </Col>
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
            <Card>
                <ListGroup>
                      <ListGroupItem>
                          <h2> Order Summary </h2>
                      </ListGroupItem>
                      <ListGroupItem>
                          <Row>
                              <Col> Items Price  </Col> 
                              <Col> ${cart.itemsPrice} </Col>
                          </Row>
                          <Row>
                              <Col> Shipping Price  </Col> 
                              <Col> ${cart.shippingPrice} </Col>
                          </Row>
                          <Row>
                              <Col> Tax   </Col> 
                              <Col> ${cart.taxPrice} </Col>
                          </Row>
                          <Row>
                              <Col> Total   </Col> 
                              <Col> ${cart.totalPrice} </Col>
                          </Row>
                      </ListGroupItem>

                      <Button  
                        type='button'
                        className='btn-block'
                        disabled={cartItems===0}
                        onClick={placeOrderHandler}
                      > 

                         Place Order
                      </Button>
                </ListGroup>
            </Card>
                 
           </Col>
      </Row>
        
    </>
  )
}

export default PlaceOrder
