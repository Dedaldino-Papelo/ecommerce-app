import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userDetailsActions, userUpdateActions } from '../Actions/userLoginActions'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../Actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {


const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [message, setMessage] = useState(null)

const onNameChange = (e) => {
    setName(e.target.value)
}
const onEmailChange = (e) => {
    setEmail(e.target.value)
}
const onPasswordChange = (e) => {
    setPassword(e.target.value)
}
const onConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
}

const Dispatch = useDispatch()

const userDetails = useSelector(state => state.userDetailsReducers)
const { loading, error, user } = userDetails

const userLogin = useSelector((state)=> state.userLoginReducers)
const { userInfo } = userLogin

const updateProfile = useSelector(state => state.userUpdateReducers)
const { success } = updateProfile

const list_Myorders = useSelector(state => state.myorderListReducer)
const { loading:loadinOrders, error:errorOrders, myOrders } = list_Myorders

 useEffect(() => {
    if(!userInfo){
        //navigate('/user/login')
        console.log(userInfo)
    } else {
        if(!user.name){
            Dispatch(userDetailsActions('profile'))
            Dispatch(listMyOrders())
        } else {
            setName(user.name)
            setEmail(user.email)
        }
    }
}, [Dispatch,userInfo,user])
 
const onSubmitHandler = () => {
        if (password !== confirmPassword) {
            setMessage("Password Do not Match")
        } else {
            Dispatch(userUpdateActions(name, email, password))
        }
}
  return (
    <div>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
            <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group controlId='Name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={onNameChange}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='Email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={onEmailChange}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='Password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            onChange={onPasswordChange}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='Confirm Password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            onChange={onConfirmPassword}>
                        </Form.Control>
                    </Form.Group>

                    <Button
                        type='submit'
                        className='mt-2'
                        variant='primary'>
                        Update Profile
                    </Button>
                </Form>
            </Col>

                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadinOrders ? <Loader /> : errorOrders ? <Message>{errorOrders} </Message>:(
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>DATE</td>
                                    <td>TOTAL</td>
                                    <td>PAID</td>
                                    <td>Delivered</td>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.paidAt.substring(0,10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0,10))  
                                                :(
                                            <i className='fas fa-times' style={{color:'red'}}></i>
                                        )}
                                        </td>
                                        <td>
                                            {order.isDelivered ? (
                                                order.isDelivered.substring(0,10)) 
                                                :(
                                            <i className='fas fa-times' style={{color:'red'}}></i>
                                        )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light'>Details</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </div>
  )
}

export default ProfileScreen
