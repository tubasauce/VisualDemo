import React from 'react';
import { storiesOf } from '@storybook/react';
import ProgressItem from './progress-item';

storiesOf('ProgressItem', module)
    .add('default', () => (
      <div>
        0%
        <ProgressItem percent={0} />
        25%
        <ProgressItem percent={25} />
        100%
        <ProgressItem percent={100} />
      </div>
    ));
