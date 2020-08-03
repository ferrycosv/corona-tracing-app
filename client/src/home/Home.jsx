import React, { Component } from 'react';
import styles from './home.module.css';
import LoginComponent from './Login';
import StatisticsComponent from './Statistics';

import {ReactComponent as VirusIcon} from "./coronavirus.svg";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }

  render() {
    return (
      <div className={[styles.container, styles.border].join(" ")}>

        <div className={styles.topContainer}>
          <div className={styles.titleContainer}>
            <VirusIcon className={styles.virusIcon} />
            <section>
              <h2>Track your corona stats</h2>
              <p>Create your contact list</p>
            </section>
          </div>

          <div className={styles.loginRegisterTab}>
            <LoginComponent />
          </div>
        </div>

        <StatisticsComponent></StatisticsComponent>
      </div>
    );
  }
}