global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import {push} from 'react-router-redux';
import * as uiActions from '../../v2/app/reducers/ui/ui-actions';
import * as activityActions from '../../v2/app/reducers/activity/activity-actions';
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
const projectActions = proxyquire('../../v2/app/reducers/project/project-actions', { 'react-notify-toast': notifyStub });
const mockStore = configureStore([thunk]);

const storeData = {
  activity: {
    result: '',
    status: '',
    errorMessage: ''
  },
  project: {
    result: '',
    status: '',
    errorMessage: ''
  },
  ui: {
    dashboard: {
      activityType: 'recent'
    },
    selected: {
      project: 'project-id',
      branch: 'branch'
    }
  }
};

describe('reducers/project', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('projectActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch')
          .reply(200, {});
        const expectedActions = [
          projectActions.request('loading', true),
          uiActions.update('dashboard', 'resultType', 'current'),
          projectActions.requestSuccess({})
        ];
        const store = mockStore(storeData);
        return store.dispatch(projectActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should not set status when isRefresh', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch')
          .reply(200, {});
        const expectedActions = [
          projectActions.requestSuccess({})
        ];
        const store = mockStore(storeData);
        return store.dispatch(projectActions.load(true))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          projectActions.request('loading', true),
          uiActions.update('dashboard', 'resultType', 'current'),
          projectActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(projectActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('projectActions.subscribe', () => {
      it('should reload project on successful subscribe', () => {
        nock(API_URL)
          .post('/projects/project-id/subscription')
          .reply(200, {});
        nock(API_URL)
          .get('/projects/project-id/branches/branch')
          .reply(200, {});
        const expectedActions = [
          projectActions.requestSuccess({})
        ];
        const store = mockStore(storeData);
        return store.dispatch(projectActions.subscribe())
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'Successfully Subscribed to receiving notifications',
              type: 'success'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .post('/projects/project-id/subscription')
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(projectActions.subscribe())
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal([]);
          });
      });
    });

    describe('projectActions.unsubscribe', () => {
      it('should reload project on successful unsubscribe', () => {
        nock(API_URL)
          .delete('/projects/project-id/subscription')
          .reply(200, {});
        nock(API_URL)
          .get('/projects/project-id/branches/branch')
          .reply(200, {});
        const expectedActions = [
          projectActions.requestSuccess({})
        ];
        const store = mockStore(storeData);
        return store.dispatch(projectActions.unsubscribe())
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'Successfully Unsubscribed from receiving notifications',
              type: 'success'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .delete('/projects/project-id/subscription')
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(projectActions.unsubscribe())
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal([]);
          });
      });
    });

    describe('projectActions.remove', () => {
      it('should clear selected and reload activity when request successful', () => {
        nock(API_URL)
          .delete('/projects/project-id')
          .reply(200, {});
        nock(API_URL)
          .get('/projects/project-id/activity?type=recent&limit=8')
          .reply(200, {projects: [], recent: []});
        const expectedActions = [
          uiActions.clear('selected'),
          activityActions.requestSuccess({projects: [], recent: []}),
          push('/v2/dashboard')
        ];
        const store = mockStore(storeData);
        return store.dispatch(projectActions.remove())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .delete('/projects/project-id')
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(projectActions.remove())
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal([]);
          });
      });
    });

  });
});
