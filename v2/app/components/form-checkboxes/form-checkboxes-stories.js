import React from 'react';
import { storiesOf } from '@storybook/react';
import FormCheckboxes from './form-checkboxes';

const options = [
  {label: 'Option A', value: 'A'},
  {label: 'Option B', value: 'B'}
];

storiesOf('FormCheckboxes', module)
    .add('checkboxes', () => (
      <FormCheckboxes options={options} />
    ))
    .add('selected values', () => (
      <FormCheckboxes options={options} values={['A']} />
    ))
    .add('label', () => (
      <FormCheckboxes options={options} label="Label" />
    ))
    .add('error', () => (
      <FormCheckboxes options={options} label="Label" errorMessage="Error Message" />
    ));
