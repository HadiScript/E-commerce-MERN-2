import React, { useEffect, useState } from 'react'
import { auth } from '../firebase'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Card, Button, Alert } from 'react-bootstrap'
import AdminNav from '../components/AdminNav';
import { useDispatch } from 'react-redux';
import { updateUser } from '../actions/userActions';
import Loader from '../components/Loader';


const Password = () => {

    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user)
    const { loading: loadingUpdate, success: successUpdate } = useSelector(state => state.userUpdate)
    const [isShow, setisShow] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password updated");
            })
            .catch((err) => {
                setLoading(false);
                toast.error(err.message);
            });
    };

    const handleName = (e) => {
        e.preventDefault();
        if (name.length < 3) {
            toast.error("Name should be greater then 3 charactors");
        }
        else if (name.length >= 10) {
            toast.error("Name should be less then 10 charactors");
        } else {
            dispatch(updateUser({ name, email: user.email, isAdmin: user.isAdmin, _id: user._id }))
            if (!loading && successUpdate) {
                toast.success(`Name Updated ${name}`)
                setName("")
            }
        }
    }

    // useEffect(() => {
    //     if (name !== "" && successUpdate) {
    //         dispatch(updateUser({ name, email: user.email, isAdmin: user.isAdmin, _id: user._id }))
    //         if (!loading && successUpdate) {
    //             toast.success(`Name Updated ${name}`)
    //             setName("")
    //         }
    //     }
    // }, [dispatch, successUpdate])

    return (
        <div className="container-fluid">
            {/* {successUpdate && isShow && <Alert variant='success' className='mt-3' onClose={() => setisShow(false)} dismissible > {`Name Updated ${name}`} </Alert>} */}
            {/* {successUpdate ? toast.success(`Name Updated ${name}`) : ''} */}
            <div className="row">
                <div className="col">
                    <div className="float-right">
                        {
                            user.isAdmin && <AdminNav />
                        }
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <Alert variant="dark my-4"> <h4>Update</h4> </Alert>
                </div>
            </div>


            <div className="row">
                <div className="col container">
                    <div className="container">
                        <form onSubmit={handleName}>
                            <Card>

                                <Card.Body>
                                    <div className="form-group">
                                        <Card.Title>
                                            Name
                                        </Card.Title>
                                        <input
                                            type="name"
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter new Name"
                                            value={name}
                                            autoFocus
                                        />


                                        <Button
                                            variant="primary"
                                            className="btn btn-primary  float-right mt-3"
                                            disabled={!name || name.length < 4 || loadingUpdate}
                                            type="submit"
                                        >Change Name {loadingUpdate && <Loader />} </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </form>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col container">
                    <div className="container">
                        {loading && <Loader />}

                        <form onSubmit={handleSubmit}>
                            <Card>

                                <Card.Body>
                                    <div className="form-group">
                                        <Card.Title>
                                            Password
                                        </Card.Title>
                                        <input
                                            type="password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter new password"
                                            disabled={loading}
                                            value={password}
                                        />

                                        <Button
                                            variant="primary"
                                            className="btn btn-primary  float-right mt-3"
                                            type="submit"
                                            disabled={!password || password.length < 4 || loading}
                                        >Change</Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        </form>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Password
