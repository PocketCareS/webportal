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
import "../css/chartContainer.css";

class ChartContainer extends Component {
  state = {
    title: this.props.title,
    graphToDisplay: this.props.graphToDisplay,
  };
  render() {
    return (
      <div className="chart-container">
        <div className="chart-container-title">{this.state.title}</div>
        <div className="chart-container-body">{this.props.children}</div>
      </div>
    );
  }
}

export default ChartContainer;
