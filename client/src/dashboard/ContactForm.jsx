import React, { Component, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { floppy, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { Switch } from 'antd';


const tableColumn = {
    width: '100px'

}
const inputStyle = {
    background: '#FFFFFF',
    border: '1px solid #CCCCCC',
    borderRadius: '15px'
}
const buttonStyle = {
    background: '#4C64E3',
    border: '1px solid #5248C6',
    borderRadius: '15px',
    padding: '2px 10px '
}
export default class ContactForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactForm: {
                fullName: '',
                contactDate: '',
                contactPlace: '',
                status: false
            }

        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            contactForm: { ...this.state.contactForm, [name]: value }
        }
        );
        console.log(this.state.contactForm)
    }

    handleSubmitClick = (event) => {
        console.log("save initialized")
        const userName = localStorage.getItem('userName');
        console.log("username is " + userName)
        fetch(`https://localhost:5000/api/users/${userName}/contacts`, {
            method: 'POST',
            body: JSON.stringify(this.state.contactForm),
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
                console.log("saved successfully")
                this.props.onContactSubmitted();
            });
    }

    render() {
        return (

            <div className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4" style={{ color: "#DFDFDF", height: "24px" }}>
                <div style={tableColumn}>
                    <input style={inputStyle}
                        id="fullName"
                        type="text"
                        name="fullName"
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <div style={tableColumn}>
                    <input style={inputStyle}
                        id="contactDate"
                        type="text"
                        name="contactDate"
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <div style={tableColumn}>
                    <input style={inputStyle}
                        id="contactPlace"
                        type="text"
                        name="contactPlace"
                        onChange={this.handleInputChange}
                        required
                    />
                </div>
                <div style={tableColumn}>
                    <Switch
                        checked={this.state.contactForm.status === true}
                        onChange={() => this.setState({ contactForm: { ... this.state.contactForm, status: this.state.contactForm.status ? false : true } })}
                        checkedChildren="infected"
                        unCheckedChildren="uninfected"
                    />
                </div>
                <div style={tableColumn}><button style={buttonStyle} onClick={this.handleSubmitClick}>save</button></div>
            </div>


        );
    }
}