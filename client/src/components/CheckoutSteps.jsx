import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4" >
            <Nav.Item >
                {step1 ? (
                    <Link to="/login">
                        <Nav.Link> signIn </Nav.Link>
                    </Link>
                ) : <Nav.Link disabled > signIn </Nav.Link>
                }
            </Nav.Item>
            <Nav.Item >
                {step2 ? (
                    <Link to="/shipping">
                        <Nav.Link to="/shipping"> Address </Nav.Link>
                    </Link>
                ) : <Nav.Link disabled > Address </Nav.Link>
                }
            </Nav.Item>
            <Nav.Item >
                {step3 ? (
                    <Link to="/payment">
                        <Nav.Link> payment </Nav.Link>
                    </Link>
                ) : <Nav.Link disabled > payment </Nav.Link>
                }
            </Nav.Item>
            <Nav.Item >
                {step4 ? (
                    <Link to="/placeOrder">
                        <Nav.Link> placeOrder </Nav.Link>
                    </Link>
                ) : <Nav.Link disabled > placeOrder </Nav.Link>
                }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
