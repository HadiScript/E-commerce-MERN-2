import React, { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteUser, usersList } from '../actions/userActions'
import AdminNav from '../components/AdminNav'
import { SearchOutlined } from "@ant-design/icons";


// import Loader from '../Componenet/Loader'
// import Message from '../Componenet/Message'



const UserListScreens = ({ history }) => {

    const [keyword, setKeyword] = useState('');


    const dispatch = useDispatch();
    const { error, loading, users } = useSelector(state => state.userList);

    const user = useSelector(state => state.user);
    const { success: successDelete } = useSelector(state => state.userDelete);



    useEffect(() => {
        if (user && user.isAdmin) {

            dispatch(usersList(keyword))
        }
        else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, user, keyword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/user/${keyword}`)
        } else {
            history.push('/UserListScreens')
        }
    };

    const deleteHandler = (id) => {
        if (window.confirm('Are You Sure')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
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
                        <Alert variant="dark"> <h4>Customers</h4> </Alert>
                    </div>
                </div>


                <div className="row">
                    <div className='col-md-4 ml-auto ' >
                        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                            <input
                                onChange={e => setKeyword(e.target.value)}
                                type="search"
                                name="q"
                                className="form-control mr-sm-2"
                                placeholder="Search User"
                            />
                            <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
                        </form>
                    </div>
                    <div className="row">
                        <div className="container">
                            {loading ? <p>laoding</p> : error ? toast.error(error) :
                                (
                                    <Table striped bordered hover responsive className="table-sm mt-2">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>NAME</th>
                                                <th>EMAIL</th>
                                                <th>ADMIN</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map(x => (
                                                    <tr key={x.id}>
                                                        <td>{x._id}</td>
                                                        <td>{x.name}</td>
                                                        <td> <a href={`/mailto:${x.email}`}> {x.email} </a> </td>
                                                        <td>
                                                            {
                                                                x.isAdmin ? (<i className="fas fa-check" style={{ color: "green" }} ></i>)
                                                                    :
                                                                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                                                            }
                                                        </td>
                                                        <td>
                                                            <Link to={`/admin/user/${x._id}/edit`} >
                                                                <Button variant="primary" className="btn-sm" >
                                                                    <i className="fas fa-edit" ></i>
                                                                </Button>
                                                            </Link>

                                                            <Button variant="danger" className="btn-sm"
                                                                onClick={() => deleteHandler(x._id)}

                                                            >
                                                                <i className="fas fa-trash" style={{ color: 'red' }}></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                )

                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserListScreens
