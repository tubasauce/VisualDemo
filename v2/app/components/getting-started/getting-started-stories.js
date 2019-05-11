import React from 'react';
import { storiesOf } from '@storybook/react';
import GettingStarted from './getting-started';

const accounts = {
  status: ''
};
const accountsData = [
  {
    apiKey: 'API-KEY',
    name: 'My Account',
    role: 'owner'
  }
];
const multipleAccountsData = [
  {
    apiKey: 'API-KEY-2',
    name: 'Another Account'
  },
  {
    apiKey: 'API-KEY',
    name: 'My Account',
    role: 'owner'
  }
];

storiesOf('GettingStarted', module)
    .add('loading', () => (
      <GettingStarted
        accounts={{status: 'loading'}}
        accountsData={accountsData}
        ui={{
          wizard: {
            stepIndex: 0
          }
        }} />
    ))
    .add('no permission', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={[]}
        ui={{
          wizard: {
            stepIndex: 0
          }
        }} />
    ))
    .add('step 1', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={accountsData}
        ui={{
          wizard: {
            stepIndex: 0
          }
        }} />
    ))
    .add('step 2', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={accountsData}
        ui={{
          wizard: {
            stepIndex: 1
          }
        }} />
    ))
    .add('step 2 multiple accounts', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={multipleAccountsData}
        ui={{
          wizard: {
            stepIndex: 1
          }
        }} />
    ))
    .add('step 3', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={accountsData}
        ui={{
          wizard: {
            stepIndex: 2
          }
        }} />
    ))
    .add('step 4', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={accountsData}
        ui={{
          wizard: {
            stepIndex: 3
          }
        }} />
    ))
    .add('step 5', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={accountsData}
        ui={{
          wizard: {
            stepIndex: 4
          }
        }} />
    ))
    .add('step 6', () => (
      <GettingStarted
        accounts={accounts}
        accountsData={accountsData}
        ui={{
          wizard: {
            stepIndex: 5
          }
        }} />
    ));
