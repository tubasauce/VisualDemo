import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StateItem from './state-item';

storiesOf('StateItem', module)
    .add('default', () => (
      <StateItem
        status="accepted"
        thumbnailUrl="http://placehold.it/240x120"
        name="State Name"
        lazyLoad={false}
        onClick={action('onClick')}
      />
    ))
    .add('reviewed', () => (
      <StateItem
        status="accepted"
        thumbnailUrl="http://placehold.it/240x120"
        name="State Name"
        isReviewed={true}
        userName="Some Person"
        lazyLoad={false}
        onClick={action('onClick')}
        isAutoAccepted={true}
        branch="branch"
      />
    ))
    .add('auto-accepted', () => (
      <StateItem
        status="accepted"
        thumbnailUrl="http://placehold.it/240x120"
        name="State Name"
        lazyLoad={false}
        onClick={action('onClick')}
        isAutoAccepted={true}
        branch="branch"
      />
    ));
