import { warn, extractModule as extract } from './helpers';

const VALIDATORS = {
  email: (val) => extract(import('email-validator'))
    .then(validator => !val || validator.validate(val)),
  maxlength: (val, option) => val == null || val.length <= Number(option),
  minlength: (val, option) => val == null || val.length >= Number(option),
  required: (val) => {
    switch (typeof val) {
      case 'string':
        return val.length > 0;
      case 'number':
        return !Number.isNaN(val);
      case 'boolean':
        return true;
      default:
        return val != null;
    }
  },
};

export function checkErrors(data, checks) {
  const names = Object.keys(checks);
  const errors = {};

  Object.keys(data)
    .forEach(name => {
      const value = data[name];

      if (typeof value === 'object' && value.$errors) {
        errors[name] = value.$errors;
      }
    });

  return Promise.all(
    names
      .map(name => {
        const validators = checks[name];

        if (!validators) return true;

        const checkNames = Object.keys(validators);

        return Promise.all(checkNames
          .map(check => {
            const options = validators[check];
            const validator = VALIDATORS[check];

            // validator(data[name], options).then(result => {
            //   console.log('validation', name, options, result);
            // });

            // if it's a custom validator method
            if (typeof options === 'function') {
              return options(data[name]);
            } else {
              if (!validator) {
                warn('unknown validator', check);

                return true;
              }

              return validator(data[name], options);
            }
          }))
          .then(results => {
            const valid = results.every(r => r);

            // tell there is no error on prop
            if (valid) {
              // console.log('valid field', name, results);
              return false;
            }

            // console.log('invalid field', name);

            return checkNames.reduce((map, check, i) => {
              if (!results[i]) {
                map[check] = true;
              }

              return map;
            }, {});
          });
      })
  ).then(results => {
    return names.reduce((map, name, i) => {
      if (results[i]) {
        map[name] = results[i];
      }

      return map;
    }, errors);
  }).then(() => {
    const valid = !Object.keys(errors).length;

    if (valid) return false;

    return errors;
  });
}

export default VALIDATORS;
