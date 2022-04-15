import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { OrderDeliveredDelete, OrdersList } from '../actions/orderAction'
import AdminNav from '../components/AdminNav';
import { Alert, Table } from 'react-bootstrap'
import Loader from '../components/Loader';


const AdminOrderList = ({ history }) => {

    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.orderList);
    const { success, loading: DeleteLoading } = useSelector(state => state.orderDelete);
    const user = useSelector(state => state.user);

    const deleteHandler = (id) => {
        if (window.confirm("This may help you in future")) {
            dispatch(OrderDeliveredDelete(id))
        }
    }

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(OrdersList());
        } else {
            history.push('/login')
        }
    }, [dispatch, history, user, success])



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
                <div className="row">
                    <Alert variant="dark"> <h4>Orders</h4> </Alert>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="container">
                        {
                            loading ? <Loader /> : error ? toast.error(`${error}`) : (
                                <Table striped bordered hover responsive className="table-sm" >
                                    <thead>
                                        <tr>
                                            <th> ID </th>
                                            <th> USER </th>
                                            <th> DATE </th>
                                            <th> Total </th>
                                            <th> PAID </th>
                                            <th> DELIVERED </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(x => (
                                                <tr key={x._id} >
                                                    {x.reported ?
                                                        <td className="text-danger" >{x._id} {" "} Reported</td>
                                                        : <td  >{x._id}</td>
                                                    }
                                                    <td>{x.user && x.user.name}</td>
                                                    <td>{x.createdAt.substring(0, 10)}</td>
                                                    <td>PKR{x.totalPrice}</td>
                                                    <td>{
                                                        x.isPaid ? (
                                                            x.PaidAt
                                                        ) : <p> X</p>
                                                    }
                                                    </td>
                                                    <td>{
                                                        x.isDelivered ? (
                                                            x.deliveredAt.substring(0, 10)
                                                        ) : <p> X</p>
                                                    }
                                                    </td>
                                                    <td>
                                                        <Link to={`/admin/order/${x._id}`} >
                                                            <button className="btn btn-primary" > Details </button>
                                                        </Link>
                                                    </td>
                                                    {
                                                        x.isDelivered && <>
                                                            <td>
                                                                <button className="btn btn-primary" onClick={() => deleteHandler(x._id)} >Delete{" "} </button>
                                                            </td>
                                                        </>
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>


                                </Table>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminOrderList
