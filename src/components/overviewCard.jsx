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
import "../css/overviewCard.css";

class OverviewCard extends Component {
  state = {
    nyStateData: {},
  };

  render() {
    return (
      <div className="card bg-light mb-3">
        <div className="card-header">
          {this.props.cardData.header}
          <span className="date-value">{this.props.cardData.date}</span>
        </div>
        <div className="card-body">
          {this.props.cardData.data.map((data) => (
            <p className="card-text">
              {data.title} <span className="data-value">{data.value}</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default OverviewCard;
