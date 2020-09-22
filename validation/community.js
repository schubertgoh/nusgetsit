const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateCommunityInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.community_title = !isEmpty(data.community_title) ? data.community_title : "";
  data.community_info = !isEmpty(data.community_info) ? data.community_info : "";
  
// Name checks
  if (Validator.isEmpty(data.community_title)) {
    errors.community_title = "Title field is required";
  }
// Email checks
  if (Validator.isEmpty(data.community_info)) {
    errors.community_info = "Info field is required";
  } 
// // Password checks
//   if (Validator.isEmpty(data.event_location)) {
//     errors.event_location = "Location field is required";
//   }
// if (Validator.isEmpty(data.event_time)) {
//     errors.event_time = "Time field is required";
// }

return {
    errors,
    isValid: isEmpty(errors)
  };
};