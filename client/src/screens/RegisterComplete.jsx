import React, { useEffect, useState } from "react";

import axios from 'axios';
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../firebase";
import create_or_update_user from "../oop/AuthFunc";

const RegisterComplete = ({ history }) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const { user } = useSelector(state => state);

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegisteration'));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if (!email || !password) {
            toast.error('Email & Password is required')
            return;
        }
        if (password.length <= 4) {
            toast.error('Password must be 4 charactor long')
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(email, window.location.href)
            // console.log("result", result);

            if (result.user.emailVerified) {

                // remove email from local storage 
                window.localStorage.removeItem('emailForRegisteration')

                // get user token of current user , firebase gives
                let user = auth.currentUser
                await user.updatePassword(password);
                const token = await user.getIdTokenResult();

                // redux store
                console.log("user", user, 'token', token);

                create_or_update_user(token.token)
                    .then(
                        res => {
                            dispatch({
                                type: 'logged_in_user',
                                payload: {
                                    email: res.data.email,
                                    token: token.token,
                                    name: res.data.name,
                                    _id: res.data._id,
                                    isAdmin: res.data.isAdmin
                                }
                            })
                        }
                    )
                    .catch(
                        err => console.log(err)
                    )


                //  redirect
                history.push("/");
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    };



    return (
        <div className="container p-5">
            <div className="row">

                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />

                        <input
                            type="password"
                            className="form-control  my-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                            placeholder="Enter the password"
                        />

                        <button type="submit" className="btn btn-raised mt-3">
                            Register
                        </button>
                    </form>

                </div>

            </div>
        </div>
    );
};

export default RegisterComplete;
