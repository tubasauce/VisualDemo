import createAction from '../../utils/create-action';
import * as api from '../../api';
import * as uiActions from '../ui/ui-actions';
import {notify} from 'react-notify-toast';

export const request = createAction('Builds Request', 'status');
export const requestSuccess = createAction('Builds Request Success', 'result');
export const requestError = createAction('Builds Request Error', 'status', 'message');

export const load = (isRefresh) => {
  return (dispatch, getState) => {
    const ui = getState().ui;
    const selected = ui.selected;
    if (!isRefresh) {
      dispatch(request('loading'));
    }
    const projectBranch = `${selected.project}/${selected.branch}`;
    const limit = ui.buildsLimit[projectBranch] || 10;
    return api.getBranchBuilds(selected.project, selected.branch, limit)
      .then((response) => {
        // only load result when still matches selected
        const latest = getState().ui.selected;
        if (latest.project === selected.project && latest.branch === selected.branch) {
          dispatch(requestSuccess(response.results));
        }
      })
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};

export const loadMore = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    const projectBranch = `${selected.project}/${selected.branch}`;
    let limit = getState().ui.buildsLimit[projectBranch] || 10;
    if (limit < 100) {
      limit += 10;
    }
    dispatch(uiActions.update('buildsLimit', projectBranch, limit));
    return dispatch(load(true));
  };
};

export const cancel = (build) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    return api.cancelBuild(selected.project, selected.branch, build)
      .catch((err) => notify.show(err.message, 'error'));
  };
};
