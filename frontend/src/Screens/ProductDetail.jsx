import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import products from '../product';
import Review from './Review';
import { Row,Col,Button,Image, ListGroup,ListGroupItem, Form} from 'react-bootstrap';
import axios from 'axios';
import {useDispatch,useSelector} from "react-redux"
import {productDetail} from "../Redux/Actions/productAction"
import { useNavigate } from 'react-router-dom';

import Spin from '../componants/Spin';

const ProductDetail = () => {
      const id=useParams();
    

       const[qty,setQty]=useState(1);
        const navigate=useNavigate();
      console.log(id)
      const dispatch=useDispatch();
      const productDetails=useSelector(state=>state.productReducer)
        const {product,loading,error}=productDetails
    //   const product=products.find((p)=>(p._id===id?.id))

      // const fetchProduct=async()=>{
      //   try {  
      //         const {data}=await axios.get(`${process.env.REACT_APP_BACKENDURL}/api/v1/productroute/product/${id?.id}`)
      //          setProduct(data?.product);
            
      //   } catch (error) {  
      //       console.log(error)
            
      //   }
      // }

      useEffect(()=>{
          // fetchProduct();

          dispatch(productDetail(id))

      },[])
     
    

      console.log("checking the qty",qty)


      const addToCartHandler=()=>{
        navigate(`/cart/${id?.id}?qty=${qty}`)
                  
      }

  return (

<>
{
      loading? <Spin/>: <div>  
      <Link to="/" className='btn  btn-light ' >  <i class="fa-solid fa-arrow-left"></i>  &nbsp;  Go Back  </Link> 
      <Row>   
            
         
             
            <Col  md={4}   fluid >   
         
            <Image src={`${product?.image}`}  alt={product?.name} fluid style={{marginTop:"10px"}}  ></Image>
                  
            </Col>

            <Col md={5} style={{marginLeft:"5px"}} >  
                <ListGroup variant='flush' >
                   <ListGroupItem> <h3> {product?.name} </h3> </ListGroupItem>
                   <ListGroupItem style={{marginTop:"5px"}} > <Review value={product?.rating} text={` from ${product?.numReviews} reviews `} /> </ListGroupItem>
                   <ListGroupItem style={{marginTop:"5px"}} > Price: ${product?.price} </ListGroupItem>
                   <ListGroupItem style={{marginTop:"5px"}} > {product?.description} </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={2} style={{marginLeft:"10px"}} >   
               <ListGroupItem  >
                   <Row>
                       <Col> Staus: </Col>
                       <Col> {product?.countInStock>=0?"In Stock":"Out of Stock"} </Col>

                   </Row>
               </ListGroupItem>

                 {
                    product?.countInStock>0 && (
                      <ListGroupItem>
                         <Row>
                             <Col>Qty</Col>
                           
                             <select   
                              //  value={qty} 
                               onChange={(e)=>setQty(e.target.value)}
                             >
                              {Array.from({ length: product?.countInStock }, (_, index) => (
                                 <option key={index + 1} value={index + 1}>
                                 {index + 1}
                                 </option>
                               ))}
                         </select>
                         </Row>
                      </ListGroupItem>
                    )
                 }

               <ListGroupItem style={{marginTop:"30px"}} > <Button onClick={addToCartHandler}  > Add To CART </Button> </ListGroupItem>
            </Col>
      </Row>
</div>
     }   
</>

   
    
    
    
  )
}

export default ProductDetail
