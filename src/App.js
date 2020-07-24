import "./App.css";
import React, { Component } from "react";
import SideNav from "./components/sidenav";
import Navbar from "./components/navbar";
import AnalyticsPage from "./components/analyticsPage";
import GeoFencing from "./components/geoFencing";
import { Route, Switch, Redirect } from "react-router-dom";
import NYAnalytics from "./components/nyAnalyticsPage";
import ContactTracing from "./components/contactTracing";
import Main from "./Main";

class App extends Component {
  state = {
    isVisible: false,
    isSideNavVisible: true,
    isUnivDropDownVisible: false,
  };

  constructor(props) {
    super(props);
    if (window.innerWidth < 1200) {
      this.state = {
        isVisible: true,
        isSideNavVisible: false,
        isUnivDropDownVisible: true,
      };
    } else {
      this.state = {
        isVisible: false,
        isSideNavVisible: true,
        isUnivDropDownVisible: true,
      };
    }
  }

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
    return (
      <div className="main-container">
        <Navbar
          isVisible={this.state.isVisible}
          toggleSidenav={this.toggleSidenav}
          isUnivDropDownVisible={this.isUnivDropDownVisible}
        />
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
              {/* <Route path="/geoFencing" component={GeoFencing} /> */}
              <Route path="/nyanalytics" component={NYAnalytics} />
              <Route path="/tracing" component={ContactTracing} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
