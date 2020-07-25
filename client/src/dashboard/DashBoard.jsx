import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ListingComponent from './Listing';
import styles from './dashboard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSpinner, faUserCircle, faHome } from '@fortawesome/free-solid-svg-icons'


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
            fetch('/api/checkToken')
                .then(res => {
                    if (res.status === 200) {
                        this.setState({ loading: false });
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.error(err);
                    //ignore redirect and load the page... when the jwt token enpoint created should be set to;
                    //this.setState({ loading: false, redirect: true });
                    this.setState({ loading: false, redirect: false });
                });
        }


        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (

                <div className={[styles.container, styles.border].join(" ")}>

                    <div className={[styles.leftSideBar, styles.border, styles.center].join(" ")}>
                        <div className="text-center text-light mb-3"><FontAwesomeIcon icon={faUserCircle} size="6x" /></div>
                        <div className={styles.leftlinks}>
                            <span><FontAwesomeIcon icon={faHome} size="1x" /></span>&nbsp;&nbsp;&nbsp;
                            <span><a href="#" >home</a></span>
                        </div>

                    </div>
                    <div className={styles.rightSideBar}>
                        <div className="mt-5"><span style={{ fontSize: "16px", color: "#FFFFFF",fontWeight:600 }}>Contact List</span></div>
                        <div className="mt-4">
                            <span className={styles.listingButtons} style={{marginRight: "10px"}}>Last Ten Days</span>
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