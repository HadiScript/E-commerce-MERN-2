import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alert } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import { toast } from 'react-toastify';


function Trend() {

    const { products, loading, error, page, pages } = useSelector(state => state.listProducts);
    const trendProducts = products.filter(x => x.keyMarket === 'Trend')


    if (error) {
        toast.error(error)
    }

    return loading ? <Loader /> : trendProducts.length > 0 && (
        <HeaderContainer >
            <div className="body my-5 mx-1">
                <hr />
                <Alert variant="dark text-center">
                    <Alert.Heading><h2 className='font-weight-bold'>Top Trend</h2></Alert.Heading>
                </Alert>

                <section className="row_posters">
                    {
                        trendProducts.map(item => (

                            <Link to={`/product/${item._id}`} key={item._id}>
                                <img className="row_poster" src={item.images.length > 0 && item.images[0].url} alt="ph" onClick={() => console.log("hi")} />
                            </Link>
                        ))
                    }

                </section>
            </div>
        </HeaderContainer >
    )
}

export default Trend

const HeaderContainer = styled.main`
.body{
    background-color:  rgba(240, 248, 255, 0.671);  
}

.row_posters{
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px;
  }
  .row_posters::-webkit-scrollbar{
    display: none;
  }
  
  .row_poster{
    width: 100%;
    border : 1px solid white;
    object-fit: contain;
    margin-right: 7px;
    height: 200px;
    max-height: 200px;
    transition: transform 450ms;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  
  .row_poster:hover{
    transform: scale(1.08);
    
  }

`