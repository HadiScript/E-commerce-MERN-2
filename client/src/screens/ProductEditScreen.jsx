import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { productListDetail, updateProduct } from '../actions/productAction';
import FileUpload from '../components/FileUpload';





const ProductEditScreen = ({ match, history }) => {

    const dispatch = useDispatch();
    const productId = match.params.id

    const [name, setname] = useState('');
    const [price, setprice] = useState(0);
    const [image, setimage] = useState('');
    const [brand, setbrand] = useState('');
    const [category, setcategory] = useState('');
    const [countInStock, setcountInStock] = useState(0);
    const [description, setdescriptions] = useState('');
    const [keyMarket, setkeyMarket] = useState('');

    const [uploading, setuploading] = useState(false);

    const productDetail = useSelector(state => state.productDetail);
    const { loading, error, product } = productDetail

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate



    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: 'product_update_reset' })
        } else {

            if (!product.name || product._id !== productId) {
                dispatch(productListDetail(productId))
            } else {
                setname(product.name);
                setprice(product.price);
                setimage(product.image);
                setdescriptions(product.description);
                setbrand(product.brand);
                setcategory(product.category);
                setcountInStock(product.countInStock);
                setkeyMarket(product.keyMarket)
            }

        }

    }, [dispatch, productId, history, product, successUpdate])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            description,
            category,
            countInStock,
            brand,
            keyMarket
        }))
        toast.success('Updated')
    }

    return (
        <>
            <div className="container">
                <h1> Edit Product </h1>
                {loadingUpdate && <p> Loading... </p>}
                {errorUpdate && toast.error(`${error}`)}
                {loading ? <p>loading...</p> : error ? toast.error(`${error}`) : (

                    <div className="col-md-10">


                        <form onSubmit={submitHandler}>
                            <div className="form-group">
                                <label>*Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={name}
                                    onChange={e => setname(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    className="form-control"
                                    value={description}
                                    onChange={e => setdescriptions(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>*category</label>
                                <input
                                    disabled
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    value={category}
                                    onChange={e => setcategory(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={price}
                                    onChange={e => setprice(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>count In Stock</label>
                                <input
                                    type="number"
                                    name="countInStock"
                                    className="form-control"
                                    value={countInStock}
                                    onChange={e => setcountInStock(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>kEY</label>
                                <select
                                    name="keyMarket"
                                    className="form-control"
                                    onChange={(e) => setkeyMarket(e.target.value)}
                                >
                                    <option>Please select</option>
                                    <option value="New">New</option>
                                    <option value="Latest">Latest</option>
                                    <option value="Trend">Trend</option>
                                </select>
                            </div>
                            <button className="btn btn-outline-info">Update</button>
                        </form>
                    </div>


                )}

            </div>

        </>
    )
}

export default ProductEditScreen
