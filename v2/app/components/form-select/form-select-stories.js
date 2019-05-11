import React from 'react';
import { storiesOf } from '@storybook/react';
import FormSelect from './form-select';

const options = [
  {label: 'Option A', value: 'A'},
  {label: 'Option B', value: 'B'}
];

storiesOf('FormSelect', module)
    .add('default', () => (
      <FormSelect options={options} />
    ))
    .add('select value', () => (
      <FormSelect options={options} value="B" />
    ))
    .add('label', () => (
      <FormSelect options={options} label="Label" />
    ))
    .add('error', () => (
      <FormSelect options={options} label="Label" errorMessage="Error Message" />
    ));
