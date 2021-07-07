import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/UIElements/Avatar";
import Card from "../../shared/UIElements/Card";

import "./MenuItem.Component.css";

const MenuCategory = (props) => {
  return (
    <li className="menu-category">
      <Card className="menu-category__content">
        <Link to={`/${props.id}/places`} style={{ textDecoration: "none" }}>
          <div className="menu-category__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="menu-category__info">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default MenuCategory;
