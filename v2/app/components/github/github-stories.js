import React from 'react';
import { storiesOf } from '@storybook/react';
import Github from './github';

storiesOf('Github', module)
  .add('loading', () => (
    <Github integration={{status: 'loading'}} />
  ))
  .add('not integrated', () => (
    <Github integration={{status: ''}} integrationData={{}} />
  ))
  .add('is integrated', () => (
    <Github integration={{status: ''}} integrationData={{user: {login: 'username'}}} />
  ));
