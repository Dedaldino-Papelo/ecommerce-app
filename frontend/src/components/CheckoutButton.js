import React, { useEffect, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { orderPayAction } from '../Actions/orderActions';
import { useDispatch } from 'react-redux';

const CheckoutButton = ({ price, id }) => {
  const priceForStripe = price * 100
   const [publishable_key, setPublishable_key] = useState('')

   const dispatch = useDispatch()

    useEffect(() => {
      axios.get('http://localhost:4000/api/config/stripe')
      .then(res => setPublishable_key(res.data))
      .then(err => console.log(err))
    })

    const onToken = async(token) => {
      try {
        const response = await axios({
          url: 'http://localhost:4000/payment',
          method: 'post',
          data: {
            amount: priceForStripe,
            token,
          },
        });
        if (response.status === 200) {
          alert("Payment Successful")
          dispatch(orderPayAction(id))
        }
      } catch (error) {
        alert("There was an error while trying to fulfll the payment")
        console.log(error);
      }
  }

    return (
    <StripeCheckout
    token={onToken}
    image='https://svgshare.com/i/CUz.svg' // the pop-in header image (default none)
    stripeKey = {publishable_key}
    amount={priceForStripe}
    description={`Your Total is${price}`}
    label='Pay now'
    name='e-store'
    billingAddress
    shippingAddress
    panelLabel='Pay Now'
  />
  )
}

export default CheckoutButton
