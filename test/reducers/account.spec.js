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
const accountActions = proxyquire('../../v2/app/reducers/account/account-actions', { 'react-notify-toast': notifyStub });
const mockStore = configureStore([thunk]);

const storeData = {
  account: {
    result: '',
    status: '',
    errorMessage: ''
  },
  ui: {
  }
};

const accountData = {
  apiKey: 'API-KEY-XXXX',
  name: 'Name'
};

describe('reducers/account', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('accountActions.init', () => {
      it('should load account data when no existing account data', () => {
        nock(API_URL)
          .get('/account')
          .reply(200, accountData);
        const expectedActions = [
          accountActions.request('loading'),
          accountActions.requestSuccess(accountData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.init())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should not load account data when has existing account data', () => {
        nock(API_URL)
          .get('/account')
          .reply(200, accountData);
        const expectedActions = [];
        const testStoreData = {
          account: {
            result: true
          }
        };
        const store = mockStore(testStoreData);
        return store.dispatch(accountActions.init())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('accountActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/account')
          .reply(200, accountData);
        const expectedActions = [
          accountActions.requestSuccess(accountData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/account')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          accountActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.load())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('accountActions.updateProfile', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .post('/account/profile', accountData)
          .reply(200, accountData);
        const expectedActions = [
          accountActions.request('saving'),
          accountActions.requestSuccess(accountData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.updateProfile(accountData))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'Successfully Saved Profile',
              type: 'success'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .post('/account/profile')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          accountActions.request('saving'),
          accountActions.request('')
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.updateProfile(accountData))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('accountActions.generateNewKey', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .post('/account/api-key')
          .reply(200, {apiKey: 'NEW-KEY'});
        const expectedActions = [
          accountActions.request('saving'),
          accountActions.requestSuccess({
            apiKey: 'NEW-KEY'
          })
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.generateNewKey())
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'Successfully Generated New API Key',
              type: 'success'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .post('/account/api-key')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          accountActions.request('saving'),
          accountActions.request('')
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.generateNewKey())
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('accountActions.changePassword', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .post('/account/password', {
            oldPassword: 'old',
            newPassword: 'new'
          })
          .reply(200, {});
        const expectedActions = [
          uiActions.clear('password'),
          accountActions.request('saving'),
          accountActions.requestSuccess({})
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.changePassword('old', 'new'))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'Successfully Changed Password',
              type: 'success'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .post('/account/password')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          uiActions.clear('password'),
          accountActions.request('saving'),
          accountActions.request('')
        ];
        const store = mockStore(storeData);
        return store.dispatch(accountActions.changePassword('old', 'new'))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

  });
});
