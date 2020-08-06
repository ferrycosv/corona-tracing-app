import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './home/Home';
//import Secret from './Secret';
//import Login from './Login';
import Dashboard from './dashboard/Dashboard'

//import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={withAuth(Dashboard)} />
        </Switch>
      </div>
    );
  }
}

export default App;