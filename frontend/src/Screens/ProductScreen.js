import React, { useEffect, useState } from 'react'
import { Col, ListGroup, Row, Image, Button, FormControl,FormLabel, FormGroup, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { productDetails, productReviewAction } from '../Actions/productAction'
import Message from '../components/Message'
import { PRODUCT_REVIEW_RESET } from '../Constants/productConstant'
import Loader from '../components/Loader'

const ProductScreen = () => {
  //Get the id from the url => req.params = useParams
  const { id } = useParams()

  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  const dispatch = useDispatch()
  const listProductDetails = useSelector((state) => state.productDetailsReducer)
  const { error, loading, product } = listProductDetails

  const userLogin = useSelector((state) => state.userLoginReducers)
  const { userInfo } = userLogin

  const productReviews = useSelector((state) => state.productReviewReducers)
  const { error: errorReviewing, success: successReviewing } = productReviews

  useEffect(() => {
    if(successReviewing){
      alert("Review added")
      dispatch({type: PRODUCT_REVIEW_RESET})
      setComment('')
      setRating(0)
    }
    dispatch(productDetails(id))
  }, [dispatch,id,successReviewing])

  //Add to cart handler
  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(productReviewAction(id,rating,comment))
  }

  return (
    <div>
      <Link to="/" className='btn btn-light my-3'> Go Back </Link>

      {loading ? <Loader /> : error ? <h2>{error}</h2>
        :
        <Row>
          <Col md={6}>
            <Image src={`http://localhost:4000/${product.image}`} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price: kz{product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price: </Col>
                  <Col>
                    <strong>kz {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Status: </Col>
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <FormControl
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)} >
                    {
                      [...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))
                    }
                  </FormControl>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>

              <div className='d-grid gap-2'>
                <Button onClick={addToCart} disabled={product.countInStock === 0}
                  variant="dark" type="button">Add to Cart
                </Button>
              </div>
            </ListGroup.Item>
          </Col>
          <Row>
            <Col md={6}>
              <h2 className='text-center'>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {errorReviewing && <Message>{errorReviewing}</Message>}
                  {userInfo && userInfo ?
                    (
                      <Form onSubmit={submitHandler}>
                        <FormGroup>
                        <FormLabel>Rating</FormLabel>
                        <FormControl 
                          as='select' 
                          value={rating} 
                          onChange={(e) => setRating(e.target.value)}
                          >
                          <option value=''>select...</option>
                          <option value='1'>1 - poor</option>
                          <option value='2'>2 - fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excelent</option>
                        </FormControl>
                      </FormGroup>
                      <FormGroup>
                        <FormLabel>Comment</FormLabel>
                        <FormControl 
                          as='textarea' 
                          row ='3' 
                          onChange={(e) => setComment(e.target.value)}>
                        </FormControl>
                      </FormGroup>
                      <Button type='submit' className="mt-2">
                        Submit
                      </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please link to <Link to='/user/login' style={{textDecoration: 'none'}}>sign in</Link> to write a review
                      </Message>
                    )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Row>
      }
    </div>
  )
}

export default ProductScreen
