import React, { Component } from "react";
import "./css/main.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NYAnalytics from "./components/nyAnalyticsPage";
import ContactTracing from "./components/contactTracing";
import AnalyticsPage from "./components/analyticsPage";
import GeoFencing from "./components/geoFencing";
import University from "./components/university";
import Navbar from "./components/navbar";
import Select from "react-select";

class Main extends Component {
  state = {
    isVisible: false,
    isSideNavVisible: false,
    isUnivDropDownVisible: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
      isSideNavVisible: false,
      isUnivDropDownVisible: false,
      scaryAnimals: [
        { label: "University at Buffalo", value: 1 },
        { label: "Empire State College", value: 2 },
        { label: "Hudson Valley Community College", value: 3 },
        { label: "Farmingdale State College", value: 4 },
        { label: "Genesee Community College", value: 5 },
        { label: "Herkimer County Community College", value: 6 },
      ],
    };
  }

  toggleSidenav = () => {
    this.setState({ isSideNavVisible: !this.state.isSideNavVisible });
  };

  getValueOfSelectOne = (value) => {
    console.log(value);
  };

  render() {
    return (
      <React.Fragment>
        <Navbar
          isVisible={this.isVisible}
          toggleSidenav={this.toggleSidenav}
          isUnivDropDownVisible={this.isUnivDropDownVisible}
        />
        <div className="h-100 row align-items-center justify-content-center">
          <div className="dropdown border border-secondary">
            <div className="app dropdown-container align-items-center text-center justify-content-center">
              <div className="container dropdown">
                <Select
                  options={this.state.scaryAnimals}
                  onChange={(opt) => console.log(opt.label, opt.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
