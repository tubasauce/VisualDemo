global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import * as stateActions from '../../v2/app/reducers/state/state-actions';
import * as uiActions from '../../v2/app/reducers/ui/ui-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';
import proxyquire from 'proxyquire';

// create stub for notify dependency
let notifyObj;
const notifyStub = {
  notify: {
    show: (message, type) => {
      notifyObj = {message, type};
    }
  }
};
const statesActions = proxyquire('../../v2/app/reducers/states/states-actions', { 'react-notify-toast': notifyStub });
const mockStore = configureStore([thunk]);

const statesData = [
  {
    _id: 'state-1',
    status: 'changed',
    resolution: '1024x768',
    testName: 'Chrome'
  },
  {
    _id: 'state-2',
    status: 'accepted',
    resolution: '1024x768',
    testName: 'Chrome'
  }
];
const statesDataWithIgnores = [
  {
    _id: 'state-1',
    status: 'changed',
    ignores: ['ignore-1']
  },
  {
    _id: 'state-2',
    status: 'accepted',
    ignores: ['ignore-1']
  }
];
const storeData = {
  states: {
    result: statesData,
    status: '',
    errorMessage: ''
  },
  state: {
    result: {
      changes: []
    }
  },
  ui: {
    dashboard: {
    },
    selected: {
      project: 'project-id',
      branch: 'branch'
    },
    statesFilterBy: {
      changed: true,
      new: true,
      accepted: true,
      rejected: true
    }
  }
};
const storeDataWithIgnores = {
  ...storeData,
  states: {
    ...storeData.states,
    result: statesDataWithIgnores
  }
};

