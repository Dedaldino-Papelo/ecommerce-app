import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { productCarrosel } from '../Actions/productAction'
import Loader from './Loader'
import Message from './Message'
import { Link } from 'react-router-dom'
import { Image,Carousel } from 'react-bootstrap'

const Carrosel = () => {
    const dispatch = useDispatch()

    const { loading, products, error } = useSelector(state => state.productCarroselReducer)

    useEffect(() => {
        dispatch(productCarrosel())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`} >
                        <Image src={`http://localhost:4000/${product.image}`} alt={product.name}  />
                        <Carousel.Caption>
                            {product.name && product.price? (
                                <h4>{product.name} - {product.price} Kz</h4>
                            ): (<h4>Produtos mais destacados pelos clientes</h4>)}
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default Carrosel
