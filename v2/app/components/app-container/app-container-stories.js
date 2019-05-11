import React from 'react';
import { storiesOf } from '@storybook/react';
import AppContainer from './app-container';

storiesOf('AppContainer', module)
    .add('default', () => (
      <AppContainer user={{}}>
        Body
      </AppContainer>
    ));
