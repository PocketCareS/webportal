import React, { Component } from 'react';
import '../css/navbar.css';
import '../images/logo.png';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar fixed-top navbar-light bg-light">
                <Link to='/analytics' className="navbar-brand" href="#">
                    <span className="ml-2 navbar-title">PocketCare S</span>
                </Link>
            </nav>
        );
    }
}

export default Navbar;