import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const AdminNav = ({ children }) => (
    <>

        <button style={{ fontSize: '40px', borderWidth: "0", overflow: 'hidden' }} className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <i className="fas fa-stream"></i>
        </button>



        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 id="offcanvasRightLabel"></h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                <nav>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link to="/admin/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/create/product" className="nav-link">
                                Create Product
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/admin/products" className="nav-link">
                                Products
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/admin/orders" className="nav-link">
                                Order
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/admin/user" className="nav-link">
                                User
                            </Link>
                        </li>


                        <li className="nav-item">
                            <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/admin/password" className="nav-link">
                                Changes
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/admin/supplier" className="nav-link">
                                Supplier
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/admin/report" className="nav-link">
                                Reports
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>
        </div>

    </>
);

export default AdminNav;
