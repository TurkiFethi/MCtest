const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePatientInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : '';
  data.lastname = !isEmpty(data.lastname) ? data.lastname : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  

  if (!Validator.isLength(data.firstname, { min: 2, max: 40 })) {
    errors.firstname = 'firstname needs to between 2 and 4 characters';
  }
  if (!Validator.isLength(data.lastname, { min: 2, max: 40 })) {
    errors.lastname = 'lastname needs to between 4 and 12 characters';
  }
   
  // gender checks
  if (Validator.isEmpty(data.gender)) {
    errors.gender = "gender field is required";
  }
   // Email checks
   if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

    
  // phone checks
   if (!Validator.isLength(data.phone, { min: 8, max: 8 })) {
    errors.phone = 'phone needs to 8 digits';
  }
  // if (!Validator.isLength(data.Datebirth, { min: 10, max: 10 })) {
  //   errors.Datebirth = 'profile birth date is required';
  // }
  
  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
