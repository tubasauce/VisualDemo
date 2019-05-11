import { createReducer } from 'redux-act';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  result: '',
  status: '',
  errorMessage: ''
});

export const generateReducer = (reducerName, defaultState = {}) => {
  const reducerActions = require(`../${reducerName}/${reducerName}-actions`);
  return createReducer({
    [reducerActions.request]: (state, payload) =>
      Immutable(state).merge({
        result: payload.clearResult ? '' : state.result,
        status: payload.status,
        errorMessage: ''
      }),

    [reducerActions.requestSuccess]: (state, payload) =>
      initialState.merge({
        result: payload.result
      }),

    [reducerActions.requestError]: (state, payload) =>
      Immutable(state).merge({
        status: payload.status,
        errorMessage: payload.message
      })
  }, initialState.merge(defaultState));
};
