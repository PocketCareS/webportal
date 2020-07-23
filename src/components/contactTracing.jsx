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
      //   baseUrl +
      //     "/user/contactTracing?deviceId=" +
      //     this.state.value
      "https://jsonplaceholder.typicode.com/posts"
    );
    console.log(response);
    this.setState({
      data: response.data,
    });
    console.log("date: " + this.state.data);
  }

  render() {
    if (this.state.data.length === 0)
      return <p>"There are no contacts made for the given device!"</p>;
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
          <p>
            Showing information of total {this.state.data.length} devices who
            had close encounters with the given device.
          </p>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                {/* <th scope="col">#</th> */}
                {/* <th scope="col">date </th>
                <th scope="col">Max Single Session Duration</th>
                <th scope="col">Total Contact Duration (x no of contacts)</th> */}
                {/* <th scope="col">Ten Meter Duration</th> */}
                {/* <th scope="col">ZipCode</th> */}
                <th scope="col">Id </th>
                <th scope="col">UserId</th>
                <th scope="col">Title</th>
                <th scope="col">Body</th>
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
              {this.state.data.map((d) => (
                // <tr key={d._id}>
                //   <td>{index + 1}</td>
                //   <td>{d.date}</td>
                //   <td>{d.countTwo}</td>
                //   <td>{d.countTen}</td>
                // <td>{d.zipcode}</td>
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.userId}</td>
                  <td>{d.title}</td>
                  <td>{d.body}</td>
                  {/* <td>
                    <button
                      onClick={() => this.handleNotify(d)}
                      className="btn btn-danger btn-sm"
                    >
                      Notify
                    </button>
                  </td> */}
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
