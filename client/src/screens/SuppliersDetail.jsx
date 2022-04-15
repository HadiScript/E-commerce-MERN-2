import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from "../actions/productAction";
import { toast } from "react-toastify";
import Loader from '../components/Loader';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import axios from 'axios';

const SuppliersDetail = ({ match }) => {

    const agent = match.params.name;
    const [givePay, setgivePay] = useState(0)
    const [isLoad, setisload] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const { products, loading, error, } = useSelector(state => state.listProducts);

    const suppliers = !loading && products.filter(p => p.supplier === agent);
    const sumTotalPay = suppliers && suppliers.map(x => x.totalPay).reduce((prev, curr) => prev + curr, 0);
    const sumGivePay = suppliers && suppliers.map(x => x.givePay).reduce((prev, curr) => prev + curr, 0);
    const remaining = sumTotalPay - sumGivePay;

    let responce

    const submitPay = async (e) => {
        e.preventDefault()

        if (givePay > remaining) {
            toast.error("Your amount isLoad greater then remaining")
        } else {
            try {
                responce = "request"
                await suppliers.map(x => {

                    axios.put(`http://localhost:8000/api/products/update/supplier/${x._id}`,
                        { givePay },
                        {
                            headers: {
                                "Content-Type": "Application/json",
                                authToken: `${user.token}`
                            }
                        }
                    )
                    responce = "success"
                    setisload(true)
                })
                setgivePay(0)

            } catch (error) {
                toast.error(error)
            }

        }
        console.log(responce, "here")
    }

    useEffect(() => {
        dispatch(listProducts())
        setisload(false)
    }, [dispatch, isLoad])


    return isLoad ? <Loader /> : suppliers.length === 0 ? <div className="container">
        <Alert variant="primary" className="my-5"> We didnt take any product of this supplier </Alert>
    </div> : (
        <div className="container-fluid">

            <div className="row">
                <div className="col">
                    <div className="float-right">
                        <AdminNav />
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="container">
                    <div className="row">
                        <div className="list-group">
                            <div className="list-group-item">
                                <Alert variant="info" > <strong> total Product : {suppliers && suppliers.length} </strong> </Alert>
                            </div>

                            <div className="list-group-item">
                                <Alert>
                                    <h3> <strong> total Price:  {sumTotalPay} PKR </strong></h3>
                                </Alert>
                            </div>

                            <div className="list-group-item">
                                <Alert variant="ligth" >
                                    <h3> <strong> Given Amount :  {sumGivePay} PKR </strong></h3>
                                </Alert>
                            </div>

                            <div className="list-group-item">
                                <Alert variant="ligth" >
                                    <h3><strong> remaining : {remaining}  PKR </strong></h3>
                                </Alert>
                            </div>
                            <div className="list-group-item">
                                <div className="form" >
                                    <div className="form-group">
                                        <label className="text-primary">Pay Remaining</label>
                                        <input
                                            type="number"
                                            name="givePay"
                                            className="form-control"
                                            value={givePay}
                                            onChange={e => setgivePay(e.target.value)}
                                        />
                                    </div>
                                    <button onClick={submitPay} className="btn btn-primary" type="submit"> Pay </button>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <h4> Products </h4>
                                    {
                                        suppliers && suppliers.map(x => (<>
                                            <div className="list-group-item" key={x._id} >
                                                <strong> <Link to={`/product/${x._id}`} > {x.name} </Link></strong>
                                            </div>
                                        </>))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SuppliersDetail
