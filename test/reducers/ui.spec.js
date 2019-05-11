import {expect} from 'chai';
import uiReducer from '../../v2/app/reducers/ui/ui';
import * as uiActions from '../../v2/app/reducers/ui/ui-actions';

const initialState = {
  profile: {},
  password: {},
  selected: {},
  integration: {},
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
};

describe('reducers/ui', () => {
  describe('initial state', () => {
    it('should return initial state', () => {
      const state = uiReducer(undefined, {});
      expect(state).to.deep.equal(initialState);
    });
  });

  describe('uiActions.set', () => {
    it('should set key to empty object when passed null', () => {
      const state = uiReducer(initialState, uiActions.set('selected', null));
      expect(state.selected).to.deep.equal({});
    });

    it('should set key to passed in object', () => {
      const testData = {
        project: 'project-id',
        branch: 'branch'
      };
      const state = uiReducer(initialState, uiActions.set('selected', testData));
      expect(state.selected).to.deep.equal(testData);
    });
  });

  describe('uiActions.update', () => {
    it('should set key object name property to value', () => {
      const state = uiReducer(initialState, uiActions.update('dashboard', 'resultType', 'history'));
      expect(state.dashboard).to.have.property('resultType', 'history');
    });
  });

  describe('uiActions.merge', () => {
    it('should merge all properties of an object into existing state property', () => {
      const uiData = {
        ...initialState,
        selected: {
          project: 'project-id',
          branch: 'branch'
        }
      };
      const state = uiReducer(uiData, uiActions.merge('selected', {
        branch: 'another-branch',
        state: {}
      }));
      expect(state.selected).to.deep.equal({
        project: 'project-id',
        branch: 'another-branch',
        state: {}
      });
    });
  });

  describe('uiActions.clear', () => {
    it('should set key to empty object', () => {
      const uiData = {
        ...initialState,
        selected: {
          project: 'project-id',
          branch: 'branch'
        }
      };
      const state = uiReducer(uiData, uiActions.clear('selected'));
      expect(state.selected).to.deep.equal({});
    });
  });

  describe('uiActions.toggle', () => {
    it('should toggle undefined key to true', () => {
      const state = uiReducer(initialState, uiActions.toggle('dashboard', 'openMenu'));
      expect(state.dashboard).to.have.property('openMenu', true);
    });

    it('should toggle true key to false', () => {
      const uiData = {
        ...initialState,
        dashboard: {
          showOverlay: true
        }
      };
      const state = uiReducer(uiData, uiActions.toggle('dashboard', 'showOverlay'));
      expect(state.dashboard).to.have.property('showOverlay', false);
    });

    it('should toggle false key to true', () => {
      const uiData = {
        ...initialState,
        dashboard: {
          showOverlay: false
        }
      };
      const state = uiReducer(uiData, uiActions.toggle('dashboard', 'showOverlay'));
      expect(state.dashboard).to.have.property('showOverlay', true);
    });
  });
});
