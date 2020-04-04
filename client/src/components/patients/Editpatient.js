import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { getPatientById,updatePatient, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class Editpatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            firstname: '',
            lastname: '',
            email: '',
            adresse:'',
            zipcode: '',
            state: '',
            country: '',
            gender: '',
            phone: '',
            Datebirth: '',
            avatar:'',
            errors: {},

            patient: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount=()=> {
        this.props.getCurrentProfile()
        // console.log("patient2",this.props.profile.patient)
        const id_patient = this.props.match.params.id;
        console.log("Will fetch expert with id", id_patient);
        this.props.getPatientById(id_patient);
        // let patient1=this.props.getPatientById(id);
        // console.log(patient1)
        // const arr = this.props.patient.filter(el=>el._id===this.props.id)
        // let patient=arr[0]
        //  this.setState({
        //      patient
        //  })
        
    }

    
    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.patient) {
            // const profile = nextProps.profile.profile;
            const patientdata = nextProps.patient;

            //if patientdata fiels doesn't exit, make emty string

            patientdata.firstname = !isEmpty(patientdata.firstname) ? patientdata.firstname : '';
            patientdata.lastname = !isEmpty(patientdata.lastname) ? patientdata.lastname : '';
            patientdata.email = !isEmpty(patientdata.email) ? patientdata.email : '';
            patientdata.adresse = !isEmpty(patientdata.adresse) ? patientdata.adresse : '';
            patientdata.zipcode = !isEmpty(patientdata.zipcode) ? patientdata.zipcode : '';
            patientdata.state = !isEmpty(patientdata.state)
                ? patientdata.state
                : '';

            patientdata.country = !isEmpty(patientdata.country)
                ? patientdata.country
                : '';
            patientdata.gender = !isEmpty(patientdata.gender)
                ? patientdata.gender
                : '';

            patientdata.phone = !isEmpty(patientdata.phone) ? patientdata.phone : '';
            patientdata.Datebirth = !isEmpty(patientdata.Datebirth) ? patientdata.Datebirth : '';
            patientdata.avatar = !isEmpty(patientdata.avatar)
                ? patientdata.avatar
                : '';

            //Set component fields state
            this.setState({

                firstname: patientdata.firstname,
                lastname: patientdata.lastname,
                email: patientdata.email,
                adresse:patientdata.adresse,
                zipcode: patientdata.zipcode,
                state: patientdata.state,
                country: patientdata.country,
                gender: patientdata.gender,
                phone: patientdata.phone,
                Datebirth: patientdata.Datebirth,
                avatar: patientdata.avatar,
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const id_patient = this.props.match.params.id ;
        const patientData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email:this.state.email,
            adresse: this.state.address,
            zipcode:this.state.zipcode,
            state: this.state.state,
            country: this.state.country,
            gender: this.state.gender,
            phone: this.state.phone,
            Datebirth: this.state.Datebirth,
            
        };

        this.props.updatePatient(id_patient,patientData, this.props.history);
        console.log("patientData",patientData)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }




    render() {
        const { errors } = this.state;
        const {patient}={patient};
        

      

        // Select options for gender
        const options = [
            { label: '* Your gender', value: 0 },
            { label: 'Female', value: 'Female' },
            { label: 'Male', value: 'Male' }
        ];
       
        return (

            <div className="page-wrapper">
                {console.log("patient",this.props.patient)}
                <div className="content">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="page-title">Edit Patient</h4>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>

                        <div className="card-box">
                            <h3 className="card-title">Basic Informations</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="profile-img-wrap">
                                        <img className="inline-block" src={this.state.avatar} alt={this.state.avatar} />
                                        <div className="fileupload btn">
                                            <span className="btn-text">edit</span>
                                            <input className="upload" type="file" />
                                        </div>
                                    </div>
                                    <div className="profile-basic">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group form-focus">
                                                    <label className="focus-label">First Name</label>
                                                    <InputGroup
                                                        placeholder="Your firstname"
                                                        name="firstname"
                                                        value={this.state.firstname}
                                                        onChange={this.onChange}
                                                        error={errors.firstname} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group form-focus">
                                                    <label className="focus-label">Last Name</label>
                                                    <InputGroup
                                                        placeholder="Your lastname"
                                                        name="lastname"
                                                        value={this.state.lastname}
                                                        onChange={this.onChange}
                                                        error={errors.lastname} />


                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group form-focus">
                                                <label className="focus-label">Birth Date</label>
                                                    <div className="cal-icon">
                                                    
                                                    <InputGroup
                                                        placeholder="Your birth Date"
                                                        name="Datebirth"
                                                        value={this.state.Datebirth}
                                                        onChange={this.onChange}
                                                        error={errors.birthdate} />
                                                        {/* <InputGroup
                                                            name="birth"
                                                            type="date"
                                                            
                                                        /> */}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="form-group form-focus select-focus">
                                                    <label className="focus-label">Gendar</label>
                                                    <SelectListGroup
                                                        placeholder="Gender"
                                                        name="gender"
                                                        value={this.state.gender}
                                                        onChange={this.onChange}
                                                        options={options}
                                                       

                                                    />
                                                    {errors && <div className="invalid-feedback">{errors.gender}</div>}
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    

                        <div class="card-box">
                            <h3 class="card-title">Contact Informations</h3>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group form-focus">
                                    <label class="focus-label">Address</label>
                                        {/* <input type="text" class="form-control floating" value="New York"/> */}
                                        <InputGroup
                                            placeholder="Your address"
                                            name="adresse"
                                            value={this.state.adresse}
                                            onChange={this.onChange}
                                            error={errors.State} />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group form-focus">
                                        <label class="focus-label">State</label>
                                        {/* <input type="text" class="form-control floating" value="New York"/> */}
                                        <InputGroup
                                            placeholder="Your state"
                                            name="state"
                                            value={this.state.state}
                                            onChange={this.onChange}
                                            error={errors.state} />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group form-focus">
                                        <label class="focus-label">Country</label>
                                        {/* <input type="text" class="form-control floating" value="United States"/> */}
                                        <InputGroup
                                            placeholder="Your Country"
                                            name="country"
                                            value={this.state.country}
                                            onChange={this.onChange}
                                            error={errors.country} />


                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group form-focus">
                                        <label class="focus-label">Pin Code</label>
                                        {/* <input type="text" class="form-control floating" value="10523"/> */}
                                        <InputGroup
                                            placeholder="Your Zip code"
                                            name="zipcode"
                                            value={this.state.zipcode}
                                            onChange={this.onChange}
                                            error={errors.zipcode} />
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group form-focus">
                                        <label class="focus-label">Phone Number</label>
                                        {/* <input type="text" class="form-control floating" value="631-889-3206"/> */}
                                        <InputGroup
                                            placeholder="Your Number Phone"
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.onChange}
                                            error={errors.phone} />


                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="text-center m-t-20">
                            <button class="btn btn-primary submit-btn" type="submit">Save</button>
                        </div>




                    </form>


                </div>
            </div>
        );
    }
}

Editpatient.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    getPatientById: PropTypes.func.isRequired,
    patient: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
    patient: state.profile.patient,
    errors: state.errors,
    profile:state.profile
});

export default connect(mapStateToProps, {getPatientById,updatePatient,getCurrentProfile })(
    withRouter(Editpatient)
);