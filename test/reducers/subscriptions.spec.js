global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
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
const subscriptionsActions = proxyquire('../../v2/app/reducers/subscriptions/subscriptions-actions', { 'react-notify-toast': notifyStub });
const mockStore = configureStore([thunk]);

const subscriptionsData = {
  projects: [
    {
      project: 'a',
      projectRepo: 'org/repo-a',
      isSubscribed: false
    },
    {
      project: 'c',
      projectRepo: 'org/repo-c',
      isSubscribed: true
    },
    {
      project: 'b',
      projectRepo: 'org/repo-b',
      isSubscribed: true
    }
  ]
};

const storeData = {
  subscriptions: {
    result: subscriptionsData.projects,
    status: '',
    errorMessage: ''
  }
};

describe('reducers/subscriptions', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('subscriptionsActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/account/subscriptions')
          .reply(200, subscriptionsData);
        const expectedActions = [
          subscriptionsActions.request('loading'),
          subscriptionsActions.requestSuccess(subscriptionsData.projects)
        ];
        const store = mockStore(storeData);
        return store.dispatch(subscriptionsActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/account/subscriptions')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          subscriptionsActions.request('loading'),
          subscriptionsActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(subscriptionsActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('subscriptionsActions.update', () => {
      it('should subscribe when request successful', () => {
        nock(API_URL)
          .post('/projects/a/subscription')
          .reply(200, {});
        const expectedActions = [
          subscriptionsActions.requestSuccess([
            {
              ...subscriptionsData.projects[0],
              isSubscribed: true
            },
            subscriptionsData.projects[1],
            subscriptionsData.projects[2]
          ])
        ];
        const store = mockStore(storeData);
        return store.dispatch(subscriptionsActions.update('a', 'subscribe'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should unsubscribe when request successful', () => {
        nock(API_URL)
          .delete('/projects/c/subscription')
          .reply(200, {});
        const expectedActions = [
          subscriptionsActions.requestSuccess([
            subscriptionsData.projects[0],
            {
              ...subscriptionsData.projects[1],
              isSubscribed: false
            },
            subscriptionsData.projects[2]
          ])
        ];
        const store = mockStore(storeData);
        return store.dispatch(subscriptionsActions.update('c', 'unsubscribe'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .post('/projects/a/subscription')
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(subscriptionsActions.update('a', 'subscribe'))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
          });
      });
    });

  });
});
