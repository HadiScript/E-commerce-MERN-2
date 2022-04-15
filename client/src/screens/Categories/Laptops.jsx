import React, { useEffect } from "react";
import '../style/home.css'

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../../components/Categories";
import CardProduct from "../../design/CardProduct";
import { listProducts } from "../../actions/productAction";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";


const Laptops = ({ match }) => {

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;


    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { products, loading, error, page, pages } = useSelector(state => state.listProducts);
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber,])

    const laptops = products.filter(x => x.category === 'laptop')

    if (error) {
        toast.error(error)
    }

    return (
        <>


            <div className='home' style={{ padding: '10px', margin: '10px' }} >
                <h4 className="text-center p-3 mt-5 mb-5 display-4 font-weight-bold head">
                    Laptops

                </h4>
                {loading ? <Loader /> : error ? <h3> {toast.error(error)} </h3>
                    :
                    <div className="row ">
                        {laptops.length === 0 ? <p className='text-center p-3 mt-5 mb-5 display-4 font-weight-bold'> Laptops are not avalible :(</p> : laptops.map((product) => (
                            <div key={product._id} className="col-md-4">

                                <CardProduct product={product} />
                            </div>
                        ))}
                    </div>
                }
                <Categories />
            </div>
            <Footer />
        </>
    )
}



export default Laptops;
