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
import Highcharts from "highcharts";
import axios from "axios";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { baseUrl } from "../constants";

class NumberOfUsers extends Component {
  state = {};

  constructor(props) {
    super(props);
    const currentDate = new Date();
    let targetStartDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      12,
      0,
      0
    );
    const targetEndDateTime = targetStartDateTime.getTime();
    targetStartDateTime.setDate(targetStartDateTime.getDate() - 30);
    this.state = {
      startDateEpoch: targetStartDateTime.valueOf(),
      endDateEpoch: targetEndDateTime,
      data: {
        count: [],
      },
    };
  }

  async componentDidMount() {
    console.log(
      baseUrl +
        "/analytics/contactDataAll?startDate=" +
        this.state.startDateEpoch +
        "&endDate=" +
        this.state.endDateEpoch +
        "&contactType=close&graphType=number%20of%20users"
    );
    const response = await axios.get(
      "https://pcpprd-app.acsu.buffalo.edu/analytics/contactDataAll?startDate=" +
        this.state.startDateEpoch +
        "&endDate=" +
        this.state.endDateEpoch +
        "&contactType=close&graphType=number%20of%20users"
    );
    let count = [];
    Object.entries(response.data.aggregatedResponse).map(([key, value]) => {
      const currDate = new Date(key * 1);
      const userCount = {
        x: Date.UTC(
          currDate.getFullYear(),
          currDate.getMonth(),
          currDate.getDate()
        ),
        y: value.dailyNumberOfUsers,
      };
      count.push(userCount);
    });
    let data = { ...this.state.data };
    data.count = count;
    this.setState({ data });
  }

  render() {
    const count = this.state.data.count;
    const options = {
      chart: {
        type: "line",
      },
      title: {
        text: null,
      },

      yAxis: {
        offset: -10,
        title: {
          text: "User Count",
        },
        endOnTick: false,
      },

      xAxis: {
        type: "datetime",
        allowDecimals: false,
      },
      legend: {
        enabled: false,
      },

      plotOptions: {
        line: {
          marker: {
            enabled: false,
          },
        },
        series: {
          label: {
            connectorAllowed: true,
          },
        },
      },

      series: [
        {
          name: "Count",
          data: count,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
          },
        ],
      },
    };
    return (
      <HighchartsReact
        highcharts={Highcharts}
        containerProps={{ style: { height: "395px" } }}
        options={options}
      />
    );
  }
}

export default NumberOfUsers;
