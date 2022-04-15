import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'




const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded' style={{ width: '200px' }} >
            <Link to={`/product/${product._id}`} >
                {
                    product.images.length > 0 &&
                    <Card.Img src={product.images[0].url}
                        variant='top'
                        style={{ height: "150px", objectFit: "cover" }}
                        className="p-1"
                    />
                }
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`} >
                    <Card.Title as='div'> <strong>{product.name}</strong> </Card.Title>
                </Link>
                <hr />
                <Card.Text as='div'>
                    <Rating rating={product.rating} reviews={product.numReviews} />
                </Card.Text>


                <Card.Text as="h3" style={{ padding: '1rem' }}>
                    PKR{product.price}
                </Card.Text>
            </Card.Body>
        </Card>

    )
}

export default Product
