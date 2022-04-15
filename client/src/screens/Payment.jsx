import React from 'react'

import { useState } from 'react'
import { Button, Form, Col, Card, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const Payment = ({ history }) => {


    const dispatch = useDispatch();
    const { shippingAddress } = useSelector(state => state.cart)

    if (!shippingAddress) {
        history.pust('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');



    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placingOrder')
    }

    return (
        <div className="mx-5 mt-2">
            <Alert variant='dark' className='text-center' >
                <h2>  Payment </h2>
            </Alert>
            <CheckoutSteps step1 step2 step3 />
            <div className="m-4 p-4">
                <Card>
                    <Form
                        onSubmit={submitHandler}
                        style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}
                    >
                        <Card.Body>

                            <Form.Group>
                                <Form.Label as="legend"> Select Method </Form.Label>


                                <Col>
                                    <Form.Check
                                        type="radio"
                                        checked
                                        label="Cash On Delivery"
                                        id="paypal"
                                        value='paypal'
                                        name="cashOnDelivery"
                                        onChange={e => setPaymentMethod(e.target.value)}

                                    />


                                </Col>
                            </Form.Group>
                            <Button type='submit' className="my-3 float-right" variant="primary">Continue</Button>
                        </Card.Body>

                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default Payment
