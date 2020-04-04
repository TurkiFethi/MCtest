import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
    
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="main-wrapper account-wrapper">
        <div className="account-page">
          <div className="account-center">
            <div className="account-box">
             <form noValidate onSubmit={this.onSubmit} className="form-signin">
                <div className="account-logo">
                  <Link to="/">
                    <img src={require("../img/logo-dark.png")} alt="" />
                  </Link>
                </div>
                <div className="form-group"> 
                         
                  <label htmlFor="email">Email</label>
                  <input
                    autofocus=""
                    onChange={this.onChange}
                    value={this.state.email}
                    placeholder="your email"
                    id="email"
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email 
                    })}
                  />

                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>

                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    placeholder="Your password"
                    id="password"
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password 
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                {/* <div className="form-group text-right">
                            <a href="forgot-password.html">Forgot your password?</a>
                        </div> */}
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary account-btn">
                    Login
                  </button>
                </div>
                <div className="text-center register-link">
                  Don’t have an account?{" "}
                  <Link to="/register">Register Now</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
