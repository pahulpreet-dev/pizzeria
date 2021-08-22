import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";

import Cart from "../../cart/components/cart.component";
import logo from "./PZ.png";
import { logoutUser } from "../../redux/actions/auth.action";
import Notification from "./notifications.component";

const NavbarMenu = (props) => {
  const [showCartModal, setShowCartModal] = useState(false);
  const [isAuthentic, setIsAuthentic] = useState(props.auth.isAuthentic);

  const [userName, setUsername] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCloseCart = () => setShowCartModal(false);
  const handleShowCart = (e) => {
    e.preventDefault();
    setShowCartModal(true);
  };
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUsername(decodedUser.name);
    }
  }, [userName]); //component did mount
  const logoutButtonHandler = () => {
    setIsAuthentic(false);
    props.logoutUser();
    setToastMessage("You are now logged out");
    setShowToast(true);
  };
  const closeNotification = () => {
    setShowToast(false);
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Brand href="#home">
          <Link
            style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.5)" }}
            to="/"
          >
            <img src={logo} alt="logo" height="90rem" width="90rem" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">Menu</Nav.Link>
            <Nav.Link href="#pricing"></Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isAuthentic && (
              <Nav.Link onClick={() => logoutButtonHandler()}>
                Welcome, {userName}
              </Nav.Link>
            )}
            {!isAuthentic && (
              <Nav.Link>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "rgba(0, 0, 0, 0.5)",
                  }}
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
            )}
            <Nav.Link
              eventKey={2}
              to="#cart"
              onClick={(e) => handleShowCart(e)}
            >
              {/* <Link
                style={{ textDecoration: "none", color: "rgba(0, 0, 0, 0.5)" }}
                to="/"
                onClick={handleShowCart}
              > */}
              View Cart
              {/* </Link> */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Cart show={showCartModal} handleCloseCart={handleCloseCart} />
      {showToast && (
        <div className="notification-toast m-4">
          <Notification
            show={showToast}
            closeNotification={closeNotification}
            toastMessage={toastMessage}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.AuthReducer,
});

export default connect(mapStateToProps, { logoutUser })(NavbarMenu);
