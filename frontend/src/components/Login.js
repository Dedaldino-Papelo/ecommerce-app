import React, { useState, useEffect } from 'react'
import { loginActions } from '../Actions/userLoginActions'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useForm } from 'react-hook-form'

const Login = () => {

  const navigation = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const userLogin = useSelector(state => state.userLoginReducers)
  const { loading, userInfo, error } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    if (userInfo) {
      navigation(redirect)
    }
  }, [userInfo, navigation, redirect])

  const onButtonSubmit = () => {
  /*   e.preventDefault() */
    dispatch(loginActions(email, password))
  }

  return (
    <div className='main d-flex align-items-center justify-content-center'>
      <div className='form-box rounded'>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <h2 className='mb-3'>Sign in to your account</h2>
        <p className='mb-5'>Don't have an Account? <Link style={{textDecoration: 'none'}} to={`/user/register`}>Sign up</Link></p>
        
        <form onSubmit={handleSubmit(onButtonSubmit)} className='d-flex flex-column gap-3'>
          <input
            {...register("email", {required: true})}
            type='text'
            placeholder='Email'
            className='rounded'
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={{color: "#ff4645"}}>Email is Required</span>}
          <input
          {...register("password", {required: true})}
            type='password'
            placeholder='Password'
            className='rounded'
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span style={{color: "#ff4645"}}>Password is Required</span>}

          <button className='btn btn-primary rounded text-uppercase'>
            Sign in
          </button>
        </form>
      </div>

    </div>
  )
}

export default Login