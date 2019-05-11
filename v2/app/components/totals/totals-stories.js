import React from 'react';
import { storiesOf } from '@storybook/react';
import Totals from './totals';

storiesOf('Totals', module)
    .add('default', () => (
      <Totals totals={{changed: 20, new: 5, accepted: 132, rejected: 10}} />
    ))
    .add('0 values', () => (
      <Totals totals={{changed: 0, new: 0, accepted: 132, rejected: 0}} />
    ));
