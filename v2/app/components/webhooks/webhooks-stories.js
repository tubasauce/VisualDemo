import React from 'react';
import { storiesOf } from '@storybook/react';
import Webhooks from './webhooks';

storiesOf('Webhooks', module)
  .add('loading accounts', () => (
    <Webhooks
      accounts={{status: 'loading'}}
      accountsData={[]}
      integration={{status: 'loading'}}
      integrationData={{}}
      ui={{modal: {}}} />
  ))
  .add('loading', () => (
    <Webhooks
      accounts={{status: ''}}
      accountsData={[{}]}
      integration={{status: 'loading'}}
      integrationData={{}}
      ui={{modal: {}}} />
  ))
  .add('no permission', () => (
    <Webhooks
      accounts={{status: ''}}
      accountsData={[]}
      integration={{status: ''}}
      integrationData={{}}
      ui={{modal: {}}} />
  ))
  .add('no endpoints', () => (
    <Webhooks
      accounts={{status: ''}}
      accountsData={[{}]}
      integration={{status: ''}}
      integrationData={{}}
      ui={{modal: {}}} />
  ))
  .add('add endpoint', () => (
    <Webhooks
      accounts={{status: ''}}
      accountsData={[{}]}
      integration={{status: ''}}
      integrationData={{}}
      ui={{
        modal: {
          addWebhook: true
        }
      }} />
  ))
  .add('endpoints', () => (
    <Webhooks
      accounts={{status: ''}}
      accountsData={[{}]}
      integration={{status: ''}}
      integrationData={{
        webhooks: [
          {
            _id: 'webhook-1',
            url: 'https://webhooks.com',
            events: ['build.status.failure']
          },
          {
            _id: 'webhook-2',
            url: 'https://webhooks.com',
            project: 'project-1',
            events: ['build.status.failure', 'build.status.success']
          }
        ],
        projects: [
          {
            _id: 'project-1',
            repo: 'org/project-repo'
          }
        ]
      }}
      ui={{modal: {}}} />
  ));
