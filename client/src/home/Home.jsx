import React, { Component } from 'react';
import styles from './home.module.css';
import LoginComponent from './Login';
import RegisterComponent from './Register';
import StatisticsComponent from './Statistics';

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
          <div>picture</div>
          <div class='track'> 
          <h1 class='track-text-1'>Track your Corona state</h1>
          <p> Creat your own list, save time</p>
          </div>
          <div className={styles.loginRegisterTab}>register and login
          <LoginComponent></LoginComponent>
            <RegisterComponent></RegisterComponent>
          </div>
        </div>

        <StatisticsComponent></StatisticsComponent>

      </div>
    );
  }
}