import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const product = ({ products }) => {
    return (
        <Card className='my-3 p-3 rounded h-100'>
            <Link to ={`/product/${products._id}`}>
            <Card.Img variant="top" src={`http://localhost:4000/${products.image}`} />
            </Link>
            <Card.Body>

            <Link style={{textDecoration:'none'}} to={`/product/${products._id}`}>
                <Card.Title as="div">
                    <strong> {products.name}</strong>
                </Card.Title>
            </Link>

                <Card.Text>
                    <div className='my-3'>
                    <Rating 
                        value={products.rating} 
                        text={`${products.numReviews} Reviews`} />
                    </div>
                </Card.Text>

                <Card.Text as='h3'>
                    Kz {products.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default product
