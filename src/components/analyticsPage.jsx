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
import "../css/analyticsPage.css";
import ChartContainer from "./chartContainer";
import CloseContactDistribution from "../charts/closeContactDistribution";
import HourlyCloseContactDistribution from "../charts/hourlyCloseContactDistribution";
import TotalContactDuration from "../charts/totalContactDuration";
import HourlyTotalContactDuration from "../charts/hourlyTotalContactDuration";
import NumberOfUsers from "../charts/numberOfUsers";
import OverviewCard from "./overviewCard";
import axios from "axios";
import moment from "moment";
import HealthStatusTrend from "../charts/healthStatusTrend";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class AnalyticsPage extends Component {
  state = {};

  constructor(props) {
    super(props);
    cookies.get("usertoken");
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
    targetStartDateTime.setDate(targetStartDateTime.getDate() - 15);
    this.state = {
      startDateEpoch: targetStartDateTime.valueOf(),
      endDateEpoch: targetEndDateTime,
      redirect: false,
      healthCardData: {
        header: "",
        date: "",
        data: [],
      },
      hourlyGraphs: [
        {
          title: "Number of Close Encounters Today (Hourly)",
          graphClass: "HourlyCloseContactDistribution",
        },
        {
          title: "Total Duration of Close Encounters Today (Hourly)",
          graphClass: "HourlyTotalContactDuration",
        },
      ],
      graphs: [
        {
          title: "Number of Close Encounters (Daily)",
          graphClass: "CloseContactDistribution",
        },
        {
          title: "Total Duration of Close Encounters (Daily)",
          graphClass: "TotalContactDuration",
        },
        {
          title: "Number of Users on campus (Daily)",
          graphClass: "NumberOfUsers",
        },
      ],
    };
  }

  async componentDidMount() {
    const response = await axios.get(
      "https://pcpprd-app.acsu.buffalo.edu/analytics/health?startDate=" +
        this.state.startDateEpoch +
        "&endDate=" +
        this.state.endDateEpoch,
      { headers: { token: cookies.get("userToken") } }
    );
    //   .then(results => {
    //     if (results.status === 401) {
    //       this.setState({ redirect: true });
    //     }
    //   });
    const status = response === 401;
    const latestData =
      response.data.dateWiseHealthAnalytics[this.state.endDateEpoch];
    const totalUsers = {
      title: "Total Users",
      value: latestData.totalUsers,
    };
    const filled = {
      title: "Health Reports Available",
      value: latestData.filled,
    };
    const healthy = {
      title: "Healthy",
      value: latestData.healthy,
    };
    const unhealthy = {
      title: "Unhealthy",
      value: latestData.notHealthy,
    };
    let healthCardData = { ...this.state.healthCardData };
    healthCardData.header = "Overview";
    healthCardData.date = moment(new Date(this.state.endDateEpoch)).format(
      "D MMMM YYYY"
    );
    healthCardData.data.push(totalUsers);
    healthCardData.data.push(filled);
    healthCardData.data.push(healthy);
    healthCardData.data.push(unhealthy);
    this.setState({ healthCardData });
    this.setState({ redirect: false });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { status: "401" },
          }}
        />
      );
    }
    cookies.get("usertoken");
    return (
      <React.Fragment>
        <p className="title">Health Status</p>
        <div className="analytics-page-container row">
          <div className="col-xl-3">
            <OverviewCard cardData={this.state.healthCardData} />
          </div>
          <div className="col-xl-9">
            <ChartContainer title={"Health Status - Trend"}>
              <HealthStatusTrend />
            </ChartContainer>
          </div>
        </div>
        <p className="title">Hourly Analytics</p>
        <div className="analytics-page-container row">
          {this.state.hourlyGraphs.map((graph) => (
            <div className="col-xl-6">
              <ChartContainer title={graph.title}>
                {this.graphToRender(graph)}
              </ChartContainer>
            </div>
          ))}
        </div>
        <p className="title">Daily Analytics</p>
        <div className="analytics-page-container row">
          {this.state.graphs.map((graph) => (
            <div className="col-xl-6">
              <ChartContainer title={graph.title}>
                {this.graphToRender(graph)}
              </ChartContainer>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }

  graphToRender = (graph) => {
    if (graph.graphClass === "CloseContactDistribution")
      return (
        <CloseContactDistribution
          startDateEpoch={this.state.startDateEpoch}
          endDateEpoch={this.state.endDateEpoch}
        />
      );
    else if (graph.graphClass === "TotalContactDuration")
      return (
        <TotalContactDuration
          startDateEpoch={this.state.startDateEpoch}
          endDateEpoch={this.state.endDateEpoch}
        />
      );
    else if (graph.graphClass === "HourlyCloseContactDistribution")
      return (
        <HourlyCloseContactDistribution
          startDateEpoch={this.state.startDateEpoch}
          endDateEpoch={this.state.endDateEpoch}
        />
      );
    else if (graph.graphClass === "HourlyTotalContactDuration")
      return (
        <HourlyTotalContactDuration
          startDateEpoch={this.state.startDateEpoch}
          endDateEpoch={this.state.endDateEpoch}
        />
      );
    else if (graph.graphClass === "NumberOfUsers")
      return (
        <NumberOfUsers
          startDateEpoch={this.state.startDateEpoch}
          endDateEpoch={this.state.endDateEpoch}
        />
      );
  };
}

export default AnalyticsPage;
