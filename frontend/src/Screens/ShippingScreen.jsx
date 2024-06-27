import React, { useState } from 'react'
import {Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from './FormContainer'

import { saveShippingAddress } from '../Redux/Actions/cartAction'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from './CheckoutStep'


const ShippingScreen = () => {
        
    const cart=useSelector(state=>state.cart)
       const {shippingAddress}=cart

     const dispatch=useDispatch();  
     
     const navigate=useNavigate()

   const[address,setAddress]=useState(shippingAddress.address); 
   const[city,setCity]=useState(shippingAddress.city);
   const[postalcode,setPostalcode]=useState(shippingAddress.postalcode);
   const[country,setCountry]=useState(shippingAddress.country);

  

   const submitHandler=()=>{
               
        dispatch(saveShippingAddress({address,city,postalcode,country})) 
         navigate("/payment");
      
   }


  return (
    <>
         <FormContainer>
             <CheckoutStep step1 step2/>


                <h1 style={{marginTop:"10px"}} >Shipping Details</h1>
        <Form  onSubmit={submitHandler} >
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label> Your  Address</Form.Label>
            <Form.Control type="address" placeholder="your address" required  value={address} onChange={(e)=>setAddress(e.target.value)}   />
          
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> City </Form.Label>
            <Form.Control type="text" placeholder="your city" required  value={city} onChange={(e)=>setCity(e.target.value)}   />
          
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMobile">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type="number" placeholder="Postal Code" required  value={postalcode} onChange={(e)=>setPostalcode(e.target.value)} />
          
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="country" value={country} onChange={(e)=>setCountry(e.target.value)} />
          </Form.Group>
      
          <Button variant="primary" type="submit">
            Continue
          </Button>
         
        </Form>

       
          
         
      </FormContainer>
     </>
  )
}

export default ShippingScreen
