import React, { useEffect } from "react";
import '../../screens/style/home.css'

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CardProduct from "../../design/CardProduct";

import Categories from "../../components/Categories";
import { Alert } from "react-bootstrap";
import { listProducts } from "../../actions/productAction";
import Footer from "../Footer";
import Loader from "../Loader";
import Trend from "./Trend";
import Mobiles from "../../screens/Categories/Mobiles";

const DetailHomes = () => {


    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { products, loading, error, page, pages } = useSelector(state => state.listProducts);
    console.log(products, "here is products")
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch,])




    return (
        <>
            <div className='home' style={{ padding: '10px', margin: '10px' }} >
                <Alert variant="dark text-center">
                    <Alert.Heading><h2 className='font-weight-bold'>Latest Products</h2></Alert.Heading>
                </Alert>

                {loading ? <Loader /> : error ? <h3> {toast.error(error)} </h3>
                    :
                    <div className="row ">
                        {products.map((product) => (
                            <div key={product._id} className="col-md-2 " >
                                <CardProduct product={product} />
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className="p-3">
                <Trend products={products} />
            </div>
            <div className="p-5" >
                <Categories />
            </div>
        </>
    )
}



export default DetailHomes;
