import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div class="main-wrapper  account-wrapper">
        <div class="account-page">
          <div class="account-center">
            <div class="account-box">
              <form noValidate onSubmit={this.onSubmit} class="form-signin">
                <div class="account-logo">
                  <Link to="/">
                    <img src={require('../img/logo-dark.png')} alt="" />
                    </Link>
                </div>
                <div class="form-group">
                  <label htmlFor="name">Username</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.name}
                    id="name"
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.name
                    })}
                  />
                 {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div class="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    id="email"
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      'is-invalid': errors.email
                    })}
                  />
                   {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div class="form-group">
                  <label htmlFor="password">Password</label>
                  
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    
                    id="password"
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div class="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                 
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    
                    id="password2"
                    type="password"
                    className={classnames("form-control", {
                      "is-invalid": errors.password2
                    })}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                 <div class="form-group text-center">
                  <button class="btn btn-primary account-btn" type="submit">
                    Signup
                  </button>
                </div>
                <div class="text-center login-link">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
