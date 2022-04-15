import React, { useEffect } from 'react'
import { Alert, Card, Col, ListGroup, Row, ToastHeader } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { ReportDelete, ReportHasUpdated, ReportsList } from '../actions/ReportAction';
import AdminNav from '../components/AdminNav';
import Loader from '../components/Loader';
import { toast } from 'react-toastify'


const AdminReports = () => {
    const dispatch = useDispatch();
    const { reports, loading, error } = useSelector(state => state.reportList)
    const { success, loading: confirmLoading, error: errorComfirmation } = useSelector(state => state.reportConfirm);
    const { success: deleteSuccess, loading: deleteLoading, error: deleteError } = useSelector(state => state.reportDelete)



    const deleteHandler = (id) => {
        if (window.confirm("This may help you in futer")) {
            dispatch(ReportDelete(id))
            // {deleteSuccess && toast.success("Report Removed")}
            if (deleteSuccess) {
                toast.success("Report Removed")
            }
        }
    }

    const confirmHandler = (id) => {
        dispatch(ReportHasUpdated(id))
        // {success && toast.success(`Email has been sent to ${x.userId}`)}
        if (success) {
            toast.success(`Email has been sent to ${id}`)
        }
    }

    useEffect(() => {
        dispatch(ReportsList())
    }, [dispatch, success, deleteSuccess,])

    return (
        <div className="container-fluid">
            {errorComfirmation && toast.error(errorComfirmation)}

            {deleteError && toast.error(deleteError)}
            <div className="row">
                <div className="col">
                    <div className="float-right">
                        <AdminNav />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <Alert variant="dark"> <h4>Reports</h4> </Alert>
                </div>
                <Row>
                    <Col md={12}>

                        {loading && <Loader />}
                        {error && toast.error(error)}
                        {
                            reports.length === 0 ? <Alert vairant="success"> There is no Reports</Alert> : reports.map(x => (<>
                                <Card variant="flush" className="mb-3">
                                    <Card.Body key={x.orderId}>

                                        <Alert> <strong>Order ID</strong> : <Link to={`/admin/order/${x.orderId}`}>{x.orderId}</Link> </Alert>
                                        <Alert> <strong>User ID</strong>: <Link to={`/admin/user/${x.userId}`}>{x.userId}</Link> </Alert>
                                        <Alert> <strong>Type Of Reports: {x.typeReport} </strong> </Alert>
                                        <h3> Ordered Date: {x.updatedAt.substring(0, 10)}</h3>
                                        <Alert variant="primary"> Confirm : {x.confirmation ? "Ture" : "False"} </Alert>
                                        <button className="btn btn-outline-primary" onClick={() => confirmHandler(x._id)} > Confirmation {confirmLoading && <Loader />} </button>
                                        <br />
                                        {x.confirmation &&
                                            <button className="btn btn-outline-danger" onClick={() => deleteHandler(x._id)} > Delelte  </button>
                                        }
                                    </Card.Body>
                                </Card>
                            </>
                            ))
                        }

                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default AdminReports
