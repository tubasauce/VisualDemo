global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import {push} from 'react-router-redux';
import * as routeActions from '../../v2/app/reducers/route/route-actions';
import * as uiActions from '../../v2/app/reducers/ui/ui-actions';
import * as accountsActions from '../../v2/app/reducers/accounts/accounts-actions';
import * as subscriptionsActions from '../../v2/app/reducers/subscriptions/subscriptions-actions';
import * as integrationActions from '../../v2/app/reducers/integration/integration-actions';
import * as projectActions from '../../v2/app/reducers/project/project-actions';
import * as stateActions from '../../v2/app/reducers/state/state-actions';
import * as statesActions from '../../v2/app/reducers/states/states-actions';
import * as usageActions from '../../v2/app/reducers/usage/usage-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';

const mockStore = configureStore([thunk]);

const storeData = {
  account: {
    result: {
      name: 'Name'
    }
  },
  accounts: {
    result: [{_id: 'account-id'}]
  },
  integration: {
    result: ''
  },
  activity: {
    result: {
      projects: [
        {
          project: 'project-id',
          branch: 'branch',
          shortid: 'short-id',
          projectRepo: 'user/project-repo'
        },
        {
          project: 'project-id-2',
          branch: 'branch-2',
          shortid: 'short-id-2',
          projectRepo: 'user/project-repo-2'
        },
      ],
      recent: [
        {
          project: 'project-id',
          branch: 'branch'
        }
      ]
    }
  },
  states: {
    result: ''
  },
  ui: {
    location: {},
    locationParams: {},
    selected: {
      project: 'project-id',
      branch: 'branch'
    },
    statesFilterBy: {}
  }
};
const statesData = [
  {
    id: 'state-id',
    resolution: '1024x768',
    testName: 'chrome'
  }
];

