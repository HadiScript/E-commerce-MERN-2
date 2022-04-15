import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import styled from 'styled-components'


const { Meta } = Card;

const ProductCard = ({ product }) => {
    const { images, name, description, price, numReviews, rating } = product;
    return (
        <Link to={`/product/${product._id}`} >
            <ProContainer>
                <div className="container">
                    <div className="container">
                        <Card
                            className='my-4 box '
                            hoverable
                            cover={
                                <img
                                    src={images && images.length && images[0].url}
                                    style={{ height: "200px", objectFit: "cover", }}
                                    className=""

                                />
                            }
                        >
                            <Meta
                                title={name}
                                description={`${description && description.substring(0, 40)}...`}
                            />
                            <div className="additional pt-3">
                                <p className="price" style={{ fontWeight: 'bold', color: 'blue' }}>{price}PKR</p>
                            </div>

                            <Meta
                                title="Reviews"
                                description={[
                                    <Rating rating={rating} reviews={numReviews} />
                                ]}
                            />
                        </Card>
                    </div>
                </div>
            </ProContainer>
        </Link>
    );
};



const ProContainer = styled.div`
.box{
    
    transition: transform 450ms;
  
  }

  .box:hover{
    transform: scale(1.08);
    
  }
 
  
`

export default ProductCard;
