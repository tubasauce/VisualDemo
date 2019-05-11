import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonCopy from './button-copy';

storiesOf('ButtonCopy', module)
    .add('default', () => (
      <ButtonCopy text="Copy Text">Copy Text</ButtonCopy>
    ));
