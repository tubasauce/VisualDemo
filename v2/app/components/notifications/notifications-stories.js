import React from 'react';
import { storiesOf } from '@storybook/react';
import Notifications from './notifications';

storiesOf('Notifications', module)
  .add('loading', () => (
    <Notifications subscriptions={{status: 'loading'}} />
  ))
  .add('no projects', () => (
    <Notifications subscriptions={{status: ''}} subscriptionsData={{subscribed: [], unsubscribed: []}} />
  ))
  .add('with projects', () => (
    <Notifications
        subscriptions={{status: ''}}
        subscriptionsData={{
          subscribed: [
            { project: '1', projectRepo: 'org/repo-1' },
            { project: '2', projectRepo: 'org/repo-2' }
          ], unsubscribed: [
            { project: '3', projectRepo: 'org/repo-3' }
          ]
        }}
        />
  ));
