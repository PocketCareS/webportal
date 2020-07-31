/*
 * Copyright 2020 University at Buffalo
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component } from "react";
import "../css/navbar.css";
import "../images/logo.png";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";
const cookies = new Cookies();
class Navbar extends Component {
  constructor() {
    super();
    this.state = { redirect: false };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    if (event.target.value === "Logout") {
      cookies.remove("usertoken");
      cookies.remove("username");
      cookies.remove("university");
      this.setState({ redirect: true });
    }
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }
    console.log(this.props.isVisible);
    return (
      <nav className="navbar  navbar-expand-lg fixed-top navbar-light bg-light">
        <i
          className={
            "fa fa-bars fa-lg " +
            (this.props.isVisible ? "isVisible" : "isHidden")
          }
          aria-hidden="true"
          onClick={this.props.toggleSidenav}
        ></i>
        <Link
          to="/analytics"
          className={
            "navbar-brand " + (this.props.isVisible ? "ml-auto" : "mr-auto")
          }
          href="#"
        >
          <span className="ml-2 navbar-title">PocketCare S</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-angle-down"></i>
          {/* <span className="navbar-toggler-icon"></span> */}
        </button>
        <div
          className={"collapse navbar-collapse "}
          id="navbarSupportedContent"
        >
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

          <form
            className={
              "form-inline ml-auto " +
              (this.props.isUnivDropDownVisible ? "isVisible" : "isHidden")
            }
          >
            <div className="form-group ml-auto">
              {cookies.get("university") === "University at Buffalo" ? (
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.handleInputChange}
                >
                  <option>{cookies.get("university")} -All Campuses</option>
                  <option>{cookies.get("university")} -North Campus</option>
                  <option>{cookies.get("university")} -South Campus</option>
                  <option>{cookies.get("university")} -Downtown Campus</option>
                  <hr />
                  <option>Logout</option>
                </select>
              ) : (
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  onChange={this.handleInputChange}
                >
                  <option>{cookies.get("university")} -All Campuses</option>

                  <hr />
                  <option>Logout</option>
                </select>
              )}
              {/* <select
                className="form-control"
                id="exampleFormControlSelect1"
                onChange={this.handleInputChange}
              >
                
                    <option>{cookies.get("university")} -All Campuses</option>
                    <option>{cookies.get("university")} -North Campus</option>
                    <option>{cookies.get("university")} -South Campus</option>
                    <option>
                      {cookies.get("university")} -Downtown Campus
                    </option>
              
               
                  <option>{cookies.get("university")} -All Campuses</option>
                
                <hr />
                <option>Logout</option>
              </select> */}
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
