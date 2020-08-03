import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import ListingComponent from './Listing';
import ContactForm from './ContactForm'
import styles from './dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSpinner, faUserCircle, faHome, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import variables from './../env.variables'

const tableColumn = {
    width: '100px'

}
export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
                contactFormToggle: false,
                version: 0,
            };
        }

        componentDidMount() {
            const url = "https://localhost:5000/api/users/checkToken";
            const data = { token: localStorage.getItem('token') }

            fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            }).then(res => {
                if (res.status === 200) {
                    this.setState({ loading: false });
                }
                else {
                    const error = new Error(res.error);
                    throw error;
                }

            }).catch(err => {
                console.error(err);
                this.setState({ loading: false, redirect: true });
            });
        }

        handleAddContactForm = event => {
            const {contactFormToggle} = this.state;
            this.setState({contactFormToggle: !contactFormToggle})
        }

        updateVersion = () => {
            let version = this.state.version;
            version++;

            this.setState({
                version: version
            })
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/" />;
            }
            return (

                <div className={styles.container}>

                    <div className={[styles.leftSideBar, styles.center].join(" ")}>
                        <div className="text-center text-light mb-3"><FontAwesomeIcon icon={faUserCircle} size="6x" /></div>
                        <div className={styles.leftlinks}>
                            <span><FontAwesomeIcon icon={faHome} size="1x" /></span>&nbsp;&nbsp;&nbsp;
                            <span><Link to="/">Home</Link></span>
                        </div>

                    </div>
                    <div className={styles.rightSideBar}>
                        <div className="mt-5"><span style={{ fontSize: "16px", color: "#FFFFFF", fontWeight: 600 }}>Contact List</span></div>
                        <div className="mt-4 d-flex row flex-nowrap align-items-center">
                            <div className={styles.listingButtons} style={{ marginRight: "10px" }}>Last Ten Days</div>
                            <div className={styles.listingButtons}>Last Month</div>
                            <div className="flex-grow-1 text-right pr-5" style={{color:"#0ED199"}}><FontAwesomeIcon onClick={this.handleAddContactForm} icon={faPlusCircle} size="3x" /></div>
                        </div>
                        <div className="w-100">
                            <div className="d-flex flex-row w-100 justify-content-between p-3 align-items-center mt-4" style={{ backgroundColor: "#2E2439", color: "#DFDFDF", height: "24px" }}>
                                <div style={tableColumn}>name</div>
                                <div style={tableColumn}>date</div>
                                <div style={tableColumn}>location</div>
                                <div style={tableColumn}>corona status</div>
                                <div style={tableColumn}>edit</div>
                            </div>

                        </div>

                        {this.state.contactFormToggle ? (<ContactForm onContactSubmitted={this.updateVersion} />) : ""}

                        <ListingComponent key={`version_${this.state.version}`} />


                    </div>
                </div>



            );


        }
    }
}