const ValidationService = {
  messages: {},
  emailExpr: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  required: function(field, value, param) {
    if (value.trim().length < 1) {
      if (ValidationService.messages.hasOwnProperty(field)) {
        if (ValidationService.messages[field].hasOwnProperty("required")) {
          return ValidationService.messages[field].required;
        }
      }
      return "This field is required";
    }
    return false;
  },
  validEmail: function(field, value, param) {
    if (!ValidationService.emailExpr.test(value)) {
      if (ValidationService.messages.hasOwnProperty(field)) {
        if (ValidationService.messages[field].hasOwnProperty("validEmail")) {
          return ValidationService.messages[field].validEmail;
        }
      }
      return "Invalid email";
    }
    return false;
  },
  minLength: function(field, value, param) {
    if (value.trim()) {
      if (value.trim().length < param) {
        if (ValidationService.messages.hasOwnProperty(field)) {
          if (ValidationService.messages[field].hasOwnProperty("minLength")) {
            return ValidationService.messages[field].minLength;
          }
        }
        return `This field must be minimum ${param} characters`;
      }
    }
    return false;
  },
  validate: function(options, messages) {
    ValidationService.messages = messages ? messages : {};
    var errors = {},
      error = [];
    Object.keys(options).forEach(field => {
      error = ValidationService.check(
        field,
        options[field].value,
        options[field].rules
      );
      if (error.length > 0) {
        errors[field] = error;
      }
    });

    return Object.keys(errors).length < 1 ? null : errors;
  },

  check: function(field, value, methods) {
    return Object.keys(methods)
      .map(item => {
        var error = ValidationService[item](field, value, methods[item]);
        return error ? error : false;
      })
      .filter(item => {
        return item;
      });
  }
};

export default ValidationService;
