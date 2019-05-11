import { createAction } from 'redux-act';

// simplify redux-act createAction method.
// usage: createAction('Update Campaign', 'id', 'update')
// instead of: createAction('Update Campaign', (id, update) => ({id, update}))
export default (description, ...argNames) => {
  let payloadReducer;
  if (argNames.length) {
    payloadReducer = (...args) => {
      var payload = {};
      argNames.forEach((arg, index) => {
        payload[arg] = args[index];
      });
      return payload;
    };
  }
  return createAction(description, payloadReducer);
};
