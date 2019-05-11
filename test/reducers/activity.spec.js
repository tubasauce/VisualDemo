global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import * as activityActions from '../../v2/app/reducers/activity/activity-actions';
import * as uiActions from '../../v2/app/reducers/ui/ui-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';

const mockStore = configureStore([thunk]);

const storeData = {
  activity: {
    result: '',
    status: '',
    errorMessage: ''
  },
  ui: {
    selected: {},
    dashboard: {
      activityType: 'recent',
      activityLimit: 8
    }
  }
};
const builds = [
  {
    branch: 'branch-1',
    project: 'project-1',
    projectRepo: 'project-repo-1',
    shortid: 'short-id-1'
  },
  {
    branch: 'branch-2',
    project: 'project-2',
    projectRepo: 'project-repo-2',
    shortid: 'short-id-2'
  }
];
const activityData = {
  projects: builds,
  recent: builds
};

describe('reducers/activity', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('activityActions.init', () => {
      it('should load activity data when no existing activity data', () => {
        nock(API_URL)
          .get('/activity?type=recent&limit=8')
          .reply(200, activityData);
        const expectedActions = [
          activityActions.request('loading'),
          activityActions.requestSuccess(activityData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(activityActions.init())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should not load activity data when has existing activity data', () => {
        nock(API_URL)
          .get('/activity?type=recent&limit=8')
          .reply(200, activityData);
        const expectedActions = [];
        const testStoreData = {
          activity: {
            result: true
          }
        };
        const store = mockStore(testStoreData);
        return store.dispatch(activityActions.init())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('activityActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/activity?type=recent&limit=8')
          .reply(200, activityData);
        const expectedActions = [
          activityActions.requestSuccess(activityData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(activityActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/activity?type=recent&limit=8')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          activityActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(activityActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('activityActions.loadMore', () => {
      it('should load more activities', () => {
        nock(API_URL)
          .get('/activity?type=recent&limit=8')
          .reply(200, activityData);
        const expectedActions = [
          uiActions.update('dashboard', 'activityLimit', 16),
          activityActions.requestSuccess(activityData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(activityActions.loadMore())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });
  });
});
