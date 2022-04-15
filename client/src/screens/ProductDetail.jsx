import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style/home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { Button, Col, Form, FormGroup, FormLabel, Image, ListGroup, Row, FormControl, Alert, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { productListDetail, updateProductForReviews } from '../actions/productAction'
import { addToCart } from '../actions/cartAction'
import { AddToWishlist } from '../actions/wishlistAction'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import Loader from "../components/Loader";
import styled from 'styled-components'



const ProductDetail = ({ match, history }) => {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();
    const { product, loading, error } = useSelector(state => state.productDetail);
    const { loading: reviewLoading, error: errorReviews, success: successReview } = useSelector(state => state.productReviews);
    const user = useSelector(state => state.user);

    const { images } = product

    // console.log(user._id, "its ser id");

    useEffect(() => {
        if (successReview) {
            alert('Review Submitd !')
            setRating(0)
            setComment('')
            dispatch({ type: 'product_review_reset' })
        }
        dispatch(productListDetail(match.params.id))
    }, [dispatch, match, successReview,]);

    console.log(errorReviews, 'from erro reviews detail products');

    const addToCartHandler = () => {
        if (user && user._id) {
            history.push(`/cart`)
            dispatch(addToCart(match.params.id, qty, user._id))
        } else {
            toast.info('For add to cart, You must be login')
        }

        // create cart array

    }

    const wishlistHandler = () => {
        if (!user) {
            toast.info(`Login First`)
        } else {
            AddToWishlist(match.params.id, user.token).then(res => {
                toast.success(`Added to wishhlist`)
                // history.push('/wishlist')
            })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProductForReviews(match.params.id, { rating, comment }))
    }

    return (
        <HeaderContainer>
            {
                loading ? <h2>Loading...</h2> : error ? <>{toast.error(error)}</>
                    : <div style={{ padding: '10px', margin: '10px' }}>


                        <Row className=" p-3"  >
                            <Col md={8} className=""  >
                                {images && images.length ? (
                                    <div>
                                        <Carousel width={700} showArrows={true} autoPlay infiniteLoop>
                                            {product.images && product.images.map((i) => <img src={i.url} key={i.public_id} />)}
                                        </Carousel>
                                    </div>
                                ) : (<Alert variant="dark" > No Images </Alert>)}
                            </Col>
                            <Col md={4} className="home" style={{ borderRightColor: 'gray', borderWidth: '1px' }} >
                                <Row>
                                    <h1 className="text-info p-3">{product.name}</h1>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            Price{" "}
                                            <span className="label label-default label-pill pull-xs-right">
                                                <a>  PKR{" "}{product.price}</a>
                                            </span>
                                        </li>
                                        {product.category && (
                                            <li className="list-group-item">
                                                Category{" "}
                                                <Link
                                                    to={`/category/${product.category}`}
                                                    className="label label-default label-pill pull-xs-right"
                                                >
                                                    {product.category}
                                                </Link>
                                            </li>
                                        )}
                                        {
                                            product.category && product.categoryName && (
                                                <li className="list-group-item">
                                                    Category Name{" "}
                                                    <Link
                                                        // to={`/category/${product.category}`}
                                                        className="label label-default label-pill pull-xs-right"
                                                    >
                                                        {product.categoryName}
                                                    </Link>
                                                </li>
                                            )
                                        }

                                        <li className="list-group-item">
                                            Brand{" "}
                                            <span className="label label-default label-pill pull-xs-right">
                                                {product.brand}
                                            </span>
                                        </li>

                                        <li className="list-group-item">
                                            Description{" "}
                                            <span className="label label-default label-pill pull-xs-right">
                                                {product.description}
                                            </span>
                                        </li>
                                    </ul>
                                    <div className='text-center' >
                                        <Rating rating={product.rating} reviews={product.numReviews} />
                                    </div>
                                </Row>
                                <hr />
                                <Row>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            Stock {" "}
                                            <span className="label label-default label-pill pull-xs-right">
                                                <strong >  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
                                            </span>
                                        </li>
                                    </ul>
                                    <ListGroup>
                                        {
                                            product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col> QTY </Col>
                                                        <Col>
                                                            <Form.Control
                                                                as='select'
                                                                value={qty}
                                                                onChange={(e) => setQty(e.target.value)}
                                                            >
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }
                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        }

                                        <ListGroup.Item>

                                        </ListGroup.Item>

                                    </ListGroup>
                                    {
                                        user && !user.isAdmin && <> <Button onClick={addToCartHandler} className="btn-block" type='button' disabled={product.countInStock === 0} >
                                            Add To Cart {" "}
                                            <ShoppingCartOutlined />
                                        </Button>

                                            <Button className='btn-block' onClick={wishlistHandler}>
                                                Add to Wishlist {" "}
                                                <HeartOutlined />
                                            </Button>
                                        </>
                                    }
                                </Row>
                            </Col>
                        </Row>

                        <Row className='head'>
                            <Col md={8} className="" >

                                <div
                                    className='display-4'
                                    style={{ margin: '8px', padding: '8px', width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
                                >
                                    <Form style={{ width: '700px' }} onSubmit={submitHandler} >

                                        <Row className="mb-1">
                                            <h4 className="text-center p-3   display-4 font-weight-bold ">
                                                Reviews
                                            </h4>
                                        </Row>
                                        {errorReviews && <Alert variant="dark" >
                                            <h5  > {`${errorReviews}`} </h5>
                                        </Alert>}
                                        {
                                            user ? (<>
                                                <FormGroup>
                                                    {reviewLoading && <Loader />}
                                                    <Form.Label> Rating </Form.Label>
                                                    <FormControl as="select" value={rating} onChange={e => setRating(e.target.value)} >
                                                        <option value=''> select...</option>
                                                        <option value='1'> 1 - Poor </option>
                                                        <option value='2'> 2 - Fair </option>
                                                        <option value='3'> 3 - Good </option>
                                                        <option value='4'> 4 - Very Good </option>
                                                        <option value='5'> 5 - Excellent </option>


                                                    </FormControl>
                                                </FormGroup>
                                                <FormGroup controlId="comment" >
                                                    <FormLabel> Comment </FormLabel>
                                                    <Form.Control
                                                        as="textarea"
                                                        row="3"
                                                        value={comment}
                                                        onChange={e => setComment(e.target.value)}
                                                    > </Form.Control>
                                                </FormGroup>
                                                <button className="btn btn-primary" type="submit"> submit </button>

                                            </>)
                                                : <p>Tap here to <Link to='/login'>login  </Link></p>
                                        }
                                    </Form>
                                </div>
                            </Col>
                            <Col md={4} >
                                <div className="card mt-3"  >
                                    {product.reviews.map(r => (<>
                                        <div className="card-body" key={r._id} >
                                            <Row>  <strong> {r.name} </strong> </Row>
                                            <p> {r.createdAt.substring(0, 10)} </p>
                                            <p> {r.comment} </p>
                                            <Rating rating={r.rating} />
                                        </div>
                                        <hr />
                                    </>
                                    ))}
                                </div>
                            </Col>
                        </Row>

                        <hr />


                    </div>
            }
        </HeaderContainer>
    )
}

const HeaderContainer = styled.main`

.carousel .thumb img {
    width: 100% !important;
    height: 100% !important;
}

.carousel .slide img {
    height: 480px !important;
    max-height: 600px;  /* change this to whatever you want */
    width: 100% !important;
}
`
export default ProductDetail
