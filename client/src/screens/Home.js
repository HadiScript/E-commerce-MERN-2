import React, { useEffect } from "react";
import './style/home.css'
import styled from 'styled-components'


import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Jumbotron from '../design/Jumbotron'
import CardProduct from "../design/CardProduct";
import { listProducts } from "../actions/productAction";
import Mobiles from "./Categories/Mobiles";
import Categories from "../components/Categories";
import { Alert, Container } from "react-bootstrap";
import Trend from '../components/Homes/Trend'
import New from "../components/Homes/New";
import Latest from "../components/Homes/Latest";
import SearchBox from "../components/SearchBox";

const Home = ({ match }) => {

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;


  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { products, loading, error, page, pages } = useSelector(state => state.listProducts);
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber,])


  return (
    <UI>
      <div className='bgColor'>
        <div className="jumbotron text-light h1 font-weight-bold text-center ">
          <Jumbotron text={["Smart Tv", "Cameras", "Mobiles", "Laptops", "Acccessories", "Tripods", "Headphones", "Watches"]} />

        </div>


        <Categories />




        <div className='home'  >
          <div className="my-3" >
            <Alert variant="dark text-center">
              <Alert.Heading><h2 className='font-weight-bold'>All Products</h2></Alert.Heading>
              <br />
              <div className="d-flex justify-content-center" >
                <SearchBox />
              </div>
            </Alert>
          </div>

          {loading ? <Loader /> : error ? <h3> {toast.error(error)} </h3>
            :
            <div className="row bg-light ">
              {products.map((product) => (
                <div key={product._id} className="col-md-3 " >
                  <CardProduct product={product} />
                </div>
              ))}
            </div>
          }
        </div>
        <div className="p-3">
          <Trend products={products} />
        </div>

        <div className="p-3">
          <New products={products} />
        </div>
        <div className="p-3">
          <Latest products={products} />
        </div>

        <Footer />
      </div>
    </UI >
  )
}


const UI = styled.div`
.bgColor{
  background-color: rgb(255, 255, 255);
  color: #001529;
  width : 100%
}
`


export default Home;
