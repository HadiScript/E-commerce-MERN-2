import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'
import LoadingToRedirect from './LoadingToRedirect'



const UserRoutes = ({ children, ...rest }) => {
    const { user } = useSelector(state => state)

    return user && user.token && !user.isAdmin && (
        <>
            <Route {...rest} render={() => children} />
        </>
    )

}

export default UserRoutes
