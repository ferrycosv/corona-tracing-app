import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import withAuth from "./withAuth";
import Home from "./home/Home";
import Dashboard from "./dashboard/DashBoard";

class App extends Component {
  render() {
    return (
      <>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={withAuth(Dashboard)} />
        </Switch>
      </>
    );
  }
}

export default App;
