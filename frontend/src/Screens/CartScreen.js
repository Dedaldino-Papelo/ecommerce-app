import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, romoveCart } from '../Actions/cartActions'
import { ListGroup } from 'react-bootstrap'
import { Row, Col, Image,FormControl, Button,Card } from 'react-bootstrap'

const CartScreen = () => {
  let Navigate = useNavigate()
  //grab the id from the url
  const { id } = useParams()
  const location = useLocation()
  //also grab the Quantity from the url
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()
  const cart = useSelector(state => state.addCartReducer)
  const { cartItems } = cart
  
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty])


  //remove the product form the cart
  const removeHandler = (id) => {
    dispatch(romoveCart(id))
  }

  //Checkout Handler
  const checkoutHandler = () => {
    Navigate('/user/login?redirect=shipping')
  }

  return (
    <div>
      <Row>
        <h2 className='shop-title'>Shopping Cart</h2>
        <Col md={8}>
          {cartItems.leght === 0 ? <h2>Your cart is empty <Link to="/">Go Back</Link></h2> : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                    <Image src={`http://localhost:4000/${item.image}`} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                   <Link to={`/product/${item.product}`}> {item.name} </Link>
                    </Col>
                    <Col md={2}>
                      $ {item.price}
                    </Col>
                    <Col md={2}>
                    <FormControl 
                      as="select" 
                      value={item.qty} 
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} >
                        {
                          [...Array(item.countInStock).keys()].map((x) => (
                            <option key={ x + 1} value={ x + 1}>
                            {x + 1}
                          </option>
                          ))
                        }
                      </FormControl>
                    </Col>
                    <Col md={2}>
                        <Button type="button" variant="flush" onClick={() => removeHandler(item.product)}>
                          <i className='fas fa-trash'></i>
                        </Button>
                    </Col>
                  </Row>
                  
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h2>
                    Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    items
                  </h2>
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                </ListGroup.Item>
                <ListGroup.Item>
                <div className='d-grid gap-2'>
                 <Button type='button' 
                    className="btn-block" 
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                    >
                    Proceed to Checkout
                   </Button>
                </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartScreen
