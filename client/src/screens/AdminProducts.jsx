import { EditOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Button, Table, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createProduct, deleteProduct, listProducts } from '../actions/productAction'
import AdminNav from '../components/AdminNav'
import Paginate from '../components/Paginate'
import { SearchOutlined } from "@ant-design/icons";
import styled from 'styled-components'


const AdminProduct = ({ history, match }) => {

    const [keyword, setKeyword] = useState('');
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch();
    const { error, loading, products, pages, page } = useSelector(state => state.listProducts);
    const { error: errorDelete, loading: loadingdelete, success } = useSelector(state => state.productDelete);
    const userLogin = useSelector(state => state.user);

    useEffect(() => {
        dispatch({ type: 'product_create_reset' })
        dispatch(listProducts(keyword))

    }, [dispatch, history, pageNumber, keyword]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/admin/product/${keyword}`)
        } else {
            history.push('/admin/products')
        }
    };

    const products2 = products.filter(x => x.user === userLogin._id)

    return (
        <HeaderContainer>
            <div className="body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="float-right">
                                <AdminNav />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <Alert variant="dark"> <h4>Products</h4> </Alert>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-md-4 ml-auto ' >
                            <form className="form-inline " onSubmit={handleSubmit}>
                                <input
                                    onChange={e => setKeyword(e.target.value)}
                                    type="search"
                                    name="q"
                                    className="form-control mr-sm-2"
                                    placeholder="Search Products"
                                />
                                <SearchOutlined onClick={handleSubmit} style={{ cursor: "hand" }} />
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center">
                            <div className="container">
                                {loadingdelete && <p>loading....</p>}
                                {errorDelete && <p>{errorDelete}</p>}
                                {loading ? <p>loading...</p> : error ? <p>{error}</p> :
                                    (<>
                                        <Table striped bordered hover responsive className="table-sm">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>NAME</th>
                                                    <th>PRICE</th>
                                                    <th>CATEGORY</th>
                                                    <th>BRAND</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products2.length === 0 ? <p>No products</p>
                                                        : products2.map(x => (
                                                            <tr key={x.id}>
                                                                <td>{x._id}</td>
                                                                <td>{x.name}</td>
                                                                <td>  PKR{" "}{x.price} </td>
                                                                <td>
                                                                    {x.category}
                                                                </td>
                                                                <td>{x.brandName ? x.brandName : x.brand}</td>
                                                                <td>
                                                                    <Link to={`/admin/product/${x._id}/edit`} >
                                                                        <Button variant="primary" className="btn-sm"
                                                                        // onClick={producct}
                                                                        >
                                                                            <EditOutlined />
                                                                        </Button>
                                                                    </Link>

                                                                    <Button variant="danger" className="btn-sm"
                                                                        onClick={() => {
                                                                            deleteHandler(x._id)
                                                                            window.location.reload()
                                                                        }}

                                                                    >
                                                                        <i className="fas fa-trash" style={{ color: 'red' }}></i>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                }
                                            </tbody>
                                        </Table>
                                        <Paginate pages={pages} page={page} isAdmin={true} />
                                    </>
                                    )

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.main`
.body{
    overflow: -moz-scrollbars-vertical;
    overflow-y: auto;
}

`

export default AdminProduct
