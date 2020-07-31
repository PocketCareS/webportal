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
import axios from "axios";
import { baseUrl } from "../constants";
import { getAllData } from "../services/contactTraceData";
import { convertToCSV } from "../services/csvService";
import { exportCSVFile } from "../services/csvService";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
class ContactTracing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      value: "Enter COVID-19 infected patient's App-Client ID for tracing",
      data: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // alert("All devices notified successfully!");
    console.log(this.state.value);
    this.componentDidMount();
    event.preventDefault();
  }

  updateNotified = () => {};

  disableButton = () => {};

  handleNotifyAll = () => {
    var headers = {
      deviceId: "App-Client-ID".replace(/,/g, ""), // remove commas to avoid errors
      date: "Date",
      duration: "Max Duration of Single Encounter Session",
      totalDuration: "Total Duration of Encounter",
      totalEncounters: "Number of Encounters",
      contactInformation: "Other Encounter details",
    };

    exportCSVFile(headers, this.state.data, "tracedData");
  };

  handleNotify = (deviceId) => {
    this.componentDidMountNotify(deviceId);
  };

  async componentDidMountNotify(deviceId) {
    const deviceIdList = [];
    deviceIdList.push(deviceId);
    try {
      await fetch(baseUrl + "/analytics/tracing/notify", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: cookies.get("userToken"),
        },

        body: JSON.stringify({
          deviceIds: deviceIdList,
        }),
      })
        .then((response) => response.json())
        .then((result) => this.setState({ notifyResult: result }))
        .catch((error) => this.setState({ error: error }));
    } catch (e) {
      console.log("error", e);
      this.setState({ error: e });
    }
    console.log(this.state.notifyResult);
    alert("User has been notified");
    if (this.state.notifyResult === undefined) {
      let fieldErrors = {};
      fieldErrors["Error"] = "Please try again";
      this.setState({ fieldErrors: fieldErrors });
    }
  }

  // Column 1 : User Index
  // Column 2: First Contact Date - sortable
  // Column 3: First Contact Duration -  sortable
  // Column 4 : Max Contact Duration - on the first line,  and (Single Session) - on the 2nd line; - this is sortable I assume
  // Column 5:  Max Contact Date   - no need to be sortable.
  // Column 6: Last Contact Duration - on the first line,  and (Single Session) - on the 2nd line; - this is sortable I assume
  // Column 7:  Last Contact Date   - no need to be sortable.
  // Column 8: Total Contact Duration - on the first line,  and (All Sessions) - on the 2nd line; - this is sortable I assume
  // Column 9: Total # of Sessions -  - no need to be sortable.
  // Column 10 : Symptoms Reported?  { the content could be N/A, No, or Yes).
  // Column 11:  Symptom Date {the content could be N/Al)
  // Column 12:  Last Health Report Date {this could be different from Column 11)
  // Column 13:  Export Data  -  on the first line and (Detailed)
  // Column 14   Notified ? ( Yes, No)

  async componentDidMount() {
    const response = await axios.get(
      baseUrl + "/analytics/contactTracing?deviceId=" + this.state.value,
      { headers: { token: cookies.get("userToken") } }
    );
    const status = response === 401;
    const responseData = [];
    Object.entries(response.data).map(([key, value]) => {
      const fullDate = new Date(value.date * 1);
      const element = {};
      element.deviceId = key;
      element.date =
        fullDate.getMonth() +
        "/" +
        fullDate.getDate() +
        "/" +
        fullDate.getFullYear();
      element.duration = value.maxContactDuration;
      element.totalDuration = value.totalContactDuration;
      element.totalEncounters = value.encounterCount;
      element.contactInformation = JSON.stringify(value.contactInformation);
      element.firstContactDate = "N/A";
      element.firstContactDuration = "N/A";
      element.lastContactDate = "N/A";
      element.lastContactDuration = "N/A";
      element.symptomsDate = "N/A";
      element.symptomsReported = "N/A";
      element.lastHealthReportDate = "N/A";
      responseData.push(element);
    });
    this.setState({ data: responseData });
    //this.setState({ data: getAllData() });
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
    return (
      <React.Fragment>
        <div className="analytics-page-container ">
          <h3>Contact Tracing</h3>

          <form onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col">
                <input
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  placeholder={this.state.value}
                  aria-label="Device Id"
                  aria-describedby="basic-addon2"
                  required
                />
              </div>
              <div className="col col-lg-2">
                <input
                  className="btn btn-secondary"
                  type="submit"
                  value="Start Tracing"
                />
              </div>
            </div>
          </form>

          {this.state.data.length === 0 ? (
            <p>"There are no contacts made for the given device!"</p>
          ) : (
            <React.Fragment>
              <p>
                Showing information of total {this.state.data.length} devices
                who had close encounters with the given device.
              </p>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>

                    <th scope="col">First Contact Duration (in mins)</th>

                    <th scope="col">Last Contact Duration (in mins)</th>

                    <th scope="col">Max Contact Duration (in mins)</th>

                    <th scope="col">Total Contact Duration (in mins)</th>
                    <th scope="col">Total Sessions</th>
                    <th scope="col">Symptoms Reported</th>
                    <th scope="col">Last Health Reported Date</th>
                    <th>
                      <button
                        onClick={this.handleNotifyAll}
                        className="btn btn-danger btn-sm"
                      >
                        Export Data
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((d, index) => (
                    <tr key={d.deviceId}>
                      <td>{index + 1}</td>

                      <td>
                        {d.firstContactDuration}
                        <br></br>({d.firstContactDate})
                      </td>
                      <td>
                        {d.lastContactDuration}
                        <br></br>({d.lastContactDate})
                      </td>
                      <td>
                        {d.duration}
                        <br></br>({d.date})
                      </td>
                      <td>{d.totalDuration}</td>
                      <td>{d.totalEncounters}</td>
                      <td>
                        {d.symptomsReported}
                        <br></br>({d.symptomsDate})
                      </td>
                      <td>{d.lastHealthReportDate}</td>
                      <td>
                        {index === 1 || index === 5 ? (
                          <button
                            onClick={() => this.handleNotify(d.deviceId)}
                            className="btn btn-sm btn-success"
                          >
                            Notifiied
                          </button>
                        ) : (
                          <button
                            onClick={() => this.handleNotify(d.deviceId)}
                            className="btn btn-sm btn-danger"
                          >
                            Notify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default ContactTracing;
