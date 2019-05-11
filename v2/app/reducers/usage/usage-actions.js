import createAction from '../../utils/create-action';
import * as api from '../../api';

export const request = createAction('Usage Request', 'status', 'clearResult');
export const requestSuccess = createAction('Usage Request Success', 'result');
export const requestError = createAction('Usage Request Error', 'status', 'message');

export const load = (accountId) => {
  return (dispatch) => {
    dispatch(request('loading', true));
    return api.getUsage(accountId)
      .then((response) => dispatch(requestSuccess(response)))
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};
