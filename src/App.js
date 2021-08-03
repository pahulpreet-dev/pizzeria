import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";

import Menu from "./menu/pages/Menu";
import MenuItem from "./menu/components/MenuItem.Component";
import store from "./redux/store.redux";
import Cart from "./cart/components/cart.component";
import { cartModel } from "./cart/model/cart.model";
import Login from "./auth/login.component";
import Signup from "./auth/signup.component";
import { loginUser, logoutUser } from "./redux/actions/auth.action";

function App() {
  !localStorage.getItem("cart") &&
    localStorage.setItem("cart", JSON.stringify(cartModel));

  //check if user token exist => user logged in
  const token = localStorage.getItem("jwtToken");
  if (token) {
    //check if token still valid
    const decodedUserData = jwt_decode(token);
    const currentTime = Date.now / 1000;
    if (decodedUserData.exp < currentTime) {
      store.dispatch(logoutUser());
    } else {
      store.dispatch(loginUser(decodedUserData));
    }
  }

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
