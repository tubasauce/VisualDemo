import createAction from '../../utils/create-action';
import * as api from '../../api';
import * as accountsSelectors from '../../selectors/accounts';
import {notify} from 'react-notify-toast';

export const request = createAction('Integration Request', 'status', 'clearResult');
export const requestSuccess = createAction('Integration Request Success', 'result');
export const requestError = createAction('Integration Request Error', 'status', 'message');

export const load = (integrationType) => {
  return (dispatch) => {
    dispatch(request('loading'));
    return api.getIntegration(integrationType)
      .then((response) => dispatch(requestSuccess(response)))
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};

export const add = (integrationType, data) => {
  return (dispatch) => {
    dispatch(request('saving'));
    return api.addIntegration(integrationType, data)
      .then(() => {
        if (integrationType === 'github-enterprise' && typeof window === 'object') {
          window.location.href = '/v2/integrations/github-enterprise/install';
        }
      })
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(request(''));
      });
  };
};

export const remove = (integrationType) => {
  return (dispatch) => {
    dispatch(request('saving'));
    return api.removeIntegration(integrationType)
      .then(() => dispatch(requestSuccess({})))
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(request(''));
      });
  };
};

export const loadWebhooks = () => {
  return (dispatch, getState) => {
    const accountId = accountsSelectors.getAccountId(getState());
    dispatch(request('loading'));
    return api.getWebhooks(accountId)
      .then((response) => dispatch(requestSuccess(response)))
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};

export const addWebhook = (data) => {
  return (dispatch, getState) => {
    const accountId = accountsSelectors.getAccountId(getState());
    dispatch(request('saving'));
    return api.addWebhook(accountId, data)
      .then(() => dispatch(loadWebhooks()))
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(request(''));
      });
  };
};

export const removeWebhook = (webhookId) => {
  return (dispatch, getState) => {
    const accountId = accountsSelectors.getAccountId(getState());
    dispatch(request('saving'));
    return api.removeWebhook(accountId, webhookId)
      .then(() => dispatch(loadWebhooks()))
      .catch((err) => {
        notify.show(err.message, 'error');
        dispatch(request(''));
      });
  };
};
