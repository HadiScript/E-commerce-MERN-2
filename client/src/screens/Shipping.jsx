import React from 'react'
import { useState } from 'react'
import { Alert, Button, Card, Form, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'


const ShippingScreen = ({ history }) => {


    const dispatch = useDispatch();
    const { shippingAddress } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState("Pakistan");
    const [phoneNumber, setphoneNumber] = useState(shippingAddress.phoneNumber);


    const submitHandler = e => {
        e.preventDefault();
        if (postalCode.length > 5 || postalCode.length < 5) {
            toast.error(`Please enter the correct postal code `)
        }
        else {
            dispatch(saveShippingAddress({ address, city, postalCode, country, phoneNumber }));
            history.push('/payment')
        }
    }

    return (
        <div className="mx-5 mt-2">
            <Alert variant='dark' className='text-center' >
                <h2>  Information </h2>
            </Alert>
            <CheckoutSteps step1 step2 />
            <Card>
                <Card.Body>
                    <Form onSubmit={submitHandler}>

                        <Form.Group>
                            <Form.Label> Enter Address </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter address"
                                required
                                value={address}
                                onChange={e => setAddress(e.target.value)} />

                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Enter City </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter City"
                                required
                                value={city}
                                onChange={e => setCity(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Enter Postal code </Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="22010"
                                required
                                value={postalCode}
                                onChange={e => setPostalCode(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Enter Your Phone Number </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="03XX-XXXXXXX"
                                pattern="03[0-9]{2}-(?!1234567)(?!1111111)(?!7654321)[0-9]{7}"
                                required
                                value={phoneNumber}
                                onChange={e => setphoneNumber(e.target.value)} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Enter Country </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Country"
                                required
                                disabled
                                value={country}
                                onChange={e => setCountry(e.target.value)} />
                        </Form.Group>

                        <Button type='submit' className="my-3" variant="primary">Continue</Button>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ShippingScreen
