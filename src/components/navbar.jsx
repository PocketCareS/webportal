import React, { Component } from 'react';

class Navbar extends Component {
    state = {}
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    <img src="" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                    PocketCare S
                </a>
            </nav>
        );
    }
}

export default Navbar;