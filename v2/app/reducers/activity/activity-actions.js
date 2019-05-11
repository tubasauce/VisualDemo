import createAction from '../../utils/create-action';
import * as api from '../../api';
import * as uiActions from '../ui/ui-actions';

export const request = createAction('Activity Request', 'status', 'clearResult');
export const requestSuccess = createAction('Activity Request Success', 'result');
export const requestError = createAction('Activity Request Error', 'status', 'message');

export const init = (project) => {
  return (dispatch, getState) => {
    const activity = getState().activity;
    if (!activity.status && !activity.result) {
      dispatch(request('loading'));
      return dispatch(load(project));
    }
    return Promise.resolve();
  };
};

export const load = (project) => {
  return (dispatch, getState) => {
    const ui = getState().ui;
    const type = ui.dashboard.activityType;
    const limit = ui.dashboard.activityLimit;
    if (!project) {
      project = ui.selected.project;
    }
    return api.getActivity(project, type, limit)
      .then((response) => dispatch(requestSuccess(response)))
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};

export const loadMore = () => {
  return (dispatch, getState) => {
    let limit = getState().ui.dashboard.activityLimit;
    if (limit < 120) {
      limit += 8;
    }
    dispatch(uiActions.update('dashboard', 'activityLimit', limit));
    return dispatch(load());
  };
};
