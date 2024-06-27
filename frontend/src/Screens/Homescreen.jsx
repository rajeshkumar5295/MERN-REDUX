import React,{useState,useEffect} from 'react'
import { Row ,Col} from 'react-bootstrap'
import axios from "axios";

import {useSelector,useDispatch} from 'react-redux'
import Spin from '../componants/Spin';
import ErrorMessage from '../componants/ErrorMessage';

import ProductScreen from './ProductScreen'
import {listProducts} from "../Redux/Actions/productAction"

const Homescreen = () => {
            
      // const[products,setProducts]=useState([]);
       const dispatch=useDispatch();
       const productlist=useSelector(state=>state.productList)
        const {products,loading,error}=productlist
        console.log("checking products in homeScreen",products)
           
      //  i will fetch data by redux 
      // const fetchData=async()=>{
      //         try { 
      //           const {data}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/productroute/products`);
      //           console.log(data);
      //           setProducts(data?.products)
                
      //         } catch (error) {  
      //           console.log(error);
      //         }
                     
      // }
           
      useEffect(()=>{ 
        // fetchData();
        dispatch(listProducts());
        
        },[dispatch])
      
  return (
   <>
      <Row>  
          {   
             loading? <Spin/> :error?<ErrorMessage variant="danger" >{error} </ErrorMessage>:
                products?.map((product)=>(
                  <Col  key={product._id} md={3} >
                      <ProductScreen product={product} />
                   </Col>
            ))
          } 
            
          </Row>
   </>
  
  )
}

export default Homescreen
