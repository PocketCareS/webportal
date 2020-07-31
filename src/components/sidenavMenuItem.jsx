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
import "../css/sidenavMenuItem.css";
import { NavLink } from "react-router-dom";

class MenuItem extends Component {
  state = {
    icon: this.props.data.icon,
    text: this.props.data.text,
    link: this.props.data.link,
  };
  render() {
    return (
      <div>
        <NavLink
          to={this.state.link}
          activeClassName="menu-item-container-selected"
          className="menu-item-container"
          style={{ textDecoration: "none" }}
        >
          <i className={"m-3 menu-item-icon " + this.state.icon}></i>
          <span className="menu-item-text">{this.state.text}</span>
        </NavLink>
      </div>
    );
  }
}

export default MenuItem;
