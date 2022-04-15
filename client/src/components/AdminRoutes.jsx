import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Route, Redirect } from 'react-router-dom'

import { currentAdmin } from '../oop/AuthFunc';

const AdminRoutes = ({ children, ...rest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log("CURRENT ADMIN RES", res);
                    setOk(true);
                })
                .catch((err) => {
                    console.log("ADMIN ROUTE ERR", err);
                    setOk(false);
                });
        }
    }, [user]);

    return ok ? <Route {...rest} /> : <></>;
};

export default AdminRoutes;
