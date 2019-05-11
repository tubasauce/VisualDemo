import React from 'react';
import { storiesOf } from '@storybook/react';
import TotalsChart from './totals-chart';

storiesOf('TotalsChart', module)
    .add('default', () => (
      <TotalsChart data={{changed: 20, new: 5, accepted: 132, rejected: 10}} width={210} height={210} />
    ))
    .add('0 values', () => (
      <TotalsChart data={{changed: 0, new: 0, accepted: 132, rejected: 0}} width={210} height={210} />
    ));
