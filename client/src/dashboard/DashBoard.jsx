import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import ListingComponent from './Listing';
import styles from './dashboard.module.css';

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

                    <div className={[styles.leftSideBar, styles.border].join(" ")}>LeftSidebar</div>
                    <div className={[styles.rightSideBar, styles.border].join(" ")}>
                        <ListingComponent></ListingComponent>
                    </div>
                </div>



            );


        }
    }
}