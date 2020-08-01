import React, { Component, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { Switch } from 'antd';


const tableColumn = {
  width: '100px'

}
export default class ListingFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleValue: false,
      contactForm: {

      }
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      login: { ...this.state.login, [name]: value }
    }
    );
  }
  render() {
    return (
      <div>
      

        <div className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4" style={{ color: "#DFDFDF", height: "24px" }}>
          <div style={tableColumn}>
          <input
              id="name"
              type="name"
              name="name"
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div style={tableColumn}>23 July 2020</div>
          <div style={tableColumn}>Brussel / 60.55, 70,87</div>
          <div style={tableColumn}>
            <Switch
              checked={this.state.toggleValue === true}
              onChange={() => this.setState({ toggleValue: this.state.toggleValue ? false : true })}
              checkedChildren="infected"
              unCheckedChildren="uninfected"
            />
          </div>
          <div style={tableColumn}><FontAwesomeIcon icon={faEdit} size="1x" /></div>
        </div>

      </div>

    );
  }
}