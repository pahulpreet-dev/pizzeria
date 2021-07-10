import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

import NavbarMenu from "../../shared/Components/NavbarMenu.Component";
import Avatar from "../../shared/UIElements/Avatar";

import "./MenuItem.Component.css";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

const MenuItem = () => {
  const DUMMY_PIZZAS = [
    {
      id: "p1",
      title: "Canadian Pizza",
      description:
        "Delicious Pizza with Pepperoni, Bacon, Mushrooms, Three Cheese Blend",
      imageUrl: "https://241pizza.com/media/D_PW.png",
      price_small: 9.99,
      category: "c1",
    },
    {
      id: "p2",
      title: "Hawaiian Pizza",
      description: "Delicious Pizza with Ham, Pineapple, Bacon, Extra Cheese",
      imageUrl: "https://241pizza.com/media/FHAW.png",
      price_small: 9.99,
      category: "c1",
    },
    {
      id: "p3",
      title: "The Uno 3",
      description: "1 Pizza with One Topping",
      imageUrl: "https://241pizza.com/media/ONE.png",
      price_small: 7.99,
      category: "c2",
    },
    {
      id: "p4",
      title: "The Uno 4",
      description: "1 Pizza with One Topping",
      imageUrl: "https://241pizza.com/media/ONE.png",
      price_small: 7.99,
      category: "c2",
    },
    {
      id: "p5",
      title: "The Uno 5",
      description: "1 Pizza with One Topping",
      imageUrl: "https://241pizza.com/media/ONE.png",
      price_small: 7.99,
      category: "c2",
    },
  ];
  const { id } = useParams();
  const displayedPizzas = DUMMY_PIZZAS.filter((pizza) => pizza.category === id);
  //Modal
  const [show, setShow] = useState(false);
  const [modalPizza, setModalPizza] = useState();
  const [price, setPrice] = useState("0.00");
  const [quantity, setQuantity] = useState(1);
  const [validOrder, setValidOrder] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (pizzaId_) => {
    setShow(true);
    setModalPizza(displayedPizzas.filter((pizza) => pizza.id === pizzaId_));
  };
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <div className="menu-item-container">
        <div className="pizza-list row mb-3 text-center ">
          {displayedPizzas.map((pizza) => (
            <div className=" col-md-6 col-lg-4 mb-4">
              <div className="pizza-menu">
                <div className="pizza-menu__content card mb-4 rounded-3 shadow-md ">
                  <div className="pizza-menu__info card-body">
                    <div className="pizza-menu__image">
                      <Avatar image={pizza.imageUrl} />
                    </div>
                    <div className="list-unstyled">
                      <h2 className="card-title pricing-card-title">
                        {pizza.title}
                      </h2>
                      <p>{pizza.description}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleShow(pizza.id)}
                    className="card-button mb-4 btn btn-lg btn-outline-danger"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalPizza && modalPizza[0].title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <div className="container">
            <div className="row">
              <ButtonGroup size="lg" className="m-2 btn-block">
                <Button
                  variant="outline-primary"
                  className="m-2 btn-block"
                  onClick={() => {
                    setPrice("9.99");
                    setValidOrder(true);
                  }}
                >
                  Small
                </Button>
                <Button
                  variant="outline-primary"
                  className="m-2 btn-block"
                  onClick={() => {
                    setPrice("11.99");
                    setValidOrder(true);
                  }}
                >
                  Medium
                </Button>
                <Button
                  variant="outline-primary"
                  className="m-2 btn-block"
                  onClick={() => {
                    setPrice("13.99");
                    setValidOrder(true);
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
                variant="outline-danger"
                className="m-1"
                onClick={() => {
                  quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1);
                  setPrice(price * quantity);
                }}
              >
                <i class="fas fa-minus"></i>
              </Button>
              <h5 className="mt-2 mr-2 ml-2">{quantity}</h5>
              <Button
                variant="outline-success"
                className="m-1"
                onClick={() => {
                  setQuantity(quantity + 1);
                  setPrice(price * quantity);
                }}
              >
                <i class="fas fa-plus"></i>
              </Button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <div className="container">
            <div className="row d-flex flex-row-reverse">
              <Button
                onClick={() => {
                  validOrder ? setShowError(false) : setShowError(true);
                }}
              >
                Add to Order
              </Button>
              <h5 className="mt-2 mr-2">${price}</h5>
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

export default MenuItem;
