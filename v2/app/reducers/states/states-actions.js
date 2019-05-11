import createAction from '../../utils/create-action';
import * as api from '../../api';
import * as uiActions from '../ui/ui-actions';
import * as stateActions from '../state/state-actions';
import * as stateSelectors from '../../selectors/state';
import * as statesSelectors from '../../selectors/states';
import {notify} from 'react-notify-toast';
import uniq from 'lodash/uniq';
import without from 'lodash/without';

export const request = createAction('States Request', 'status', 'clearResult');
export const requestSuccess = createAction('States Request Success', 'result');
export const requestError = createAction('States Request Error', 'status', 'message');

export const load = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    dispatch(request('loading', true));
    return api.getStates(selected.project, selected.branch, selected.resolution, selected.testName)
      .then((response) => {
        // only load result when still matches selected
        const latest = getState().ui.selected;
        if (latest.project === selected.project && latest.branch === selected.branch && latest.resolution === selected.resolution && latest.testName === selected.testName) {
          dispatch(requestSuccess(response.results));
        }
      })
      .catch((err) => dispatch(requestError('error-loading', err.message)));
  };
};

export const select = (state) => {
  return (dispatch, getState) => {
    const ui = getState().ui;
    // when selecting state detail for first time, save filtered set of states
    if (!ui.selected.state) {
      const filteredStatesIds = statesSelectors.getFilteredSortedIds(getState());
      dispatch(uiActions.update('selected', 'states', filteredStatesIds));
    }
    dispatch(uiActions.update('selected', 'state', state));
    const isOpenSidePanel = ui.prefs && ui.prefs.openSidePanel && ui.stateDetail;
    const isOverlay = isOpenSidePanel && ui.stateDetail.sideType === 'overlay';
    const hideHighlights = ui.stateDetail && ui.stateDetail.hideHighlights;
    if (state.status === 'accepted') {
      // retain hide highlights setting
      if (hideHighlights) {
        dispatch(uiActions.set('stateDetail', {hideHighlights}));
      } else {
        dispatch(uiActions.clear('stateDetail'));
      }
    } else {
      const stateDetail = {
        dom: !hideHighlights,
        layout: !hideHighlights,
        css: !hideHighlights,
        content: !hideHighlights,
        sideType: 'changes',
        overlay: 100
      };
      // retain hide highlights setting
      if (hideHighlights) {
        stateDetail.hideHighlights = true;
      }
      dispatch(uiActions.set('stateDetail', stateDetail));
    }
    // keep overlay selected
    if (isOverlay && state.referenceUrl) {
      dispatch(uiActions.update('stateDetail', 'sideType', 'overlay'));
    }
    dispatch(stateActions.loadChanges());
  };
};

export const toggleHighlights = () => {
  return (dispatch, getState) => {
    const {dom, layout, css, content} = getState().ui.stateDetail || {};
    if (dom || layout || css || content) {
      dispatch(uiActions.set('stateDetail', {
        hideHighlights: true
      }));
    } else {
      dispatch(uiActions.set('stateDetail', {
        dom: true,
        layout: true,
        css: true,
        content: true,
        sideType: 'changes'
      }));
    }
  };
};

export const setFilters = (filterType) => {
  return (dispatch) => {
    let filterBy = {
      changed: false,
      new: false,
      accepted: false,
      rejected: false,
      reviewed: false
    };
    switch(filterType) {
    case 'all':
      filterBy = {
        ...filterBy,
        changed: true,
        new: true,
        accepted: true,
        rejected: true
      };
      break;
    case 'review':
      filterBy = {
        ...filterBy,
        changed: true,
        new: true
      };
      break;
    case 'reviewed':
      filterBy = {
        ...filterBy,
        accepted: true,
        rejected: true,
        reviewed: true
      };
      break;
    default:
      filterBy[filterType] = true;
    }
    dispatch(uiActions.set('statesFilterBy', filterBy));
  };
};

export const open = (resolution, testName, forceLoad) => {
  return (dispatch, getState) => {
    const state = getState();
    let selectObj = {
      resolution,
      testName,
      state: null // reset state property
    };
    // when filters are empty, select all by default
    if (!Object.keys(state.ui.statesFilterBy).length) {
      dispatch(setFilters('all'));
    }
    dispatch(uiActions.merge('selected', selectObj));
    dispatch(uiActions.update('dashboard', 'showOverlay', true));
    dispatch(uiActions.update('prefs', 'openSidePanel', false));
    if (!state.states.result || forceLoad) {
      return dispatch(load());
    } else {
      return Promise.resolve();
    }
  };
};

