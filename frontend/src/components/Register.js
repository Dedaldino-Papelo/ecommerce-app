import React, { useState, useEffect } from 'react'
import { RegisterActions } from '../Actions/userLoginActions'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useForm } from 'react-hook-form'

const Register = () => {

    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const registerUser = useSelector(state => state.userRegisterReducers)
    const { loading, userInfo, error } = registerUser
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    useEffect(() => {
        if (userInfo) {
            navigation(redirect)
        }
    }, [userInfo, navigation, redirect])

    const onButtonSubmit = () => {
        if (password !== confirmPassword) {
            setMessage("Password Do not Match")
        } else {
            dispatch(RegisterActions(name, email, password))
        }
    }

    return (
        <div className='main d-flex align-items-center justify-content-center'>
            <div className='form-box rounded'>

                {message && <Message variant="danger">{message}</Message>}  
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}

                <h2 className='mb-3'>Sign up to create an account</h2>
                <p className='mb-5'>Don't have an Account? <Link style={{ textDecoration: 'none' }} to={`/user/login`}>Sign in</Link></p>
                <form onSubmit={handleSubmit(onButtonSubmit)} className='d-flex flex-column gap-3'>

                    <input
                        {...register("name", {
                            required: true,
                            maxLength: 40
                        })}
                        type='text'
                        placeholder='Name'
                        className='rounded'
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && errors.name.type === "maxLength" && 
                    <span style={{color: "#4456ff"}}>Cannot exceed 40 characters</span>}
                    {errors.name && <span style={{color: "#ff4645"}}>Name is Required</span>}
                    
                    <input
                        {...register("email", {required: true})}
                        type='text'
                        placeholder='Email'
                        className='rounded'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span style={{color: "#ff4645"}}>Email is Required</span>}

                    <input
                        {...register("password", {
                            required: 'Password is required',
                            maxLength: 8
                        })}
                        type='password'
                        placeholder='Password'
                        className='rounded'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && errors.password.type === "maxLength" && 
                    <span style={{color: "#4456ff"}}>Max Lenght is 8</span>}
                    {errors.password &&<span style={{color: "#ff4645"}}>{errors.password.message}</span>}

                    <input
                        {...register("confirmpassword", {
                            required: "Confirm Password",
                            maxLength: 8
                        })}
                        type='password'
                        placeholder='Password'
                        className='rounded'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.confirmpassword && errors.confirmpassword.type === "maxLength" && 
                    <span style={{color: "#4456ff"}}>Max Lenght is 8</span>}
                    {errors.confirmpassword &&<span style={{color: "#ff4645"}}>{errors.confirmpassword.message}</span>}
                    
                    <button className='btn btn-primary rounded text-uppercase'>
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register