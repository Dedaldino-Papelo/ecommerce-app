import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteProductAction, createProductAction,listProducts  } from '../Actions/productAction'
import { CREATE_PRODUCT_RESET } from '../Constants/productConstant'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination'

const AdminProductsScreen = () => {
    const [page, setPage] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listAllProducts = useSelector(state => state.productListReducer)
    const { loading, products, error, totalPages } = listAllProducts

    const DeleteProduct = useSelector(state => state.deleteProductReducer)
    const { loading: loadingDelete, success: successDelete, error: errorDeleteProd } = DeleteProduct

    const userLogin = useSelector((state) => state.userLoginReducers)
    const { userInfo } = userLogin

    const createProduct = useSelector(state => state.createProductReducer)
    const { loading: loadingCreate, product: createdProduct, success: successCreate, error: errorCreate } = createProduct

    useEffect(() => {
        dispatch({ type: CREATE_PRODUCT_RESET })
        if (userInfo && !userInfo.isAdmin) {
            navigate("/user/login")
        }
        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } 
        else if(userInfo && userInfo.isAdmin === "true") {
            dispatch(listProducts(page))
        } else {
            navigate("/")
        }
    }, [dispatch, userInfo, navigate, createdProduct, successCreate, successDelete, page])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure")) {

            dispatch(deleteProductAction(id))
        }
    }

    //Methcd to call create Product
    const createProductHandler = () => {
        dispatch(createProductAction())
    }

    //Change the page on click
  const handlePageClick = (event) =>{
    const offset = (event.selected * totalPages)
    setPage(offset)
  }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h2>List of Products</h2>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>

            </Row>
            {loadingCreate && <Loader />}
            {error && <Message variant='danger'>{errorCreate}</Message>}

            {loadingDelete && <Loader />}
            {error && <Message variant='danger'>{errorDeleteProd}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>brand</td>
                                <td>price</td>
                                <td>category</td>
                                <td>Edit/Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(prod => (
                                <tr key={prod._id}>
                                    <td>{prod._id}</td>
                                    <td>{prod.name}</td>
                                    <td>{prod.brand}</td>
                                    <td>{prod.price}</td>
                                    <td>{prod.category}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${prod._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(prod._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            <Pagination
                handlePageClick={handlePageClick}
                totalPages={totalPages}
            />
        </div>
    )
}

export default AdminProductsScreen
