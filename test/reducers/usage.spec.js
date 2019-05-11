global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import configureStore from 'redux-mock-store';
import * as usageActions from '../../v2/app/reducers/usage/usage-actions';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';

const mockStore = configureStore([thunk]);

const storeData = {
  integration: {
    result: '',
    status: '',
    errorMessage: ''
  }
};
const usageData = {
  startDate: '2017-08-01',
  totalStates: 1000,
  totalTests: 200
};

describe('reducers/usage', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('usageActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/accounts/account-id/usage')
          .reply(200, usageData);
        const expectedActions = [
          usageActions.request('loading', true),
          usageActions.requestSuccess(usageData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(usageActions.load('account-id'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/accounts/account-id/usage')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          usageActions.request('loading', true),
          usageActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(usageActions.load('account-id'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

  });
});
