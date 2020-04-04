import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getCurrentProfile, clearCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onLogoutClick() {
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { user } = this.props.auth;

    const { profile, loading } = this.props.profile;
    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent =
          <div className="main-wrapper">
            <div className="header">
              <div className="header-left">
                <Link to="/dashboard" className="logo">
                  <img src="assets/img/logo.png" width="35" height="35" alt="" />{" "}
                  <span>Preclinic</span>
                </Link>
              </div>
              <Link id="toggle_btn" to="javascript:void(0);">
                <i className="fa fa-bars"></i>
              </Link>
              <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar">
                <i className="fa fa-bars"></i>
              </a>
              <ul className="nav user-menu float-right">
                <li className="nav-item dropdown has-arrow">
                  <a href="#"
                    className="dropdown-toggle nav-link user-link"
                    data-toggle="dropdown">
                    <span className="user-img">
                      <img
                        className="rounded-circle"
                        src={user.avatar}
                        width="24"
                        alt="Admin"
                      />
                      <span className="status online"></span>
                    </span>
                    <span> {user.name} </span>
                    {/* <span>{console.log('test user',user)}</span> */}
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/dashboard/profile">
                      My Profile
                  </Link>
                    <Link className="dropdown-item" to="/dashboard/editprofile">
                      Edit Profile
                  </Link>

                    <Link
                      to="/"
                      onClick={this.onLogoutClick.bind(this)}
                      className="dropdown-item">Logout
                  </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className="sidebar" id="sidebar">
              <div className="sidebar-inner slimscroll">
                <div id="sidebar-menu" className="sidebar-menu">
                  <ul>
                    <li className="menu-title">Main</li>
                    <li className="active">
                      <Link to="/dashboard" >
                        <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                      </Link>
                    </li>
                    <li className="submenu">
                      <Link to="/dashboard/patients">
                        <i className="fa fa-wheelchair"></i> <span> Patients </span>
                        <span className="menu-arrow"></span>
                      </Link>
                      <ul style={{ display: "none;" }}>
                        <li>
                          <Link to="/dashboard/patients">Patient List</Link>
                        </li>
                        <li>
                          <Link to="/dashboard/Addpatient">Add Patient</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="/dashboard/Rendezvous">
                        <i className="fa fa-calendar"></i> <span>Appointments</span>
                      </Link>
                    </li>
                    <li className="submenu">
                      <Link to="#">
                        <i className="fa fa-envelope"></i> <span> Email</span>{" "}
                        <span className="menu-arrow"></span>
                      </Link>
                      <ul style={{ display: "none;" }}>
                        <li>
                          <Link to="compose.html">Compose Mail</Link>
                        </li>
                        <li>
                          <Link to="inbox.html">Inbox</Link>
                        </li>
                        <li>
                          <Link to="mail-view.html">Mail View</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="calendar.html">
                        <i className="fa fa-calendar"></i> <span>Calendar</span>
                      </Link>
                    </li>
                    
                  </ul>


                </div>
              </div>

              {console.log(profile.patient)}
            </div>

          </div>

          ;
      } else {
        // User is logged in but has no profile
        dashboardContent = (
         <div className="main-wrapper account-wrapper">
          <div className="account-page">
            <div className="account-center">
              <div className="account-box">
              <h4 className="page-title">Welcome {user.name}</h4>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/dashboard/editprofile" className="btn btn-primary">
                Create Profile
              </Link>
              </div>
            </div>
          </div>
        </div>
        );
      }
    }

    return (
      <div>
        {dashboardContent}
      </div>
    );
  }
}
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});


export default connect(mapStateToProps, { logoutUser, getCurrentProfile, clearCurrentProfile })(Dashboard);


