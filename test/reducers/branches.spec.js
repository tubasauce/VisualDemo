global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import * as branchesActions from '../../v2/app/reducers/branches/branches-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';

const mockStore = configureStore([thunk]);

const storeData = {
  branches: {
    result: '',
    status: '',
    errorMessage: ''
  },
  ui: {
    selected: {
      project: 'project-id'
    }
  }
};

describe('reducers/branches', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('branchesActions.load', () => {
      it('should set result when request successful', () => {
        const response = {
          limit: 20,
          results: ['branch', 'master']
        };
        nock(API_URL)
          .get('/projects/project-id/branches?limit=20')
          .reply(200, response);
        const expectedActions = [
          branchesActions.request('loading', true),
          branchesActions.requestSuccess(response)
        ];
        const store = mockStore(storeData);
        return store.dispatch(branchesActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set custom limit', () => {
        const response = {
          limit: 25,
          results: ['branch', 'master']
        };
        nock(API_URL)
          .get('/projects/project-id/branches?limit=25')
          .reply(200, response);
        const expectedActions = [
          branchesActions.request('loading', true),
          branchesActions.requestSuccess(response)
        ];
        const store = mockStore(storeData);
        return store.dispatch(branchesActions.load(25))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/projects/project-id/branches?limit=20')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          branchesActions.request('loading', true),
          branchesActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(branchesActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

  });
});
