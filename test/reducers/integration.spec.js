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
const integrationActions = proxyquire('../../v2/app/reducers/integration/integration-actions', { 'react-notify-toast': notifyStub });
const mockStore = configureStore([thunk]);

const storeData = {
  accounts: {
    result: [{_id: 'account-id'}]
  },
  integration: {
    result: '',
    status: '',
    errorMessage: ''
  }
};
const githubData = {
  user: {
    login: 'username'
  }
};
const githubEnterpriseData = {
  hostUrl: 'http://ghe-server'
};
const webhookData = {
  url: 'https://webhook.com'
};

describe('reducers/integration', () => {
  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('integrationActions.load', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/account/integrations/github')
          .reply(200, githubData);
        const expectedActions = [
          integrationActions.request('loading'),
          integrationActions.requestSuccess(githubData)
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.load('github'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/account/integrations/github')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          integrationActions.request('loading'),
          integrationActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.load('github'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('integrationActions.add', () => {
      it('should reset result when request successful', () => {
        nock(API_URL)
          .post('/account/integrations/github-enterprise', githubEnterpriseData)
          .reply(200, { success: true });
        nock(API_URL)
          .get('/account/integrations/github-enterprise')
          .reply(200, githubEnterpriseData);
        const expectedActions = [
          integrationActions.request('saving')
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.add('github-enterprise', githubEnterpriseData))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .post('/account/integrations/github-enterprise', githubEnterpriseData)
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          integrationActions.request('saving'),
          integrationActions.request('')
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.add('github-enterprise', githubEnterpriseData))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('integrationActions.remove', () => {
      it('should reset result when request successful', () => {
        nock(API_URL)
          .delete('/account/integrations/github')
          .reply(200, { success: true });
        const expectedActions = [
          integrationActions.request('saving'),
          integrationActions.requestSuccess({})
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.remove('github'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .delete('/account/integrations/github')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          integrationActions.request('saving'),
          integrationActions.request('')
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.remove('github'))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('integrationActions.loadWebhooks', () => {
      it('should set result when request successful', () => {
        nock(API_URL)
          .get('/accounts/account-id/integrations/webhooks')
          .reply(200, {webhooks: []});
        const expectedActions = [
          integrationActions.request('loading'),
          integrationActions.requestSuccess({webhooks: []})
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.loadWebhooks())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should set error message when request fails', () => {
        nock(API_URL)
          .get('/accounts/account-id/integrations/webhooks')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          integrationActions.request('loading'),
          integrationActions.requestError('error-loading', 'error message')
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.loadWebhooks())
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });
    });

    describe('integrationActions.addWebhook', () => {
      it('should reload when request successful', () => {
        nock(API_URL)
          .post('/accounts/account-id/integrations/webhooks', webhookData)
          .reply(200, { success: true });
        nock(API_URL)
          .get('/accounts/account-id/integrations/webhooks')
          .reply(200, {webhooks: []});
        const expectedActions = [
          integrationActions.request('saving'),
          integrationActions.request('loading'),
          integrationActions.requestSuccess({webhooks: []})
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.addWebhook(webhookData))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .post('/accounts/account-id/integrations/webhooks', webhookData)
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          integrationActions.request('saving'),
          integrationActions.request('')
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.addWebhook(webhookData))
          .then(() => {
            expect(notifyObj).to.deep.equal({
              message: 'error message',
              type: 'error'
            });
            expect(store.getActions()).to.deep.equal(expectedActions);
          });
      });
    });

    describe('integrationActions.removeWebhook', () => {
      it('should reload when request successful', () => {
        nock(API_URL)
          .delete('/accounts/account-id/integrations/webhooks/webhook-id')
          .reply(200, { success: true });
        nock(API_URL)
          .get('/accounts/account-id/integrations/webhooks')
          .reply(200, {webhooks: []});
        const expectedActions = [
          integrationActions.request('saving'),
          integrationActions.request('loading'),
          integrationActions.requestSuccess({webhooks: []})
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.removeWebhook('webhook-id'))
          .then(() => expect(store.getActions()).to.deep.equal(expectedActions));
      });

      it('should notify error when request fails', () => {
        nock(API_URL)
          .delete('/accounts/account-id/integrations/webhooks/webhook-id')
          .reply(400, {error: {message: 'error message'} });
        const expectedActions = [
          integrationActions.request('saving'),
          integrationActions.request('')
        ];
        const store = mockStore(storeData);
        return store.dispatch(integrationActions.removeWebhook('webhook-id'))
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
