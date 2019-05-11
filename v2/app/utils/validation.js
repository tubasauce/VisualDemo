exports.required = (value) => {
  if ((value || '').trim().length === 0) {
    return 'Please fill out this field';
  }
};

exports.pattern = (regex, errorMessage) => {
  return value => {
    if (!regex.test(value || '')) {
      return errorMessage;
    }
  };
};

exports.url = (value) => {
  const urlRegex = /^https?\:\/\/[^\s\/\$\.\?\#].[^\s]*$/;
  if (!urlRegex.test(value || '')) {
    return 'Please enter a valid URL';
  }
};

exports.minLength = (length) => {
  return value => {
    if ((value || '').length < length) {
      return `Field must contain at least ${length} characters`;
    }
  };
};

exports.validate = (validators) => {
  return value => {
    let errorMessage;
    if (validators instanceof Array) {
      validators.some((validator) => errorMessage = validator(value));
    }
    return errorMessage;
  };
};
