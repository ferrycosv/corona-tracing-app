import React, { Component } from "react";
import "./home.css";
import LoginComponent from "./Login";
import StatisticsComponent from "./Statistics";

import { ReactComponent as VirusIcon } from "./coronavirus.svg";

export default class Home extends Component {
  state = {
    message: "Loading...",
  };

  render() {
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
          <div>
            <StatisticsComponent />
          </div>
        </div>
      </div>
    );
  }
}
