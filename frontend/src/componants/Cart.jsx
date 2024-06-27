import React, { useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import { addToCart,removeFromCart } from "../Redux/Actions/cartAction";
import ErrorMessage from "./ErrorMessage";

import { useDispatch, useSelector } from "react-redux";



const Cart = () => {
     
     const navigate=useNavigate();
  const { id } = useParams();
  console.log("checking id in cart", id);

  const dispatch = useDispatch();
 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const qty = queryParams.get("qty");

  console.log("checking qty", qty);

  //  const Qqty=location.search?Number(location.search.split("=")[1]):1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    try {
         dispatch(removeFromCart(id));
    } catch (error) {}
  };

  const checkOut=()=>{
         try {
            
            navigate("/shipping");
         } catch (error) { 
             
         }
  }


  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <ErrorMessage>
              {" "}
              Your Cart is Empty ! <Link to="/"> Go Back </Link>{" "}
            </ErrorMessage>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounde />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product  , Number(e.target.value))
                        )
                      }
                    >
                      {Array.from(
                        { length: item?.countInStock },
                        (_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        )
                      )}
                    </select>

                   
                  </Col>

                  <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                </Row>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                {/* <h2>
                  SubTotal({cartItems.reduce((acc, item) => (acc+item?.qty), 0)})
                  items
                </h2> */}
                  <h2>
             SubTotal({cartItems.reduce((acc, item) => (acc + (item.qty ?  Number (item.qty) : 0)), 0)})
                items
      </h2>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                  <Button type="button"className="btn-block" disabled={cartItems.length===0} onClick={checkOut} > Proceed to checkout </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </> 
  );
};

export default Cart;
