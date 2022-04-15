
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Alert, Row, Col, Card, Image } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { getOrderDetails, OrderDelivered, } from '../actions/orderAction'
import Loader from '../components/Loader'


const AdminOrderDetails = ({ match, history }) => {

    const orderId = match.params.id;
    const dispatch = useDispatch()


    const orderDetails = useSelector(state => state.orderDetails);
    const user = useSelector(state => state.user);
    const { order, loading, error } = orderDetails;
    const { loading: loadingdeliver, success: successDeliver } = useSelector(state => state.orderDelivered)


    if (!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    }


    useEffect(() => {
        dispatch(getOrderDetails(orderId))
        dispatch({ type: 'order_deliver_reset' });
    }, [dispatch, orderId,])

    const deliverHandler = () => {
        dispatch(OrderDelivered(orderId))
        dispatch(getOrderDetails(orderId))
    }





    return user && loading ? <Loader /> : error ? <p>{error} </p> :
        <div className="mx-5 mt-3">
            <Alert variant="info" > <h1> Order </h1>{order._id} </Alert>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            {user.name && <p>   <strong> Name : {order.user.name} </strong></p>}
                            <p> <strong>Email :</strong> <a href={`mailto:${order.user.email}`} >  {order.user.email} </a></p>
                            <p> <strong>User :</strong> <Link to={`/admin/user/${order.user._id}`} >  {order.user._id} </Link></p>

                            <p>
                                <strong> Address  :</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {" "}
                                {order.shippingAddress.postalCode},{"  "}{order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered ? <Alert variant="success" > {order.deliveredAt}  </Alert> :
                                    <Alert variant="danger" > Not Deliver Yet  </Alert>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>payment method</h2>
                            <p>
                                <strong> method : </strong>
                                {order.paymentMethod}
                            </p>
                            {
                                order.isPaid ? <Alert variant="success" > {order.paidAt}  </Alert> :
                                    <Alert variant="danger" > Not Paid Yet </Alert>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <p>Cart is empty</p> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key="index">
                                            <Row>
                                                <Col md={8}>
                                                    <h2><Link to={`/product/${item.product}`}> {item.name} </Link></h2>
                                                </Col>
                                                <Col md={4} className="justify-content-center align-items-center" >
                                                    {item.qty} x PKR{" "}{item.price} = PKR{" "}{item.qty * item.price}
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
                                    <Col> Items </Col>
                                    <Col> PKR{" "}{order.itemsPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> shipping </Col>
                                    <Col> PKR{" "}{order.shippingPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> Tax </Col>
                                    <Col> PKR{" "}{order.taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> Total </Col>
                                    <Col> PKR{" "}{order.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    {
                                        user && user.isAdmin && <button disabled={order.isDelivered && true} className="btn btn-primary" onClick={deliverHandler} >
                                            {loadingdeliver ? "loading..." : "delivered & Paid"}
                                        </button>
                                    }
                                </Row>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>

            </Row>
        </div>
}

export default AdminOrderDetails
