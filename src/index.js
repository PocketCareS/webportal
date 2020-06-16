import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import SideNav from './components/sidenav';
import Navbar from './components/navbar';
import AnalyticsPage from './components/analyticsPage';

ReactDOM.render(
  <React.StrictMode>
    <div className="main-container">
      <Navbar />
      <div className="body-container row">
        <div className="body-sidenav">
          < SideNav />
        </div>
        <div className="body-content">
          <AnalyticsPage />
        </div>
      </div>


    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