describe('reducers/route', () => {
  describe('routeActions.toNewProject', () => {
    it('should redirect to new route', () => {
      const expectedActions = [
        push('/v2/new')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toNewProject());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('routeActions.toDashboard', () => {
    it('should redirect to root dashboard', () => {
      const expectedActions = [
        push('/v2/dashboard')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toDashboard());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should redirect to root dashboard when project not found', () => {
      const expectedActions = [
        push('/v2/dashboard')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toDashboard('project-2', 'branch'));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should redirect to dashboard with project and branch', () => {
      const expectedActions = [
        push('/v2/dashboard/short-id.user-project-repo/branch')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toDashboard('project-id', 'branch'));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('routeActions.toSelectedDashboard', () => {
    it('should redirect to selected dashboard', () => {
      const expectedActions = [
        push('/v2/dashboard/short-id.user-project-repo/branch')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toSelectedDashboard());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('routeActions.toStateList', () => {
    it('should redirect to state list with project and branch only', () => {
      const expectedActions = [
        push('/v2/states/short-id.user-project-repo/branch')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toStateList());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should redirect to state list with resolution and testName', () => {
      const expectedActions = [
        push('/v2/states/short-id.user-project-repo/branch/1024x768/chrome')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toStateList('1024x768', 'chrome'));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should redirect to state list and set filter', () => {
      const expectedActions = [
        uiActions.set('statesFilterBy', {
          changed: true,
          new: true,
          accepted: true,
          rejected: true,
          reviewed: false
        }),
        push('/v2/states/short-id.user-project-repo/branch/1024x768/chrome')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toStateList('1024x768', 'chrome', 'all'));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('routeActions.toSelectedStateList', () => {
    it('should redirect to selected state list', () => {
      const expectedActions = [
        push('/v2/states/short-id.user-project-repo/branch')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toSelectedStateList());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });

    it('should redirect to selected state list with resolution and testName', () => {
      const testStoreData = {
        ...storeData,
        ui: {
          selected: {
            ...storeData.ui.selected,
            resolution: '1024x768',
            testName: 'chrome'
          }
        }
      };
      const expectedActions = [
        push('/v2/states/short-id.user-project-repo/branch/1024x768/chrome')
      ];
      const store = mockStore(testStoreData);
      store.dispatch(routeActions.toSelectedStateList());
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('routeActions.toStateDetail', () => {
    it('should redirect to state detail', () => {
      const expectedActions = [
        push('/v2/states/short-id.user-project-repo/branch/1024x768/chrome/state-id')
      ];
      const store = mockStore(storeData);
      store.dispatch(routeActions.toStateDetail('1024x768', 'chrome', 'state-id'));
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  describe('routeActions.manager', () => {
    describe('route: /v2/account/:view', () => {
      it('should load account data and reset ui state', () => {
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/account/profile'}
          }
        };
        const expectedActions = [
          uiActions.set('profile', {name: 'Name'}),
          uiActions.clear('password')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load usage data', () => {
        nock(API_URL)
          .get('/accounts')
          .reply(200, {accounts: [{_id: 'account-id', name: 'Account'}]});
        nock(API_URL)
          .get('/accounts/account-id/usage')
          .reply(200, {});
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/account/usage'}
          }
        };
        const expectedActions = [
          accountsActions.request('loading'),
          accountsActions.requestSuccess([{_id: 'account-id', name: 'Account'}]),
          usageActions.request('loading', true)
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load notifications data', () => {
        nock(API_URL)
          .get('/account/subscriptions')
          .reply(200, {projects: []});
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/account/notifications'}
          }
        };
        const expectedActions = [
          subscriptionsActions.request('loading'),
          subscriptionsActions.requestSuccess([])
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load github data', () => {
        nock(API_URL)
          .get('/account/integrations/github')
          .reply(200, {});
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/account/github'}
          }
        };
        const expectedActions = [
          uiActions.clear('integration'),
          integrationActions.request('loading'),
          integrationActions.requestSuccess({})
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load github-enterprise data', () => {
        nock(API_URL)
          .get('/account/integrations/github-enterprise')
          .reply(200, {});
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/account/github-enterprise'}
          }
        };
        const expectedActions = [
          uiActions.clear('integration'),
          integrationActions.request('loading'),
          integrationActions.requestSuccess({})
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load vsts data', () => {
        nock(API_URL)
          .get('/account/integrations/vsts')
          .reply(200, {});
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/account/vsts'}
          }
        };
        const expectedActions = [
          uiActions.clear('integration'),
          integrationActions.request('loading'),
          integrationActions.requestSuccess({})
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load webhooks data', () => {
        nock(API_URL)
          .get('/accounts?admin=true')
          .reply(200, {accounts: [{_id: 'account-id'}]});
        nock(API_URL)
          .get('/accounts/account-id/integrations/webhooks')
          .reply(200, {});
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/account/webhooks'}
          }
        };
        const expectedActions = [
          accountsActions.request('loading'),
          accountsActions.requestSuccess([{_id: 'account-id'}]),
          integrationActions.request('loading'),
          integrationActions.requestSuccess({})
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('route: /v2/new', () => {
      it('should reset selected project', () => {
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/new'}
          }
        };
        const expectedActions = [
          uiActions.update('dashboard', 'showOverlay', false),
          accountsActions.request('loading'),
          uiActions.set('selected', {
            project: ''
          }),
          uiActions.clear('wizard')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('route: /v2/dashboard', () => {
      it('should redirect to default project', () => {
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/dashboard'}
          }
        };
        const expectedActions = [
          uiActions.update('dashboard', 'showOverlay', false),
          push('/v2/dashboard/short-id.user-project-repo/branch')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should redirect to new project when no recent', () => {
        const testStoreData = {
          ...storeData,
          activity: {
            result: {
              recent: []
            }
          },
          ui: {
            location: {pathname: '/v2/dashboard'}
          }
        };
        const expectedActions = [
          uiActions.update('dashboard', 'showOverlay', false),
          push('/v2/new')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager({}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('route: /v2/dashboard/:project/:branch', () => {
      it('should redirect to root dashboard when project not found', () => {
        const locationParams = {project: 'project-not-exist', branch: 'branch'};
        const testStoreData = {
          ...storeData,
          ui: {
            location: {pathname: '/v2/dashboard/project-not-exist/branch'},
            locationParams
          }
        };
        const expectedActions = [
          uiActions.update('dashboard', 'showOverlay', false),
          push('/v2/dashboard')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should do nothing when project or branch has not changed', () => {
        const locationParams = {project: 'project-id', branch: 'branch'};
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            location: {pathname: '/v2/dashboard/project-id/branch'},
            locationParams
          }
        };
        const expectedActions = [
          uiActions.update('dashboard', 'showOverlay', false)
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should load project when project or branch has changed', () => {
        const locationParams = {project: 'short-id-2.user-project-repo-2', branch: 'branch-2'};
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            location: {pathname: '/v2/dashboard/short-id-2.user-project-repo-2/branch-2'},
            locationParams
          }
        };
        const expectedActions = [
          uiActions.update('dashboard', 'showOverlay', false),
          uiActions.set('selected', {
            project: 'project-id-2',
            branch: 'branch-2'
          }),
          projectActions.request('loading', true),
          uiActions.update('dashboard', 'resultType', 'current')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should redirect to slugified url when project id used in url', () => {
        const locationParams = {project: 'project-id-2', branch: 'branch-2'};
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            location: {pathname: '/v2/dashboard/project-id-2/branch-2'},
            locationParams
          }
        };
        const expectedActions = [
          uiActions.update('dashboard', 'showOverlay', false),
          uiActions.set('selected', {
            project: 'project-id-2',
            branch: 'branch-2'
          }),
          projectActions.request('loading', true),
          uiActions.update('dashboard', 'resultType', 'current'),
          push('/v2/dashboard/short-id-2.user-project-repo-2/branch-2')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('route: /v2/states/:project/:branch', () => {
      it('should open state list with project and branch only', () => {
        const locationParams = {project: 'short-id.user-project-repo', branch: 'branch'};
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            location: {pathname: '/v2/states/short-id.user-project-repo/branch'},
            locationParams
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
          uiActions.update('prefs', 'openSidePanel', false),
          statesActions.request('loading', true)
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('route: /v2/states/:project/:branch/:resolution/:testName', () => {
      it('should open state list with resolution and testName', () => {
        const locationParams = {project: 'short-id.user-project-repo', branch: 'branch', resolution: '1024x768', testName: 'chrome'};
        const testStoreData = {
          ...storeData,
          ui: {
            ...storeData.ui,
            location: {pathname: '/v2/states/short-id.user-project-repo/branch/1024x768/chrome'},
            locationParams
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
            resolution: '1024x768',
            testName: 'chrome',
            state: null
          }),
          uiActions.update('dashboard', 'showOverlay', true),
          uiActions.update('prefs', 'openSidePanel', false),
          statesActions.request('loading', true)
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('route: /v2/states/:project/:branch/:resolution/:testName/:stateId', () => {
      it('should select state when found in statesData', () => {
        const locationParams = {project: 'short-id.user-project-repo', branch: 'branch', resolution: '1024x768', testName: 'chrome', stateId: 'state-id'};
        const testStoreData = {
          ...storeData,
          states: {
            result: statesData
          },
          ui: {
            ...storeData.ui,
            location: {pathname: '/v2/states/short-id.user-project-repo/branch/1024x768/chrome/state-id'},
            locationParams
          }
        };
        const expectedActions = [
          uiActions.update('selected', 'states', []),
          uiActions.update('selected', 'state', statesData[0]),
          uiActions.set('stateDetail', {
            content: true,
            css: true,
            dom: true,
            layout: true,
            sideType: 'changes',
            overlay: 100
          }),
          stateActions.requestSuccess('')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should redirect to state list when state not found', () => {
        const locationParams = {project: 'short-id.user-project-repo', branch: 'branch', resolution: '1024x768', testName: 'chrome', stateId: 'state-not-exist'};
        const testStoreData = {
          ...storeData,
          states: {
            result: statesData
          },
          ui: {
            ...storeData.ui,
            location: {pathname: '/v2/states/short-id.user-project-repo/branch/1024x768/chrome/state-not-exist'},
            locationParams
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
            resolution: '1024x768',
            testName: 'chrome',
            state: null
          }),
          uiActions.update('dashboard', 'showOverlay', true),
          uiActions.update('prefs', 'openSidePanel', false),
          push('/v2/states/short-id.user-project-repo/branch')
        ];
        const store = mockStore(testStoreData);
        return store.dispatch(routeActions.manager(locationParams, {stateId: true}))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });
  });
});
