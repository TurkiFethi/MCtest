import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { deleteAppointment ,getCurrentProfile} from '../../actions/profileActions';

class Showrendezvous extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(id) {
    this.props.deleteAppointment(id);
    
  }

  render() {
    const appointment = this.props.rendezvous.map(exp => (
        <tr key={exp._id}>
                                    <td>APT0001</td>
                                    <td><img width="28" height="28" src="assets/img/user.jpg" className="rounded-circle m-r-5" alt=""/> Denise Stevens</td>
                                    <td>35</td>
                                    <td>Henry Daniels</td>
                                    <td>Cardiology</td>
                                    <td>{exp.date}</td>
                                    <td>{exp.time}</td>
                                    <td><span className="custom-badge status-red">Inactive</span></td>
                                    <td className="text-right">
                                        <div className="dropdown dropdown-action">
                                            <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <Link className="dropdown-item" to="/dashboard/EditRendezvous"><i className="fa fa-pencil m-r-5"></i> Edit</Link>
                                                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_appointment"><i className="fa fa-trash-o m-r-5"></i> Delete</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
    //   <tr key={exp._id}>
    //     <td><img width="28" height="28" src="../assets/img/user.jpg" className="rounded-circle m-r-5" alt="" /> {exp.firstname} {exp.lastname}</td>
    //     <td>{exp.birthdate}</td>
    //     <td>{exp.address}</td>
    //     <td>{exp.phone}</td>
    //     <td>{exp.email}</td>
    //     {console.log('id=',exp._id)}
    //     <td className="text-right">
    //       <div className="dropdown dropdown-action">
    //         <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-ellipsis-v"></i></a>
    //         <div className="dropdown-menu dropdown-menu-right">
    //           <Link to={'/dashboard/editpatient/'+exp._id}  className="dropdown-item" ><i className="fa fa-pencil m-r-5"></i> Edit</Link>
    //           <button className="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient" onClick={this.onDeleteClick.bind(this, exp._id)}
    //             ><i className="fa fa-trash-o m-r-5"></i> Delete</button>
    //         </div>
    //       </div>
    //     </td>
    //   </tr>

     ))
    return (
        <div className="page-wrapper">
        <div className="content">
            <div className="row">
                <div className="col-sm-4 col-3">
                    <h4 className="page-title">Appointments</h4>
                </div>
                <div className="col-sm-8 col-9 text-right m-b-20">
                    <Link to="/dashboard/AddRendezvous" className="btn btn btn-primary btn-rounded float-right"><i className="fa fa-plus"></i> Add Appointment</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="table-responsive">
                        <table className="table table-striped custom-table">
                            <thead>
                                <tr>
                                    <th>Appointment ID</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Doctor Name</th>
                                    <th>Department</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Status</th>
                                    <th className="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      
        <div id="delete_appointment" className="modal fade delete-modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <img src="assets/img/sent.png" alt="" width="50" height="46"/>
                        <h3>Are you sure want to delete this Appointment?</h3>
                        <div className="m-t-20"> <a href="#" className="btn btn-white" data-dismiss="modal">Close</a>
                            <button type="submit" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
  }
}

Showrendezvous.propTypes = {
    deleteAppointment: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
	profile: state.profile,
    auth: state.auth

});
export default connect( mapStateToProps, { deleteAppointment,getCurrentProfile })(withRouter(Showrendezvous));


