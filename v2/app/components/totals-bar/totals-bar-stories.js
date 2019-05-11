import React from 'react';
import { storiesOf } from '@storybook/react';
import TotalsBar from './totals-bar';

storiesOf('TotalsBar', module)
    .add('default', () => (
      <TotalsBar
        totals={{changed: 20, new: 5, accepted: 132, rejected: 10}}
        resolution="1024x768"
        name="Chrome"
      />
    ))
    .add('0 values', () => (
      <TotalsBar
        totals={{changed: 0, new: 0, accepted: 132, rejected: 0}}
        resolution="1024x768"
        name="Chrome"
      />
    ));
