export const validator = (data, config) => {
  const errors = {};

  const validate = (rule, dataItem) => rule(dataItem);

  for (const key in data) {
    for (const ruleName in config[key]) {
      const error = validate(config[key][ruleName], data[key]);
      if (error) {
        errors[key] = error;
        break;
      }
    }
  }

  return errors;
};
