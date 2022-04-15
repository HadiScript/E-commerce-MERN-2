import React, { useEffect, useState } from "react";

import { Button } from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../firebase";
import create_or_update_user from "../oop/AuthFunc";
import roleBaisedRedirect from "../oop/roleBaisedRedirect";
import Loader from "../components/Loader";




const Login = ({ history }) => {

  const direct = (res) => {
    if (!res.data.isAdmin) history.push('/')
    else {
      history.push('/admin/dashboard')
    }
  }

  const dispatch = useDispatch();
  const [password, setPassword] = useState("hadi..");
  const [email, setEmail] = useState("hr040877@gmail.com");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => state);

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user])


  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoading(true)
    try {

      const res = await auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      const token = await user.getIdTokenResult()

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
            direct(res)
          }
        )
        .catch(
          err => console.log(err)
        )


    } catch (error) {

      setLoading(false)
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        toast.error("Invalid Credentials")
      }
      console.log(error)
    }

  };

  const loginForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 4}
      >
        Login with Email/Password
      </Button>
      <Link to="/forgot/password" className="float-right text-danger">Forgot Password</Link>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">

        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          <div className="my-3">
            {
              loading && <Loader />
            }
          </div>
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
