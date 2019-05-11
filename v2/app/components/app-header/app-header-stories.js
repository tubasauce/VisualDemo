import React from 'react';
import { storiesOf } from '@storybook/react';
import AppHeader from './app-header';

storiesOf('AppHeader', module)
    .add('default', () => (
      <AppHeader user={{}} />
    ))
    .add('dashboard view', () => (
      <AppHeader appView="dashboard" user={{}} />
    ))
    .add('no user', () => (
      <AppHeader appView="dashboard" />
    ));
