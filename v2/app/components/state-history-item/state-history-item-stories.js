import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StateHistoryItem from './state-history-item';

const testData = {
  build: '123',
  branch: 'branch',
  updatedAt: '1/1/2017',
  thumbnailUrl: 'http://placehold.it/320x320',
  screenshotUrl: 'http://placehold.it/320x320'
};

storiesOf('StateHistoryItem', module)
    .add('default', () => (
      <StateHistoryItem {...testData} />
    ))
    .add('accepted', () => (
      <StateHistoryItem {...testData}
          isReviewed={true}
          status="accepted"
          userName="someone" />
    ))
    .add('rejected', () => (
      <StateHistoryItem {...testData}
          isReviewed={true}
          status="rejected"
          userName="someone" />
    ))
    .add('auto-accepted', () => (
      <StateHistoryItem {...testData}
          isAutoAccepted={true}
          status="accepted"
          fromBranch="fromBranch" />
    ));
