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

import "./App.css";
import React, { Component } from "react";
import SideNav from "./components/sidenav";
import Navbar from "./components/navbar";
import AnalyticsPage from "./components/analyticsPage";
import GeoFencing from "./components/geoFencing";
import { Route, Switch, Redirect } from "react-router-dom";
import NYAnalytics from "./components/nyAnalyticsPage";
import ContactTracing from "./components/contactTracing";
import Welcome from "./welcome";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class App extends Component {
  state = {
    isVisible: false,
    isSideNavVisible: true,
    isUnivDropDownVisible: true,
    universitySelected: "University at Buffalo",
  };

  constructor(props) {
    super(props);
    if (window.innerWidth < 1200) {
      this.state = {
        isVisible: true,
        isSideNavVisible: false,
        isUnivDropDownVisible: true,
        universitySelected: "University at Buffalo",
        redirect: false,
      };
    } else {
      this.state = {
        isVisible: false,
        isSideNavVisible: true,
        isUnivDropDownVisible: true,
        universitySelected: "University at Buffalo",
        redirect: false,
      };
    }
  }
  logout = (e) => {
    cookies.remove("usertoken");
    cookies.remove("username");
    cookies.remove("university");
    this.setState({ redirect: true });
  };
  hideSidenav = () => {
    if (window.innerWidth < 1200) {
      this.setState({ isVisible: true, isSideNavVisible: false });
    } else {
      this.setState({ isVisible: false, isSideNavVisible: true });
    }
    console.log(this.state);
  };

  componentDidMount() {
    window.addEventListener("resize", this.hideSidenav);
  }

  toggleSidenav = () => {
    this.setState({ isSideNavVisible: !this.state.isSideNavVisible });
  };

  render() {
    if (
      cookies.get("usertoken") == undefined ||
      cookies.get("usertoken") === ""
    ) {
      return <Redirect to={"/"} />;
    }

    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }
    cookies.get("usertoken");
    return (
      <div className="main-container">
        <Navbar
          isVisible={this.state.isVisible}
          toggleSidenav={this.toggleSidenav}
          isUnivDropDownVisible={this.state.isUnivDropDownVisible}
        />

        <p>{this.universitySelected}</p>
        <div className="body-container row">
          <div className="body-sidenav">
            <SideNav isSideNavVisible={this.state.isSideNavVisible} />
          </div>

          <div
            className={
              "body-content " + (this.state.isVisible ? "body-left-align" : "")
            }
            style={
              this.state.isSideNavVisible && this.state.isVisible
                ? { opacity: 0.5 }
                : { opacity: 1 }
            }
          >
            <Switch>
              <Route path="/analytics" component={AnalyticsPage} />
              <Route path="/nyanalytics" component={NYAnalytics} />
              <Route path="/tracing" component={ContactTracing} />
              <Redirect exact from="/app" to="/analytics" />
              <Route path="/" component={AnalyticsPage} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
