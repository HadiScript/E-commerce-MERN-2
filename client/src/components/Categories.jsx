import React from "react";
import { Alert, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './css/button.css'

const Categories = () => {



    return (
        <Container>
            <Row>
                <Col md={12} >

                    <Alert variant="dark text-center">
                        <Alert.Heading><h2 className='font-weight-bold'>Categories</h2></Alert.Heading>
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Link to={`/category/mobile`} >
                        <Button variant="outline-dark" >
                            Mobiles
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/cameras`}>
                        <Button variant="outline-dark" >
                            Cameras
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/watch`}>
                        <Button variant="outline-dark" >
                            Watches
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/smarttv`}>
                        <Button variant="outline-dark" className="mx-3">
                            Smart Tv
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/laptops`} >
                        <Button variant="outline-dark">
                            Laptops
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/accessories`}  >
                        <Button variant="outline-dark" >
                            Accessories
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/tripods`}>
                        <Button variant="outline-dark" >
                            Tripods
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/headphones`}>
                        <Button variant="outline-dark" >
                            Headphones
                        </Button>
                    </Link>
                </Col>
                <Col>
                    <Link to={`/category/other`}>
                        <Button variant="outline-dark" >
                            Other
                        </Button>
                    </Link>
                </Col>
            </Row>


        </Container >
    );
};

export default Categories;
