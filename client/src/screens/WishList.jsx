import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import { Card, Button } from 'react-bootstrap'
import { GetWishlist, removeWishlist } from "../actions/wishlistAction";
import { Alert } from 'react-bootstrap'
import axios from "axios";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));


    useEffect(() => {
        loadWishlist()
    }, []);

    const loadWishlist = async () => {
        await axios.get(`${process.env.REACT_APP_API}/wishlist`, {
            headers: {
                authtoken: user.token
            }
        }).then(res => {
            setWishlist(res.data.wishlist)
        })
    }

    const handleRemove = (productId) => {
        removeWishlist(productId, user.token).then((res) => {
            loadWishlist();
        });
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <Alert variant='dark' className='text-center my-3' >
                        <h2>    Wishlist
                            <HeartOutlined color="red" />
                        </h2>
                    </Alert>

                    <Card>
                        {wishlist.length === 0 ? <p className='text-center' > Your Wishlist is Empty now </p> : wishlist.map((p) => (
                            <>
                                <Card.Body >
                                    <Card.Title>
                                        <strong> <Link to={`/product/${p._id}`}>{p.name}</Link></strong>
                                        <br />
                                        <div className="my-4">
                                            {p.description}
                                        </div>
                                    </Card.Title>

                                    <Button
                                        variant="danger"
                                        onClick={() => handleRemove(p._id)}
                                        className="float-right"
                                    >
                                        Remove From Wishlist {" "}<DeleteOutlined className="text-danger" />
                                    </Button>
                                </Card.Body>
                                <hr />
                            </>
                        ))}
                    </Card>
                </div>
            </div>
        </div >
    );
};

export default Wishlist;


