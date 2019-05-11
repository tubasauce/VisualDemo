global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import * as stateActions from '../../v2/app/reducers/state/state-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';

const mockStore = configureStore([thunk]);

const storeData = {
  state: {
    result: '',
    status: '',
    errorMessage: ''
  },
  ui: {
    selected: {
      state: {
        changesUrl: `${API_URL}/changes`
      }
    }
  }
};

describe('reducers/state', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('stateActions.loadChanges', () => {
      it('should load changes when request successful', () => {
        nock(API_URL)
          .get('/changes')
          .reply(200, {});
        const expectedActions = [
          stateActions.requestSuccess(''),
          stateActions.request('loading'),
          stateActions.requestSuccess({})
        ];
        const store = mockStore(storeData);
        return store.dispatch(stateActions.loadChanges())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should not load changes if state not set', () => {
        const expectedActions = [
          stateActions.requestSuccess('')
        ];
        const testStoreData = {
          ...storeData,
          ui: {
            selected: {}
          }
        };
        const store = mockStore(testStoreData);
        store.dispatch(stateActions.loadChanges());
        expect(store.getActions()).to.deep.equal(expectedActions);
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/changes')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          stateActions.requestSuccess(''),
          stateActions.request('loading'),
          stateActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(stateActions.loadChanges())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

  });
});
