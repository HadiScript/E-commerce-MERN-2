import React, { useState, useEffect } from "react";
import AdminNav from "../components/AdminNav";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productAction";
import FileUpload from "../components/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import { Alert, Card } from 'react-bootstrap'


const initialState = {
    name: "",
    descriptioin: "",
    price: 0,
    shipping: "",
    countInStock: '',
    category: "",
    images: [],
    keyMarket: "",
    brands: "",
    color: "",
    givePay: "",
    totalPay: "",
    supplier: "",
    modelVersion: "",
};

const CreateProduct = ({ history }) => {
    const [values, setValues] = useState(initialState);
    const [isShow, setisShow] = useState(false);
    const [categoryName, setcategoryName] = useState("");
    const [supplierName, setsupplierName] = useState("");
    const [brandName, setbrandName] = useState('')
    const user = useSelector(state => state.user);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();
    const { success, error } = useSelector(state => state.createProduct)
    const {
        name,
        description,
        price,
        category,
        shipping,
        countInStock,
        images,
        keyMarket,
        brands,
        color,
        givePay,
        totalPay,
        supplier,
        modelVersion,
    } = values;
    if (category === "other") {
        values.categoryName = categoryName;
    }
    if (supplier === 'other') {
        values.supplierName = supplierName;
    }
    if (brands === 'other') {
        values.brandName = brandName;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' && countInStock === 0 && category === '', keyMarket === '') {
            toast.error("Please all of the requirements")
        }
        else if (price.length <= 0) {
            toast.error("Price must be greater then Zero")
        }
        // else if (totalPay > givePay || totalPay === givePay) {
        //     toast.error("Total Pay must be equal or less then GivenPay")
        // } else {
        {
            dispatch(createProduct(values))
            if (success) {
                toast.success('product created')
                setValues(initialState)
                history.push("/admin/products")
                console.log("show message");
            }
            console.log("after creating")
        }
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // if (error) {
    //     toast.error(error)
    // }

    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col">
                    <div className="float-right">
                        <AdminNav />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row ">
                    <Alert variant="dark" > <h4 className="float-left dark" >Create Products</h4> </Alert>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="container px-5">

                        <form onSubmit={handleSubmit}>
                            {error && <Alert className="my-3" variant="danger" onClose={() => setisShow(false)} dismissible> {error} </Alert>}
                            {
                                uploading && <LoadingOutlined />
                            }

                            <div className="px-3">
                                <FileUpload values={values} setValues={setValues} setUploading={setUploading} />
                            </div>

                            <div className="form-group">
                                <label>*Name</label>
                                <input
                                    type="text"
                                    required
                                    name="name"
                                    className="form-control"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <input
                                            required
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            value={description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>*category</label>
                                        <select
                                            name="category"
                                            className="form-control"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option>Please select</option>
                                            <option value="laptops">Laptops</option>
                                            <option value="headphones">Headphones</option>
                                            <option value="smarttv">Smart TV</option>
                                            <option value="mobiles">Mobiles</option>
                                            <option value="accessories">Accessories</option>
                                            <option value="tripods">Tripods</option>
                                            <option value="other">other</option>
                                        </select>
                                    </div>
                                </div>

                                {
                                    category === "other" && <div className="col">
                                        <div className="form-group">
                                            <label>Category Name</label>
                                            <input
                                                type="text"
                                                name="categoryName"
                                                className="form-control"
                                                value={categoryName}
                                                onChange={(e) => setcategoryName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                }

                            </div>


                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="form-control"
                                            required
                                            value={price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col">

                                    <div className="form-group">
                                        <label>Shipping</label>
                                        <select
                                            name="shipping"
                                            className="form-control"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option>Please select</option>
                                            <option value="No">No</option>
                                            <option value="Yes">Yes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">

                                    <div className="form-group">
                                        <label>count In Stock</label>
                                        <input
                                            type="number"
                                            name="countInStock"
                                            className="form-control"
                                            value={countInStock}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Key</label>
                                        <select
                                            name="keyMarket"
                                            className="form-control"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option>Please select</option>
                                            <option value="New">New</option>
                                            <option value="Latest">Latest</option>
                                            <option value="Trend">Trend</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">

                                    <div className="form-group">
                                        <label>Brand</label>
                                        <select
                                            name="brands"
                                            className="form-control"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option>Please select</option>
                                            <option value="New">Apple</option>
                                            <option value="samsung">Samsung</option>
                                            <option value="tripod">Tripod</option>
                                            <option value="dell">Dell</option>
                                            <option value="hp">HP</option>
                                            <option value="orient">Orient</option>
                                            <option value="dawnlance">Dawnlance</option>
                                            <option value="radoWatch">Rado Watch</option>
                                            <option value="canon">Canon</option>
                                            <option value="revs">Revs</option>
                                            <option value="other">others</option>
                                        </select>
                                    </div>
                                </div>

                                {
                                    brands === "other" && <div className="col">
                                        <div className="form-group">
                                            <label>Brand Name</label>
                                            <input
                                                type="text"
                                                name="supplierName"
                                                className="form-control"
                                                value={brandName}
                                                onChange={(e) => setbrandName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                }

                                <div className="col">
                                    <div className="form-group">
                                        <label>Model Version </label>
                                        <input
                                            type="text"
                                            required
                                            name="modelVersion"
                                            placeholder="Model Version"
                                            className="form-control"
                                            value={modelVersion}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Your Suppliers</label>
                                        <select
                                            name="supplier"
                                            className="form-control"
                                            onChange={handleChange}
                                            required
                                        >
                                            <option>Supplier</option>
                                            <option value="laptopsAgent">Laptop Suppliers</option>
                                            <option value="mobilesAgent">Mobile Suppliers</option>
                                            <option value="accessoriesAgent">Accessories Suppliers</option>
                                            <option value="camerasAgent">Cameras Suppliers</option>
                                            <option value="watchesAgent">Watch Suppliers</option>
                                            <option value="tvAgent">televission Suppliers</option>
                                            <option value="headphonesAgent">Headphones Suppliers</option>
                                            <option value="other">other</option>
                                        </select>
                                    </div>
                                </div>
                                {
                                    supplier === "other" && <div className="col">
                                        <div className="form-group">
                                            <label>Supplier Name</label>
                                            <input
                                                type="text"
                                                name="supplierName"
                                                className="form-control"
                                                value={supplierName}
                                                onChange={(e) => setsupplierName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                }


                                <div className="col">
                                    <div className="form-group">
                                        <label>Total Payment</label>
                                        <input
                                            required
                                            type="number"
                                            placeholder="total Payment"
                                            name="totalPay"
                                            className="form-control"
                                            value={totalPay}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Given Payment</label>
                                <input
                                    type="number"
                                    name="givePay"
                                    placeholder="Given Payment"
                                    className="form-control"
                                    required
                                    value={givePay}
                                    onChange={handleChange}
                                />
                            </div>


                            <button className="btn btn-outline-primary ">Save</button>
                            <br />



                        </form>

                    </div>
                </div>
            </div >
        </div >
    );
};

export default CreateProduct;
