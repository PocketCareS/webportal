import React, { Component } from "react";
import "./css/welcome.css";
import { Route, Switch, Redirect, Link, NavLink } from "react-router-dom";
import NYAnalytics from "./components/nyAnalyticsPage";
import ContactTracing from "./components/contactTracing";
import AnalyticsPage from "./components/analyticsPage";
import GeoFencing from "./components/geoFencing";
import University from "./components/university";
import Navbar from "./components/navbar";
import Select from "react-select";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./login";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class Welcome extends Component {
  state = {
    universityOptions: [
      { label: "University at Buffalo", value: 1, link: "/analytics" },
      { label: "Empire State College", value: 2, link: "/analytics" },
      {
        label: "Hudson Valley Community College",
        value: 3,
        link: "/analytics"
      },
      { label: "Farmingdale State College", value: 4, link: "/analytics" },
      { label: "Genesee Community College", value: 5, link: "/analytics" },
      {
        label: "Herkimer County Community College",
        value: 6,
        link: "/analytics"
      }
    ],
    universitySelected: ""
  };

  toggleSidenav = () => {
    this.setState({ isSideNavVisible: !this.state.isSideNavVisible });
  };

  getValueOfSelectOne = value => {
    console.log(value);
  };

  handleOnChcange = opt => {
    this.setState({ universitySelected: opt });
    console.log("onChange " + opt);
  };

  handleOnSubmit = () => {
    cookies.set("university", this.state.universitySelected.label);
    console.log(this.state.universitySelected);
  };

  render() {
    return (
      <div className="container parent-container">
        <p className="welcome-title">Welcome to PocketCare S</p>
        <div className="menu-logo-container">
          <img
            className="logo-welcome"
            src={require("./images/logo.png")}
            alt=""
            loading="lazy"
          />
        </div>
        {/* <div className="h-100 row align-items-center justify-content-center"> */}

        <div className="dropdown-primary-container">
          <div className="app dropdown-container align-items-center text-center justify-content-center">
            <div className="container dropdown">
              <label id="dropdown-label">Select university to begin</label>
              <Select
                options={this.state.universityOptions}
                onChange={opt => this.handleOnChcange(opt)}
              />
            </div>
            {this.state.universitySelected ? (
              <NavLink to={"/login"}>
                <button
                  type="button"
                  className="mt-3 welcome-search btn btn-outline-secondary"
                  onClick={this.handleOnSubmit}
                >
                  Search
                </button>
              </NavLink>
            ) : (
              ""
            )}
          </div>
        </div>

        <Switch>
          <Route
            exact
            path="/login"
            component={props => (
              <LoginPage
                {...props}
                university={this.state.universitySelected}
              />
            )}
          />
          {/* <Route path="/geoFencing" component={GeoFencing} /> */}
          {/* <Route exact path="/nyanalytics" component={NYAnalytics} />
          <Route exact path="/tracing" component={ContactTracing} /> */}
          {/* <Redirect from="/" to="/analytics" /> */}
        </Switch>
      </div>
    );
  }
}

export default Welcome;
