import React from "react";
import { useEffect, useState } from "react";
import { cartModel } from "../model/cart.model";
import { useHistory } from "react-router-dom";

import "./cart.component.css";
import { Modal } from "react-bootstrap";
import axios from "axios";

const Cart = (props) => {
  const history = useHistory();

  const [cartFromLocal, setCartFromLocal] = useState(
    JSON.parse(localStorage.getItem("cart")) || cartModel
  );
  const [itemName, setItemName] = useState(cartModel.itemName);
  useEffect(() => {
    setCartFromLocal(JSON.parse(localStorage.getItem("cart") || cartModel));
    setItemName(cartFromLocal.itemName);
  }, []); //component did mount alternative

  const deleteFromCart = (index) => {
    setCartFromLocal((prevCart) => {
      return {
        ...prevCart,
        itemPrice: [
          ...prevCart.itemPrice.slice(0, index),
          ...prevCart.itemPrice.slice(index + 1),
        ],
        itemSize: [
          ...prevCart.itemSize.slice(0, index),
          ...prevCart.itemSize.slice(index + 1),
        ],
        itemName: [
          ...prevCart.itemName.slice(0, index),
          ...prevCart.itemName.slice(index + 1),
        ],
        itemQuantity: [
          ...prevCart.itemQuantity.slice(0, index),
          ...prevCart.itemQuantity.slice(index + 1),
        ],
        totalPrice: [
          ...prevCart.totalPrice.slice(0, index),
          ...prevCart.totalPrice.slice(index + 1),
        ],
      };
    });
  };

  useEffect(() => {
    setItemName(cartFromLocal.itemName);
    localStorage.setItem("cart", JSON.stringify(cartFromLocal));
  }, [cartFromLocal]);
  useEffect(() => {
    setCartFromLocal(JSON.parse(localStorage.getItem("cart") || cartModel));
  }, [props.show]);

  const checkoutHandler = () => {
    console.log("heelo key", process.env.REACT_APP_SECRET_KEY);
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      const toastMessage = { _toastMessage: "Please login to continue" };
      history.push({
        pathname: "/login",
        state: toastMessage,
      });
    } else {
      wdsStripe();
    }
  };

  const wdsStripe = () => {
    const items = {
      cart: cartFromLocal,
    };
    const url = axios
      .post("http://localhost:5000/api/stripe/checkout", items)
      .then((res) => {
        return res.data
          ? res.data
          : res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        console.log("heelo click me", url);
      });
  };

  return (
    <div className="cart_container">
      <Modal
        dialogClassName="cart-modal"
        show={props.show}
        onHide={props.handleCloseCart}
        scrollable={true}
      >
        <Modal.Header className="cart-title_modal">
          <Modal.Title>Cart</Modal.Title>
          <button
            className="fas fa-times"
            onClick={props.handleCloseCart}
          ></button>
        </Modal.Header>
        <Modal.Body className="modal-body_cart">
          {itemName.length < 1 && (
            <div className="empty_cart">Cart is empty</div>
          )}
          {cartFromLocal.itemName &&
            itemName.map((cart, index) => (
              <div key={index} className="cart_card">
                <h5 className="cart_title">
                  {`${cartFromLocal.itemName[index]} `}
                  <button
                    className="fas fa-trash fa-xs"
                    onClick={() => {
                      deleteFromCart(index);
                    }}
                  ></button>
                </h5>
                <p className="cart_itemsize">
                  <span className="cart_desc">Size:</span>
                  {` ${cartFromLocal.itemSize[index]}`}
                  <small className="cart_itemprice mute ml-2">
                    {` $ ${cartFromLocal.itemPrice[index]}`}
                  </small>
                </p>
                <p className="cart_itemquantity">
                  <span className="cart_desc">Quantity:</span>
                  {` ${cartFromLocal.itemQuantity[index]}`}
                </p>
                <p className="cart_itemtotal">
                  <span className="cart_desc">
                    Price:
                    {` $${cartFromLocal.totalPrice[index]}`}
                  </span>
                </p>
                <div className="divider div-transparent div-dot"></div>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="checkout-btn checkout-btnn"
            onClick={() => {
              checkoutHandler();
            }}
          >
            Checkout
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