export const update = (condition, name, value) => {
  return (dispatch, getState) => {
    const statesData = getState().states.result;
    const newStates = statesData.map((state) => {
      if (condition(state)) {
        return {
          ...state,
          [name]: value
        };
      }
      return state;
    });
    dispatch(requestSuccess(newStates));
    // update selected state if matches condition
    const selectedState = getState().ui.selected.state;
    if (selectedState && condition(selectedState)) {
      dispatch(uiActions.update('selected', 'state', {
        ...selectedState,
        [name]: value
      }));
    }
  };
};

export const addIgnore = (stateData, selector, clientOnly) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    const newIgnores = uniq([...stateData.ignores, selector]);
    // update ignores on client
    dispatch(update(state => state._id === stateData._id, 'ignores', newIgnores));
    if (clientOnly) return;
    return api.addStateIgnore(selected.project, selected.branch, stateData, selector)
      .then(() => {
        // Auto-Update Status:
        // if changes == 0 and status is changed, set status = accepted
        if (stateData.status === 'changed' && stateSelectors.getTotalChanges(getState()) === 0) {
          dispatch(updateStatus(stateData, 'accepted'));
        }
      })
      .catch((err) => {
        notify.show(err.message, 'error');
        // revert client-side update on error
        dispatch(removeIgnore(stateData, selector, true));
      });
  };
};

export const removeIgnore = (stateData, selector, clientOnly) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    const newIgnores = without(stateData.ignores, selector);
    // update ignores on client
    dispatch(update(state => state._id === stateData._id, 'ignores', newIgnores));
    if (clientOnly) return;
    return api.removeStateIgnore(selected.project, selected.branch, stateData, selector)
      .then(() => {
        // Auto-Update Status:
        // if changes > 0 and status is accepted, set status = changed
        if (stateData.status === 'accepted' && stateSelectors.getTotalChanges(getState()) > 0) {
          dispatch(updateStatus(stateData, 'changed'));
        }
      })
      .catch((err) => {
        notify.show(err.message, 'error');
        // revert client-side update on error
        dispatch(addIgnore(stateData, selector, true));
      });
  };
};

export const updateStatus = (stateData, newStatus, clientOnly) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    // do not update if status not changing
    if (!stateData) return;
    const oldStatus = stateData.status;
    if (oldStatus === newStatus) return;
    // update status on client
    dispatch(update(state => state._id === stateData._id, 'status', newStatus));
    if (newStatus === 'accepted' || newStatus === 'rejected') {
      dispatch(update(state => state._id === stateData._id, 'isReviewed', true));
      dispatch(update(state => state._id === stateData._id, 'userName', 'me'));
    } else {
      // probably an error. revert reviewed
      dispatch(update(state => state._id === stateData._id, 'isReviewed', false));
    }
    if (selected.state && stateData._id === selected.state._id) {
      if (newStatus === 'accepted') {
        dispatch(uiActions.clear('stateDetail'));
      } else {
        dispatch(uiActions.set('stateDetail', {
          dom: true,
          layout: true,
          css: true,
          content: true
        }));
      }
    }
    if (clientOnly) return;
    // update status on server
    return api.updateStateStatus(selected.project, selected.branch, stateData, newStatus)
      .catch((err) => {
        notify.show(err.message, 'error');
        // revert client-side update on error
        dispatch(updateStatus(stateData, oldStatus, true));
      });
  };
};

export const acceptAll = () => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    const filteredStates = statesSelectors.getFilteredNotAccepted(getState());
    dispatch(request('saving'));
    return api.acceptStates(selected.project, selected.branch, filteredStates)
      .then(function() {
        // update statuses on client
        dispatch(update(state => filteredStates.indexOf(state) > -1, 'status', 'accepted'));
      })
      .catch((err) => dispatch(requestError('error-saving', err.message)));
  };
};

export const acceptStates = (states) => {
  return (dispatch, getState) => {
    const selected = getState().ui.selected;
    dispatch(request('saving'));
    return api.acceptStates(selected.project, selected.branch, states)
      .then(function() {
        // update statuses on client
        dispatch(update(state => states.indexOf(state) > -1, 'status', 'accepted'));
      })
      .catch((err) => dispatch(requestError('error-saving', err.message)));
  };
};
