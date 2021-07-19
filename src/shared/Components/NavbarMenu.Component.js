import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "./PZ.png";
import { useState } from "react";
import Cart from "../../cart/components/cart.component";

const NavbarMenu = () => {
  const [showCartModal, setShowCartModal] = useState(false);
  const handleCloseCart = () => setShowCartModal(false);
  const handleShowCart = (e) => {
    e.preventDefault();
    setShowCartModal(true);
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
            <Nav.Link to="/">More deets</Nav.Link>
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
    </>
  );
};

export default NavbarMenu;
