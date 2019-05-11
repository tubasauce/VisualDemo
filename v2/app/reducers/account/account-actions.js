import createAction from '../../utils/create-action';
import * as api from '../../api';
import * as uiActions from '../ui/ui-actions';
import {notify} from 'react-notify-toast';

export const request = createAction('Account Request', 'status', 'clearResult');
export const requestSuccess = createAction('Account Request Success', 'result');
export const requestError = createAction('Account Request Error', 'status', 'message');

export const init = () => {
  return (dispatch, getState) => {
    const account = getState().account;
    if (!account.status && !account.result) {
      dispatch(request('loading'));
      return dispatch(load());
    }
    return Promise.resolve();
  };
};

export const load = () => {
  return (dispatch) => {
    return api.getAccount()
      .then((response) => dispatch(requestSuccess(response)))
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};

export const updateProfile = (profile) => {
  return (dispatch, getState) => {
    dispatch(request('saving'));
    return api.updateProfile(profile)
      .then((response) => {
        const result = {
          ...getState().account.result,
          ...response
        };
        notify.show('Successfully Saved Profile', 'success');
        return dispatch(requestSuccess(result));
      })
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(request(''));
      });
  };
};

export const generateNewKey = () => {
  return (dispatch, getState) => {
    dispatch(request('saving'));
    return api.generateNewKey()
      .then((response) => {
        const result = {
          ...getState().account.result,
          ...response
        };
        notify.show('Successfully Generated New API Key', 'success');
        return dispatch(requestSuccess(result));
      })
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(request(''));
      });
  };
};

export const changePassword = (oldPassword, newPassword) => {
  return (dispatch) => {
    // reset password form
    dispatch(uiActions.clear('password'));
    dispatch(request('saving'));
    return api.changePassword(oldPassword, newPassword)
      .then(() => {
        notify.show('Successfully Changed Password', 'success');
        return dispatch(requestSuccess({}));
      })
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(request(''));
      });
  };
};
