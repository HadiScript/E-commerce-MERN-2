import React from 'react'
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNav from '../components/AdminNav';


const Suppliers = () => {

    let laptopsAgent = "laptopsAgent";
    let mobilesAgent = "mobilesAgent";
    let accessoriesAgent = "accessoriesAgent";
    let camerasAgent = "camerasAgent";
    let watchesAgent = "watchesAgent";
    let tvAgent = "tvAgent";
    let headphonesAgent = "headphonesAgent";
    let other = "other"


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
                    <Alert variant="dark"> <h4>Suppliers</h4> </Alert>
                </div>
                <div className="row ">
                    <div className="col ">
                        <div className="card box bg-light">
                            <div class="card-body">
                                <div className="list-group">
                                    <div className="list-group-item my-3 py-3 ">
                                        <Link to={`/admin/supplier/${mobilesAgent}`}> <i class="fas fa-mobile"></i> Mobile Suppliers</Link>
                                    </div>
                                    <div className="list-group-item my-3 py-3">
                                        <Link to={`/admin/supplier/${mobilesAgent}`} > <i class="fas fa-toolbox"></i> Accessories Suppliers</Link>
                                    </div>
                                    <div className="list-group-item my-3 py-3">
                                        <Link to={`/admin/supplier/${camerasAgent}`}> <i class="fas fa-camera"></i> Cameras Suppliers</Link>
                                    </div>
                                    <div className="list-group-item my-3 py-3">
                                        <Link to={`/admin/supplier/${watchesAgent}`}> <i class="fas fa-clock"></i> Watch Suppliers</Link>
                                    </div>
                                    <div className="list-group-item my-3 py-3">
                                        <Link to={`/admin/supplier/${tvAgent}`}> <i class="fas fa-tv"></i> televission Suppliers</Link>
                                    </div>
                                    <div className="list-group-item my-3 py-3">
                                        <Link to={`/admin/supplier/${headphonesAgent}`}><i class="fas fa-headphones"></i>Headphones Suppliers</Link>
                                    </div>
                                    <div className="list-group-item my-3 py-3">
                                        <Link to={`/admin/supplier/${laptopsAgent}`}><i class="fas fa-laptop"></i>Laptop Suppliers</Link>
                                    </div>
                                    <div className="list-group-item my-3 py-3">
                                        <Link to={`/admin/supplier/${other}`}><i class=""></i>Other</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Suppliers
