import React from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import logo from "../shared/Components/PZ.png";
import "./login.component.css";
import Notification from "../shared/Components/notifications.component";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const onSignupHandler = (e) => {
    setLoading(true);
    setShowToast(false);
    const user = {
      name: document.getElementById("name").value,
      address: document.getElementById("address").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    axios
      .post("http://localhost:5000/api/users/signup", user)
      .then((result) => {
        setLoading(false);
        setShowToast(true);
        setToastMessage(result.data.message);
      })
      .catch((error) => {
        setShowToast(true);
        setToastMessage("error");
        console.log("error signup", error);
        setLoading(false);
      });
  };

  const closeNotification = () => setShowToast(false);

  return (
    <div>
      <div className="container-login100">
        <div className="wrap-login100">
          <Link to="/">
            <div className="login100-pic">
              <img src={logo} alt="Pizzeria" />
            </div>
          </Link>
          <div className="login100-form ">
            <span className="login100-form-title">Join us</span>
            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                autoComplete="new-password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-signature" aria-hidden="true"></i>
              </span>
            </div>
            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                autoComplete="new-password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-map-marked" aria-hidden="true"></i>
              </span>
            </div>
            <div className="wrap-input100">
              <input
                className="input100"
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                autoComplete="new-password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input">
              <input
                className="input100"
                type="password"
                name="pass"
                id="password"
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button
                className="login100-form-btn signup-btn"
                onClick={(e) => onSignupHandler(e)}
                disabled={loading}
              >
                {loading && <Spinner animation="border" size="sm" />} Signup
              </button>
            </div>
            <div className="container-login100-form-btn p-t-12">
              <div className="text-center">
                <span className="txt1">Already a member?</span>
              </div>
              <Link
                to="/login"
                className="login100-form-btn-a"
                style={{ textDecoration: "none" }}
              >
                <button className="login100-form-btn">Login</button>
              </Link>
              {showToast && (
                <div className="notification-toast m-4">
                  <Notification
                    closeNotification={closeNotification}
                    show={showToast}
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

export default Signup;
