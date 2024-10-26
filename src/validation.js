export const validate = (value, params) => {
  if ("required" in params && !value) {
    return params.required.message;
  }
  if ("length" in params) {
    if (params.length.max && value.length > params.length.max) {
      return params.length.message;
    } else if (params.length.min && value.length < params.length.min) {
      return params.length.message;
    }
  }
  if ("pattern" in params && !params.pattern.regexp.test(value)) {
    return params.pattern.message;
  }
};
