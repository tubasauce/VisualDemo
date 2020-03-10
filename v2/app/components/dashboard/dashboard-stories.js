import React from 'react';
import { storiesOf } from '@storybook/react';
import Dashboard from './dashboard';

const activity = {
  status: ''
};
const activityData = {
  projects: []
};
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
const ui = {
  selected: {},
  wizard: {},
  dashboard: {
    activityType: 'recent'
  },
  modal: {}
};

storiesOf('Dashboard', module)
    .add('empty state', () => (
      <Dashboard
        accounts={accounts}
        accountsData={accountsData}
        activity={activity}
        activityData={activityData}
        ui={ui}
        states={{}}
        statesGroupedData={[]}
        user={{}}
        />
    ))
    .add('expired', () => (
      <Dashboard
        accounts={accounts}
        accountsData={accountsData}
        activity={activity}
        activityData={activityData}
        ui={ui}
        states={{}}
        statesGroupedData={[]}
        user={{}}
        />
    ));
