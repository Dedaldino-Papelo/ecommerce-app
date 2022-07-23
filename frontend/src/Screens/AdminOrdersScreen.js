import { Button } from "react-bootstrap";
import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getOrdersAction } from '../Actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminOrdersScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLoginReducers)
    const { userInfo } = userLogin

    const getOrders = useSelector(state => state.getOrders )
    const {loading, orders, error } = getOrders

    useEffect(() => {
        if(userInfo && userInfo.isAdmin === "true"){
            dispatch(getOrdersAction())
        } else {
            navigate(`/user/login`)
          
        }
    },[dispatch,navigate,userInfo])

  return (
    <div>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}

        <h2>List of orders</h2>

        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <td>Id</td>
                    <td>User</td>
                    <td>Date</td>
                    <td>Total</td>
                    <td>Paid</td>
                    <td>Delivered</td>    
                </tr>
            </thead>
            <tbody>
                 {orders && orders.map(order=> (
                <tr key={order._id}>
                     <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                        {
                            order.isPaid ? order.paidAt.substring(0, 10):(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )
                        }
                    </td>
                    <td>
                        {
                            order.isDelivered ? order.deliveryAt.substring(0, 10):(
                                <i className='fas fa-times' style={{color: 'red'}}></i>
                            )
                        }
                    </td>
                    <td>
                    <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                    </LinkContainer>
                    </td>
                </tr>
                ))} 
            </tbody>
        </Table>
      
    </div>
  )
}

export default AdminOrdersScreen
