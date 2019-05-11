import React from 'react';
import { storiesOf } from '@storybook/react';
import FormInput from './form-input';

storiesOf('FormInput', module)
    .add('input only', () => (
      <FormInput placeholder="Placeholder" />
    ))
    .add('type password', () => (
      <FormInput type="password" value="password" />
    ))
    .add('disabled', () => (
      <FormInput value="Value" isDisabled />
    ))
    .add('label', () => (
      <FormInput label="Label" placeholder="Placeholder" />
    ))
    .add('auto-focus', () => (
      <FormInput label="Label" placeholder="Placeholder" autoFocus />
    ))
    .add('error', () => (
      <FormInput label="Label" placeholder="Placeholder" errorMessage="Error Message" />
    ));
