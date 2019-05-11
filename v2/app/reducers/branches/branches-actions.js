import createAction from '../../utils/create-action';
import * as api from '../../api';

export const request = createAction('Project Request', 'status', 'clearResult');
export const requestSuccess = createAction('Project Request Success', 'result');
export const requestError = createAction('Project Request Error', 'status', 'message');

export const load = (limit = 20) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    dispatch(request('loading', true));
    return api.getProjectBranches(selected.project, limit)
      .then((response) => {
        // only load result when still matches selected
        const latest = getState().ui.selected;
        if (latest.project === selected.project) {
          dispatch(requestSuccess(response));
        }
      })
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};
