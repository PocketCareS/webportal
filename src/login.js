import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
import { strict } from "assert";
import Main from "./main";
import App from "./App";
import { baseUrl } from "./constants";
import "./css/login.css";
import { Link } from "react-router-dom";
import AnalyticsPage from "./components/analyticsPage";
import NYAnalytics from "./components/nyAnalyticsPage";
import ContactTracing from "./components/contactTracing";

const cookies = new Cookies();

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false,
      fieldErrors: "",
      loginResult: "",
      errror: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateFields = e => {
    e.preventDefault();
    let fieldErrors = {};
    let isValid = true;
    if (!this.state.email) {
      isValid = false;
      fieldErrors["email"] = "Please enter Email ID";
    }

    if (!this.state.password) {
      isValid = false;
      fieldErrors["password"] = "Please enter Password";
    }

    console.log(fieldErrors);
    console.log(isValid);
    this.setState({ fieldErrors: fieldErrors });
    if (isValid || !isValid) this.handleSubmit();
  };

  enterPressed(event) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.validateFields(event);
    }
  }

  // async handleSubmit() {
  //   this.setState({ redirect: true });
  // }

  async handleSubmit() {
    try {
      await fetch(baseUrl + "/analytics/login", {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        },

        body: JSON.stringify({
          userName: this.state.email,
          password: this.state.password
        })
      })
        .then(response => response.json())
        .then(result => this.setState({ loginResult: result }))
        .catch(error => this.setState({ error: error }));
    } catch (e) {
      console.log("error", e);
      this.setState({ error: e });
    }
    console.log(this.state.loginResult);
    if (this.state.loginResult.token === undefined) {
      let fieldErrors = {};
      fieldErrors["loginError"] =
        "Either username or password is incorrect. Please try again";
      this.setState({ fieldErrors: fieldErrors });
    } else {
      cookies.set("usertoken", this.state.loginResult.token, {
        maxAge: 60 * 60 * 3,
        sameSite: strict
      });
      cookies.set("username", this.state.email, {
        maxAge: 60 * 60 * 3,
        sameSite: strict
      });
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/app" />;
    }

    if (
      cookies.get("usertoken") !== undefined &&
      cookies.get("usertoken") !== "" &&
      this.props.location.state === undefined
    ) {
      return <Redirect to="/app" />;
    }
    // const {
    //   text,
    //   match: { params }
    // } = this.props;
    console.log(this.props);
    return (
      // <div className="container login-container w-75">
      <React.Fragment>
        <div className="outer-card-container">

          <div className="card-container ">
            <p className="login-title">Login - <span className="university-title">{cookies.get("university")}</span></p>
            <div className="card text-center">
              {/* <div className="col-md-6 login-form"> */}
              <div className="card-body">
                <div className="menu-logo-container">
                  <img
                    className="logo-welcome"
                    src={require("./images/logo.png")}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <p className="login-pocketcare">PocketCare S</p>
                <form>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      onKeyPress={this.enterPressed.bind(this)}
                      required
                    />
                    <span style={{ color: "red" }}>
                      {this.state.fieldErrors["email"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleChange}
                      onKeyPress={this.enterPressed.bind(this)}
                      required
                    />
                    <span style={{ color: "red" }}>
                      {this.state.fieldErrors["password"]}
                    </span>
                  </div>
                  <div className="form-group">
                    <input
                      type="button"
                      className="btn btn-primary btnSubmit"
                      value="Login"
                      onClick={this.validateFields}
                    />
                    <br></br>
                    <span style={{ color: "red" }}>
                      {this.state.fieldErrors["loginError"]}
                    </span>
                  </div>
                  {/* <div className="form-group">
                <a href="/forgotPassword" className="ForgotPwd">
                  Forgot Password?
                </a>
              </div> */}
                </form>
              </div>
            </div>
            <Link to="/" className="change-university"> Change University? </Link>
          </div>
          {/* <Switch>
          <Route path="/analytics" component={AnalyticsPage} />
          <Route path="/nyanalytics" component={NYAnalytics} />
          <Route path="/tracing" component={ContactTracing} />
        </Switch> */}

        </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
