import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Image, Card, ListGroup, Row, Col } from 'react-bootstrap'
import ModalImage from "react-modal-image";


import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderAction'
import CheckoutSteps from '../components/CheckoutSteps'


const PlacingOrder = ({ history }) => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    if (user && user._id) {
        cart.itemsPrice = cart.cartItems.filter(x => x.userId === user._id).reduce((acc, item) => acc + item.price * item.qty, 0);
        cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
        cart.totalPrice = Number(cart.taxPrice + cart.itemsPrice).toFixed(2)
    }

    const orderCreate = useSelector(state => state.order);
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
    }, [history, success,])

    console.log(cart.cartItems.length, "from place order")

    const placeOrderHandler = () => {
        console.log('order');
        dispatch(createOrder({
            orderItems: cart.cartItems,
            totalItems: cart.cartItems.length,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))

    }



    return (
        <div className="mx-5 mt-4">
            <CheckoutSteps step1 step3 step2 />
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Info</h2>
                            <p>
                                <strong> Address  :</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {" "}
                                {cart.shippingAddress.postalCode},{"  "}{cart.shippingAddress.country}
                            </p>
                            <p>
                                <strong> Phone Number  :</strong>
                                {cart.shippingAddress.phoneNumber}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong> Method : </strong>
                                {cart.paymentMethod === "caseOnDelivery" && <>Cash On Delivery</>}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {user && user._id && cart.cartItems.filter(x => x.userId === user._id).length === 0 ? <p>You cart is empty </p> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.filter(x => x.userId === user._id).map((item, index) => (
                                        <ListGroup.Item key="index">
                                            <Row>
                                                <Col md={1}>
                                                    {item.images.length > 0 && <Image src={item.images[0].url} alt={item.name} fluid rounded />}
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                                                </Col>
                                                <Col md={4} >
                                                    {item.qty} x {" "}{item.price} PKR = {" "}{item.qty * item.price} PKR
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>


                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2> Order Summary </h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> Price </Col>
                                    <Col> {" "}{cart.itemsPrice} PKR </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> Tax </Col>
                                    <Col> {" "}{cart.taxPrice} PKR </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> Total </Col>
                                    <Col> {" "}{cart.totalPrice} PKR </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup>
                                {
                                    error && <p> {error} </p>
                                }
                            </ListGroup>

                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default PlacingOrder
