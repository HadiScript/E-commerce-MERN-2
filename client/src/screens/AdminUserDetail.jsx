import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { UserDetailAdmin } from '../actions/userActions'
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserOrderedList } from '../actions/ReportAction';

const AdminUserDetail = ({ match }) => {
    const userId = match.params.id
    const { user, loading, error } = useSelector(state => state.userAdminDetail);
    const { ordered, loading: listLoading, error: listError } = useSelector(state => state.orderedUser);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(UserDetailAdmin(userId))
        dispatch(UserOrderedList(userId))
    }, [dispatch])

    return loading ? <Loader /> : user && <div className="container my-5">
        <div className="card">
            <div className="card-body">

                <Alert> Contact him : <a href="https://mail.google.com/" target="_blank"> {user.email} </a> </Alert>
                <h4>Name : {user.name}</h4>
                <strong> Registeration date : {user.createdAt} </strong>
                {
                    listLoading ? <Loader /> : <p>hi</p>
                }
            </div>
        </div>
    </div>
}

export default AdminUserDetail
