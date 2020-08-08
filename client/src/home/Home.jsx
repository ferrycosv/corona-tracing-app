import React, { Component } from "react";
import "./home.css";
import LoginComponent from "./Login";
import StatisticsComponent from "./Statistics";
import { Redirect } from "react-router-dom";

import { ReactComponent as VirusIcon } from "./coronavirus.svg";

export default class Home extends Component {
  state = {
    message: "Loading...",
    redirect: false,
  };
  get_cookie(name) {
    return document.cookie.split(";").some((c) => {
      return c.trim().startsWith(name + "=");
    });
  }
  componentDidMount() {
    if (this.get_cookie("token")) this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) return <Redirect to="/dashboard" />;
    return (
      <div>
        <div className="container-fluid">
          <div className="row login-section">
            <div className="col-sm-12 col-md-8">
              <div className="container-fluid">
                <div className="row justify-content-center align-items-center">
                  <div className="col-sm-12 col-md-4 d-flex align-items-center justify-content-center">
                    <VirusIcon className="virus-icon" />
                  </div>
                  <div className="col-sm-12 col-md-8 title-container">
                    <h2>Keep track of the people you recently interact with</h2>
                    <p>
                      Create a free list to keep record of the people you had
                      been in contact in the past days
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <LoginComponent />
            </div>
          </div>
          <div className="row statistics-section">
            <StatisticsComponent />
          </div>
        </div>
      </div>
    );
  }
}
