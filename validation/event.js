const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateEventInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.event_title = !isEmpty(data.event_title) ? data.event_title : "";
  data.event_description = !isEmpty(data.event_description) ? data.event_description : "";
  data.event_location = !isEmpty(data.event_location) ? data.event_location : "";
  data.event_time = !isEmpty(data.event_time) ? data.event_time : "";
// Name checks
  if (Validator.isEmpty(data.event_title )) {
    errors.name = "Title field is required";
  }
// Email checks
  if (Validator.isEmpty(data.event_description)) {
    errors.email = "Description field is required";
  } 
// Password checks
  if (Validator.isEmpty(data.event_location)) {
    errors.event_location = "Location field is required";
  }
if (Validator.isEmpty(data.event_time)) {
    errors.event_time = "Time field is required";
}

return {
    errors,
    isValid: isEmpty(errors)
  };
};