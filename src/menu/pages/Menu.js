import React from "react";

import MenuList from "../components/MenuList.Component";
import NavbarMenu from "../../shared/Components/NavbarMenu.Component";

const Menu = () => {
  const CategorySchema = [
    {
      id: "c1",
      name: "Favorites",
      image:
        "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      description: "Select from the range of favorites that we have to offer",
    },
    {
      id: "c2",
      name: "Specials",
      image: "https://241pizza.com/media/D_PW.png",
      description:
        "Select from the range of special combos that we have to offer",
    },
  ];
  return (
    <div>
      <NavbarMenu></NavbarMenu>
      <MenuList categories={CategorySchema} />
    </div>
  );
};

export default Menu;
