import React from 'react';
import { storiesOf } from '@storybook/react';
import Duration from './duration';

storiesOf('Duration', module)
    .add('seconds', () => (
      <Duration start="2016-12-12T05:44:22.271Z" end="2016-12-12T05:44:32.271Z" />
    ))
    .add('minutes', () => (
      <Duration start="2016-12-12T05:42:32.271Z" end="2016-12-12T05:44:32.271Z" />
    ))
    .add('hours', () => (
      <Duration start="2016-12-12T02:44:32.271Z" end="2016-12-12T05:44:32.271Z" />
    ));
