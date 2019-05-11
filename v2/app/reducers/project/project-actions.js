import createAction from '../../utils/create-action';
import * as api from '../../api';
import * as uiActions from '../ui/ui-actions';
import * as routeActions from '../route/route-actions';
import * as activityActions from '../activity/activity-actions';
import {notify} from 'react-notify-toast';

export const request = createAction('Project Request', 'status', 'clearResult');
export const requestSuccess = createAction('Project Request Success', 'result');
export const requestError = createAction('Project Request Error', 'status', 'message');

export const load = (isRefresh) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    if (!selected.project) return;
    if (!isRefresh) {
      dispatch(request('loading', true));
      dispatch(uiActions.update('dashboard', 'resultType', 'current'));
    }
    return api.getProjectBranch(selected.project, selected.branch)
      .then((response) => {
        // only load result when still matches selected
        const latest = getState().ui.selected;
        if (latest.project === selected.project && latest.branch === selected.branch) {
          dispatch(requestSuccess(response));
        }
      })
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};

export const subscribe = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    return api.subscribeToProject(selected.project)
      .then(() => {
        notify.show('Successfully Subscribed to receiving notifications', 'success');
        // on success, reload project data
        return dispatch(load(true));
      })
      .catch((err) => notify.show(err.message, 'error'));
  };
};

export const unsubscribe = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    return api.unsubscribeFromProject(selected.project)
      .then(() => {
        notify.show('Successfully Unsubscribed from receiving notifications', 'success');
        // on success, reload project data
        return dispatch(load(true));
      })
      .catch((err) => notify.show(err.message, 'error'));
  };
};

export const removeBranch = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    return api.removeProjectBranch(selected.project, selected.branch)
      .then(() => {
        // on success, reload Activity data and re-route dashboard
        return dispatch(activityActions.load())
          .then(() => dispatch(routeActions.toDashboard()));
      })
      .catch((err) => notify.show(err.message, 'error'));
  };
};

export const remove = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    return api.removeProject(selected.project)
      .then(() => {
        // on success, reload Activity data and re-route dashboard
        dispatch(uiActions.clear('selected'));
        return dispatch(activityActions.load())
          .then(() => dispatch(routeActions.toDashboard()));
      })
      .catch((err) => notify.show(err.message, 'error'));
  };
};
