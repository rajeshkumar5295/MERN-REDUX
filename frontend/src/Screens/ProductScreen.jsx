import React from 'react'
import { Row,Col,Container,Card } from 'react-bootstrap'
import Review from './Review'
import { Link } from 'react-router-dom'
const ProductScreen = ({product}) => {
  return (
         <Card   style={{width:"250px", height:"400px"}}  className='my-3 p-3' >
                
                <Link  to={`/product/${product._id}`} >      <Card.Img src={product.image}  />    </Link>

                <Card.Body>
                     <Link  to={`/product/${product._id}`} > 
                         <Card.Title as="div"> 
                           <strong> {product.name} </strong>
                         </Card.Title>
                      </Link>
                      <Card.Text as="div"> 
                          <div className="my-3">
                              {/* {product.rating}from{product.numReviews} reviews */}
                              <Review value={product.rating} text={` from ${product.numReviews} reviews `}  />

                           </div>
                       </Card.Text>

                       <Card.Text as='div'>
                          ${product.price} 
                       </Card.Text>
                </Card.Body>
         </Card>
  )
}

export default ProductScreen
