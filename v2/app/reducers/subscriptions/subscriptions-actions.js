import createAction from '../../utils/create-action';
import * as api from '../../api';
import {notify} from 'react-notify-toast';

export const request = createAction('Subscriptions Request', 'status', 'clearResult');
export const requestSuccess = createAction('Subscriptions Request Success', 'result');
export const requestError = createAction('Subscriptions Request Error', 'status', 'message');

export const load = (isRefresh) => {
  return (dispatch) => {
    if (!isRefresh) {
      dispatch(request('loading'));
    }
    return api.getSubscriptions()
      .then((response) => dispatch(requestSuccess(response.projects)))
      .catch((err) => {
        if (!isRefresh) {
          dispatch(requestError('error-loading', err.message));
        }
      });
  };
};

export const update = (project, subscriptionType) => {
  return (dispatch, getState) => {
    // update project isSubscribed
    const projects = getState().subscriptions.result.map((p) => {
      if (p.project === project) {
        p = {
          ...p,
          isSubscribed: subscriptionType === 'subscribe'
        };
      }
      return p;
    });
    dispatch(requestSuccess(projects));
    return api[(subscriptionType === 'subscribe') ? 'subscribeToProject' : 'unsubscribeFromProject'](project)
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(load(true));
      });
  };
};
