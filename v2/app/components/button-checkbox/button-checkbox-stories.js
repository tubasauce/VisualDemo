import React from 'react';
import { storiesOf } from '@storybook/react';
import ButtonCheckbox from './button-checkbox';

storiesOf('ButtonCheckbox', module)
    .add('checked', () => (
      <ButtonCheckbox isChecked label="Subscribe" />
    ))
    .add('unchecked', () => (
      <ButtonCheckbox label="Subscribe" />
    ));
