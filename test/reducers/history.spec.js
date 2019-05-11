global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import * as historyActions from '../../v2/app/reducers/history/history-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';

const mockStore = configureStore([thunk]);

const storeData = {
  history: {
    result: '',
    status: '',
    errorMessage: ''
  },
  ui: {
    selected: {
      project: 'project-id',
      branch: 'branch',
      state: {
        resolution: '1024x768',
        testName: 'Chrome',
        id: 'state-id'
      }
    }
  }
};

describe('reducers/history', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('historyActions.load', () => {
      it('should load history when request successful', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/states/history?resolution=1024x768&testName=Chrome&state=state-id')
          .reply(200, { results: [] });
        const expectedActions = [
          historyActions.requestSuccess(''),
          historyActions.request('loading'),
          historyActions.requestSuccess([])
        ];
        const store = mockStore(storeData);
        return store.dispatch(historyActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should not load changes if state not set', () => {
        const expectedActions = [
          historyActions.requestSuccess('')
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            selected: {}
          }
        };
        const store = mockStore(testStoreData);
        store.dispatch(historyActions.load());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/projects/project-id/branches/branch/states/history?resolution=1024x768&testName=Chrome&state=state-id')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          historyActions.requestSuccess(''),
          historyActions.request('loading'),
          historyActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(historyActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

  });
});
