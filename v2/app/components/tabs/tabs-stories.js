import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from './tabs';

storiesOf('Tabs', module)
    .add('default', () => (
      <Tabs value="tab1" items={[{label: 'Tab 1', value: 'tab1'}, {label: 'Tab 2', value: 'tab2'}]} />
    ));
