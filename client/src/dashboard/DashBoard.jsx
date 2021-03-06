import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import ListingComponent from "./Listing";
import ContactForm from "./ContactForm";
import styles from "./dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { parse, subDays, subMonths } from "date-fns";
import {
  faUserCircle,
  faPlusCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import variables from "../env_variables";

export default class Dashboard extends Component {
  state = {
    contacts: [],
    email: "",
    firstName: "",
    lastName: "",
    contactFormToggle: false,
    editing: false,
    filterActive: false,
    filter: "",
  };

  async componentDidMount() {
    try {
      const res = await fetch(`${variables.URL_API}lists`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        this.setState({
          email: data.email,
          contacts: data.contacts,
          firstName: data.firstName,
          lastName: data.lastName,
          contactFormToggle: false,
          editing: false,
          filterActive: false,
          filter: "",
        });
      } else {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  handleAddContactForm = (event) => {
    if (this.state.editing || this.state.filterActive) return;
    const { contactFormToggle } = this.state;
    this.setState({ contactFormToggle: !contactFormToggle });
  };

  handleDelete = async (index) => {
    const contacts = this.state.contacts.filter((item, idx) => idx !== index);
    try {
      const res = await fetch(`${variables.URL_API}lists`, {
        method: "PUT",
        body: JSON.stringify({ contacts: contacts }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        this.setState({
          contacts: contacts,
        });
      } else {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  checkContactFormToggle = () => {
    return this.state.contactFormToggle;
  };

  handleEditing = (value) => {
    this.setState({ editing: value });
  };

  delete_cookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

  handleLogout = () => {
    this.delete_cookie("token");
  };

  handleSave = async (item, isNew, index) => {
    let contacts = this.state.contacts;
    if (!isNew) {
      contacts = contacts.filter((i, idx) => idx !== index);
      item["lastUpdate"] = Date.now();
    } else {
      this.handleAddContactForm();
    }
    contacts.unshift(item);
    try {
      const res = await fetch(`${variables.URL_API}lists`, {
        method: "PUT",
        body: JSON.stringify({ contacts: contacts }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        this.setState({
          contacts: contacts,
        });
        this.handleEditing(false);
      } else {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  filterLastTen = () => {
    let { contacts, filterActive, editing, filter } = this.state;
    if (editing) return;
    if (filterActive) {
      this.componentDidMount();
      return;
    }
    contacts = contacts.filter(
      (item) =>
        parse(item.contactDate.split("T")[0], "yyyy-MM-dd", new Date()) >
        subDays(new Date(), 14)
    );
    filterActive = true;
    filter = "lastTen";
    this.setState({
      contacts: contacts,
      filterActive: filterActive,
      filter: filter,
    });
  };

  filterLastMonth = () => {
    let { contacts, filterActive, editing, filter } = this.state;
    if (editing) return;
    if (filterActive) {
      this.componentDidMount();
      return;
    }
    contacts = contacts.filter(
      (item) =>
        parse(item.contactDate.split("T")[0], "yyyy-MM-dd", new Date()) >
        subMonths(new Date(), 1)
    );
    filterActive = true;
    filter = "lastMonth";
    this.setState({
      contacts: contacts,
      filterActive: filterActive,
      filter: filter,
    });
  };

  checkFilterActive = () => {
    return this.state.filterActive;
  };

  render() {
    return (
      <div className="container-fluid">
        <Helmet>
          <style>
            {"body { height: 100%; background-color: #322741; color: #ffffff }"}
          </style>
        </Helmet>
        <div className="row">
          <div className="col-md-12 col-lg-3 mt-4 text-center">
            <FontAwesomeIcon
              icon={faUserCircle}
              size="6x"
              className={styles.contactIcon}
            />
            <br></br>
            <span>Welcome</span>
            <br></br>
            <span>
              {this.state.firstName} {this.state.lastName}
            </span>
            <br></br>
            <span>
              <FontAwesomeIcon icon={faSignOutAlt} size="1x" />
            </span>
            &nbsp;&nbsp;&nbsp;
            <span>
              <Link to="/" onClick={this.handleLogout}>
                Logout
              </Link>
            </span>
          </div>

          <div className="col-md-12 col-lg-9 mt-4">
            <div className="container-fluid">
              <div className="row h-100">
                <div className="col-12 text-center text-sm-left">
                  <h2
                    style={{
                      color: "#FFFFFF",
                    }}
                  >
                    Contacts List
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-sm-3 col-lg-2 pt-2">
                  <button
                    className={
                      (this.state.filter === "lastTen" &&
                        styles.listingButtonsActive) ||
                      styles.listingButtons
                    }
                    onClick={this.filterLastTen}
                  >
                    Last 14 Days
                  </button>
                </div>
                <div className="col-12 col-sm-3 col-lg-2 pt-2">
                  <button
                    className={
                      (this.state.filter === "lastMonth" &&
                        styles.listingButtonsActive) ||
                      styles.listingButtons
                    }
                    onClick={this.filterLastMonth}
                  >
                    Last Month
                  </button>
                </div>
                <div className="col-12 col-sm-6 col-lg-8 text-center text-sm-left pt-2">
                  <FontAwesomeIcon
                    onClick={this.handleAddContactForm}
                    icon={faPlusCircle}
                    size="3x"
                    className={styles.addButton}
                  />
                </div>
              </div>
              <div className="row pt-3 pb-3">
                <div className="col-12">
                  <form id="contact_form"></form>
                  <table className="table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Location</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.contactFormToggle && (
                        <ContactForm
                          onContactSave={this.handleSave}
                          new={true}
                        />
                      )}
                      <ListingComponent
                        contacts={this.state.contacts}
                        handleDelete={this.handleDelete}
                        handleEditing={this.handleEditing}
                        onContactSave={this.handleSave}
                        checkContactFormToggle={this.checkContactFormToggle}
                        checkFilterActive={this.checkFilterActive}
                      />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
