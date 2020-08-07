import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./login.css";
import variables from "../env_variables";

export default class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: "",
        password: "",
      },
      register: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
      },
      redirect: false,
    };
  }

  handleLoginInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      login: { ...this.state.login, [name]: value },
    });
  };

  handleRegisterInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      register: { ...this.state.register, [name]: value },
    });
  };

  handleLoginSubmitClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const res = await fetch(`${variables.URL_API}users/authenticate`, {
        method: "POST",
        body: JSON.stringify(this.state.login),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        this.setState({ redirect: true });
      } else {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  handleRegisterSubmitClick = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (this.state.register.password !== this.state.register.confirmPassword) {
      alert("The password and confirmation password do not match...");
      return;
    } else if (this.state.register.password.length < 4) {
      alert("The password must contain at least 4 characters...");
      return;
    }
    try {
      const res = await fetch(`${variables.URL_API}users/register`, {
        method: "POST",
        body: JSON.stringify(this.state.register),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        this.setState({
          form: "login",
          login: { ...this.state.login, email: this.state.register.email },
          register: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            confirmPassword: "",
          },
        });
        alert("New user registered successfully! You can now login :)");
      } else {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    /*.catch((err) => {
        console.error(err);
        alert("Error while trying to register, please try again");
      })
      .then((res) => {
        this.setState({ isRegisterSubmitted: true });
      });*/
  };

  onLoginClick = (event) => {
    event.preventDefault();
    this.setState({
      form: "login",
    });
  };

  onRegisterClick = (event) => {
    event.preventDefault();
    this.setState({
      form: "register",
    });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
    }
    /*const { isRegisterSubmitted } = this.state;
    if (isRegisterSubmitted) {
      //const renderLogin = (event) => {
      event.preventDefault();
      this.setState({
        form: "login",
        login: { ...this.state.login, email: this.state.register.email },
        register: {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          confirmPassword: "",
        },
        isRegisterSubmitted: false,
      });
    }
    /*
      return (
        <section>
          <p>
            Registration completed successfully. <br />
            <a href="#" onClick={renderLogin}>
              Log in
            </a>
          </p>
        </section>
      );
    }*/

    let $form = (
      <form onSubmit={this.handleLoginSubmitClick}>
        <section>
          <section className="loginField">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={this.handleLoginInputChange}
              value={this.state.login.email}
              required
            />
          </section>

          <section className="loginField">
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

        <input className="submitInput" type="submit" value="Login" />
      </form>
    );

    if (this.state.form === "register") {
      $form = (
        <form onSubmit={this.handleRegisterSubmitClick}>
          <section>
            <section className="loginField">
              <label htmlFor="firstname">First Name</label>
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
            <section className="loginField">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                onChange={this.handleRegisterInputChange}
                required
              />
            </section>
          </section>

          <section className="loginField">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={this.handleRegisterInputChange}
              required
            />
          </section>

          <section className="loginField">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              onChange={this.handleRegisterInputChange}
              required
            />
          </section>

          <section className="loginField">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              onChange={this.handleRegisterInputChange}
              required
            />
          </section>

          <input
            className="submitInput"
            type="submit"
            value="Register"
          />
        </form>
      );
    }

    return (
      <div className="form-container">
        <section className="loginOptions">
          <button onClick={this.onLoginClick} className="loginButton">
            Log In
          </button>
          <button onClick={this.onRegisterClick} className="loginButton">
            Register
          </button>
        </section>
        {$form}
      </div>
    );
  }
}
