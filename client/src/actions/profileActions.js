import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PATIENT,

  
} from './types';

// Get current profile
export const getCurrentProfile = () => async dispatch => {
   dispatch(setProfileLoading());
   await axios
    .get('/api/profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) =>async dispatch => {
  await axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard/profile'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const deleteAccount = () =>async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    await axios
      .delete('/api/profile')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};


// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// ------------------------------Begin CRUD For patient--------------//
// Add patient
export const addPatient = (expData, history) =>async dispatch => {
  await axios
    .post('/api/profile/patient', expData)
    .then(res => history.push('/dashboard/patients'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Delete patient
export const deletePatient = id =>async dispatch => {
  await axios
     .delete(`/api/profile/patient/${id}`)
     .then(res =>
       dispatch({
         type: GET_PROFILE,
         payload: res.data
       })
     )
     .catch(err =>
       dispatch({
         type: GET_ERRORS,
         payload: err.response.data
       })
     );
 };

 // get patient by id
export const getPatientById = patient_id => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/patient/${patient_id}`);
    dispatch({
      type: GET_PATIENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type:GET_ERRORS,
      payload: err.response.data,
    });
  }
};
 
//update patient bu id

export const updatePatient=(id,patient,history)=>async dispatch=>{
  await axios
  // .put(`/patient/update/${id}`,patient).
  .post(`/api/profile/patient/update/${id}`,patient)
  .then(res => history.push('/dashboard/patients'))
  // then(res=>
    // dispatch(getCurrentProfile()))
}

// ------------------------------End CRUD For patient--------------//

// ------------------------------Begin CRUD For Appointment--------------//
// Add appointment
export const addAppointment = (expData, history) => async dispatch => {
  await axios
    .post('/api/profile/appointment', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Appointment
export const deleteAppointment = id => async dispatch => {
  await axios
    .delete(`/api/profile/appointment/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


//update Appointment by id 

export const updateAppointment=(id,appointment)=>async dispatch=>{
  await axios
  .put(`/appointment/update/${id}`,appointment).
  then(res=>
    dispatch(getCurrentProfile()))
}

// ------------------------------END CRUD For Appointment--------------//