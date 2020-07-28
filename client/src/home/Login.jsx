import React, { Component } from 'react';

import styles from './login.module.css';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('https://localhost:5000/api/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        console.log(res.body)
        return res.json()
        //this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      })
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.token)
      });
  }

  onLoginClick = (event) => {
    event.preventDefault();

    this.setState({
      form: 'login'
    })
  }

  onRegisterClick = (event) => {
    event.preventDefault();

    this.setState({
      form: 'register'
    })

  }

  render() {
    let $form = (
      <>
        <section>
          <section className={styles.loginField}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </section>

          <section className={styles.loginField}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </section>
        </section>

        <input className={styles.submitInput} type="submit" value="Login" />
      </>
    );

    if (this.state.form === 'register') {
      $form = (
        <>
          <section>
            <section className={styles.loginField}>
              <label htmlFor="firstname">First name</label>
              <input
                id="firstname"
                type="text"
                name="firstname"
                value={this.state.firstname}
                onChange={this.handleInputChange}
                required
              />
            </section>
          </section>

          <section>
            <section className={styles.loginField}>
              <label htmlFor="lastname">Last name</label>
              <input
                id="lastname"
                type="text"
                name="lastname"
                value={this.state.lastname}
                onChange={this.handleInputChange}
                required
              />
            </section>
          </section>

          <section className={styles.loginField}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </section>

          <section className={styles.loginField}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </section>

          <section className={styles.loginField}>
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              value={this.state.confirmpassword}
              onChange={this.handleInputChange}
              required
            />
          </section>

          <input className={styles.submitInput} type="submit" value="Register" />
        </>
      )
    }

    return (
      <form onSubmit={this.onSubmit} className={styles.loginForm}>

        <section className={styles.loginOptions}>
          <button onClick={this.onLoginClick} className={styles.loginButton}>Log In</button>
          <button onClick={this.onRegisterClick} className={styles.loginButton}>Register</button>
        </section>

        {$form}
      </form>
    );
  }
}
