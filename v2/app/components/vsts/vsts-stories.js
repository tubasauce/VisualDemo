import React from 'react';
import { storiesOf } from '@storybook/react';
import VSTS from './vsts';

storiesOf('VSTS', module)
  .add('loading', () => (
    <VSTS integration={{status: 'loading'}} />
  ))
  .add('not integrated', () => (
    <VSTS integration={{status: ''}} integrationData={{}} />
  ))
  .add('is integrated', () => (
    <VSTS integration={{status: ''}} integrationData={{user: {displayName: 'name'}}} />
  ));
