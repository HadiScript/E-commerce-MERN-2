import React from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
    return (

        <>

            <button style={{ fontSize: '40px' }} className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <i class="fas fa-stream"></i>
            </button>



            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 id="offcanvasRightLabel"> Dashboard </h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">


                    <nav>
                        <ul className="nav flex-column">

                            <li className="nav-item" className="nav-link">
                                <Link to="/myorders"> My Orders </Link>
                            </li>

                            <li className="nav-item" className="nav-link">
                                <Link to="/user/wishlist">Wishlist <i class="fas fa-heart  "  ></i> </Link>
                            </li>


                            <li className="nav-item" className="nav-link">
                                <Link to="/user/password"> Password </Link>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </>
    )
}

export default UserNav
