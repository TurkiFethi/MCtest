import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addAppointment } from '../../actions/profileActions';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getCurrentProfile} from '../../actions/profileActions';

class Addrendezvous extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
      }
    constructor(props) {
        super(props);
        this.state = {
            libelle: '',
            date: '',
            time: '',
            Message: '',
            statusAppointment: '',
            typeVisite: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }
    onSubmit(e) {
        e.preventDefault();

        const patData = {
            libelle: this.state.libelle,
            // date: this.state.date,
            // time: this.state.time,
            Message:this.state.Message,
            // statusAppointment: this.state.statusAppointment,
            typeVisite: this.state.typeVisite,
           
        };

        this.props.addAppointment(patData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors } = this.state;
        // Select options for type appointment
         const options = [
            { label: '* Type', value: 0 },
            { label: 'Controle', value: 'Controle' },
            { label: 'Consultation', value: 'Consultation' }
        ];
        return (
            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h4 className="page-title">Add Appointment</h4>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
										<label>Appointment Name</label>
										{/* <input className="form-control" type="text" value="APT-0001" readonly=""/> */}
                                        <InputGroup
                                                placeholder="Libelle"
                                                name="libelle"
                                                value={this.state.libelle}
                                                onChange={this.onChange}
                                                error={errors.libelle} />
                                    </div>
                                </div>
                                <div className="col-md-6">
									<div className="form-group">
										<label>Patient Name</label>
										<select className="select">
											<option>Select</option>
											<option>Jennifer Robinson</option>
											<option>Terry Baker</option>
										</select>
									</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Type de visite</label>
                                        <SelectListGroup
                                                        
                                                        name="type"
                                                        value={this.state.typeVisite}
                                                        onChange={this.onChange}
                                                        options={options}
                                                        error={errors.typeVisite}

                                                    />
                                    </div>
                                </div>
                                
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Date</label>
                                        <div className="cal-icon">
                                            {/* <input type="text" className="form-control datetimepicker"/> */}
                                            <InputGroup
                                                        placeholder="date"
                                                        name="date"
                                                        value={this.state.date}
                                                        onChange={this.onChange}
                                                        error={errors.date} />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Time</label>
                                        <div className="time-icon">
                                            {/* <input type="text" className="form-control" id="datetimepicker3"/> */}
                                            <InputGroup
                                                        placeholder="time"
                                                        name="time"
                                                        value={this.state.time}
                                                        onChange={this.onChange}
                                                        error={errors.time} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Patient Email</label>
                                        <input className="form-control" type="email"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Patient Phone Number</label>
                                        <input className="form-control" type="text"/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea cols="30" rows="4" className="form-control"></textarea>
                                
                            </div>
                            <div className="form-group">
                                <label className="display-block">Appointment Status</label>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="status" id="product_active" value="option1" checked/>
									<label className="form-check-label" for="product_active">
									Active
									</label>
								</div>
								<div className="form-check form-check-inline">
									<input className="form-check-input" type="radio" name="status" id="product_inactive" value="option2"/>
									<label className="form-check-label" for="product_inactive">
									Inactive
									</label>
								</div>
                            </div>
                            <div className="m-t-20 text-center">
                                <button className="btn btn-primary submit-btn">Create Appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
Addrendezvous.propTypes = {
    addAppointment: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth
});


export default connect(mapStateToProps, { getCurrentProfile,addAppointment })(
    withRouter(Addrendezvous)
);
