import createAction from '../../utils/create-action';
import * as api from '../../api';

export const request = createAction('State Request', 'status');
export const requestSuccess = createAction('State Request Success', 'result');
export const requestError = createAction('State Request Error', 'status', 'message');

export const loadChanges = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    // ensure result is cleared
    dispatch(requestSuccess(''));
    // only load if state has changesUrl
    if (!selected.state || !selected.state.changesUrl) return;
    dispatch(request('loading'));
    return api.getStateChanges(selected.state.changesUrl)
      .then((response) => {
        // only load result when still matches selected
        if (getState().ui.selected.state && getState().ui.selected.state.changesUrl === selected.state.changesUrl) {
          dispatch(requestSuccess(response));
        }
      })
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};
