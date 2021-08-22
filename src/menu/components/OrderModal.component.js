import React from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { cartAction } from "../../redux/actions/cart.action";
import { cartModel } from "../../cart/model/cart.model";

const OrderModal = (props) => {
  //states
  const [price, setPrice] = useState(0.0);
  const [disableQuantityButton, setDisableQuantityButton] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [validOrder, setValidOrder] = useState(false);
  const [showError, setShowError] = useState(false);
  const [cartPrice, setCartPrice] = useState(0.0);
  const [pizzaSize, setPizzaSize] = useState();
  const [order, setOrder] = useState({});
  const [cartUpdated, setCartUpdated] = useState(false);

  const handleClose = () => {
    setPrice(0.0);
    setDisableQuantityButton(true);
    setQuantity(1);
    setValidOrder(false);
    setShowError(false);
    setCartPrice(0.0);
    setPizzaSize(" ");
    props.handleClose(cartUpdated);
    setCartUpdated(false);
  };

  useEffect(() => {
    let cartFromLocalStorage =
      JSON.parse(localStorage.getItem("cart")) || cartModel;

    setOrder(order);

    if (validOrder) {
      cartFromLocalStorage = {
        ...cartFromLocalStorage,
        itemName: [order.itemName, ...cartFromLocalStorage.itemName],
        itemPrice: [order.itemPrice, ...cartFromLocalStorage.itemPrice],
        itemQuantity: [
          order.itemQuantity,
          ...cartFromLocalStorage.itemQuantity,
        ],
        itemSize: [order.itemSize, ...cartFromLocalStorage.itemSize],
        totalPrice: [order.totalPrice, ...cartFromLocalStorage.totalPrice],
      };
      localStorage.setItem("cart", JSON.stringify(cartFromLocalStorage));
      console.log(JSON.parse(localStorage.getItem("cart")));
    }
    handleClose();
  }, [order]);
  const handleAddOrderButton = () => {
    setOrder({
      itemName: props.modalPizza && props.modalPizza[0].title,
      itemPrice: price,
      itemSize: pizzaSize,
      itemQuantity: quantity,
      totalPrice: cartPrice.toFixed(2),
    });
    setCartUpdated(true);
  };
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <Modal centered show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.modalPizza && props.modalPizza[0].title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <div className="container">
            <div className="row">
              <ButtonGroup size="lg" className="m-2 btn-block">
                <Button
                  variant="outline-primary"
                  className="m-2 btn-block"
                  active={pizzaSize === "Small"}
                  onClick={() => {
                    setCartPrice(9.99);
                    setPrice(9.99);
                    setQuantity(1);
                    setValidOrder(true);
                    setShowError(false);
                    setDisableQuantityButton(false);
                    setPizzaSize("Small");
                  }}
                >
                  Small
                </Button>
                <Button
                  variant="outline-primary"
                  className="m-2 btn-block"
                  active={pizzaSize === "Medium"}
                  onClick={() => {
                    setCartPrice(11.99);
                    setPrice(11.99);
                    setQuantity(1);
                    setValidOrder(true);
                    setShowError(false);
                    setDisableQuantityButton(false);
                    setPizzaSize("Medium");
                  }}
                >
                  Medium
                </Button>
                <Button
                  variant="outline-primary"
                  className="m-2 btn-block"
                  active={pizzaSize === "Large"}
                  onClick={() => {
                    setCartPrice(13.99);
                    setPrice(13.99);
                    setQuantity(1);
                    setValidOrder(true);
                    setShowError(false);
                    setDisableQuantityButton(false);
                    setPizzaSize("Large");
                  }}
                >
                  Large
                </Button>
              </ButtonGroup>
            </div>
            <div className="row d-flex justify-content-center mt-4">
              Select quantity:
            </div>
            <div className="row d-flex justify-content-center">
              <Button
                disabled={disableQuantityButton}
                variant="outline-danger"
                className="m-1"
                onClick={() => {
                  quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1);
                  quantity < 2
                    ? setCartPrice(price)
                    : setCartPrice(cartPrice - price);
                }}
              >
                <i className="fas fa-minus"></i>
              </Button>
              <h5 id="quantity" className="mt-2 mr-2 ml-2">
                {quantity}
              </h5>
              <Button
                disabled={disableQuantityButton}
                variant="outline-success"
                className="m-1"
                onClick={() => {
                  setQuantity(quantity + 1);
                  setCartPrice(cartPrice + price);
                }}
              >
                <i className="fas fa-plus"></i>
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <div className="container">
            <div className="row d-flex flex-row-reverse">
              <Button
                onClick={() => {
                  validOrder ? handleAddOrderButton() : setShowError(true);
                }}
              >
                Add to Order
              </Button>
              <h5 className="mt-2 mr-2">${cartPrice.toFixed(2)}</h5>
            </div>
            <div className="row d-flex flex-row-reverse">
              {showError && (
                <span className="invalid-feedback d-block d-flex flex-row-reverse">
                  Select size
                </span>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  cartReducer: state.CartReducer,
});

export default connect(mapStateToProps, { cartAction })(OrderModal);
