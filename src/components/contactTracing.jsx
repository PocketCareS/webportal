import React, { Component } from "react";
import "../css/analyticsPage.css";
import { getAllData } from "../services/contactTraceData";

class ContactTracing extends Component {
  state = {
    data: getAllData(),
  };

  handleNotify = (device) => {
    alert("Notification sent successfully!");
  };

  handleNotifyAll = () => {
    alert("All devices notified successfully!");
    console.log(this.state.data);
  };

  updateNotified = () => {};

  disableButton = () => {};

  render() {
    // const { length: count } = this.state.data.length;
    if (this.state.data.length === 0)
      return <p>"There are no contacts made for the given device!"</p>;
    return (
      <React.Fragment>
        <div class="analytics-page-container ">
          <h3>Contact Tracing</h3>

          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Enter Infected user's deviceId"
              aria-label="Device Id"
              aria-describedby="basic-addon2"
              required
            />
            <div class="input-group-append">
              <button class="btn btn-secondary" type="button">
                Start Tracing
              </button>
            </div>
          </div>

          <p>
            Showing {this.state.data.length} devices who had close encounters.
          </p>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">date</th>
                <th scope="col">Duration</th>
                {/* <th scope="col">Duration</th> */}
                <th scope="col">ZipCode</th>
                <th>
                  <button
                    onClick={this.handleNotifyAll}
                    className="btn btn-danger btn-sm"
                  >
                    Notify All
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((d, index) => (
                <tr key={d._id}>
                  <td>{index + 1}</td>
                  <td>{d.date}</td>
                  <td>{d.countTwo}</td>
                  {/* <td>{d.countTen}</td> */}
                  <td>{d.zipcode}</td>
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
        </div>
      </React.Fragment>
    );
  }
}
export default ContactTracing;
