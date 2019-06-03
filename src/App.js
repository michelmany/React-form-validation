import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ValidationService from "./services/ValidationService";

class App extends Component {
  state = {
    email: "",
    password: "",
    formErrors: {}
  };

  submit = evt => {
    evt.preventDefault();

    var response = ValidationService.validate({
      email: {
        value: this.state.email,
        rules: { required: true, validEmail: true }
      },
      password: {
        value: this.state.password,
        rules: { required: true, minLength: 5 }
      }
    });

    this.setState({
      formErrors: response ? response : {}
    });

    if (!response) {
      alert("It works!");
    }
  };

  changeHandler = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  render() {
    return (
      <div className="container">
        <br />
        <div className="col-md-6 m-auto">
          <h3 className="mb-5">Login</h3>
          <form onSubmit={this.submit} method="post">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                className="form-control"
                type="text"
                name="email"
                onKeyUp={this.changeHandler}
                placeholder="Enter email"
              />
              <small className="text-danger">
                {this.state.formErrors.hasOwnProperty("email")
                  ? this.state.formErrors.email[0]
                  : ""}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onKeyUp={this.changeHandler}
                placeholder="Password"
              />
              <small className="text-danger">
                {this.state.formErrors.hasOwnProperty("password")
                  ? this.state.formErrors.password[0]
                  : ""}
              </small>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
