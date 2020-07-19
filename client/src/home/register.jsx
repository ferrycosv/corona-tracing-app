import React, { Component } from 'react';

export default class Registration extends Component {
  
  render() {
    return (
      <div>
              <form onSubmit={this.onSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={null}
          onChange={this.handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={null}
          onChange={this.handleInputChange}
          required
        />
        <input type="submit" value="Submit"/>
      </form>

      </div>
    );
  }
}