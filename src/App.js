import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import Menu from "./menu/pages/Menu";
import MenuItem from "./menu/components/MenuItem.Component";
import store from "./redux/store.redux";
import Cart from "./cart/components/cart.component";
import { cartModel } from "./cart/model/cart.model";
import Login from "./authorization/login.component";
import Signup from "./authorization/signup.component";

function App() {
  !localStorage.getItem("cart") &&
    localStorage.setItem("cart", JSON.stringify(cartModel));
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Menu />
          </Route>
          <Route path="/:id/pizzas" exact>
            <MenuItem />
          </Route>
          <Route path="/viewcart" exact>
            <Cart />
          </Route>
          <Route path="/login" exact>
            <Login></Login>
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
