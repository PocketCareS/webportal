import React, { Component } from 'react';
import '../css/navbar.css';
import '../images/logo.png';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    state = {}
    render() {
        console.log(this.props.isVisible)
        return (
            <nav className="navbar  navbar-expand-lg fixed-top navbar-light bg-light">
                <i className={"fa fa-bars fa-lg " + (this.props.isVisible ? "isVisible" : "isHidden")} aria-hidden="true" onClick={this.props.toggleSidenav}></i>
                <Link to='/analytics' className={"navbar-brand " + (this.props.isVisible ? "ml-auto" : "mr-auto")} href="#">
                    <span className="ml-2 navbar-title">PocketCare S</span>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fa fa-angle-down"></i>
                    {/* <span className="navbar-toggler-icon"></span> */}
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Select Campus
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Another action</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Something else here</a>
                            </div>
                        </li>
                    </ul> */}
                    <form className="form-inline ml-auto">
                        <div className="form-group ml-auto">
                            <select className="form-control" id="exampleFormControlSelect1">
                                <option>University at Buffalo - All Campuses</option>
                                <option>North Campus</option>
                                <option>South Campus</option>
                                <option>Downtown Campus</option>
                            </select>
                        </div>
                    </form>
                </div>
            </nav>
        );
    }
}

export default Navbar;