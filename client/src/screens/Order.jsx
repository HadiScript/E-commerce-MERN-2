import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Row, Col, Card, Image, Alert } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { confirmOrder, getOrderDetails, OrderDelivered, } from '../actions/orderAction'
import axios from 'axios'
import { removeCart } from '../actions/cartAction'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const Order = ({ match, history }) => {

    const orderId = match.params.id;
    const dispatch = useDispatch()
    const [confirm, setConfirm] = useState(false);


    const orderDetails = useSelector(state => state.orderDetails);
    console.log(orderDetails, "from orders")
    const user = useSelector(state => state.user);
    const { order, loading, error, success } = orderDetails;


    if (!loading && success) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    }


    useEffect(() => {
        if (!order) {
            dispatch(getOrderDetails(orderId))
            dispatch({ type: 'order_pay_reset' });
        }
    }, [dispatch, orderId,])

    const ConfirmHandler = () => {
        setConfirm(true);
        axios.post(`${process.env.REACT_APP_API}/orders/send`, {}, {
            headers: {
                "Content-Type": "application/json",
                authToken: `${user.token}`
            }
        })
            .then(res => {
                console.log(res);
                dispatch(confirmOrder(orderId))
                dispatch({ type: 'order_pay_reset' });
                history.push('/myorders')
                setConfirm(false);
                dispatch({ type: 'cart_reset_item' });
            })
            .catch(err => {
                setConfirm(false);
                console.log(err);
            })


    }

    console.log(order, "from order details");

    return loading ? <p><Loader /></p> : error ? toast.error(error) :
        <div className='mx-5 mt-3'>
            <Alert variant="info" >  <h1>Order </h1> {order._id}  </Alert>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping Info</h2>
                            <p>   <strong> Name : {order.user.name} </strong></p>
                            <p> <strong>Email :</strong> <a href={`mailto:${order.user.email}`} >  {order.user.email} </a></p>
                            <p>
                                <strong> Address  :</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {" "}
                                {order.shippingAddress.postalCode},{"  "}{order.shippingAddress.country}
                            </p>
                            <p>
                                <strong> Phone Number  :</strong>
                                {order.shippingAddress.phoneNumber}
                            </p>
                            {
                                order.isDeliver ? <Alert variant='success' > {order.deliverAt} </Alert> :
                                    <Alert variant='danger'>Not deliver yet </Alert>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>payment method</h2>
                            <p>
                                <strong> method : </strong>
                                {order.paymentMethod}
                            </p>
                            {
                                order.isPaid ? <Alert variant='success' >  {order.paidAt} </Alert> :
                                    <Alert variant='danger' > Not paid yet </Alert>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <p>Cart is empty</p> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key="index">
                                            <Row>
                                                {/* <Col md={1}>
                                                    {item.images.length > 0 && <Image src={item.images[0].url} alt={item.name} fluid rounded />}
                                                </Col> */}
                                                <Col>
                                                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                                                </Col>
                                                <Col md={4} >
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
                                    <Col> Price </Col>
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
                                        user && !user.isAdmin && <button className="btn btn-primary" onClick={ConfirmHandler} >
                                            {confirm ? "loading..." : "Confrim Order"}
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

export default Order
