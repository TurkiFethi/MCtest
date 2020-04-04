const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAppointmentInput(data) {
  let errors = {};

  data.Message = !isEmpty(data.Message) ? data.Message : '';
  
  

  



  

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
