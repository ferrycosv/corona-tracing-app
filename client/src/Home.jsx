import React, { Component } from 'react';
import styles from './home/home.module.css';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...'
    }
  }
  
 
  
  render() {
    return (
      <div className={styles.container}>
        <h1>home component</h1>     
      </div>
    );
  }
}