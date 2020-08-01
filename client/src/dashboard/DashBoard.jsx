import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import ListingComponent from './Listing';
import styles from './dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSpinner, faUserCircle, faHome } from '@fortawesome/free-solid-svg-icons'
import variables from './../env.variables'


export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }

        componentDidMount() {
            const url = "https://localhost:5000/api/users/checkToken";
            const data = { token: localStorage.getItem('token') }

            console.log(data)
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
                        <div className="mt-4">
                            <span className={styles.listingButtons} style={{ marginRight: "10px" }}>Last Ten Days</span>
                            <span className={styles.listingButtons}>Last Month</span>
                        </div>
                        <div className="w-100">
                            <ListingComponent></ListingComponent>
                        </div>

                    </div>
                </div>



            );


        }
    }
}