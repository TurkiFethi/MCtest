import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
// import Moment from 'react-moment';
import { deletePatient } from '../../actions/profileActions';



class Patient extends Component {
  onDeleteClick(id) {
    this.props.deletePatient(id);
  }

  render() {
    const patient = this.props.patient.map(exp => (
      <tr key={exp._id}>
        <td><img width="28" height="28" src="../assets/img/user.jpg" class="rounded-circle m-r-5" alt="" /> {exp.firstname} {exp.lastname}</td>
        <td>{exp.Datebirth}</td>
        <td>{exp.adresse}</td>
        <td>{exp.phone}</td>
        <td>{exp.email}</td>
        <td class="text-right">
          <div class="dropdown dropdown-action">
            <a href="#" class="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>
            <div class="dropdown-menu dropdown-menu-right">
              <Link class="dropdown-item" to={`/dashboard/Editpatient/${exp._id}`}><i class="fa fa-pencil m-r-5"></i>Edit</Link>
              
              <button class="dropdown-item" href="#" data-toggle="modal" data-target="#delete_patient" onClick={this.onDeleteClick.bind(this, exp._id)}
                ><i class="fa fa-trash-o m-r-5"></i> Delete</button>
            </div>
          </div>
        </td>
      </tr>

      //  <tr >
      //     <td> </td>
      //     <td></td>
      //     <td></td>
      //     <td></td>
      //     <td></td>
      //     <td></td>
      /* <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td> */
      //   <td>
      //     <button
      //       onClick={this.onDeleteClick.bind(this, exp._id)}
      //       className="btn btn-danger"
      //     >
      //       Delete
      //     </button>
      //   </td>
      // </tr>
    ))
    return (
      <div class="page-wrapper">
        <div class="content">
          <div class="row">
            <div class="col-sm-4 col-3">
              <h4 class="page-title">Patients</h4>
            </div>
            <div class="col-sm-8 col-9 text-right m-b-20">
              <Link to="/dashboard/Addpatient" class="btn btn btn-primary btn-rounded float-right"><i class="fa fa-plus"></i> Add Patient</Link>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-border table-striped custom-table datatable mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date of birth</th>
                      <th>Address</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th class="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div id="delete_patient" class="modal fade delete-modal" role="dialog">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body text-center">
                  <img src="assets/img/sent.png" alt="" width="50" height="46" />
                  <h3>Are you sure want to delete this Patient?</h3>
                  <div class="m-t-20"> <a href="#" class="btn btn-white" data-dismiss="modal">Close</a>
                    <button class="btn btn-danger" data-dismiss="modal">Delete</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

     </div>

    );
  }
}

Patient.propTypes = {
  deletePatient: PropTypes.func.isRequired
};

export default connect(null, { deletePatient })(withRouter(Patient));
