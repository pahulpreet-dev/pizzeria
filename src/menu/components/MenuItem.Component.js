import React from "react";
import { useParams } from "react-router-dom";

import NavbarMenu from "../../shared/Components/NavbarMenu.Component";
import Avatar from "../../shared/UIElements/Avatar";

import "./MenuItem.Component.css";

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
      id: "p2",
      title: "The Uno",
      description: "1 Pizza with One Topping",
      imageUrl: "https://241pizza.com/media/ONE.png",
      price_small: 7.99,
      category: "c2",
    },
    {
      id: "p2",
      title: "The Uno",
      description: "1 Pizza with One Topping",
      imageUrl: "https://241pizza.com/media/ONE.png",
      price_small: 7.99,
      category: "c2",
    },
    {
      id: "p2",
      title: "The Uno",
      description: "1 Pizza with One Topping",
      imageUrl: "https://241pizza.com/media/ONE.png",
      price_small: 7.99,
      category: "c2",
    },
  ];
  const orderButtonHandler = () => {};
  const { id } = useParams();
  const displayedPizzas = DUMMY_PIZZAS.filter((pizza) => pizza.category === id);
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
                      <image src={pizza.imageUrl}></image>
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
                    onClick={orderButtonHandler()}
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
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
