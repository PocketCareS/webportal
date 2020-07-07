import React, { Component } from 'react';
import '../css/navbar.css';
import '../images/logo.png';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {}
    render() {
        console.log(this.props.isVisible)
        return (
            <nav className="navbar fixed-top navbar-light bg-light">
                <i className={"fa fa-bars fa-lg " + (this.props.isVisible ? "isVisible" : "isHidden")} aria-hidden="true" onClick={this.props.toggleSidenav}></i>
                <Link to='/analytics' className={"navbar-brand " + (this.props.isVisible ? "ml-auto" : "mr-auto")} href="#">
                    <span className="ml-2 navbar-title">PocketCare S</span>
                </Link>
            </nav>
        );
    }
}

export default Navbar;