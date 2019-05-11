import React from 'react';
import { storiesOf } from '@storybook/react';

import Account from './account';

storiesOf('Account', module)
  .add('usage', () => (
    <Account
      params={{view: 'usage'}}
      location={{pathname: '/v2/account/usage'}}
      accounts={{status: ''}}
      accountsData={[{_id: 'account-id', name: 'Account'}]}
      usage={{status: ''}}
      usageData={{startDate: '2017-08-01', endDate: '2017-08-31', totalStates: 10000, totalTests: 200}}
      user={{}} />
  ))
  .add('user profile', () => (
    <Account
      params={{view: 'profile'}}
      location={{pathname: '/v2/account/profile'}}
      account={{status: ''}}
      ui={{profile: {name: 'Name'}}}
      user={{}} />
  ))
  .add('api key', () => (
    <Account
      params={{view: 'api-key'}}
      location={{pathname: '/v2/account/api-key'}}
      account={{status: ''}}
      accountData={{apiKey: 'API-KEY-XXXX'}}
      accounts={{status: ''}}
      accountsData={[]}
      user={{}} />
  ))
  .add('change password', () => (
    <Account
      params={{view: 'password'}}
      location={{pathname: '/v2/account/password'}}
      account={{status: ''}}
      ui={{password: {}}}
      user={{}} />
  ))
  .add('notifications', () => (
    <Account
      params={{view: 'notifications'}}
      location={{pathname: '/v2/account/notifications'}}
      subscriptions={{status: ''}}
      subscriptionsData={{subscribed: [], unsubscribed: []}}
      user={{}} />
  ))
  .add('github', () => (
    <Account
      params={{view: 'github'}}
      location={{pathname: '/v2/account/github'}}
      integration={{status: ''}}
      integrationData={{}}
      user={{}} />
  ))
  .add('github enterprise', () => (
    <Account
      params={{view: 'github-enterprise'}}
      location={{pathname: '/v2/account/github-enterprise'}}
      integration={{status: ''}}
      integrationData={{}}
      ui={{integration: {}}} />
  ))
  .add('vsts', () => (
    <Account
      params={{view: 'vsts'}}
      location={{pathname: '/v2/account/vsts'}}
      integration={{status: ''}}
      integrationData={{}}
      user={{}} />
  ))
  .add('webhooks', () => (
    <Account
      params={{view: 'webhooks'}}
      location={{pathname: '/v2/account/webhooks'}}
      accounts={{status: ''}}
      accountsData={[]}
      integration={{status: ''}}
      integrationData={{}}
      ui={{modal: {}}} />
  ));
