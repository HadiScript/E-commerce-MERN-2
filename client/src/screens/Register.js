import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify'

import { auth } from "../firebase";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector(state => state);

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user])


  const handleSubmit = async (e) => {
    e.preventDefault();

    // docs
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true
    }

    // it will send to email
    await auth.sendSignInLinkToEmail(email, config);

    toast.success(`Email is sent to ${email}, tap to complete your registeration`)

    // save user to local storage
    window.localStorage.setItem('emailForRegisteration', email);

    // clear state
    setEmail("");

  };



  return (
    <div className="container p-5">
      <div className="row">

        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          <form onSubmit={handleSubmit}>


            <input
              placeholder="Enter Email"
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
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

export default Register;
