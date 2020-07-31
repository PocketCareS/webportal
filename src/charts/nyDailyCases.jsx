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

class NYDailyCases extends Component {
  state = {
    data: [],
  };

  async componentDidMount() {
    const response = await axios.get(
      "https://covidtracking.com/api/states/daily"
    );
    const nyData = response.data.filter((data) => data.state === "NY");
    let nyDailyData = [];
    nyData.map((data) => {
      const currDate = moment(data.date.toString())
        .subtract(1, "days")
        .toDate();
      const currPoint = {
        x: currDate,
        y: data.positiveIncrease,
      };
      nyDailyData.push(currPoint);
    });
    this.setState({ data: nyDailyData });
  }

  render() {
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
          text: "New Cases",
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
          name: "",
          data: this.state.data,
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

export default NYDailyCases;
