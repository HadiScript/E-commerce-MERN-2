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


const SmartTv = ({ match }) => {

    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;


    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { products, loading, error, page, pages } = useSelector(state => state.listProducts);
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber,])

    const smarttv = products.filter(x => x.category === 'smarttv')

    return (
        <>


            <div className='home' style={{ padding: '10px', margin: '10px' }} >
                <h4 className="text-center p-3 mt-5 mb-5 display-4 font-weight-bold head">
                    Smart Tvs
                </h4>
                {loading ? <Loader /> : error ? <h3> {toast.error(error)} </h3>
                    :
                    <div className="row ">
                        {smarttv.length === 0 ? <p className='text-center p-3 mt-5 mb-5 display-4 font-weight-bold'> smarttv are not avalible :(</p> : smarttv.map((product) => (
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



export default SmartTv;
