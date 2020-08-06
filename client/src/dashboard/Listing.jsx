import React, { Component, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Switch } from 'antd';


const tableColumn = {
  width: '100px'

}
export default class ListingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      toggleValue: false
    };
  }


  componentDidMount() {
    const userName = localStorage.getItem('userName');
    const url = `https://localhost:5000/api/users/${userName}/contacts`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ contacts: data })
      })
  }

  handleDelete = (id,e) => {
    console.log("id: " + id)
  }

  handleEdit = (id,e) => {
    console.log("editID "+ id )
  }

  render() {
    return (
      <>
        {this.state.contacts.map(x => {
          return <div key={x._id} className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4" style={{ color: "#DFDFDF", height: "24px" }}>
            <div style={tableColumn}>{x.fullName}</div>
            <div style={tableColumn}>{x.contactDate}</div>
            <div style={tableColumn}>{x.contactPlace}</div>
            <div style={tableColumn}>
              <Switch
                checked={x.state}
                onChange={() => "do nothing"}
                checkedChildren="infected"
                unCheckedChildren="uninfected"
              />
            </div>

            <div style={tableColumn}>
              <span onClick={(e) => this.handleDelete(x._id)} style={{ color: "red", marginRight: "10px", cursor: "pointer" }}>
                <FontAwesomeIcon icon={faTrash} size="1x" />
              </span>
              <span onClick={(e) => this.handleEdit(x._id)} style={{ color: "white", marginRight: "10px", cursor: "pointer" }}>
                <FontAwesomeIcon icon={faEdit} size="1x" />
              </span>
            </div>
          </div>

        }


        )
        }


      </>
    );
  }
}
