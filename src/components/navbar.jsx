import React, { Component } from 'react';
import '../css/navbar.css';
import '../images/logo.png';

class Navbar extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img src={require('../images/logo.png')} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                    <span className="ml-2 navbar-title">PocketCare S</span>
                </a>
            </nav>
        );
    }
}

export default Navbar;