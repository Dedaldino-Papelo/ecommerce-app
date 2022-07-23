import React, { useEffect } from 'react'
import { ListGroup, Row, Col, Image, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { orderActions } from '../Actions/orderActions'

const PlaceOrderScreen = () => {

    const navigate = useNavigate()
    const Dispatch = useDispatch()
    const cart = useSelector(state => state.addCartReducer)

    const orderReducer = useSelector(state => state.orderReducer)
    const {success, order, error} = orderReducer

    useEffect(() => {
        if(success){
            navigate(`/order/${order._id}`)
        }
    }, [navigate,success,order])

    //Calculate prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
        return acc + item.price * item.qty
    }, 0)
    //Calculate Shipping
    cart.shipping = cart.itemsPrice > 100 ? 0 : 100
    //Calculate Tax
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
    //Total
    cart.totalPrice = Number((cart.itemsPrice + cart.shipping + cart.taxPrice)).toFixed(2)


    const placeOrderHandler = () => {
       Dispatch(orderActions({
           orderItems:cart.cartItems,
           shippingAddress:cart.shippingAddress,
           paymentMethod: cart.paymentMethod,
           itemsPrice: cart.itemsPrice,
           shippingPrice: cart.shippingPrice,
           taxPrice: cart.taxPrice,
           totalPrice: cart.totalPrice
       }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p>
                                <strong>Address:</strong>
                                {cart.shippingAddress.address},{cart.shippingAddress.city}
                                {cart.shippingAddress.country},{cart.shippingAddress.postalCode}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>

                            <h3>Payment Method</h3>
                            <p>
                                <strong>Method:</strong>
                                {cart.paymentMethod}

                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.lenght === 0 ? <Message>Your Cart is empty</Message>
                                : (
                                    <ListGroup variant="flush" >
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image 
                                                            src={`http://localhost:4000/${item.image}`} 
                                                            alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.id}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup >
                                )}

                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>

                            <ListGroup.Item>
                                <h3 className="text-center">Order Summary</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shipping}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>                
                            <ListGroup.Item>
                                <div className="d-grid gap-2">
                                    <Button
                                        type="button"
                                        className="btn-block d-grid gap-2"
                                        disabled={cart.cartItems === 0}
                                        onClick={placeOrderHandler}
                                    > Place Order </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
