import React from "react";

import Card from "../../shared/UIElements/Card";
import MenuCategory from "./MenuCategory.Component";
import "./MenuList.Component.css";

const MenuList = (props) => {
  if (props.categories.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No menu found.</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className="category-list">
      {props.categories.map((category) => (
        <MenuCategory
          key={category.id}
          id={category.id}
          image={category.image}
          name={category.name}
          description={category.description}
        />
      ))}
    </ul>
  );
};

export default MenuList;
