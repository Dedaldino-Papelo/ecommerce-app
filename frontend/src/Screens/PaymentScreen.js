import React from 'react'
import FormContainer from '../components/FormContainer'
import { useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Form, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../Actions/cartActions'

const PaymentScreen = () => {

    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const cart = useSelector(state => state.addCartReducer)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        Navigate('/user/login/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('')
    console.log(paymentMethod)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        //Dispatch
        Dispatch(savePaymentMethod(paymentMethod))
        Navigate('/placeorder')
    }
    return (
        <div>
            <FormContainer>
            <CheckoutSteps step1 step2 step3 />
                <h2>Payment Method</h2>
                <Form onSubmit={onSubmitHandler}>
                    <Form.Group controlId='Address'>
                        <Form.Label>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value='PayPal'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                         <Form.Check
                            type="radio"
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check> 
                    </Col>
                    </Form.Group>
                    <Button type="submit" className="mt-2">
                    Continue
                </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen
