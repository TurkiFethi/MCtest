import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {getCurrentProfile } from '../../actions/profileActions';
import Showrendezvous from "../rendezvous/Showrendezvous";
import { withRouter } from 'react-router-dom';
class Rendezvous extends Component {
	componentDidMount() {
		this.props.getCurrentProfile();
	 }
	
	render() {
		const { profile } = this.props.profile;
		return (
			<Showrendezvous rendezvous={profile.rendezvous} />
		
		);
	}
}


Rendezvous.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  
  
  
};
const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(mapStateToProps,{getCurrentProfile})(withRouter(Rendezvous));
