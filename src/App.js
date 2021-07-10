import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Menu from "./menu/pages/Menu";
import MenuItem from "./menu/components/MenuItem.Component";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Menu />
        </Route>
        <Route path="/:id/pizzas" exact>
          <MenuItem />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
