import React, { Component } from 'react';
import '../css/navbar.css';
import '../images/logo.png';

class Navbar extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar fixed-top navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <span className="ml-2 navbar-title">PocketCare S</span>
                </a>
            </nav>
        );
    }
}

export default Navbar;