global.fetch = require('node-fetch');
global.document = {};

import {expect} from 'chai';
import * as accountsActions from '../../v2/app/reducers/accounts/accounts-actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import {API_URL} from '../../v2/app/api';

const mockStore = configureStore([thunk]);

const storeData = {
  accounts: {
    result: '',
    status: '',
    errorMessage: ''
  }
};
const accountsData = {
  accounts: [
    {
      name: 'My Account',
      apiKey: 'api-key',
      role: 'owner'
    }
  ]
};

describe('reducers/accounts', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('accountsActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/accounts')
          .reply(200, accountsData);
        const expectedActions = [
          accountsActions.request('loading'),
          accountsActions.requestSuccess(accountsData.accounts)
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountsActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/accounts')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          accountsActions.request('loading'),
          accountsActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountsActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });
  });
});
