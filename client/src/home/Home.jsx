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
              <h2>Corona Tracking App</h2>
              <p></p>
              <p>Create your contact list</p>
              <p>check the number of the new infected cases everyday, world wild, and in your country</p>
              <p>save the list of the people you have been with recently,</p>
         
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