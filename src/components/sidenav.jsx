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
 */ import React, { Component } from "react";

import MenuItem from "./sidenavMenuItem";
import "../css/sidenav.css";

class Sidenav extends Component {
  state = {
    menuItems: [
      {
        title: "University Data",
        data: [
          {
            id: 1,
            icon: "fa fa-line-chart",
            text: "Analytics",
            link: "/analytics",
          },
          // { id: 2, icon: 'fa fa-map-marker', text: 'Geo Fencing', link: '/geoFencing' }
          {
            id: 2,
            icon: "fa fa-users",
            text: "Contact Tracing",
            link: "/tracing",
          },
        ],
      },
      {
        title: "State Data",
        data: [
          {
            id: 3,
            icon: "fa fa-bar-chart",
            text: "NY Analytics",
            link: "/nyAnalytics",
          },
        ],
      },
    ],
  };

  render() {
    return (
      <div
        className={
          "sidenav-body " +
          (this.props.isSideNavVisible ? "" : "sidenav-hidden")
        }
      >
        <div className="menu-logo-container">
          <img
            className="logo"
            src={require("../images/logo.png")}
            alt=""
            loading="lazy"
          />
        </div>
        <div className="menu-items-container">
          {this.state.menuItems.map((item) => (
            <React.Fragment>
              <span className="item-title">{item.title}</span>
              <span>
                {item.data.map((data) => (
                  <MenuItem data={data} />
                ))}
              </span>
              <p className="mt-2"></p>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
}

export default Sidenav;
