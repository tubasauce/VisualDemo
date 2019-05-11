import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StateHistory from './state-history';

const historyData = [
  {
    build: '123',
    branch: 'branch',
    updatedAt: '1/1/2017',
    thumbnailUrl: 'http://placehold.it/320x320',
    screenshotUrl: 'http://placehold.it/320x320'
  },
  {
    build: '123',
    branch: 'branch',
    updatedAt: '1/1/2017',
    thumbnailUrl: 'http://placehold.it/320x320',
    screenshotUrl: 'http://placehold.it/320x320',
    isReviewed: true,
    status: 'accepted',
    userName: 'someone'
  }
];

storiesOf('StateHistory', module)
    .add('loading', () => (
      <StateHistory history={{status: 'loading'}} />
    ))
    .add('empty', () => (
      <StateHistory history={{status: ''}} historyData={[]} />
    ))
    .add('loaded', () => (
      <StateHistory history={{status: ''}} historyData={historyData} />
    ));
