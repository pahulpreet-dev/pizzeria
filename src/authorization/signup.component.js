import React from "react";
import { Link } from "react-router-dom";

import logo from "../shared/Components/PZ.png";
import "./login.component.css";

const Signup = () => {
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
                placeholder="Name"
                autocomplete="off"
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
                placeholder="Address"
                autocomplete="off"
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
                placeholder="Email"
                autocomplete="off"
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
                placeholder="Password"
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn signup-btn">Signup</button>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
