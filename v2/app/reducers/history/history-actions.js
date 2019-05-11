import createAction from '../../utils/create-action';
import * as api from '../../api';

export const request = createAction('History Request', 'status');
export const requestSuccess = createAction('History Request Success', 'result');
export const requestError = createAction('History Request Error', 'status', 'message');

export const load = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    // ensure result is cleared
    dispatch(requestSuccess(''));
    if (!selected.state) return;
    dispatch(request('loading'));
    return api.getStateHistory(selected.project, selected.branch, selected.state)
      .then((response) => {
        // only load result when still matches selected
        if (getState().ui.selected.state && getState().ui.selected.state._id === selected.state._id) {
          dispatch(requestSuccess(response.results));
        }
      })
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};
