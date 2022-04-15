import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { myOrders, myOrdersDelete } from '../actions/orderAction';
import UserNav from '../components/UserNav'
import { Alert, Table, } from 'react-bootstrap'
import { Document, Page, PDFDownloadLink, Text, View } from "@react-pdf/renderer";
import { listProducts } from '../actions/productAction';
import Invoice from '../components/Invoice';
import { Link } from 'react-router-dom';
import { createReport, ReportsList } from '../actions/ReportAction';
import Loader from '../components/Loader';


const MyOrder = () => {

    const { loading, error, orders } = useSelector(state => state.myOrder);
    const { loading: myorderDeleteLoading, error: myorderDeleteError, success: myorderDeleteSuccess } = useSelector(state => state.myOrderDelete);
    const user = useSelector(state => state.user);
    const { error: errorReport, loading: loadingError, success: successReport } = useSelector(state => state.reportCreate);
    const { loading: ReportListLoading, reports, error: ReportlistError } = useSelector(state => state.reportList)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(myOrders());
        dispatch(listProducts())
        dispatch(ReportsList())
    }, [dispatch, user, myorderDeleteSuccess, successReport])

    let isReportConfirmed;

    const DeleteHandler = (id) => {
        if (window.confirm("This may help you in future")) {
            dispatch(myOrdersDelete(id))
        }
    }

    const showOrderInTable = (order) => {
        const days = new Date(new Date() - new Date(order.createdAt)).getDate() - 1;
        const Returnable = days <= 7 && order.isDelivered ? true : false;
        const cancelable = !order.isDelivered && true;
        const namedOfVar = order.reported ? "Reported" : Returnable ? "Return" : cancelable ? "Cancel" : "";
        const submitHandling = () => {
            if (window.confirm('Are You Sure')) {
                dispatch(createReport(report))
            }
        }
        console.log(order, "from my orders")

        const report = {
            userId: order.user,
            orderId: order._id,
            createdAt: order.createdAt,
            isDelivered: order.isDelivered,
            alreadyReported: true,
            typeReport: namedOfVar
        }



        isReportConfirmed = !ReportListLoading && reports.find(x => x.orderId === order._id)


        return (
            <Table className="table table-bordered" responsive>
                <thead className="thead-light">


                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Total</th>
                        <th scope="col">Tax Price</th>
                        <th scope="col">Date</th>
                        <th scope="col">Items</th>

                        {order.orderItems.map(p => <th scope="col" key={p._id} >Products</th>)}

                    </tr>
                </thead>

                <tbody>
                    <tr >


                        <td>
                            <b>{order._id}</b>
                        </td>
                        <td>{order.totalPrice}</td>
                        <td>{order.taxPrice}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.orderItems.length} </td>
                        {order.orderItems.map(p => <td>{p.name} </td>)}

                    </tr>

                </tbody>
                <button
                    className="btn btn-sm btn-block btn-outline-primary mt-2"
                    onClick={() => submitHandling(reports)}
                    disabled={isReportConfirmed && true}
                >
                    <Link>{namedOfVar}</Link> {loadingError && <Loader />}

                </button>

                {isReportConfirmed && <strong className="text-dark" > {!isReportConfirmed.confirmation ? "Your Report is not confirm yet" : "Report has been confrimed, check your email"} </strong>}
                {isReportConfirmed && isReportConfirmed.confirmation && <button className='btn btn-sm btn-block btn-outline-danger mt-2' onClick={() => DeleteHandler(order._id)} >
                    Delete
                </button>
                }

            </Table>
        )
    };

    const showDownloadLink = (order) => (
        <PDFDownloadLink
            document={<Invoice order={order} />}

            fileName="invoice.pdf"
            className="btn btn-sm btn-block btn-outline-primary"
        >
            Download PDF
        </PDFDownloadLink>
    );

    const showEachOrders = () =>

        orders.length === 0 ? <p>No ordered yet</p> : orders.map((order, i) => (
            <div key={i} className="m-5 p-3 card">
                {showOrderInTable(order)}
                {showDownloadLink(order)}

            </div>
        ));


    return (
        <div className="container-fluid">
            {errorReport && toast.error(errorReport)}
            <div className="row">
                <div className="col text-center">
                    <Alert variant='dark' className='text-center my-3' >
                        <h2>    Orders

                        </h2>
                    </Alert>
                    {errorReport && <Alert variant="danger" > <h4>{errorReport}</h4> </Alert>}
                    {loading ? <Loader /> : error ? toast.warning("Wait...") : showEachOrders()}
                </div>
            </div>
        </div>
    )
}

export default MyOrder
