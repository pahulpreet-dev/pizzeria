import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { useRef } from "react";
import jwtDecode from "jwt-decode";

import { loginUser } from "../redux/actions/auth.action";
import Notification from "../shared/Components/notifications.component";
import logo from "../shared/Components/PZ.png";
import "./login.component.css";

const Login = (props) => {
  const location = useLocation();
  const { _toastMessage } = (location && location.state) || "";
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(location && location.state);
  const [toastMessage, setToastMessage] = useState(_toastMessage);
  const emailValue = useRef();
  const passwordValue = useRef();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      history.push({ pathname: "/", state: { _toastMessage: toastMessage } });
    }
  }, [toastMessage, history]);

  const loginButtonHandler = (e) => {
    e.preventDefault();
    const user = {
      email: emailValue.current.value,
      password: passwordValue.current.value,
    };
    axios
      .post("http://localhost:5000/api/users/login", user)
      .then((result) => {
        setLoading(false);
        setShowToast(true);
        //get token from result
        const { token } = result.data;
        //set data to local storage
        localStorage.setItem("jwtToken", token);
        props.loginUser(result.data);

        const decodedUser = jwtDecode(token);
        setToastMessage(`Welcome, ${decodedUser.name}`);
      })
      .catch((error) => {
        console.log("error login", error);
      });
  };

  const closeNotification = () => {
    setShowToast(false);
  };

  return (
    <div>
      <div className="container-login100">
        <div className="wrap-login100">
          <Link to="/">
            <div className="login100-pic">
              <img src={logo} alt="Pizzeria" />
            </div>
          </Link>
          <div className="login100-form">
            <form onSubmit={(e) => loginButtonHandler(e)}>
              <span className="login100-form-title">Member Login</span>
              <div className="wrap-input100">
                <input
                  className="input100"
                  type="text"
                  ref={emailValue}
                  id="email"
                  placeholder="Email"
                  autoComplete="off"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100"
                  type="password"
                  ref={passwordValue}
                  id="passsword"
                  placeholder="Password"
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-lock" aria-hidden="true"></i>
                </span>
              </div>

              <div className="container-login100-form-btn">
                <button type="submit" className="login100-form-btn">
                  {loading && <Spinner animation="border" size="sm" />} Login
                </button>
              </div>
            </form>
            <div className="container-login100-form-btn p-t-12">
              <div className="text-center">
                <span className="txt1">Don't Have an account yet?</span>
              </div>
              <Link
                to="/signup"
                className="login100-form-btn-a"
                style={{ textDecoration: "none" }}
              >
                <button className="login100-form-btn">Signup</button>
              </Link>
              {showToast && (
                <div className="notification-toast m-4">
                  <Notification
                    show={showToast}
                    closeNotification={closeNotification}
                    toastMessage={toastMessage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.AuthReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
