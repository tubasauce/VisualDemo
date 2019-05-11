import { createReducer } from 'redux-act';
import Immutable from 'seamless-immutable';
import * as uiActions from './ui-actions';

const initialState = Immutable({
  profile: {},
  password: {},
  integration: {},
  selected: {},
  location: {},
  locationParams: {},
  wizard: {},
  dashboard: {
    activityType: 'recent',
    activityLimit: 8,
    resultType: 'current',
    showOverlay: false,
    openBranches: false,
    openOptions: false,
    scrollTop: 0,
    delete: ''
  },
  stateDetail: {
    dom: true,
    layout: true,
    css: true,
    content: true,
    sideType: 'changes',
    overlay: 100
  },
  prefs: {
    openSidePanel: false,
    openSideNav: false
  },
  buildsLimit: {},
  statesFilterBy: {},
  showContainers: {},
  showSections: {},
  modal: {}
});

export default createReducer({
  [uiActions.set]: (state, payload) =>
    Immutable(state).set(payload.key, payload.object || {}),

  [uiActions.update]: (state, payload) =>
    Immutable(state).setIn([payload.key, payload.name], payload.value),

  [uiActions.merge]: (state, payload) =>
    Immutable(state).merge({[payload.key]: payload.object}, {deep: true}),

  [uiActions.clear]: (state, payload) =>
    Immutable(state).set(payload.key, {}),

  [uiActions.toggle]: (state, payload) =>
    Immutable(state).setIn([payload.key, payload.name], !state[payload.key][payload.name])
}, initialState);
