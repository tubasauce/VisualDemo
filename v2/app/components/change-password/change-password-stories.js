import React from 'react';
import { storiesOf } from '@storybook/react';
import ChangePassword from './change-password';

storiesOf('ChangePassword', module)
  .add('loading', () => (
    <ChangePassword account={{status: 'loading'}} />
  ))
  .add('default', () => (
    <ChangePassword
      account={{status: ''}}
      ui={{password: {}}}
    />
  ))
  .add('validation', () => (
    <ChangePassword
      account={{status: ''}}
      ui={{password: {
        isSubmitted: true
      }}}
    />
  ));
