global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
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
const buildsActions = proxyquire('../../v2/app/reducers/builds/builds-actions', { 'react-notify-toast': notifyStub });
const mockStore = configureStore([thunk]);

const storeData = {
  builds: {
    result: '',
    status: '',
    errorMessage: ''
  },
  ui: {
    selected: {
      project: 'project-id',
      branch: 'branch'
    },
    buildsLimit: {}
  }
};

describe('reducers/builds', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('buildsActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/builds?limit=10')
          .reply(200, {results:[]});
        const expectedActions = [
          buildsActions.request('loading'),
          buildsActions.requestSuccess([])
        ];
        const store = mockStore(storeData);
        return store.dispatch(buildsActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should not set status when isRefresh', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/builds?limit=10')
          .reply(200, {results:[]});
        const expectedActions = [
          buildsActions.requestSuccess([])
        ];
        const store = mockStore(storeData);
        return store.dispatch(buildsActions.load(true))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/builds?limit=10')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          buildsActions.request('loading'),
          buildsActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(buildsActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('buildsActions.loadMore', () => {
      it('should increment limit by 10', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/builds?limit=10')
          .reply(200, {results:[]});
        const expectedActions = [
          uiActions.update('buildsLimit', 'project-id/branch', 20),
          buildsActions.requestSuccess([])
        ];
        const store = mockStore(storeData);
        return store.dispatch(buildsActions.loadMore())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('buildsActions.cancel', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .delete('/projects/project-id/branches/branch/builds/build-id')
          .reply(200, {success: true});
        const store = mockStore(storeData);
        return store.dispatch(buildsActions.cancel('build-id'))
          .then(() => expect(store.getActions()).to.deep.equal([]));
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .delete('/projects/project-id/branches/branch/builds/build-id')
          .reply(400, {error: {message: 'error message'} });
        const store = mockStore(storeData);
        return store.dispatch(buildsActions.cancel('build-id'))
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
