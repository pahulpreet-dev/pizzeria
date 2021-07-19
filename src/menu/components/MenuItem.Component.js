import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import NavbarMenu from "../../shared/Components/NavbarMenu.Component";
import Avatar from "../../shared/UIElements/Avatar";

import "./MenuItem.Component.css";
import OrderModal from "./OrderModal.component";

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
      <OrderModal
        show={show}
        modalPizza={modalPizza}
        handleClose={handleClose}
      />
      <Link to="/viewcart"></Link>
    </div>
  );
};

export default MenuItem;
