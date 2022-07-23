import React from 'react'
import { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {useNavigate } from 'react-router-dom'
import { listUserAcion, deleteUserAction } from '../Actions/userLoginActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const listUser = useSelector(state => state.listAllReducers)
    const {loading, user, error} = listUser

    const userLogin = useSelector(state => state.userLoginReducers)
    const { userInfo } = userLogin

    const deleteUser = useSelector(state => state.DeleteUserReducers)
    const { success:successDelete } = deleteUser


    useEffect(() => {
        if(userInfo && userInfo.isAdmin === "true"){
            dispatch(listUserAcion())
        } else {
            navigate('/')
        }
    },[dispatch,userInfo,navigate,successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure')){
            dispatch(deleteUserAction(id))
            dispatch(listUserAcion())
        }      
    }

  return (
    <div>
        <h2>List of Users</h2>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
             <Table>
             <thead>
                 <tr>
                     <td>ID</td>
                     <td>Name</td>
                     <td>Email</td>
                     <td>isAdmin</td>
                 </tr>
             </thead>
             <tbody>
                 {user.map(user => (
                      <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                          {user.isAdmin ? (<i className='fas fa-check' style={{color: 'green'}}></i>) 
                          : <i className='fas fa-times' style={{color: 'red'}}></i>}
                          </td>
                          <td>
                              <LinkContainer to={`/admin/${user._id}/edit`}>
                                  <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                                  </Button>
                              </LinkContainer>
                                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id) }>
                                  <i className='fas fa-trash'></i>
                                  </Button>
                          </td>
                      </tr>

                 ))}
                
             </tbody>
         </Table>
        )}
     
    </div>
  )
}

export default AdminScreen