describe('reducers/states', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('statesActions.load', () => {
      it('should load all states when request successful', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/states')
          .reply(200, {results: []});
        const expectedActions = [
          statesActions.request('loading', true),
          statesActions.requestSuccess([])
        ];
        const store = mockStore(storeData);
        return store.dispatch(statesActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load states for resolution/testName when request successful', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/states?resolution=1024x768&testName=chrome')
          .reply(200, {results: []});
        const expectedActions = [
          statesActions.request('loading', true),
          statesActions.requestSuccess([])
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            selected: {
              project: 'project-id',
              branch: 'branch',
              resolution: '1024x768',
              testName: 'chrome'
            }
          }
        };
        const store = mockStore(testStoreData);
        return store.dispatch(statesActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/states')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          statesActions.request('loading', true),
          statesActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(statesActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('statesActions.select', () => {
      it('should select specified state', () => {
        const testState = {
          status: 'changed'
        };
        const expectedActions = [
          uiActions.update('selected', 'states', ['state-1', 'state-2']),
          uiActions.update('selected', 'state', testState),
          uiActions.set('stateDetail', {
            dom: true,
            layout: true,
            css: true,
            content: true,
            sideType: 'changes',
            overlay: 100
          }),
          stateActions.requestSuccess('')
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.select(testState));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should keep overlay option selected when panel is open', () => {
        const testState = {
          status: 'changed',
          referenceUrl: true
        };
        const expectedActions = [
          uiActions.update('selected', 'states', ['state-1', 'state-2']),
          uiActions.update('selected', 'state', testState),
          uiActions.set('stateDetail', {
            dom: true,
            layout: true,
            css: true,
            content: true,
            sideType: 'changes',
            overlay: 100
          }),
          uiActions.update('stateDetail', 'sideType', 'overlay'),
          stateActions.requestSuccess('')
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            prefs: {
              openSidePanel: true
            },
            stateDetail: {
              ...storeData.ui.stateDetail,
              sideType: 'overlay'
            }
          }
        };
        const store = mockStore(testStoreData);
        store.dispatch(statesActions.select(testState));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should persist hideHighlights option', () => {
        const testState = {
          status: 'changed'
        };
        const expectedActions = [
          uiActions.update('selected', 'states', ['state-1', 'state-2']),
          uiActions.update('selected', 'state', testState),
          uiActions.set('stateDetail', {
            dom: false,
            layout: false,
            css: false,
            content: false,
            sideType: 'changes',
            overlay: 100,
            hideHighlights: true
          }),
          stateActions.requestSuccess('')
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            stateDetail: {
              ...storeData.ui.stateDetail,
              hideHighlights: true
            }
          }
        };
        const store = mockStore(testStoreData);
        store.dispatch(statesActions.select(testState));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should select specified accepted state', () => {
        const testState = {
          status: 'accepted'
        };
        const expectedActions = [
          uiActions.update('selected', 'states', ['state-1', 'state-2']),
          uiActions.update('selected', 'state', testState),
          uiActions.clear('stateDetail'),
          stateActions.requestSuccess('')
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.select(testState));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should not set selected.states when state is selected', () => {
        const testState = {
          status: 'accepted'
        };
        const expectedActions = [
          uiActions.update('selected', 'state', testState),
          uiActions.clear('stateDetail'),
          stateActions.requestSuccess('')
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            selected: {
              ...storeData.ui.selected,
              state: true
            }
          }
        };
        const store = mockStore(testStoreData);
        store.dispatch(statesActions.select(testState));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    describe('statesActions.toggleHighlights', () => {
      it('should show all highlights', () => {
        const expectedActions = [
          uiActions.set('stateDetail', {
            dom: true,
            layout: true,
            css: true,
            content: true,
            sideType: 'changes'
          })
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.toggleHighlights());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should hide all highlights', () => {
        const testStoreData = {
          ui: {
            stateDetail: {
              dom: true
            }
          }
        };
        const expectedActions = [
          uiActions.set('stateDetail', {
            hideHighlights: true
          })
        ];
        const store = mockStore(testStoreData);
        store.dispatch(statesActions.toggleHighlights());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    describe('statesActions.setFilters', () => {
      it('should set all filters', () => {
        const expectedActions = [
          uiActions.set('statesFilterBy', {
            changed: true,
            new: true,
            accepted: true,
            rejected: true,
            reviewed: false
          })
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.setFilters('all'));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should set review filters', () => {
        const expectedActions = [
          uiActions.set('statesFilterBy', {
            changed: true,
            new: true,
            accepted: false,
            rejected: false,
            reviewed: false
          })
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.setFilters('review'));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should set reviewed filters', () => {
        const expectedActions = [
          uiActions.set('statesFilterBy', {
            changed: false,
            new: false,
            accepted: true,
            rejected: true,
            reviewed: true
          })
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.setFilters('reviewed'));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should set single filter', () => {
        const expectedActions = [
          uiActions.set('statesFilterBy', {
            changed: true,
            new: false,
            accepted: false,
            rejected: false,
            reviewed: false
          })
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.setFilters('changed'));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    describe('statesActions.open', () => {
      it('should reset selected', () => {
        const expectedActions = [
          uiActions.merge('selected', {
            resolution: undefined,
            testName: undefined,
            state: null
          }),
          uiActions.update('dashboard', 'showOverlay', true),
          uiActions.update('prefs', 'openSidePanel', false)
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.open());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should set resolution/testName', () => {
        const expectedActions = [
          uiActions.merge('selected', {
            resolution: '1024x768',
            testName: 'chrome',
            state: null
          }),
          uiActions.update('dashboard', 'showOverlay', true),
          uiActions.update('prefs', 'openSidePanel', false)
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.open('1024x768', 'chrome'));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should select all filters by default when filters are empty', () => {
        const testStoreData = {
          ...storeData,
          ui: {
            statesFilterBy: {}
          }
        };
        const expectedActions = [
          uiActions.set('statesFilterBy', {
            changed: true,
            new: true,
            accepted: true,
            rejected: true,
            reviewed: false
          }),
          uiActions.merge('selected', {
            resolution: undefined,
            testName: undefined,
            state: null
          }),
          uiActions.update('dashboard', 'showOverlay', true),
          uiActions.update('prefs', 'openSidePanel', false)
        ];
        const store = mockStore(testStoreData);
        store.dispatch(statesActions.open());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should load states when none loaded', () => {
        const testStoreData = {
          ...storeData,
          states: {
            result: ''
          }
        };
        const expectedActions = [
          uiActions.merge('selected', {
            resolution: undefined,
            testName: undefined,
            state: null
          }),
          uiActions.update('dashboard', 'showOverlay', true),
          uiActions.update('prefs', 'openSidePanel', false),
          statesActions.request('loading', true)
        ];
        const store = mockStore(testStoreData);
        store.dispatch(statesActions.open());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should load states when states already loaded AND forceLoad is true', () => {
        const expectedActions = [
          uiActions.merge('selected', {
            resolution: '1024x768',
            testName: 'chrome',
            state: null
          }),
          uiActions.update('dashboard', 'showOverlay', true),
          uiActions.update('prefs', 'openSidePanel', false),
          statesActions.request('loading', true)
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.open('1024x768', 'chrome', true));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
    });

    describe('statesActions.update', () => {
      it('should update prop of state matching condition', () => {
        const expectedActions = [
          statesActions.requestSuccess([
            {
              ...statesData[0],
              status: 'accepted'
            },
            statesData[1]
          ])
        ];
        const store = mockStore(storeData);
        store.dispatch(statesActions.update(state => state._id === statesData[0]._id, 'status', 'accepted'));
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should update selected state if matches condition', () => {
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            selected: {
              project: 'project-id',
              branch: 'branch',
              state: statesData[0]
            }
          }
        };
        const expectedAction = uiActions.update('selected', 'state', {
          ...statesData[0],
          status: 'accepted'
        });
        const store = mockStore(testStoreData);
        store.dispatch(statesActions.update(state => state._id === statesData[0]._id, 'status', 'accepted'));
        expect(store.getActions()[1]).to.deep.equal(expectedAction);
      });
    });

    describe('statesActions.addIgnore', () => {
      it('should add new ignore selector to state.ignores', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states/state-2/ignore', {
            selector: 'ignore-2'
          })
          .reply(200, {});
        const expectedActions = [
          statesActions.requestSuccess([
            statesDataWithIgnores[0],
            {
              ...statesDataWithIgnores[1],
              ignores: ['ignore-1', 'ignore-2']
            }
          ])
        ];
        const store = mockStore(storeDataWithIgnores);
        return store.dispatch(statesActions.addIgnore(statesDataWithIgnores[1], 'ignore-2'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set status to accepted when status is changed and no changes', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states/state-1/ignore', {
            selector: 'ignore-2'
          })
          .reply(200, {});
        const expectedAction = statesActions.requestSuccess([
          {
            ...statesDataWithIgnores[0],
            status: 'accepted'
          },
          statesDataWithIgnores[1]
        ]);
        const store = mockStore(storeDataWithIgnores);
        return store.dispatch(statesActions.addIgnore(statesDataWithIgnores[0], 'ignore-2'))
          .then(() => expect(store.getActions()[1]).to.deep.equal(expectedAction));
      });

      it('should notify error message when request fails', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states/state-2/ignore', {
            selector: 'ignore-2'
          })
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(statesActions.addIgnore(statesDataWithIgnores[1], 'ignore-2'))
          .then(() => expect(notifyObj).to.deep.equal({
            message: 'error message',
            type: 'error'
          }));
      });
    });

    describe('statesActions.removeIgnore', () => {
      it('should remove ignore selector from state.ignores', () => {
        nock(API_URL)
          .delete('/projects/project-id/branches/branch/states/state-1/ignore', {
            selector: 'ignore-1'
          })
          .reply(200, {});
        const expectedActions = [
          statesActions.requestSuccess([
            {
              ...statesDataWithIgnores[0],
              ignores: []
            },
            statesDataWithIgnores[1]
          ])
        ];
        const store = mockStore(storeDataWithIgnores);
        return store.dispatch(statesActions.removeIgnore(statesDataWithIgnores[0], 'ignore-1'))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('should set status to changed when status is accepted and has changes', () => {
        nock(API_URL)
          .delete('/projects/project-id/branches/branch/states/state-2/ignore', {
            selector: 'ignore-1'
          })
          .reply(200, {});
        const expectedAction = statesActions.requestSuccess([
          statesDataWithIgnores[0],
          {
            ...statesDataWithIgnores[1],
            status: 'changed'
          }
        ]);
        const testStoreData = {
          ...storeDataWithIgnores,
          state: {
            result: {
              changes: [{}]
            }
          }
        };
        const store = mockStore(testStoreData);
        return store.dispatch(statesActions.removeIgnore(statesDataWithIgnores[1], 'ignore-1'))
          .then(() => expect(store.getActions()[1]).to.deep.equal(expectedAction));
      });

      it('should notify error message when request fails', () => {
        nock(API_URL)
          .delete('/projects/project-id/branches/branch/states/state-2/ignore', {
            selector: 'ignore-1'
          })
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(statesActions.removeIgnore(statesDataWithIgnores[1], 'ignore-1'))
          .then(() => expect(notifyObj).to.deep.equal({
            message: 'error message',
            type: 'error'
          }));
      });
    });

    describe('statesActions.updateStatus', () => {
      it('should update state status', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'accepted'
              }
            ]
          })
          .reply(200, {});
        const expectedActions = [
          statesActions.requestSuccess([
            {
              ...statesData[0],
              status: 'accepted'
            },
            statesData[1]
          ]),
          statesActions.requestSuccess([
            {
              ...statesData[0],
              isReviewed: true
            },
            statesData[1]
          ]),
          statesActions.requestSuccess([
            {
              ...statesData[0],
              userName: 'me'
            },
            statesData[1]
          ])
        ];
        const store = mockStore(storeData);
        return store.dispatch(statesActions.updateStatus(statesData[0], 'accepted'))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('should do nothing if status unchanged', () => {
        const store = mockStore(storeData);
        store.dispatch(statesActions.updateStatus(statesData[1], 'accepted'));
        expect(store.getActions()).to.deep.equal([]);
      });

      it('should update selected state', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'accepted'
              }
            ]
          })
          .reply(200, {});
        const expectedActions = [
          uiActions.update('selected', 'state', {
            ...statesData[0],
            status: 'accepted'
          }),
          uiActions.update('selected', 'state', {
            ...statesData[0],
            isReviewed: true
          }),
          uiActions.update('selected', 'state', {
            ...statesData[0],
            userName: 'me'
          }),
          uiActions.clear('stateDetail')
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            selected: {
              project: 'project-id',
              branch: 'branch',
              state: statesData[0]
            }
          }
        };
        const store = mockStore(testStoreData);
        return store.dispatch(statesActions.updateStatus(statesData[0], 'accepted'))
          .then(() => {
            expect(store.getActions()[1]).to.deep.equal(expectedActions[0]);
            expect(store.getActions()[3]).to.deep.equal(expectedActions[1]);
            expect(store.getActions()[5]).to.deep.equal(expectedActions[2]);
            expect(store.getActions()[6]).to.deep.equal(expectedActions[3]);
          });
      });

      it('should reset stateDetail on selected state', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'rejected'
              }
            ]
          })
          .reply(200, {});
        const expectedActions = [
          uiActions.update('selected', 'state', {
            ...statesData[0],
            status: 'rejected'
          }),
          uiActions.update('selected', 'state', {
            ...statesData[0],
            isReviewed: true
          }),
          uiActions.update('selected', 'state', {
            ...statesData[0],
            userName: 'me'
          }),
          uiActions.set('stateDetail', {
            dom: true,
            layout: true,
            css: true,
            content: true
          })
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            selected: {
              project: 'project-id',
              branch: 'branch',
              state: statesData[0]
            }
          }
        };
        const store = mockStore(testStoreData);
        return store.dispatch(statesActions.updateStatus(statesData[0], 'rejected'))
          .then(() => {
            expect(store.getActions()[1]).to.deep.equal(expectedActions[0]);
            expect(store.getActions()[3]).to.deep.equal(expectedActions[1]);
            expect(store.getActions()[5]).to.deep.equal(expectedActions[2]);
            expect(store.getActions()[6]).to.deep.equal(expectedActions[3]);
          });
      });

      it('should notify error message when request fails', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'accepted'
              }
            ]
          })
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(statesActions.updateStatus(statesData[0], 'accepted'))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
          });
      });
    });

    describe('statesActions.acceptAll', () => {
      it('should update statuses when request successful', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'accepted'
              }
            ]
          })
          .reply(200, {});
        const expectedActions = [
          statesActions.request('saving'),
          statesActions.requestSuccess([
            {
              ...statesData[0],
              status: 'accepted'
            },
            statesData[1]
          ])
        ];
        const store = mockStore(storeData);
        return store.dispatch(statesActions.acceptAll())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'accepted'
              }
            ]
          })
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          statesActions.request('saving'),
          statesActions.requestError('error-saving', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(statesActions.acceptAll())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('statesActions.acceptStates', () => {
      it('should update statuses when request successful', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'accepted'
              }
            ]
          })
          .reply(200, {});
        const expectedActions = [
          statesActions.request('saving'),
          statesActions.requestSuccess([
            {
              ...statesData[0],
              status: 'accepted'
            },
            statesData[1]
          ])
        ];
        const store = mockStore(storeData);
        return store.dispatch(statesActions.acceptStates([statesData[0]]))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .post('/projects/project-id/branches/branch/states', {
            states: [
              {
                _id: 'state-1',
                status: 'accepted'
              }
            ]
          })
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          statesActions.request('saving'),
          statesActions.requestError('error-saving', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(statesActions.acceptStates([statesData[0]]))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

  });
});
