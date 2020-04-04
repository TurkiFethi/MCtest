import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';
// import Moment from 'react-moment';


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            firstname: '',
            lastname: '',
            gender: '',
            birthdate:'',
            phone: '',
            region: '',
            State: '',
            Country: '',
            ZipCode: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            email:'',

            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            
            //if profile fiels doesn't exit, make emty string

            profile.firstname = !isEmpty(profile.firstname) ? profile.firstname : '';
            profile.lastname = !isEmpty(profile.lastname) ? profile.lastname : '';
            profile.gender = !isEmpty(profile.gender) ? profile.gender : '';
            profile.birthdate = !isEmpty(profile.birthdate) ? profile.birthdate : '';
            profile.phone = !isEmpty(profile.phone) ? profile.phone : '';

            profile.address = !isEmpty(profile.address) ? profile.address : {};
            profile.region = !isEmpty(profile.address.region)
                ? profile.address.region
                : '';
            profile.State = !isEmpty(profile.address.State)
                ? profile.address.State
                : '';

            profile.Country = !isEmpty(profile.address.Country)
                ? profile.address.Country
                : '';
            profile.ZipCode = !isEmpty(profile.address.ZipCode)
                ? profile.address.ZipCode
                : '';

            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.twitter = !isEmpty(profile.social.twitter)
                ? profile.social.twitter
                : '';
            profile.facebook = !isEmpty(profile.social.facebook)
                ? profile.social.facebook
                : '';
            profile.linkedin = !isEmpty(profile.social.linkedin)
                ? profile.social.linkedin
                : '';
            profile.youtube = !isEmpty(profile.social.youtube)
                ? profile.social.youtube
                : '';
            profile.instagram = !isEmpty(profile.social.instagram)
                ? profile.social.instagram
                : '';

            //Set component fields state
            this.setState({
                handle: profile.handle,
                firstname: profile.firstname,
                lastname: profile.lastname,
                gender: profile.gender,
                birthdate:profile.birthdate,
                phone: profile.phone,
                region: profile.region,
                Country: profile.Country,
                State: profile.State,
                ZipCode: profile.ZipCode,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube,
            });
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            birthdate:this.state.birthdate,
            gender: this.state.gender,
            birth:this.state.birthd,
            phone: this.state.phone,
            region: this.state.region,
            Country: this.state.Country,
            State: this.state.State,
            ZipCode: this.state.ZipCode,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        };

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }




    render() {
        const { errors, displaySocialInputs } = this.state;
        const {user}=this.props.auth;
        let socialInputs;

        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        icon="fab fa-twitter"
                        value={this.state.twitter}
                        onChange={this.onChange}
                        error={errors.twitter}
                    />

                    <InputGroup
                        placeholder="Facebook Page URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={this.state.facebook}
                        onChange={this.onChange}
                        error={errors.facebook}
                    />

                    <InputGroup
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={this.state.linkedin}
                        onChange={this.onChange}
                        error={errors.linkedin}
                    />

                    <InputGroup
                        placeholder="YouTube Channel URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={this.state.youtube}
                        onChange={this.onChange}
                        error={errors.youtube}
                    />

                    <InputGroup
                        placeholder="Instagram Page URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={this.state.instagram}
                        onChange={this.onChange}
                        error={errors.instagram}
                    />
                </div>
            );
        }

        // Select options for gender
        const options = [
            { label: '* Your gender', value: 0 },
            { label: 'Female', value: 'Female' },
            { label: 'Male', value: 'Male' }
        ];
        
        return (

            <div className="page-wrapper">
                <div className="content">
                    <div className="row">
                        <div className="col-sm-12">
                            <h4 className="page-title">Edit Profile</h4>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>

                        <div className="card-box">
                            <h3 className="card-title">Basic Informations</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="profile-img-wrap">
                                        <img className="inline-block" src={user.avatar} alt={user.name} />
                                        <div className="fileupload btn">
                                            <span className="btn-text">edit</span>
                                            <input className="upload" type="file" />
                                        </div>
                                    </div>
                                    <div className="profile-basic">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group form-focus">
                                                    <label className="focus-label">Firstname</label>
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
                                                    <label className="focus-label">Lastname</label>
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
                                                        name="birthdate"
                                                        value= {this.state.birthdate}
                                                        onChange={this.onChange}
                                                        error={errors.birthdate} />
                                                        
                                                      
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
                                                        error={errors.gender}

                                                    />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-box">
                            <h3 className="card-title">Account Informations</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group form-focus">
                                        <label className="focus-label">Username</label>
                                        <InputGroup
                                            placeholder="Your username"
                                            name="handle"
                                            value={this.state.handle}
                                            onChange={this.onChange}
                                            error={errors.handle} />
                                    </div>
                                    {console.log(this.state.password)}
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group form-focus">
                                        <label className="focus-label">Email</label>
                                        <InputGroup
                                            placeholder="Your username"
                                            name="email"
                                            value={user.email}
                                            onChange={this.onChange}
                                            error={errors.email} 
                                            disabled="disabled"/>
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
                                            placeholder="Your state"
                                            name="region"
                                            value={this.state.region}
                                            onChange={this.onChange}
                                             />
                                     
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group form-focus">
                                        <label class="focus-label">State</label>
                                        {/* <input type="text" class="form-control floating" value="New York"/> */}
                                        <InputGroup
                                            placeholder="Your state"
                                            name="State"
                                            value={this.state.State}
                                            onChange={this.onChange}
                                            error={errors.State} />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group form-focus">
                                        <label class="focus-label">Country</label>
                                        {/* <input type="text" class="form-control floating" value="United States"/> */}
                                        <InputGroup
                                            placeholder="Your Country"
                                            name="Country"
                                            value={this.state.Country}
                                            onChange={this.onChange}
                                            error={errors.Country} />


                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group form-focus">
                                        <label class="focus-label">Pin Code</label>
                                        {/* <input type="text" class="form-control floating" value="10523"/> */}
                                        <InputGroup
                                            placeholder="Your Zip code"
                                            name="ZipCode"
                                            value={this.state.ZipCode}
                                            onChange={this.onChange}
                                            error={errors.ZipCode} />
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

                        <div class="card-box">
                            <h3 class="card-title">Social Network</h3>
                            <div class="row">
                                <div class="col-md-12">
                                    <div className="mb-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                this.setState(prevState => ({
                                                    displaySocialInputs: !prevState.displaySocialInputs
                                                }));
                                            }}
                                            className="btn btn-light">
                                            Add Social Network Links
                                        </button>
                                        <span className="text-muted">Optional</span>
                                    </div>
                                    {socialInputs}
                                </div>
                            </div>
                        </div>

                        <div class="card-box">
                            <h3 class="card-title">Description</h3>
                            <div class="row">
                                <div class="col-md-12">
                                    <TextAreaFieldGroup
                                        placeholder="Short Bio"
                                        name="bio"
                                        value={this.state.bio}
                                        onChange={this.onChange}
                                        error={errors.bio}
                                        info="Tell us a little about yourself"
                                    />
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

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(EditProfile)
);
