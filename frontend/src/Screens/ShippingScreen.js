import React from 'react'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { shippingAdress } from '../Actions/cartActions'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {

    const Navigate = useNavigate()
    const Dispatch = useDispatch()
    
    const cart = useSelector(state => state.addCartReducer)
    const { shippingAddress } = cart

    const [address, setAdress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    //on Submit Form
    const onSubmitHandler = () => {
        //Dispatch
        Dispatch(shippingAdress({address, city, postalCode, country}))
        Navigate('/payment')
    }

  return (
    <div>
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <Form onSubmit={onSubmitHandler}>
            <Form.Group controlId='Address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Address'
                    required
                    value={address}
                    onChange={(e) =>setAdress( e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='City'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='City'
                    required
                    value={city}
                    onChange={(e) =>setCity(e.target.value)}>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='PostalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Postal Code'
                    required
                    value={postalCode}
                    onChange={(e) =>setPostalCode(e.target.value)}>
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='Country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Country'
                    required
                    value={country}
                    onChange={(e) =>setCountry(e.target.value )}>
                </Form.Control>
            </Form.Group>

            <Button
                type='submit'
                className='mt-2'
                variant='primary'>
               Continue
            </Button>
        </Form>

    </FormContainer>

</div>
  )
}

export default ShippingScreen
