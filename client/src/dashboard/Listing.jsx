import React, { Component, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { Switch } from 'antd';


const tableColumn = {
  width: '100px'

}
export default class ListingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleValue: false
    };
  }


  render() {
    return (
      <div>
        <div className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4" style={{ backgroundColor: "#2E2439", color: "#DFDFDF", height: "24px" }}>
          <div style={tableColumn}>name</div>
          <div style={tableColumn}>date</div>
          <div style={tableColumn}>location</div>
          <div style={tableColumn}>corona status</div>
          <div style={tableColumn}>edit</div>
        </div>


        <div className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4" style={{ color: "#DFDFDF", height: "24px" }}>
          <div style={tableColumn}>Fransisco</div>
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