import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Menu from "./menu/pages/Menu";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
