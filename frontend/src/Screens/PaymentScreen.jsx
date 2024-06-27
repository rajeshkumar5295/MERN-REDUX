import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from './CheckoutStep'
import {paymentMethod} from '../Redux/Actions/cartAction';

import { Form,Button,Col } from 'react-bootstrap'

const PaymentScreen = () => { 
                      
        const shippingAddress=useSelector((state)=> state.cart.shippingAddress)
        const navigate=useNavigate();
        const dispatch=useDispatch();
        if(!shippingAddress){
          navigate("/shipping");

        }
           const [paymentType,setPaymentType]=useState("paypal");
          const submitHandler=(e)=>{

            console.log("checking e in submitHandler",e)
                  dispatch(paymentMethod(paymentType))
                  navigate('/placeorder');

          }
          
          
        
  return (
    <>  
        <CheckoutStep step1 step2 step3  />
        <h1>Payment Method</h1>
        <Form  onSubmit={submitHandler} >
            <Form.Group>
                 <Form.Label>
                    Select Payment Method 
                 </Form.Label>
                 <Col>
                       <Form.Check type='radio' 
                            label="Paypal or Credit Card"
                            id='paypal'
                            name='paymentMethod'
                            // value={paymentType}
                            checked 
                            value='paypal'
                            onChange={(e)=>{ 
                              console.log(e);
                              setPaymentType(e.target.value)
                            }}
                       >
                       </Form.Check>
                       {/* <Form.Check type='radio' 
                            label="Stripe"
                            id='stripe'
                            name='paymentMethod'
                            // value={paymentType}
                            checked 
                            value='stripe'
                            onChange={(e)=>{ 
                              console.log(e);
                              setPaymentType(e.target.value)
                            }}
                       >
                       </Form.Check> */}
                  </Col>
            </Form.Group>
            <Button type='submit' variant='primary'  >
              Continue 
            </Button>
            
        </Form>
    
    </>
  )
}

export default PaymentScreen
