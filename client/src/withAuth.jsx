import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import variables from "./env_variables";

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    delete_cookie(name) {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
    async componentDidMount() {
      try {
        const res = await fetch(`${variables.URL_API}users/checkToken`, {
          method: "POST",
          credentials: "include",
        });
        const data = await res.json();
        if (res.status === 200) {
          this.setState({ loading: false, redirect: false });
        } else {
          const error = new Error(data.error);
          throw error;
        }
      } catch (err) {
        this.delete_cookie("token");
        console.error(err);
        this.setState({ loading: false, redirect: true });
      }
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) return null;
      if (redirect) return <Redirect to="/" />;
      return <ComponentToProtect {...this.props} />;
    }
  };
}
