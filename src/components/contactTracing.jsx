import React, { Component } from "react";
import "../css/analyticsPage.css";
import axios from "axios";
import { baseUrl } from "../constants";
import { getAllData } from "../services/contactTraceData";
import { convertToCSV } from "../services/csvService";
import { exportCSVFile } from "../services/csvService";

class ContactTracing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Enter Infected user's deviceId",
      data: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("All devices notified successfully!");
    console.log(this.state.value);
    this.componentDidMount();
    event.preventDefault();
  }

  updateNotified = () => {};

  disableButton = () => {};

  handleNotifyAll = () => {
    exportCSVFile("", this.state.data, "tracedData");
  };

  async componentDidMount() {
    const response = await axios.get(
      baseUrl + "/analytics/contactTracing?deviceId=" + this.state.value
    );
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
      responseData.push(element);
    });
    this.setState({ data: responseData });
  }

  render() {
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
                    <th scope="col">Date</th>
                    <th scope="col">Max Duration of Encounter</th>
                    <th scope="col">Total Duration of Encounter</th>
                    <th scope="col">Number of Encounters</th>
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
                      <td>{d.date}</td>
                      <td>{d.duration}</td>
                      <td>{d.totalDuration}</td>
                      <td>{d.totalEncounters}</td>
                      <td>
                        <button
                          onClick={() => this.handleNotify(d)}
                          className="btn btn-danger btn-sm"
                        >
                          Notify
                        </button>
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
