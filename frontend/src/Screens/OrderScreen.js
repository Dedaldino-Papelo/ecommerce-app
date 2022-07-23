import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { ListGroup, Row, Col, Image } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, orderPayAction, orderDelivery } from '../Actions/orderActions'
import axios from 'axios'
import { ORDER_PAY_RESET, ORDER_Delivery_RESET } from '../Constants/orderConstant'
import { Button } from "react-bootstrap";
import CheckoutButton from '../components/CheckoutButton'

const OrderScreen = () => {
    //get the id from url params
    const { id } = useParams()
    const [sdkReady, setSdkReady] = useState(false)

    const Dispatch = useDispatch()
    const navigate = useNavigate()

    const { paymentMethod } = useSelector(state => state).addCartReducer


    const userLogin = useSelector(state => state.userLoginReducers)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetailsReducers)
    const { loading, order, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDelivering = useSelector(state => state.orderDelivery)
    const { loading: LoadingDelivery, success: successDelivery, error: errorDeliver } = orderDelivering

    if (!loading) {
        //Calculate prices
        order.itemsPrice = order && order.orderItems.reduce((acc, item) => {
            return acc + item.price * item.qty
        }, 0)
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/user/login')
        }
        const fetchPaypal = async () => {
            const { data: clientId } = await axios.get(`http://localhost:4000/api/config/paypal`)
            const script = document.createElement('script')
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onLoad = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay || successDelivery) {
            Dispatch({ type: ORDER_PAY_RESET })
            Dispatch({ type: ORDER_Delivery_RESET })
            Dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                fetchPaypal()
            } else {
                setSdkReady(true)
            }
        }

    }, [Dispatch, navigate, id, successPay, order, successDelivery, userInfo])

    const successPaymentHandler = () => {
        Dispatch(orderPayAction(id))
    }

    //Handling Marking order as delivery
    const handlingDelivery = () => {
        Dispatch(orderDelivery({ id: order._id }))
    }


    return loading ? <Loader />
        : error ?
            <Message variant='danger'>{error}</Message>
            : <>
                <h3 className='mb-5 mt-2'>Order {order._id}</h3>
                <Row>
                    <Col md={8}>
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>Shipping</h3>
                                <p>
                                    <strong>Name:</strong>
                                    {order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address: </strong>
                                    {order.shippingAddress.map(item => (
                                        <p key={item._id}>
                                            {item.address}, {item.city},
                                            {item.postalCode}, {item.country}
                                        </p>
                                    ))}
                                </p>
                                {
                                    order.isDelivered ? <Message variant="success">Delivered at {order.deliveryAt}</Message>
                                        : <Message variant="danger">Not Delivered </Message>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3>Payment Method</h3>
                                <p>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </p>
                                {
                                    order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message>
                                        : <Message variant="danger">Not Paid </Message>
                                }
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h3>Order Items</h3>
                                {order.orderItems.lenght === 0 ? <Message>Your Order is empty</Message>
                                    : (
                                        <ListGroup variant="flush" >
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={`http://localhost:4000/${item.image}`} alt={item.name} fluid rounded />
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
                        <ListGroup>
                            <ListGroup.Item>
                                <h3>Order Summary</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {paymentMethod === 'Stripe' ?
                                        <div className='d-grid gap-2'>
                                            <CheckoutButton
                                                price={order.totalPrice}
                                                id={id}
                                            />
                                        </div>
                                        : !sdkReady ? <Loader />
                                        : <PayPalButton
                                                amount={order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {LoadingDelivery && <Loader />}
                        {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <div className='d-grid gap-2'>
                                    <Button
                                        type='button'
                                        className="btn btn-block"
                                        onClick={handlingDelivery}>
                                        Mark as Delivered
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        )}
                    </Col>
                </Row>
            </>
}

export default OrderScreen
