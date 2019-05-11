import React from 'react';
import { storiesOf } from '@storybook/react';
import UserProfile from './user-profile';

window.appGlobal = {
  user: {
    email: 'test@test.com'
  }
};

storiesOf('UserProfile', module)
  .add('loading', () => (
    <UserProfile account={{status: 'loading'}} />
  ))
  .add('default', () => (
    <UserProfile
      account={{status: ''}}
      ui={{profile: {
        name: 'Name'
      }}}
    />
  ))
  .add('validation', () => (
    <UserProfile
      account={{status: ''}}
      ui={{profile: {}}}
    />
  ));
