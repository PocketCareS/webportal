import './App.css';
import React, { Component } from 'react';
import SideNav from './components/sidenav';
import Navbar from './components/navbar';
import AnalyticsPage from './components/analyticsPage';
import GeoFencing from './components/geoFencing';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  state = {}
  render() {
    return (
      <div className="main-container">
        <Navbar />
        <div className="body-container row">
          <div className="body-sidenav">
            < SideNav />
          </div>
          <div className="body-content">
            <Switch>
              <Route path="/analytics" component={AnalyticsPage} />
              <Route path="/geoFencing" component={GeoFencing} />
              <Redirect from="/" to="/analytics" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
