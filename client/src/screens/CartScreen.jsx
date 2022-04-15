import React from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { addToCart, removeCart } from '../actions/cartAction';
import { CaretDownOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';


const CartScreen = ({ match, location, history }) => {

    const { cartItems } = useSelector(state => state.cart)

    const user = useSelector(state => state.user);
    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const dispatch = useDispatch();



    const removeFromCartHandler = (id) => {
        dispatch(removeCart(id))
    }

    const checkOutHandler = () => {
        if (!user) {
            history.push('/login')
        }
        else {
            history.push('/shipping')
        }
    }

    if (!user) {
        return (
            <div className="container text-center">
                <div className="my-5">
                    <p className=" text-secondary"> You are not login </p>
                    <Link to="/login" >Login</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-5 mt-2">
            <Row className='' >
                <Alert variant='dark' className='text-center' >
                    <h2>  Shopping Cart{" "}<ShoppingCartOutlined className="primary" /></h2>
                </Alert>

                <Col md={8} >
                    {
                        user && cartItems.filter(x => x.userId === user._id).length === 0 ? <> <p>Your cart is empty</p> <Link to="/">Go back </Link> </>
                            : (
                                <ListGroup variant="flush"  >
                                    {
                                        cartItems.filter(x => x.userId === user._id).map(x => (
                                            <ListGroup.Item key={x.product}>
                                                <Row style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }} >

                                                    <Col md={2}>

                                                        {x.images.length > 0 && <ModalImage small={x.images[0].url} large={x.images[0].url} />}
                                                    </Col>
                                                    <Col md={3}>
                                                        <strong>
                                                            <Link to={`/product/${x.product}`} > {x.name} </Link>
                                                        </strong>
                                                    </Col>

                                                    <Col md={2}> {x.price} PKR </Col>
                                                    <Col md={2}>

                                                        <Form.Control
                                                            as='select'
                                                            defaultValue={x.qty}
                                                            onChange={(e) => dispatch(addToCart(x.product, Number(e.target.value), user._id))}
                                                        >
                                                            {
                                                                [...Array(x.countInStock).keys()].map(y => (
                                                                    <option key={y + 1} value={y + 1}>{y + 1}</option>
                                                                ))
                                                            }

                                                        </Form.Control>
                                                    </Col>

                                                    <Col md={2}>

                                                        <DeleteOutlined
                                                            style={{ fontSize: '16px', color: 'red' }}
                                                            onClick={() => removeFromCartHandler(x.product)}
                                                        />

                                                    </Col>

                                                </Row>
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            )
                    }
                </Col>
                <Col md={4}>
                    <div className="row"> <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2> subtotal ({cartItems.filter(x => x.userId === user._id).reduce((acc, item) => acc + item.qty, 0)}) items </h2>
                                {" "}{cartItems.filter(x => x.userId === user._id).reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} PKR
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cartItems.filter(x => x.userId === user._id).length === 0} onClick={checkOutHandler}>
                                    Processed to check out
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    </div>
                    <div className="row my-2"><hr /></div>
                    <div className="row">
                        {cartItems.filter(x => x.userId === user._id).length ? <button className="btn btn-block-primary">
                            <Link to="/" > Continue Shopping </Link>
                        </button> : null
                        }

                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default CartScreen
