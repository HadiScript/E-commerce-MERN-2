import React from 'react'
import { Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'


const NotFound = () => {
    return (
        <Alert vairant="info" > Page Not Found
            <span> Go to <Link to="/"> Home Page  </Link> </span>
        </Alert>
    )
}

export default NotFound
