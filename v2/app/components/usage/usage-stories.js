import React from 'react';
import { storiesOf } from '@storybook/react';
import Usage from './usage';

storiesOf('Usage', module)
  .add('loading', () => (
    <Usage
        accounts={{status: 'loading'}} />
  ))
  .add('no accounts', () => (
    <Usage
        accounts={{status: ''}}
        accountsData={[]}
        usage={{status: ''}} />
  ))
  .add('loading usage', () => (
    <Usage
        accounts={{status: ''}}
        accountsData={[{_id: 'account-id', name: 'Account'}]}
        usage={{status: 'loading'}} />
  ))
  .add('default', () => (
    <Usage
        accounts={{status: ''}}
        accountsData={[{_id: 'account-id', name: 'Account'}]}
        usage={{status: ''}}
        usageData={{startDate: '2017-08-01', endDate: '2017-08-31', totalStates: 10000, totalTests: 200}} />
  ))
  .add('with max', () => (
    <Usage
        accounts={{status: ''}}
        accountsData={[{_id: 'account-id', name: 'Account'}]}
        usage={{status: ''}}
        usageData={{startDate: '2017-08-01', endDate: '2017-08-31', totalStates: 10000, totalTests: 200, maxValidations: 20000}} />
  ));
