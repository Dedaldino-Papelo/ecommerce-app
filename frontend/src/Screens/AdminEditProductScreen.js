import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate, useParams} from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import { updateProductAction, productDetails } from '../Actions/productAction'
import { UPDATE_PRODUCT_RESET } from '../Constants/productConstant'
import axios from 'axios'
import { useForm } from 'react-hook-form'

const AdminEditProductScreen = () => {
    const { register, handleSubmit, formState: {errors} } = useForm({})

    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const detailsProduct = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = detailsProduct


    const updateProduct = useSelector(state => state.updateProductReducer)
    const { loading: updateLoading, success: updateSuccess, error: updateError } = updateProduct

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (updateSuccess) {
            dispatch({type:UPDATE_PRODUCT_RESET})

        } else {
            if (!product.name || product._id !== id) {
                dispatch(productDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [dispatch, id, updateSuccess, navigate])

    const onSubmitHandler = () => {
        dispatch(updateProductAction({
            id: product._id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
        navigate('/admin/products')
    }

    //upload image
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {

            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                }
            }

            const url = 'http://localhost:4000/upload/image'
            const { data } = await axios.post(url, formData, config)
            console.log("image", data)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <FormContainer>

                {updateLoading && <Loader />}
                {updateError && <Message variant='danger'>{updateError}</Message>}
                <h2 className='text-center'>Edit product</h2>

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

                    <Form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Form.Group controlId='Name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            {...register("name", {required: "This field is required"})}
                                type='text'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                            {errors.name &&<span style={{color: "#ff4645"}}>{errors.name.message}</span>}
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                             {...register("price", {required: "This field is required"})}
                                type='number'
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}>
                            </Form.Control>
                            {errors.price &&<span style={{color: "#ff4645"}}>{errors.price.message}</span>}
                        </Form.Group>

                        <Form.Group controlId='Image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                             {...register("image", {required: "This field is required"})}
                                type='text'
                                placeholder='Image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}>
                            </Form.Control>
                            <Form.Label>Choose file</Form.Label>
                            <Form.Control
                                type="file"
                                size="sm"
                                onChange={uploadFileHandler} />
                            {uploading && <Loader />}
                            {errors.image &&<span style={{color: "#ff4645"}}>{errors.image.message}</span>}
                        </Form.Group>

                        <Form.Group controlId='Brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                             {...register("brand", {required: "This field is required"})}
                                type='text'
                                placeholder='Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}>
                            </Form.Control>
                            {errors.brand &&<span style={{color: "#ff4645"}}>{errors.brand.message}</span>}
                        </Form.Group>

                        <Form.Group controlId='Category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                             {...register("category", {required: "This field is required"})}
                                type='text'
                                placeholder='Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}>
                            </Form.Control>
                            {errors.category && <span style={{color: "#ff4645"}}>{errors.category.message}</span>}
                        </Form.Group>

                        <Form.Group controlId='Stock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                             {...register("stock", {required: "This field is required"})}
                                type='text'
                                placeholder='Stock'
                                value={countInStock}
                                onChange={(e) => setStock(e.target.value)}>
                            </Form.Control>
                            {errors.stock &&<span style={{color: "#ff4645"}}>{errors.stock.message}</span>}
                        </Form.Group>

                        <Form.Group controlId='Description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                             {...register("description", {required: "This field is required"})}
                                type='text'
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}>
                            </Form.Control>
                            {errors.description &&<span style={{color: "#ff4645"}}>{errors.description.message}</span>}
                        </Form.Group>

                        <Button
                            type='submit'
                            className='mt-2'
                            variant='primary'>
                            Update Product
                        </Button>
                    </Form>

                )}

            </FormContainer>

        </div>
    )
}

export default AdminEditProductScreen


