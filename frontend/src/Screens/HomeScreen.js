import React, { useEffect, useState} from 'react'
import Product from '../components/product'
import { Row,Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Pagination from '../components/Pagination'
import Carrosel from '../components/Carrosel'



const HomeScreen = () => {
  const dispatch = useDispatch(0)
  const [page, setPage] = useState(0)

  const productList = useSelector((state) => state.productListReducer)
  const { loading, error, products, totalPages} = productList

  //Change the page on click
  const handlePageClick = (event) =>{
    const offset = (event.selected * totalPages)
    setPage(offset)
  }

  //keyword store
  const { keyword } = useSelector(state => state.productSeachReducer)

  useEffect(() => {
    dispatch(listProducts(page))
  }, [dispatch,page])

  const filteredProducts = products.filter(p => {
    return p.name.toLowerCase().includes(keyword.toLowerCase())
  })

  return (
    <div>
     {/*  {!keyword && <Carrosel /> } */}
     <Carrosel />
      <h3 className='latest-product text-center'>Latest Products</h3>

      { loading ? <Loader /> : error ? <Message variant='danger'> {error} </Message>
        :
        <Row>
          {filteredProducts.map(product => {
            return (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                <Product products={product} />
              </Col>
            )
          })}
        </Row>
        }
        
        <Pagination 
           totalPages={totalPages} 
           handlePageClick={handlePageClick}
        /> 
    </div>
  )
}

export default HomeScreen
