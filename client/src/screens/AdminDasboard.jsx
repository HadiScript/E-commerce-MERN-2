import React, { useEffect } from 'react'
import AdminNav from '../components/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersList } from '../actions/orderAction';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components'


import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    CartesianGrid,
} from 'recharts';
import Loader from '../components/Loader';
import { ReportsList } from '../actions/ReportAction';

const AdminDashboard = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.orderList);
    const { reports, loading: reportLoading, error: reportError } = useSelector(state => state.reportList)

    const user = useSelector(state => state.user)

    const pending = !loading && !error && orders && orders.filter(x => x.isDelivered === false);
    const delivered = !loading && !error && orders && orders.filter(x => x.isDelivered === true);
    const reportsTotal = !reportLoading && !reportError && reports && reports.length
    const totalSell = !loading && !error && orders && delivered && delivered.map(x => x.totalPrice).reduce((prev, curr) => prev + curr, 0);


    if (error) {
        toast.error(`${error}`)
    }
    if (reportError) {
        toast.error(`${reportError}`)
    }

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(OrdersList());
            dispatch(ReportsList())
        } else {
            history.push('/login')
        }
    }, [dispatch, user,])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="float-right"><AdminNav /></div>
                </div>
            </div>
            <HeaderContainer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 ">
                            <div className="card primaryCard">
                                <div className="card-body ">
                                    <i class="fas fa-check-double"></i> {" "}
                                    Delivered Orders : {" "} {delivered.length}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5 ">
                            <div className="card secondaryCard">
                                <div className="card-body mt-2 ">
                                    <i class="fas fa-check"></i> {" "}
                                    pending Orders : {" "} {pending.length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-5 ">
                            <div className="card totalCard">
                                <div className="card-body ">
                                    Total Sell : {" "}  Rs {totalSell}/-
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5 ">
                            <div className="card reportCard">
                                <div className="card-body mt-2 ">
                                    <i class="fas fa-exclamation"></i> {" "}
                                    Report Orders : {" "} {reportsTotal}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </HeaderContainer>

            <div className="row mt-3">
                <div className="row">
                    {
                        loading ? <Loader /> : error ? toast.error(`${error}`) : (
                            <ResponsiveContainer width="100%" aspect={3}  >
                                <LineChart data={orders} margin={{ top: 5, bottom: 5, right: 20, left: 20 }} >
                                    <CartesianGrid />
                                    <XAxis dataKey="createdAt" interval={'preserveStartEnd'} />
                                    <YAxis dataKey="totalPrice" />
                                    <Line dataKey="totalPrice" type="monotone" stroke="#001529" />
                                    <Line dataKey="taxPrice" type="monotoneY" stroke="#8884d8" />
                                    <Tooltip />
                                    <Legend margin={{ top: 5 }} />

                                </LineChart>
                            </ResponsiveContainer>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

// #001529
const HeaderContainer = styled.main`
.primaryCard{
    background-color : #001529;
    color : white;
    font-family: "Times New Roman", Times, serif;
    font-size : 28px;
    border-radius : 10px;
}
.secondaryCard{
    color : #001529;
    font-family: "Times New Roman", Times, serif;
    font-size : 28px;
    border-radius : 10px;
}
.reportCard{
    background-color : yellow;
    color : #001529;
    font-family: "Times New Roman", Times, serif;
    font-size : 28px;
    border-radius : 10px;
}
.totalCard{
    background-color : #001529;
    color : white;
    font-family: "Times New Roman", Times, serif;
    font-size : 28px;
    border-radius : 10px;
}

`

export default AdminDashboard
