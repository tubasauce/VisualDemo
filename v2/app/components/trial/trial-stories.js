import React from 'react';
import { storiesOf } from '@storybook/react';
import Trial from './trial';

storiesOf('Trial', module)
    .add('expired', () => (
      <Trial />
    ));
