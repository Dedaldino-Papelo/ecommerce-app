import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate,useParams,Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { getUserDetailsActions,updateUserActions } from '../Actions/userLoginActions'
import { UPDATE_USER_RESET } from '../Constants/userConstants'
import { useForm } from 'react-hook-form'

const AdminEditUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setisAdmin] = useState(false)

    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues:{
            name: "",
            email: ""
        }
    })

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getuserInfo = useSelector(state => state.getDetailsUserReducers)
    const { error, loading, user } = getuserInfo

    const updateUsers = useSelector(state => state.updateUserReducers)
    const { error:errorUpdate, loading:loadingUpdate, success:successUpdate } = updateUsers

    useEffect(() => {
        if(successUpdate){
            dispatch({type:UPDATE_USER_RESET})
            navigate('/admin/users')

        } else {
            if(!user.name || user._id !== id){
                dispatch(getUserDetailsActions(id))
                } else {
                    setName(user.name)
                    setEmail(user.email)
                    setisAdmin(user.isAdmin)
                }
        }
      
    },[dispatch,id,user,successUpdate,navigate])

    const submithandler = () => {
        dispatch(updateUserActions({id:user._id, name, email, isAdmin}))

    }

    return (
        <div>
              <Link to='/admin/users' classname='btn btn-light my-3'>
                Go Back
            </Link>
              

                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
                <FormContainer>
                <h2 className="text-center">Edit User</h2>
                <Form onSubmit={handleSubmit(submithandler)}>
                    <Form.Group controlId='Name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            {...register("name", {required: "This field is required"})}
                            type='text'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                        {errors.name && <span style={{color: "#ff4645"}}>{errors.name.message}</span>}
                    </Form.Group>

                    <Form.Group controlId='Email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            {...register("email", {required: "This field is required"})}
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>
                        </Form.Control>
                        {errors.name && <span style={{color: "#ff4645"}}>{errors.name.message}</span>}
                    </Form.Group>

                    <Form.Group controlId='isAdmin'>
                        <Form.Check
                            type='checkBox'
                            label='is Admin'
                            checked={isAdmin}
                            onChange={(e) => setisAdmin(e.target.value)}
                        >
                        </Form.Check>
                    </Form.Group>


                    <Button
                        type='submit'
                        className='mt-2'
                        variant='primary'>
                        Update
                    </Button>
                </Form>

            </FormContainer>


            )}
        </div>
    )
}

export default AdminEditUser


