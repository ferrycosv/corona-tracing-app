import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './login.module.css';

export default class LoginComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: {
        email: '',
        password: ''
      },
      register: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: ''
      },
      isRegisterSubmitted: false,
      redirect: false
    };
  }


  handleLoginInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      login: { ...this.state.login, [name]: value }
    }
    );
  }

  handleRegisterInputChange = (event) => {

    const { value, name } = event.target;
    this.setState({
      register: { ...this.state.register, [name]: value }
    }
    );
  }

  handleLoginSubmitClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch('https://localhost:5000/api/users/authenticate', {
      method: 'POST',
      body: JSON.stringify(this.state.login),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
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
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName',this.state.login.email)
        this.setState({ redirect: true })

      });
  }

  handleRegisterSubmitClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    fetch('https://localhost:5000/api/users/register', {
      method: 'POST',
      body: JSON.stringify(this.state.register),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        return res.json()
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
        this.setState({ isRegisterSubmitted: true })

      });
  }


  // onSubmit = (event) => {
  //   event.preventDefault();


  // }

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
    const { redirect } = this.state;
    const {isRegisterSubmitted} = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    if(isRegisterSubmitted){
      return <Redirect to="/" />;
    } 
    let $form = (
      <form onSubmit={this.handleLoginSubmitClick}>
        <section>
          <section className={styles.loginField}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={this.handleLoginInputChange}
              required
            />
          </section>

          <section className={styles.loginField}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={this.handleLoginInputChange}
              required
            />
          </section>
        </section>

        <input
          className={styles.submitInput}
          type="submit"
          value="Login"
        />
      </form>
    );

    if (this.state.form === 'register') {
      $form = (
        <form onSubmit={this.handleRegisterSubmitClick}>
          <section>
            <section className={styles.loginField}>
              <label htmlFor="firstname">First name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                onChange={this.handleRegisterInputChange}
                required
              />
            </section>
          </section>

          <section>
            <section className={styles.loginField}>
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                onChange={this.handleRegisterInputChange}
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
              onChange={this.handleRegisterInputChange}
              required
            />
          </section>

          <section className={styles.loginField}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={this.handleRegisterInputChange}
              required
            />
          </section>

          <section className={styles.loginField}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              onChange={this.handleRegisterInputChange}
              required
            />
          </section>

          <input className={styles.submitInput} type="submit" value="Register" />
        </form>
      )
    }

    return (

      <>
        <section className={styles.loginOptions}>
          <button onClick={this.onLoginClick} className={styles.loginButton}>Log In</button>
          <button onClick={this.onRegisterClick} className={styles.loginButton}>Register</button>
        </section>

        {$form}
      </>);
  }
}
