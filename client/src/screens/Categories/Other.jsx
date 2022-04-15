import React, { useEffect } from 'react'
import '../style/home.css'

import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../../components/Categories";
import CardProduct from "../../design/CardProduct";
import { listProducts } from "../../actions/productAction";
import Loader from "../../components/Loader";
import Footer from "../../components/Footer";

const Other = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { products, loading, error, page, pages } = useSelector(state => state.listProducts);
    let removeSameCategoryName;
    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch, removeSameCategoryName])
    const others = products.filter(x => x.category === 'other');
    removeSameCategoryName = others.filter((ele, ind) => ind === others.findIndex(elem => elem.categoryName === ele.categoryName))
    console.log(removeSameCategoryName)

    return (
        <>
            {
                removeSameCategoryName && removeSameCategoryName.map(x => (
                    <div className="badge"> {x.categoryName}hi </div>
                ))
            }
            <div className='home' style={{ padding: '10px', margin: '10px' }} >
                <h4 className="text-center p-3 mt-5 mb-5 display-4 font-weight-bold head">
                    Others
                </h4>
                {loading ? <Loader /> : error ? <h3> {toast.error(error)} </h3>
                    :
                    <div className="row ">
                        {others.length === 0 ? <p className='text-center p-3 mt-5 mb-5 display-4 font-weight-bold'> mobiles are not avalible :(</p> : others.map((product) => (
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

export default Other
