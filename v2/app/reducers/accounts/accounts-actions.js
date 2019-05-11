import createAction from '../../utils/create-action';
import * as api from '../../api';

export const request = createAction('Accounts Request', 'status', 'clearResult');
export const requestSuccess = createAction('Accounts Request Success', 'result');
export const requestError = createAction('Accounts Request Error', 'status', 'message');

export const load = (adminOnly) => {
  return (dispatch) => {
    dispatch(request('loading'));
    return api.getAccounts(adminOnly)
      .then((response) => dispatch(requestSuccess(response.accounts)))
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};
