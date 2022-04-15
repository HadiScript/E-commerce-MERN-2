import React, { useState, useEffect } from 'react'
import { Button, Form, ToastHeader, } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, } from 'react-router-dom'
import { getUserDetail, updateUser } from '../actions/userActions'

import { toast } from 'react-toastify'

import AdminNav from '../components/AdminNav'


const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);


    const dispatch = useDispatch();

    const { user, loading, error } = useSelector(state => state.userDetail)
    const { loading: updateloading, error: updateError, success: successUpdate } = useSelector(state => state.userUpdate)




    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: 'user_update_reset' })
            history.push('/admin/user')
        } else {
            if (!user.email || user._id != userId) {
                dispatch(getUserDetail(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }


    }, [user, dispatch, userId, successUpdate])

    const submitHanlder = e => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))

    }

    return (
        <>

            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-10">
                        <Link to="/admin/user" className='btn btn-light' >Go Back</Link>
                        <h2>Update User</h2>
                        {updateloading && <p>loading...</p>}
                        {updateError && toast.error(error)}
                        {
                            loading ? <p>loading...</p> : error ? toast.error(error) : (
                                <Form onSubmit={submitHanlder}>
                                    <Form.Group>
                                        <Form.Label> Enter name </Form.Label>
                                        <Form.Control
                                            type="name"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={e => setName(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label> Enter email </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group controlId="isAdmin" >
                                        <Form.Check
                                            type="checkbox"
                                            label="Admin"
                                            checked={isAdmin}
                                            onChange={e => setIsAdmin(e.target.checked)} />
                                    </Form.Group>



                                    <Button className="my-5" type="submit" variant="primary" >
                                        Update User
                                    </Button>

                                </Form>
                            )
                        }

                    </div>
                </div>
            </div>

        </>
    )
}

export default UserEditScreen
